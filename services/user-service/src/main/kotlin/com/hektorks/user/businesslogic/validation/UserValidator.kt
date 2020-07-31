package com.hektorks.user.businesslogic.validation

import com.hektorks.exceptionhandling.BusinessValidationException
import com.hektorks.exceptionhandling.FieldValidationError
import com.hektorks.user.model.User
import com.hektorks.validation.StringValidator
import org.springframework.stereotype.Service

@Service
class UserValidator {

  companion object {
    private const val NAME: String = "name"
    private const val NAME_MIN_LENGTH = 5
    private const val NAME_MAX_LENGTH = 100
  }

  fun validate(user: User) {
    val errors: MutableList<FieldValidationError> = mutableListOf()
    StringValidator.minLength(NAME, user.firstName, NAME_MIN_LENGTH)?.let { errors.add(it) }
    StringValidator.maxLength(NAME, user.firstName, NAME_MAX_LENGTH)?.let { errors.add(it) }
    if (errors.isNotEmpty()) {
      throw BusinessValidationException(errors)
    }

    // TODO check user identifier unique
  }

}
