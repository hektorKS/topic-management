package com.hektorks.security.token

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.boot.context.properties.ConstructorBinding

@ConstructorBinding
@ConfigurationProperties(prefix = "jwt-config")
data class JwtTokenConfig(val jwtSecret: String,
                          val jwtExpirationSeconds: Long)
