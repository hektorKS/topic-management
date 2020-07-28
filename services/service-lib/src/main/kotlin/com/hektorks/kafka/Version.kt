package com.hektorks.kafka

data class Version(private val version: String) {
  private val minor: Int
  private val major: Int

  init {
    try {
      val parts = version.split(".")
      major = parts[0].toInt()
      minor = parts[1].toInt()
    } catch (exception: RuntimeException) {
      throw IllegalArgumentException("Invalid version format=$version, required='%d.%d'")
    }
  }

  fun isCompatible(other: Version): Boolean {
    return other.major == this.major
  }

  fun getAsString(): String {
    return version
  }
}
