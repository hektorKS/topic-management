package com.hektorks.security.token

import io.jsonwebtoken.JwtException
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import io.jsonwebtoken.security.Keys
import java.time.Instant
import java.util.Base64
import java.util.Date
import java.util.Optional
import java.util.UUID
import java.util.concurrent.TimeUnit
import javax.crypto.SecretKey
import javax.servlet.http.HttpServletRequest

class JwtTokenService(private val jwtTokenConfig: JwtTokenConfig) : TokenService {

  companion object {
    private const val BEARER = "Bearer "
    private const val EMPTY = ""
    private const val AUTHORIZATION_HEADER = "Authorization"
    private const val USER_ID = "userId"
  }

  override fun refreshToken(token: String): String {
    return createToken(getUserId(token))
  }

  override fun createToken(userId: UUID): String {
    val keyBytes: ByteArray = Base64.getDecoder().decode(jwtTokenConfig.jwtSecret)
    val key: SecretKey = Keys.hmacShaKeyFor(keyBytes)
    return Jwts.builder()
      .setExpiration(newExpirationTime())
      .claim(USER_ID, userId.toString())
      .signWith(key, SignatureAlgorithm.HS256)
      .compact()
  }

  override fun getToken(httpServletRequest: HttpServletRequest): String {
    val authorizationHeader = httpServletRequest.getHeader(AUTHORIZATION_HEADER)
    return Optional.ofNullable(authorizationHeader)
      .map { header: String -> header.trim() }
      .filter { header: String -> header.startsWith(BEARER) }
      .map { header: String -> header.replace(BEARER, EMPTY) }
      .orElseThrow { SecurityException("Security token not found") }
  }

  override fun getUserId(token: String): UUID {
    return try {
      val userId = Jwts.parserBuilder()
        .setSigningKey(jwtTokenConfig.jwtSecret)
        .build()
        .parseClaimsJws(token).body.get(USER_ID, String::class.java)
      UUID.fromString(userId)
    } catch (exception: JwtException) {
      throw SecurityException("Security token is invalid")
    }
  }

  private fun newExpirationTime(): Date {
    return Date(Instant.now().toEpochMilli() + TimeUnit.SECONDS.toMillis(jwtTokenConfig.jwtExpirationSeconds))
  }

}
