package com.hektorks.school.kafka.school

import com.hektorks.school.model.School

interface KafkaSchoolService {

  fun schoolCreated(school: School)

}
