package com.hektorks.topic.businesslogic.validation

import com.hektorks.exceptionhandling.BusinessValidationException
import com.hektorks.exceptionhandling.FieldValidationError
import com.hektorks.topic.model.Topic
import com.hektorks.topic.repository.bucket.BucketRepository
import com.hektorks.topic.repository.user.UserRepository
import com.hektorks.validation.CollectionsValidator
import com.hektorks.validation.CollectionsValidator.shouldNotContain
import com.hektorks.validation.ExistenceValidator.shouldExist
import com.hektorks.validation.StringValidator.maxLength
import com.hektorks.validation.StringValidator.minLength
import org.springframework.context.annotation.Lazy
import org.springframework.stereotype.Service

@Lazy
@Service
class TopicValidator(private val bucketRepository: BucketRepository, private val userRepository: UserRepository) {

  companion object {
    private const val TITLE: String = "title"
    private const val TITLE_MIN_LENGTH = 5
    private const val TITLE_MAX_LENGTH = 100

    private const val DESCRIPTION: String = "description"
    private const val DESCRIPTION_MAX_LENGTH = 2000

    private const val BUCKET_ID = "bucketId"
    private const val SUPERVISOR_ID = "supervisorId"
    private const val STUDENTS = "students"
  }

  fun validate(topic: Topic) {
    val errors: MutableList<FieldValidationError> = mutableListOf()
    minLength(TITLE, topic.title, TITLE_MIN_LENGTH)?.let { errors.add(it) }
    maxLength(TITLE, topic.title, TITLE_MAX_LENGTH)?.let { errors.add(it) }
    maxLength(DESCRIPTION, topic.description, DESCRIPTION_MAX_LENGTH)?.let { errors.add(it) }
    shouldExist(BUCKET_ID, topic.bucketId, bucketRepository::existsById)?.let { errors.add(it) }
    shouldExist(SUPERVISOR_ID, topic.supervisorId, userRepository::existsById)?.let { errors.add(it) }
    topic.students.forEach { student ->
      shouldExist(STUDENTS, student.id, userRepository::existsById)?.let { errors.add(it) }
    }
    shouldNotContain(STUDENTS, topic.supervisorId, topic.students)?.let { errors.add(it) }
    if (errors.isNotEmpty()) {
      throw BusinessValidationException(errors)
    }
//    TODO unique in bucket
  }

}
