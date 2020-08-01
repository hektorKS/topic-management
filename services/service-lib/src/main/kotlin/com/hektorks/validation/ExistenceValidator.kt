package com.hektorks.validation

import com.hektorks.exceptionhandling.FieldValidationError
import java.util.UUID

object ExistenceValidator {

  fun <T>shouldExist(field: String, objectId: T, existenceProvider: (T) -> Boolean): FieldValidationError? {
    if (!existenceProvider.invoke(objectId)) {
      return FieldValidationError(field, "Object not exists for $field=$objectId")
    }
    return null
  }

  fun <T>shouldNotExist(field: String, value: T, existenceProvider: (T) -> Boolean): FieldValidationError? {
    if (existenceProvider.invoke(value)) {
      return FieldValidationError(field, "Object exists for $field=$value")
    }
    return null
  }

}
