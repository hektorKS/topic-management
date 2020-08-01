package com.hektorks.user.businesslogic.validation

import com.hektorks.exceptionhandling.BusinessValidationException
import com.hektorks.exceptionhandling.FieldValidationError
import com.hektorks.user.model.ValidatableUser
import com.hektorks.user.repository.user.UserRepository
import com.hektorks.validation.ExistenceValidator.shouldNotExist
import com.hektorks.validation.StringValidator.minMaxLength
import com.hektorks.validation.StringValidator.regex
import org.springframework.stereotype.Service

@Service
class UserValidator(private val userRepository: UserRepository, private val passwordValidator: PasswordValidator) {

  companion object {
    private const val FIRST_NAME: String = "firstName"
    private const val FIRST_NAME_MIN_LENGTH = 2
    private const val FIRST_NAME_MAX_LENGTH = 32

    private const val LAST_NAME: String = "lastName"
    private const val LAST_NAME_MIN_LENGTH = 2
    private const val LAST_NAME_MAX_LENGTH = 32

    private const val USERNAME: String = "username"
    private const val USERNAME_MIN_LENGTH = 3
    private const val USERNAME_MAX_LENGTH = 40
    private val USERNAME_REGEX: Regex = Regex("^[a-zA-Z0-9]+([_-]?[a-zA-Z0-9])*$")

    private const val EMAIL: String = "email"
    private val EMAIL_REGEX: Regex = Regex("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}\$")
  }

  fun validate(user: ValidatableUser) {
    val errors: MutableList<FieldValidationError> = mutableListOf()
    user.firstName?.apply {
      minMaxLength(FIRST_NAME, this, FIRST_NAME_MIN_LENGTH, FIRST_NAME_MAX_LENGTH)?.let { errors.add(it) }
    }
    user.lastName?.apply {
      minMaxLength(LAST_NAME, this, LAST_NAME_MIN_LENGTH, LAST_NAME_MAX_LENGTH)?.let { errors.add(it) }
    }
    user.username?.apply {
      minMaxLength(USERNAME, this, USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH)?.let { errors.add(it) }
      regex(USERNAME, this, USERNAME_REGEX)?.let { errors.add(it) }
      shouldNotExist(USERNAME, user.username, userRepository::existsByUsername)?.let { errors.add(it) }
    }
    user.email?.apply {
      regex(EMAIL, this, EMAIL_REGEX)?.let { errors.add(it) }
    }
    if (errors.isEmpty()) {
      user.password?.apply {
        passwordValidator.validate(user.password)
      }
    } else {
      throw BusinessValidationException(errors)
    }
  }
}
