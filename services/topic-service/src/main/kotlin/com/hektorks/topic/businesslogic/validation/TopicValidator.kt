package com.hektorks.topic.businesslogic.validation

import com.hektorks.exceptionhandling.BusinessValidationException
import com.hektorks.exceptionhandling.FieldValidationError
import com.hektorks.topic.model.Topic
import com.hektorks.topic.repository.bucket.BucketRepository
import com.hektorks.topic.repository.topic.TopicRepository
import com.hektorks.topic.repository.user.UserRepository
import com.hektorks.validation.CollectionsValidator.shouldNotContain
import com.hektorks.validation.ExistenceValidator.shouldExist
import com.hektorks.validation.StringValidator.maxLength
import com.hektorks.validation.StringValidator.minMaxLength
import org.springframework.context.annotation.Lazy
import org.springframework.stereotype.Service

@Lazy
@Service
class TopicValidator(private val bucketRepository: BucketRepository,
                     private val topicRepository: TopicRepository,
                     private val userRepository: UserRepository) {

  companion object {
    private const val TITLE: String = "title"
    private const val TITLE_MIN_LENGTH = 5
    private const val TITLE_MAX_LENGTH = 100

    private const val DESCRIPTION: String = "description"
    private const val DESCRIPTION_MAX_LENGTH = 5000

    private const val BUCKET_ID = "bucketId"
    private const val SUPERVISOR_ID = "supervisorId"
    private const val STUDENTS = "students"
  }

  fun validate(topic: Topic) {
    val errors: MutableList<FieldValidationError> = mutableListOf()
    if (topicRepository.existsByBucketIdAndTitle(topic.bucketId, topic.title)) {
      errors.add(FieldValidationError(TITLE, "Title ${topic.title} already exists in bucket ${topic.bucketId}"))
    }
    errors.addAll(doValidate(topic))
    if (errors.isNotEmpty()) {
      throw BusinessValidationException(errors)
    }
  }

  fun validateOnUpdate(oldTopic: Topic, newTopic: Topic) {
    val errors: MutableList<FieldValidationError> = mutableListOf()
    if (oldTopic.title != newTopic.title && topicRepository.existsByBucketIdAndTitle(newTopic.bucketId, newTopic.title)) {
      errors.add(FieldValidationError(TITLE, "Title ${newTopic.title} already exists in bucket ${newTopic.bucketId}"))
    }
    errors.addAll(doValidate(newTopic))
    if (errors.isNotEmpty()) {
      throw BusinessValidationException(errors)
    }
  }


  private fun doValidate(topic: Topic): MutableList<FieldValidationError> {
    val errors: MutableList<FieldValidationError> = mutableListOf()
    minMaxLength(TITLE, topic.title, TITLE_MIN_LENGTH, TITLE_MAX_LENGTH)?.let { errors.add(it) }
    maxLength(DESCRIPTION, topic.description, DESCRIPTION_MAX_LENGTH)?.let { errors.add(it) }
    shouldExist(BUCKET_ID, topic.bucketId, bucketRepository::existsById)?.let { errors.add(it) }
    shouldExist(SUPERVISOR_ID, topic.supervisorId, userRepository::existsById)?.let { errors.add(it) }
    topic.students.forEach { student ->
      shouldExist(STUDENTS, student.id, userRepository::existsById)?.let { errors.add(it) }
    }
    shouldNotContain(STUDENTS, topic.supervisorId, topic.students)?.let { errors.add(it) }
    return errors
  }

}
