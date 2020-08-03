package com.hektorks.bucket.businesslogic.validation

import com.hektorks.bucket.model.Bucket
import com.hektorks.bucket.repository.bucket.BucketRepository
import com.hektorks.bucket.repository.school.SchoolRepository
import com.hektorks.bucket.repository.user.UserRepository
import com.hektorks.exceptionhandling.BusinessValidationException
import com.hektorks.exceptionhandling.FieldValidationError
import com.hektorks.validation.ExistenceValidator.shouldExist
import com.hektorks.validation.ExistenceValidator.shouldNotExist
import com.hektorks.validation.StringValidator.minMaxLength
import org.springframework.stereotype.Service

@Service
class BucketValidator(
  private val bucketRepository: BucketRepository,
  private val userRepository: UserRepository,
  private val schoolRepository: SchoolRepository
) {

  companion object {
    private const val NAME: String = "name"
    private const val NAME_MIN_LENGTH = 5
    private const val NAME_MAX_LENGTH = 100
    private const val OWNER_ID: String = "ownerId"
    private const val SCHOOL_ID: String = "schoolId"
  }

  fun validate(bucket: Bucket) {
    val errors: MutableList<FieldValidationError> = mutableListOf()
    minMaxLength(NAME, bucket.name, NAME_MIN_LENGTH, NAME_MAX_LENGTH)?.let { errors.add(it) }
    shouldNotExist(NAME, bucket.name, bucketRepository::existsByName)
    shouldExist(OWNER_ID, bucket.ownerId, userRepository::existsById)
    shouldExist(SCHOOL_ID, bucket.schoolId, schoolRepository::existsById)
    if (errors.isNotEmpty()) {
      throw BusinessValidationException(errors)
    }
  }

}
