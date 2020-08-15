package com.hektorks.security.authentication

import com.hektorks.security.token.TokenService
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.authentication.dao.AbstractUserDetailsAuthenticationProvider
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.stereotype.Service
import java.util.UUID

@Service
internal class JWTAuthenticationProvider(private val tokenService: TokenService) : AbstractUserDetailsAuthenticationProvider() {

  override fun additionalAuthenticationChecks(userDetails: UserDetails, authentication: UsernamePasswordAuthenticationToken) {
    // No additional checks
  }

  override fun retrieveUser(username: String, authentication: UsernamePasswordAuthenticationToken): UserDetails {
    val jwtAuthenticationToken = authentication as JWTAuthenticationToken
    return try {
      val token: String = jwtAuthenticationToken.token
      val userId: UUID = tokenService.getUserId(token)
      JWTUserDetails(userId)
    } catch (exception: SecurityException) {
      throw AuthenticationCredentialsNotFoundException(exception.message)
    }
  }

  override fun supports(authentication: Class<*>): Boolean {
    return JWTAuthenticationToken::class.java.isAssignableFrom(authentication)
  }
}
