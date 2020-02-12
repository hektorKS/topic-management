package com.hektorks.exceptionhandling

import org.springframework.validation.BindingResult
import java.util.stream.Collectors

class RepositoryException(cause: Throwable): RuntimeException(cause)

data class FieldValidationError(internal val field: String, internal val message: String?)

// Status code 400
class BadRequestException private constructor(internal val errors: List<FieldValidationError>): RuntimeException() {
  companion object {
    fun fromBindingResult(bindingResult: BindingResult): BadRequestException {
      return BadRequestException(
          bindingResult
              .fieldErrors
              .stream()
              .map { fieldError -> FieldValidationError(fieldError.field, fieldError.defaultMessage) }
              .collect(Collectors.toList())
      )
    }
  }
}

// Status code 404
class ResourceNotFoundException: RuntimeException()

// Status code 422
class BusinessValidationException(internal val errors: List<FieldValidationError>): RuntimeException()

// Status code 500
// We do not want to expose internal exception from API
class CommandException(override val message: String, cause: Throwable): RuntimeException(message, cause)
