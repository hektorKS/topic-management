package com.hektorks.school.model

import org.springframework.data.mongodb.core.mapping.Document
import java.util.UUID

@Document(collection = "schools")
data class School(
  val id: UUID,
  val name: String,
  val address: SchoolAddress
)

data class SchoolAddress(
  val country: String,
  val city: String,
  val zipCode: String,
  val street: String,
  val buildingNumber: String
)
