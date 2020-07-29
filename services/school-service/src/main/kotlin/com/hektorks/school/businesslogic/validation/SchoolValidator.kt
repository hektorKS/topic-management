package com.hektorks.school.businesslogic.validation

import com.hektorks.exceptionhandling.BusinessValidationException
import com.hektorks.exceptionhandling.FieldValidationError
import com.hektorks.school.model.School
import org.springframework.context.annotation.Lazy
import org.springframework.stereotype.Service

@Lazy
@Service
class SchoolValidator {

  companion object {
    private const val NAME: String = "name"
  }

  fun validate(topic: School) {
    val errors: MutableList<FieldValidationError> = mutableListOf()
    // TODO VALIDATIONS Name unique
    if (errors.isNotEmpty()) {
      throw BusinessValidationException(errors)
    }
  }

}
