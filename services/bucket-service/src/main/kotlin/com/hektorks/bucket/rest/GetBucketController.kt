package com.hektorks.bucket.rest

import com.hektorks.bucket.model.Bucket
import com.hektorks.bucket.repository.bucket.BucketRepository
import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.UUID

data class GetBucketResponse(val bucket: Bucket)

@RestController
@RequestMapping("/api/v1")
class GetBucketController(private val bucketRepository: BucketRepository) {
  private val log = LoggerFactory.getLogger(javaClass)

  @GetMapping("/buckets/{bucketId}")
  fun getBucketsBySchoolId(@PathVariable bucketId: UUID): ResponseEntity<GetBucketResponse> {
    val bucket = bucketRepository.findById(bucketId)
    return bucket.map {
      log.info("Found bucket for bucketId=$bucketId")
      ResponseEntity.ok().body(GetBucketResponse(it))
    }.orElse( ResponseEntity.notFound().build())
  }

}
