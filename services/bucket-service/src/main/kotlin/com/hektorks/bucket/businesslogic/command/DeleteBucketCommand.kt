package com.hektorks.bucket.businesslogic.command

import com.hektorks.bucket.kafka.bucket.KafkaBucketService
import com.hektorks.bucket.repository.bucket.BucketRepository
import org.springframework.context.annotation.Lazy
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.UUID

@Lazy
@Service
open class DeleteBucketCommand(private val bucketRepository: BucketRepository,
                               private val kafkaBucketService: KafkaBucketService) {

  @Transactional
  open fun execute(bucketId: UUID) {
    bucketRepository.deleteById(bucketId)
    kafkaBucketService.bucketDeleted(bucketId)
  }

}
