package com.hektorks.validation

import com.hektorks.exceptionhandling.FieldValidationError
import java.util.UUID

object ExistenceValidator {

  fun exists(field: String, objectId: UUID, existenceVerifier: (UUID) -> Boolean): FieldValidationError? {
    if (!existenceVerifier.invoke(objectId)) {
      return FieldValidationError(field, "Object not exists for $field=$objectId")
    }
    return null
  }

}
