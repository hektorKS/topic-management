package com.hektorks.school.repository.school

import com.hektorks.school.model.School

interface SchoolRepository {

  fun save(school: School)
}
