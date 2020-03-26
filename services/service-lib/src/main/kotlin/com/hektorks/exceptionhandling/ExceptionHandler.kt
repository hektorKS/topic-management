package com.hektorks.exceptionhandling

import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus
import org.springframework.http.converter.HttpMessageNotReadableException
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
    log.warn("[400] Bad request. Errors: [${exception.errors}].")
    return BadRequestExceptionMapper.toMap(exception)
  }

  @ResponseStatus(HttpStatus.BAD_REQUEST)
  @ExceptionHandler(value = [MethodArgumentNotValidException::class])
  fun handleException(exception: MethodArgumentNotValidException): Map<String, Any?> {
    log.warn("[400] Bad request. Result: [${exception.bindingResult}].")
    return BadRequestExceptionMapper.toMap(BadRequestException.fromBindingResult(exception.bindingResult))
  }

  @ResponseStatus(HttpStatus.BAD_REQUEST)
  @ExceptionHandler(value = [HttpMessageNotReadableException::class])
  fun handleException(exception: HttpMessageNotReadableException): Map<String, Any> {
    log.warn("[400] Bad request. Error: [${exception.localizedMessage}].")
    return SimpleMessageMapper.toMap("Could not parse message body.", HttpStatus.BAD_REQUEST)
  }

  @ResponseStatus(HttpStatus.NOT_FOUND)
  @ExceptionHandler(value = [ResourceNotFoundException::class])
  fun handleException(): Unit? {
    log.warn("[404] Resource not found.")
    return null
  }

  @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
  @ExceptionHandler(value = [BusinessValidationException::class])
  fun handleException(exception: BusinessValidationException): Map<String, Any?> {
    log.warn("[422] Business validations failed. Errors: [${exception.errors}].")
    return BusinessValidationExceptionMapper.toMap(exception)
  }

  @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
  @ExceptionHandler(value = [CommandException::class])
  fun handleException(exception: CommandException): Map<String, Any> {
    log.warn("[500] Internal server error happened. Message: [${exception.message}].")
    return SimpleMessageMapper.toMap(exception.message, HttpStatus.INTERNAL_SERVER_ERROR)
  }

  @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
  @ExceptionHandler(value = [Exception::class, RuntimeException::class])
  fun handleException(exception: Exception): Map<String, Any> {
    log.warn("[500] Internal server error happened. Message: [${exception.message}].")
    return SimpleMessageMapper.toMap("Operation failed.", HttpStatus.INTERNAL_SERVER_ERROR)
  }

}
