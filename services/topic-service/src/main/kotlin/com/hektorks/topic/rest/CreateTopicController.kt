package com.hektorks.topic.rest

import com.hektorks.topic.businesslogic.command.CreateTopicCommand
import com.hektorks.topic.model.UsernameUser
import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.UUID

data class CreateTopicRequest(
  val bucketId: UUID,
  val title: String,
  val description: String,
  val supervisorId: UUID,
  val students: List<UsernameUser>?
)

data class CreateTopicResponse(val id: UUID)

@RestController
@RequestMapping("/api/v1")
class CreateTopicController(private val crateTopicCommand: CreateTopicCommand) {
  private val log = LoggerFactory.getLogger(javaClass)

  @PostMapping("/topics")
  fun createTopic(@RequestBody createTopicRequest: CreateTopicRequest): ResponseEntity<CreateTopicResponse> {
    val topicId = crateTopicCommand.execute(createTopicRequest)
    log.info("Created topic with id=$topicId")
    return ResponseEntity.ok().body(CreateTopicResponse(topicId))
  }

}
