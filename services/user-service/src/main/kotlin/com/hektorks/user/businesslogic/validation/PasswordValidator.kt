package com.hektorks.user.businesslogic.validation

import com.hektorks.exceptionhandling.BusinessValidationException
import com.hektorks.exceptionhandling.FieldValidationError
import com.hektorks.validation.StringValidator.minMaxLength
import com.hektorks.validation.StringValidator.regex
import org.springframework.stereotype.Service

@Service
class PasswordValidator {

  companion object {
    private const val PASSWORD: String = "password"
    private const val PASSWORD_MIN_LENGTH = 8
    private const val PASSWORD_MAX_LENGTH = 32
    // (?=.*[0-9])       # a digit must occur at least once
    // (?=.*[a-zA-Z])    # a lower case / an upper case letter must occur at least once
    // (?=.*[@#$%^&+=])  # a special character must occur at least once
    // (?=\S+$)          # no whitespace allowed in the entire string
    private val PASSWORD_REGEX: Regex = Regex("^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@#\$%^&+=])(?=\\S+\$).{$PASSWORD_MIN_LENGTH,$PASSWORD_MAX_LENGTH}\$")
  }

  // I skip validations with password history and user firstName/lastName/identifier/..
  fun validate(password: String) {
    val errors: MutableList<FieldValidationError> = mutableListOf()
    minMaxLength(PASSWORD, password, PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH)?.let { errors.add(it) }
    regex(PASSWORD, password, PASSWORD_REGEX)?.let { errors.add(it) }
    if (errors.isNotEmpty()) {
      throw BusinessValidationException(errors)
    }
  }

}
