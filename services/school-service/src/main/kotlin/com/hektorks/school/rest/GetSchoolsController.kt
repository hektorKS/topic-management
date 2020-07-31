package com.hektorks.school.rest

import com.hektorks.school.model.School
import com.hektorks.school.repository.school.SchoolRepository
import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController


data class GetSchoolsResponse(val schools: List<School>)

@RestController
@RequestMapping("/api/v1")
class GetSchoolsController(private val schoolRepository: SchoolRepository) {
  private val log = LoggerFactory.getLogger(javaClass)

  @GetMapping("/schools")
  fun createTopic(): ResponseEntity<GetSchoolsResponse> {
    val schools = schoolRepository.findAll()
    log.info("Found schools=$schools")
    return ResponseEntity.ok().body(GetSchoolsResponse(schools))
  }

}
