package com.hektorks.security.authentication

import com.hektorks.security.token.TokenService
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.ProviderManager
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.builders.WebSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.CorsConfigurationSource
import org.springframework.web.cors.UrlBasedCorsConfigurationSource
import org.springframework.web.servlet.config.annotation.EnableWebMvc

@EnableWebMvc
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
internal open class JWTAuthenticationConfiguration(
  private val entryPoint: JWTAuthenticationEntryPoint,
  private val jwtAuthenticationProvider: JWTAuthenticationProvider,
  private val tokenService: TokenService
) : WebSecurityConfigurerAdapter() {

  companion object {
    private const val SIGN_UP_URL = "/api/v1/users/sign-up"
    private const val SIGN_IN_URL = "/api/v1/users/sign-in"
  }

  override fun configure(web: WebSecurity) {
    web.ignoring().antMatchers(SIGN_UP_URL)
    web.ignoring().antMatchers(SIGN_IN_URL)
  }

  @Throws(Exception::class)
  override fun configure(http: HttpSecurity) {
    http
      .csrf().disable()
      .cors()
      .and()
      .authorizeRequests().antMatchers("/api/**").authenticated()
      .and()
      .exceptionHandling().authenticationEntryPoint(entryPoint)
      .and()
      .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
      .and()
      .addFilterBefore(authenticationTokenFilter(), UsernamePasswordAuthenticationFilter::class.java)
    http
      .headers()
      .cacheControl()
  }

  private fun authenticationTokenFilter(): JWTAuthenticationTokenFilter {
    val filter = JWTAuthenticationTokenFilter(tokenService)
    filter.setAuthenticationManager(authenticationManager())
    filter.setAuthenticationSuccessHandler(JWTAuthenticationSuccessHandler())
    return filter
  }

  @Bean
  open fun corsConfigurationSource(): CorsConfigurationSource {
    val configuration = CorsConfiguration()
    configuration.allowedOrigins = listOf("*")
    configuration.allowedMethods = listOf("HEAD", "GET", "POST", "PUT", "DELETE", "PATCH")
    configuration.allowCredentials = true
    configuration.allowedHeaders = listOf("Authorization", "Cache-Control", "Content-Type")
    val source = UrlBasedCorsConfigurationSource()
    source.registerCorsConfiguration("/**", configuration)
    return source
  }

  @Bean
  override fun authenticationManager(): AuthenticationManager {
    return ProviderManager(listOf(jwtAuthenticationProvider))
  }
}
