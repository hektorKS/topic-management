package com.hektorks.security.authentication

import com.hektorks.security.token.TokenService
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException
import org.springframework.security.core.Authentication
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter
import javax.servlet.FilterChain
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

internal class JWTAuthenticationTokenFilter(private val tokenService: TokenService) : AbstractAuthenticationProcessingFilter("/api/**") {

  override fun attemptAuthentication(request: HttpServletRequest, response: HttpServletResponse): Authentication {
    return try {
      val token: String = tokenService.getToken(request)
      val jwtAuthenticationToken = JWTAuthenticationToken(token)
      authenticationManager.authenticate(jwtAuthenticationToken)
    } catch (exception: SecurityException) {
      throw AuthenticationCredentialsNotFoundException(exception.message)
    }
  }

  override fun successfulAuthentication(request: HttpServletRequest,
                                        response: HttpServletResponse,
                                        chain: FilterChain,
                                        authResult: Authentication) {
    super.successfulAuthentication(request, response, chain, authResult)
    chain.doFilter(request, response)
  }

}
