package com.hektorks.school.businesslogic.validation

import com.hektorks.exceptionhandling.BusinessValidationException
import com.hektorks.exceptionhandling.FieldValidationError
import com.hektorks.school.model.School
import com.hektorks.school.repository.school.SchoolRepository
import com.hektorks.validation.ExistenceValidator.shouldNotExist
import com.hektorks.validation.StringValidator.minMaxLength
import org.springframework.context.annotation.Lazy
import org.springframework.stereotype.Service

@Lazy
@Service
class SchoolValidator(private val schoolRepository: SchoolRepository) {

  companion object {
    private const val NAME: String = "name"
    private const val NAME_MIN_LENGTH: Int = 4
    private const val NAME_MAX_LENGTH: Int = 100
  }

  fun validate(school: School) {
    val errors: MutableList<FieldValidationError> = mutableListOf()
    minMaxLength(NAME, school.name, NAME_MIN_LENGTH, NAME_MAX_LENGTH)?.let { errors.add(it) }
    shouldNotExist(NAME, school.name, schoolRepository::existsByName)?.let { errors.add(it) }
    if (errors.isNotEmpty()) {
      throw BusinessValidationException(errors)
    }
  }

}
