package com.hektorks.security.authentication

import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import java.util.Collections
import java.util.UUID

internal class JWTUserDetails(private val userId: UUID) : UserDetails {

  override fun getAuthorities(): Collection<GrantedAuthority?> {
    return Collections.emptyList()
  }

  override fun getPassword(): String? {
    return null
  }

  override fun getUsername(): String {
    return userId.toString()
  }

  override fun isAccountNonExpired(): Boolean {
    return true
  }

  override fun isAccountNonLocked(): Boolean {
    return true
  }

  override fun isCredentialsNonExpired(): Boolean {
    return true
  }

  override fun isEnabled(): Boolean {
    return true
  }
}
