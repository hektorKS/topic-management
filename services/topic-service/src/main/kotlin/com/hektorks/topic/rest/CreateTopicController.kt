package com.hektorks.topic.rest

import com.hektorks.topic.businesslogic.commands.CreateTopicCommand
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.bind.annotation.RestController
import java.util.UUID
import javax.validation.Valid

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

  @PostMapping("/topic")
  fun postTopic(@Valid @RequestBody createTopicRequest: CreateTopicRequest): ResponseEntity<CreateTopicResponse> {
    val topicId = crateTopicCommand.execute(createTopicRequest)
    return ResponseEntity.ok().body(CreateTopicResponse(topicId))
  }

}
