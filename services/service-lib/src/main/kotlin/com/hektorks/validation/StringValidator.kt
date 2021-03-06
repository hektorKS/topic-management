package com.hektorks.validation

import com.hektorks.exceptionhandling.FieldValidationError

object StringValidator {

  fun exactLength(field: String, value: String, exactLength: Int): FieldValidationError? {
    if(value.length != exactLength) {
      return FieldValidationError(field, "Field is not exact length [$exactLength]")
    }
    return null
  }

  fun maxLength(field: String, value: String, maxLength: Int): FieldValidationError? {
    if(value.length > maxLength) {
      return FieldValidationError(field, "Field exceeded max length [$maxLength]")
    }
    return null
  }

  fun minLength(field: String, value: String, minLength: Int): FieldValidationError? {
    if(value.length < minLength) {
      return FieldValidationError(field, "Field has not min length [$minLength]")
    }
    return null
  }

  fun minMaxLength(field: String, value: String, minLength: Int, maxLength: Int): FieldValidationError? {
    return this.minLength(field, value, minLength) ?: this.maxLength(field, value, maxLength)
  }

  fun regex(field: String, value: String, regex: Regex): FieldValidationError? {
    if(!regex.matches(value)) {
      return FieldValidationError(field, "Field has to match regex [$regex]")
    }
    return null
  }

}
