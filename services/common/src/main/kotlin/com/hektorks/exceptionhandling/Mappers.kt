package com.hektorks.exceptionhandling

import org.springframework.http.HttpStatus

internal object BusinessValidationExceptionMapper {
  private const val STATUS = "status"
  private const val FIELD = "field"
  private const val ERRORS = "errors"
  private const val MESSAGE = "message"

  fun toMap(businessValidationException: BusinessValidationException): Map<String, Any?> {
    return mapOf(
        STATUS to HttpStatus.UNPROCESSABLE_ENTITY.value(),
        ERRORS to mapErrors(businessValidationException.errors)
    )
  }

  private fun mapErrors(errors: List<FieldValidationError>): List<Map<String, String?>> {
    return errors.asSequence()
        .map {
          mapOf(
              FIELD to it.field,
              MESSAGE to it.message
          )
        }
        .toList()
  }
}

internal object BadRequestExceptionMapper {
  private const val STATUS = "status"
  private const val FIELD = "field"
  private const val ERRORS = "errors"
  private const val MESSAGE = "message"

  fun toMap(badRequestException: BadRequestException): Map<String, Any?> {
    return mapOf(
        STATUS to HttpStatus.BAD_REQUEST.value(),
        ERRORS to mapErrors(badRequestException.errors)
    )
  }

  private fun mapErrors(errors: List<FieldValidationError>): List<Map<String, String?>> {
    return errors.asSequence()
        .map {
          mapOf(
              FIELD to it.field,
              MESSAGE to it.message
          )
        }
        .toList()
  }
}
