package com.hektorks.topic.businesslogic.validation

import com.hektorks.exceptionhandling.BusinessValidationException
import com.hektorks.exceptionhandling.FieldValidationError
import com.hektorks.topic.model.Topic
import com.hektorks.validation.StringValidator
import org.springframework.context.annotation.Lazy
import org.springframework.stereotype.Service

@Lazy
@Service
class TopicValidator {

  companion object {
    private const val TITLE: String = "title"
    private const val TITLE_MIN_LENGTH = 5
    private const val TITLE_MAX_LENGTH = 100

    private const val DESCRIPTION: String = "description"
    private const val DESCRIPTION_MAX_LENGTH = 2000
  }

  fun validate(topic: Topic) {
    val errors: MutableList<FieldValidationError> = mutableListOf()
    StringValidator.minLength(TITLE, topic.title, TITLE_MIN_LENGTH)?.let { errors.add(it) }
    StringValidator.maxLength(TITLE, topic.title, TITLE_MAX_LENGTH)?.let { errors.add(it) }
    StringValidator.maxLength(DESCRIPTION, topic.description, DESCRIPTION_MAX_LENGTH)?.let { errors.add(it) }
    if(errors.isNotEmpty()) {
      throw BusinessValidationException(errors)
    }

    print(topic)
    // TODO VALIDATIONS Check if bucket exists
    // TODO VALIDATIONS Check if supervisor exists
    // TODO VALIDATIONS Check if students not empty, then check if they exists
  }

}
