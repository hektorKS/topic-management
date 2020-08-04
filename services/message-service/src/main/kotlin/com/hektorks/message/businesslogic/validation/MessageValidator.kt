package com.hektorks.message.businesslogic.validation

import com.hektorks.exceptionhandling.BusinessValidationException
import com.hektorks.exceptionhandling.FieldValidationError
import com.hektorks.message.model.Message
import com.hektorks.message.repository.user.UserRepository
import com.hektorks.validation.ExistenceValidator
import com.hektorks.validation.StringValidator
import org.springframework.stereotype.Service

@Service
class MessageValidator(private val userRepository: UserRepository) {

  companion object {
    private const val MESSAGE: String = "message"
    private const val MESSAGE_MIN_LENGTH = 1
    private const val MESSAGE_MAX_LENGTH = 2000
    private const val SENDER_ID: String = "senderId"
    private const val RECIPIENT_ID: String = "recipientId"
  }

  fun validate(message: Message) {
    val errors: MutableList<FieldValidationError> = mutableListOf()
    StringValidator.minMaxLength(MESSAGE, message.message, MESSAGE_MIN_LENGTH, MESSAGE_MAX_LENGTH)?.let { errors.add(it) }
    ExistenceValidator.shouldExist(SENDER_ID, message.senderId, userRepository::existsById)?.let { errors.add(it) }
    ExistenceValidator.shouldExist(RECIPIENT_ID, message.recipientId, userRepository::existsById)?.let { errors.add(it) }
    if (errors.isNotEmpty()) {
      throw BusinessValidationException(errors)
    }
  }
}
