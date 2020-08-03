package com.hektorks.bucket.businesslogic.command

import com.hektorks.bucket.businesslogic.validation.BucketValidator
import com.hektorks.bucket.kafka.bucket.KafkaBucketService
import com.hektorks.bucket.model.Bucket
import com.hektorks.bucket.repository.bucket.BucketRepository
import com.hektorks.bucket.rest.CreateBucketRequest
import org.springframework.context.annotation.Lazy
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.UUID

@Lazy
@Service
open class CrateBucketCommand(private val bucketValidator: BucketValidator,
                              private val bucketRepository: BucketRepository,
                              private val kafkaBucketService: KafkaBucketService) {

  @Transactional
  open fun execute(createBucketRequest: CreateBucketRequest): UUID {
    val bucket = Bucket(
      UUID.randomUUID(),
      createBucketRequest.name,
      createBucketRequest.ownerId,
      createBucketRequest.schoolId
    )
    bucketValidator.validate(bucket)
    bucketRepository.save(bucket)
    kafkaBucketService.bucketCreated(bucket)
    return bucket.id
  }

}
