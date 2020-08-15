package com.hektorks.school.rest

import com.hektorks.school.businesslogic.command.CreateSchoolCommand
import com.hektorks.school.model.SchoolAddress
import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.UUID

data class CreateSchoolRequest(
  val name: String,
  val address: SchoolAddress
)

data class CreateSchoolResponse(val id: UUID)

@RestController
@RequestMapping("/api/v1")
class CreateTopicController(private val createSchoolCommand: CreateSchoolCommand) {
  private val log = LoggerFactory.getLogger(javaClass)

  @PostMapping("/schools")
  fun createSchool(@RequestBody createSchoolRequest: CreateSchoolRequest): ResponseEntity<CreateSchoolResponse> {
    val schoolId = createSchoolCommand.execute(createSchoolRequest)
    log.info("Created school with id=$schoolId")
    return ResponseEntity.ok().body(CreateSchoolResponse(schoolId))
  }

}
