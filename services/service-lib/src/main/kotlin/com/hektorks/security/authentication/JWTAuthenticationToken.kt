package com.hektorks.security.authentication

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken

internal class JWTAuthenticationToken(val token: String) : UsernamePasswordAuthenticationToken(null, null)
