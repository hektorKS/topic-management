package com.hektorks.exceptionhandling

import org.springframework.http.HttpStatus

object BusinessValidationExceptionMapper {
  private const val STATUS = "status"
  private const val FIELD = "field"
  private const val MESSAGE = "message"

  fun toMap(businessValidationException: BusinessValidationException): Map<String, Any?> {
    return mapOf(
      STATUS to HttpStatus.UNPROCESSABLE_ENTITY.value(),
      FIELD to businessValidationException.field,
      MESSAGE to businessValidationException.message
    )
  }
}
