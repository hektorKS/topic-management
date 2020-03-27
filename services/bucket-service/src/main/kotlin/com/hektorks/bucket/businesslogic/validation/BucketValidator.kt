package com.hektorks.bucket.businesslogic.validation

import com.hektorks.exceptionhandling.BusinessValidationException
import com.hektorks.exceptionhandling.FieldValidationError
import com.hektorks.model.bucket.Bucket
import com.hektorks.validation.StringValidator
import org.springframework.stereotype.Service

@Service
class BucketValidator {

  companion object {
    private const val NAME: String = "name"
    private const val NAME_MIN_LENGTH = 5
    private const val NAME_MAX_LENGTH = 100
  }

  fun validate(bucket: Bucket) {
    val errors: MutableList<FieldValidationError> = mutableListOf()
    StringValidator.minLength(NAME, bucket.name, NAME_MIN_LENGTH)?.let { errors.add(it) }
    StringValidator.maxLength(NAME, bucket.name, NAME_MAX_LENGTH)?.let { errors.add(it) }
    if(errors.isNotEmpty()) {
      throw BusinessValidationException(errors)
    }

    // TODO check school exists
    // TODO check user exists
    // TODO check user has school access (?)

  }

}
