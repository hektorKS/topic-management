package com.hektorks.topic.rest

import com.hektorks.topic.businesslogic.commands.CreateTopicCommand
import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.bind.annotation.RestController
import java.util.UUID

data class CreateTopicRequest(
    val bucketId: UUID,
    val title: String,
    val description: String,
    val students: List<UUID>?,
    val supervisor: UUID
)

data class CreateTopicResponse(val id: UUID)

@ResponseBody
@RestController
@RequestMapping("/v1")
class CreateTopicController(private val crateTopicCommand: CreateTopicCommand) {
  private val log = LoggerFactory.getLogger(javaClass)

  @PostMapping("/topic")
  fun postTopic(@RequestBody createTopicRequest: CreateTopicRequest): ResponseEntity<CreateTopicResponse> {
    val topicId = crateTopicCommand.execute(createTopicRequest)
    log.debug("Created topic with id=$topicId")
    return ResponseEntity.ok().body(CreateTopicResponse(topicId))
  }

}
