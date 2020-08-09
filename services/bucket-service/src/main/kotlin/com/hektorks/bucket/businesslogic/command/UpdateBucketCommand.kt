package com.hektorks.bucket.businesslogic.command

import com.hektorks.bucket.businesslogic.validation.BucketValidator
import com.hektorks.bucket.kafka.bucket.KafkaBucketService
import com.hektorks.bucket.model.Bucket
import com.hektorks.bucket.repository.bucket.BucketRepository
import com.hektorks.bucket.rest.UpdateBucketRequest
import com.hektorks.exceptionhandling.ResourceNotFoundException
import org.springframework.context.annotation.Lazy
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.UUID

@Lazy
@Service
open class UpdateBucketCommand(private val bucketValidator: BucketValidator,
                               private val bucketRepository: BucketRepository,
                               private val kafkaBucketService: KafkaBucketService) {

  @Transactional
  open fun execute(bucketId: UUID, updateBucketRequest: UpdateBucketRequest) {
    val oldBucket = bucketRepository.findById(bucketId).orElseThrow { ResourceNotFoundException() }
    val newBucket = Bucket(
      oldBucket.id,
      updateBucketRequest.name,
      oldBucket.ownerId,
      oldBucket.schoolId
    )
    bucketValidator.validate(newBucket)
    bucketRepository.save(newBucket)
    kafkaBucketService.bucketUpdated(newBucket)
  }

}
