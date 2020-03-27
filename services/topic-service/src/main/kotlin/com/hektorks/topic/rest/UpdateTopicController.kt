package com.hektorks.topic.rest

import com.hektorks.topic.businesslogic.command.UpdateTopicCommand
import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.UUID

data class UpdateTopicRequest(
    val bucketId: UUID?,
    val title: String?,
    val description: String?,
    val students: List<UUID>?,
    val supervisor: UUID?
)

@RestController
@RequestMapping("/api/v1")
class UpdateTopicController(private val updateTopicCommand: UpdateTopicCommand) {
  private val log = LoggerFactory.getLogger(javaClass)

  @PatchMapping("/topics/{id}")
  fun updateTopic(@RequestBody updateTopicRequest: UpdateTopicRequest, @PathVariable("id") topicId: UUID): ResponseEntity<Unit> {
    updateTopicCommand.execute(topicId, updateTopicRequest)
    log.debug("Updated topic with id=${topicId}")
    return ResponseEntity.noContent().build()
  }

}
