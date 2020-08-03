package com.hektorks.bucket.repository.school

import com.hektorks.bucket.model.School
import java.util.UUID

interface SchoolRepository {

  fun save(school: School)

  fun existsById(schoolId: UUID): Boolean
}
