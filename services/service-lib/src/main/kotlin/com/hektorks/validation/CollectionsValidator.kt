package com.hektorks.validation

import com.hektorks.exceptionhandling.FieldValidationError

object CollectionsValidator {

  fun <T> shouldNotContain(field: String, value: T, collection: Collection<T>): FieldValidationError? {
    if (collection.contains(value)) {
      return FieldValidationError(field, "Collection $field should not contain $value value")
    }
    return null
  }
}
