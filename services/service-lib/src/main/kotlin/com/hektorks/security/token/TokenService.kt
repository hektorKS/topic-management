package com.hektorks.security.token

import java.util.UUID
import javax.servlet.http.HttpServletRequest


interface TokenService {

  fun refreshToken(token: String): String

  fun createToken(userId: UUID): String

  fun getToken(httpServletRequest: HttpServletRequest): String

  fun getUserId(token: String): UUID
}
