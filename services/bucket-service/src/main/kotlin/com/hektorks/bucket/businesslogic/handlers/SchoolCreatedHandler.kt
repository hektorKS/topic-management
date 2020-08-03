package com.hektorks.bucket.businesslogic.handlers

import com.hektorks.bucket.model.School
import com.hektorks.bucket.repository.school.SchoolRepository
import org.springframework.stereotype.Service

@Service
class SchoolCreatedHandler(private val schoolRepository: SchoolRepository) {

  internal fun handle(school: School) {
    schoolRepository.save(school)
  }
}
