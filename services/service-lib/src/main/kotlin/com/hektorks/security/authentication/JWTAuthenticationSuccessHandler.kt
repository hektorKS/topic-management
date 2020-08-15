package com.hektorks.security.authentication

import org.springframework.security.core.Authentication
import org.springframework.security.web.authentication.AuthenticationSuccessHandler
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse


internal class JWTAuthenticationSuccessHandler : AuthenticationSuccessHandler {

  companion object {
    private const val USER_ID = "userId"
  }

  override fun onAuthenticationSuccess(request: HttpServletRequest, response: HttpServletResponse, authentication: Authentication) {
    val jwtUserDetails: JWTUserDetails = authentication.principal as JWTUserDetails
    request.setAttribute(USER_ID, jwtUserDetails.username)
  }

}
