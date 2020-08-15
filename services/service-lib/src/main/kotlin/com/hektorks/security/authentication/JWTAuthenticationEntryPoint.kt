package com.hektorks.security.authentication

import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus
import org.springframework.security.core.AuthenticationException
import org.springframework.security.web.AuthenticationEntryPoint
import org.springframework.stereotype.Service
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@Service
internal class JWTAuthenticationEntryPoint : AuthenticationEntryPoint {
  private val log = LoggerFactory.getLogger(javaClass)

  override fun commence(request: HttpServletRequest, response: HttpServletResponse, authException: AuthenticationException) {
    log.warn("Unauthorized request rejected")
    response.sendError(HttpStatus.UNAUTHORIZED.value())
  }
}
