package com.hektorks.topic.actions.create

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.bind.annotation.RestController
import java.util.UUID
import javax.validation.Valid
import javax.validation.constraints.NotEmpty

data class CreateTopicRequest(
    @NotEmpty(message = "Not empty field 'bucketId' is required")
    val bucketId: UUID,
    @NotEmpty(message = "Not empty field 'title' is required")
    val title: String,
    @NotEmpty(message = "Not empty field 'description' is required")
    val description: String,
    val students: List<UUID>?,
    @NotEmpty(message = "Not empty field 'supervisor' is required")
    val supervisor: UUID
)

data class CreateTopicResponse(private val id: UUID)

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
