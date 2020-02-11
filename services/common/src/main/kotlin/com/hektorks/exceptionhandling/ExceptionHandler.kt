package com.hektorks.exceptionhandling

import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus
import org.springframework.web.bind.MethodArgumentNotValidException
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestControllerAdvice


@RestControllerAdvice
class ExceptionHandler {
  private val log = LoggerFactory.getLogger(javaClass)

  @ResponseStatus(HttpStatus.BAD_REQUEST)
  @ExceptionHandler(value = [BadRequestException::class])
  fun handleException(exception: BadRequestException): Map<String, Any?> {
    log.warn("[400]Bad request. Errors: [${exception.errors}]!")
    return BadRequestExceptionMapper.toMap(exception)
  }

  @ResponseStatus(HttpStatus.NOT_FOUND)
  @ExceptionHandler(value = [ResourceNotFoundException::class])
  fun handleException(): Unit? {
    log.warn("[404]Resource not found!")
    return null
  }

  @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
  @ExceptionHandler(value = [BusinessValidationException::class])
  fun handleException(exception: BusinessValidationException): Map<String, Any?> {
    log.warn("[422]Business validations failed. Errors: [${exception.errors}]!")
    return BusinessValidationExceptionMapper.toMap(exception)
  }

  @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
  @ExceptionHandler(value = [CommandException::class])
  fun handleException(exception: CommandException): String {
    log.warn("[500]Internal server error happened. Message: [${exception.message}]!")
    return exception.message
  }

  @ExceptionHandler(value = [Exception::class, RuntimeException::class])
  fun handleException(exception: Exception): Nothing {
    throw CommandException("Operation failed!", exception);
  }

  @ExceptionHandler(value = [MethodArgumentNotValidException::class])
  fun handleException(exception: MethodArgumentNotValidException): Nothing {
    throw BadRequestException.fromBindingResult(exception.bindingResult)
  }

}
