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

data class GetBucketsResponse(val buckets: List<Bucket>)

@RestController
@RequestMapping("/api/v1")
class GetBucketsController(private val bucketRepository: BucketRepository) {
  private val log = LoggerFactory.getLogger(javaClass)

  @GetMapping("/buckets/school/{schoolId}")
  fun createTopic(@PathVariable schoolId: UUID): ResponseEntity<GetBucketsResponse> {
    val buckets = bucketRepository.getBySchoolId(schoolId)
    log.info("Fetched ${buckets.size} buckets for schoolId=$schoolId")
    return ResponseEntity.ok().body(GetBucketsResponse(buckets))
  }

}
