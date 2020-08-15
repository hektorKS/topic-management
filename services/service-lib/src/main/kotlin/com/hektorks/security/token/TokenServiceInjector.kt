package com.hektorks.security.token

import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
@EnableConfigurationProperties(JwtTokenConfig::class)
open class TokenServiceInjector {

  @Bean
  open fun tokenService(jwtTokenConfig: JwtTokenConfig): TokenService {
    return JwtTokenService(jwtTokenConfig)
  }
}
