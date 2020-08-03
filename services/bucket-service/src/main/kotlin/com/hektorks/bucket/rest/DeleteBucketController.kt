package com.hektorks.bucket.rest

import com.hektorks.bucket.businesslogic.command.DeleteBucketCommand
import com.hektorks.bucket.repository.bucket.BucketRepository
import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.UUID

@RestController
@RequestMapping("/api/v1")
class DeleteBucketController(private val bucketCommand: DeleteBucketCommand) {
  private val log = LoggerFactory.getLogger(javaClass)

  @GetMapping("/buckets/{bucketId}")
  fun createTopic(@PathVariable("bucketId") bucketId: UUID): ResponseEntity<Unit> {
    bucketCommand.execute(bucketId)
    log.info("Bucket deleted, bucketId=$bucketId")
    return ResponseEntity.noContent().build()
  }

}
