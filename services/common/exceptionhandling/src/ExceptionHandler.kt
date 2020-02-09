package com.hektorks.exceptionhandling

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestControllerAdvice

@RestControllerAdvice
class ExceptionHandler {

  @ResponseStatus(HttpStatus.BAD_REQUEST)
  @ExceptionHandler(value = [BadRequestException::class])
  fun handleException(exception: BadRequestException): List<FieldValidationError> {
    return exception.errors
  }

  @ResponseStatus(HttpStatus.NOT_FOUND)
  @ExceptionHandler(value = [ResourceNotFoundException::class])
  fun handleException(): Unit? {
    return null
  }

  @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
  @ExceptionHandler(value = [BusinessValidationException::class])
  fun handleException(exception: BusinessValidationException): Map<String, Any?> {
    return BusinessValidationExceptionMapper.toMap(exception)
  }

  @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
  @ExceptionHandler(value = [ControllerException::class])
  fun handleException(exception: ControllerException): String {
    return exception.message
  }

}
