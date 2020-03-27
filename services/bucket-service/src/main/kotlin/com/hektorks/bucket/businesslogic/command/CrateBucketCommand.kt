package com.hektorks.bucket.businesslogic.command

import com.hektorks.bucket.businesslogic.validation.BucketValidator
import com.hektorks.bucket.kafka.bucket.KafkaBucketService
import com.hektorks.bucket.repository.bucket.BucketRepository
import com.hektorks.bucket.rest.CreateBucketRequest
import com.hektorks.model.bucket.Bucket
import org.slf4j.LoggerFactory
import org.springframework.context.annotation.Lazy
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.UUID

@Lazy
@Service
class CrateBucketCommand(private val bucketValidator: BucketValidator,
                         private val bucketRepository: BucketRepository,
                         private val kafkaBucketService: KafkaBucketService) {
  private val log = LoggerFactory.getLogger(javaClass)

  @Transactional
  fun execute(createBucketRequest: CreateBucketRequest): UUID {
    try {
      return executeCommand(createBucketRequest)
    } catch(exception: Exception) {
      log.error("Creating bucket [$createBucketRequest] failed! Exception: $exception")
      throw exception
    }
  }

  private fun executeCommand(createBucketRequest: CreateBucketRequest): UUID {
    val bucket = Bucket(
        UUID.randomUUID(),
        createBucketRequest.schoolId,
        createBucketRequest.ownerId,
        createBucketRequest.name
    )
    bucketValidator.validate(bucket)
    bucketRepository.create(bucket)
    kafkaBucketService.bucketCreated(bucket)
    return bucket.id
  }

}
