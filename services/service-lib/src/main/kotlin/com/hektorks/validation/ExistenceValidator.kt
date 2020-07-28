package com.hektorks.validation

import com.hektorks.exceptionhandling.FieldValidationError
import java.util.UUID

object ExistenceValidator {

  fun shouldExist(field: String, objectId: UUID, existenceProvider: (UUID) -> Boolean): FieldValidationError? {
    if (!existenceProvider.invoke(objectId)) {
      return FieldValidationError(field, "Object not exists for $field=$objectId")
    }
    return null
  }

}
