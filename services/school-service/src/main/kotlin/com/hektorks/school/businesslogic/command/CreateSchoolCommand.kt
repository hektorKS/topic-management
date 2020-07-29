package com.hektorks.school.businesslogic.command

import com.hektorks.school.businesslogic.validation.SchoolValidator
import com.hektorks.school.kafka.school.KafkaSchoolService
import com.hektorks.school.model.School
import com.hektorks.school.repository.school.SchoolRepository
import com.hektorks.school.rest.CreateSchoolRequest
import org.springframework.context.annotation.Lazy
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.UUID

@Lazy
@Service
open class CreateSchoolCommand(private val schoolValidator: SchoolValidator,
                               private val schoolRepository: SchoolRepository,
                               private val kafkaSchoolService: KafkaSchoolService) {

  @Transactional
  open fun execute(schoolRequest: CreateSchoolRequest): UUID {
    val school = School(
      UUID.randomUUID(),
      schoolRequest.name,
      schoolRequest.address
    )
    schoolValidator.validate(school)
    schoolRepository.save(school)
    kafkaSchoolService.schoolCreated(school)
    return school.id
  }

}
