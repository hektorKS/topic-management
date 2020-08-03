package com.hektorks.bucket.rest

import com.hektorks.bucket.businesslogic.command.DeleteBucketCommand
import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.UUID

@RestController
@RequestMapping("/api/v1")
class DeleteBucketController(private val deleteBucketCommand: DeleteBucketCommand) {
  private val log = LoggerFactory.getLogger(javaClass)

  @DeleteMapping("/buckets/{bucketId}")
  fun deleteBucket(@PathVariable("bucketId") bucketId: UUID): ResponseEntity<Unit> {
    deleteBucketCommand.execute(bucketId)
    log.info("Bucket deleted, bucketId=$bucketId")
    return ResponseEntity.noContent().build()
  }

}
