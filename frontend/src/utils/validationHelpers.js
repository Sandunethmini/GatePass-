/**
 * Validation Helper Functions
 * Provides comprehensive validation for NIC, Phone, and Email inputs
 */

/**
 * NIC Validation
 * - New Format: Exactly 12 digits
 * - Old Format: 9 digits + 1 alphabetic character (e.g., 123456789V)
 * - No symbols or special characters allowed
 */
export const validateNIC = (nic) => {
  if (!nic || nic.trim() === "") {
    return {
      isValid: false,
      error: "NIC is required",
    };
  }

  // Remove any whitespace
  const trimmedNIC = nic.trim();

  // Check for symbols or special characters (except letters and digits)
  if (!/^[0-9A-Za-z]+$/.test(trimmedNIC)) {
    return {
      isValid: false,
      error: "NIC cannot contain symbols or special characters",
    };
  }

  // New NIC format: exactly 12 digits
  const newNICPattern = /^[0-9]{12}$/;
  if (newNICPattern.test(trimmedNIC)) {
    return {
      isValid: true,
      error: null,
    };
  }

  // Old NIC format: 9 digits + 1 alphabetic character
  const oldNICPattern = /^[0-9]{9}[vV]$/;
  if (oldNICPattern.test(trimmedNIC)) {
    return {
      isValid: true,
      error: null,
    };
  }

  // If neither format matches
  if (trimmedNIC.length < 10) {
    return {
      isValid: false,
      error:
        "NIC must be either 12 digits (new format) or 9 digits + v (old format)",
    };
  } else if (trimmedNIC.length === 10) {
    // Check if it's close to old format
    if (/^[0-9]{9}/.test(trimmedNIC)) {
      return {
        isValid: false,
        error:
          "Old NIC format requires 9 digits followed by v (e.g., 123456789V)",
      };
    }
    return {
      isValid: false,
      error: "Invalid NIC format",
    };
  } else if (trimmedNIC.length === 12) {
    return {
      isValid: false,
      error: "New NIC format must contain exactly 12 digits",
    };
  } else {
    return {
      isValid: false,
      error:
        "NIC must be either 12 digits (new format) or 9 digits + v (old format)",
    };
  }
};

/**
 * Phone Number Validation
 */
export const validatePhone = (phone) => {
  if (!phone || phone.trim() === "") {
    return {
      isValid: false,
      error: "Phone number is required",
    };
  }

  // Remove spaces and dashes automatically
  let cleanedPhone = phone.replace(/[\s\-]/g, "");

  // Check if it starts with + (optional)
  const hasPlus = cleanedPhone.startsWith("+");
  if (hasPlus) {
    cleanedPhone = cleanedPhone.substring(1);
  }

  // Check for non-digit characters (after removing + if present)
  if (!/^[0-9]+$/.test(cleanedPhone)) {
    return {
      isValid: false,
      error: "Phone number must be at least 10 digits and contain only numbers",
    };
  }

  // Length check (7-15 digits is standard for international numbers)
  if (cleanedPhone.length < 10) {
    return {
      isValid: false,
      error: "Phone number must be at least 10 digits",
    };
  }

  if (cleanedPhone.length > 15) {
    return {
      isValid: false,
      error: "Phone number cannot exceed 10 digits",
    };
  }

  return {
    isValid: true,
    error: null,
    cleaned: (hasPlus ? "+" : "") + cleanedPhone,
  };
};

/**
 * Email Validation
 */
export const validateEmail = (email) => {
  if (!email || email.trim() === "") {
    return {
      isValid: false,
      error: "Email is required",
    };
  }

  // Convert to lowercase
  const lowerEmail = email.toLowerCase().trim();

  // Check for spaces
  if (/\s/.test(lowerEmail)) {
    return {
      isValid: false,
      error: "Email cannot contain spaces",
    };
  }

  // Check for exactly one @
  const atCount = (lowerEmail.match(/@/g) || []).length;
  if (atCount === 0) {
    return {
      isValid: false,
      error: "Email must contain @",
    };
  }
  if (atCount > 1) {
    return {
      isValid: false,
      error: "Email must contain exactly one @",
    };
  }

  // Basic email regex
  const emailPattern = /^[a-z0-9._%-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

  if (!emailPattern.test(lowerEmail)) {
    return {
      isValid: false,
      error: "Please enter a valid email address",
    };
  }

  // Additional domain validation
  const [localPart, domain] = lowerEmail.split("@");

  if (localPart.length === 0) {
    return {
      isValid: false,
      error: "Email must have a username before @",
    };
  }

  if (domain.length === 0 || !domain.includes(".")) {
    return {
      isValid: false,
      error: "Email must have a valid domain after @",
    };
  }

  // Check if domain has at least one character before and after the dot
  const domainParts = domain.split(".");
  if (domainParts.some((part) => part.length === 0)) {
    return {
      isValid: false,
      error: "Please enter a valid email address",
    };
  }

  return {
    isValid: true,
    error: null,
    cleaned: lowerEmail,
  };
};

/**
 * Helper function to format phone number by removing spaces/dashes
 */
export const formatPhoneNumber = (phone) => {
  if (!phone) return "";
  // Remove spaces and dashes
  let cleaned = phone.replace(/[\s\-]/g, "");
  return cleaned;
};

/**
 * Helper function to normalize email (convert to lowercase and trim)
 */
export const normalizeEmail = (email) => {
  if (!email) return "";
  return email.toLowerCase().trim();
};

/**
 * Real-time validation helpers for onChange events
 */
export const createNICValidator = (setError) => (nic) => {
  if (!nic || nic.trim() === "") {
    setError("");
    return;
  }
  const result = validateNIC(nic);
  setError(result.error || "");
};

export const createPhoneValidator = (setError) => (phone) => {
  if (!phone || phone.trim() === "") {
    setError("");
    return;
  }
  const result = validatePhone(phone);
  setError(result.error || "");
};

export const createEmailValidator = (setError) => (email) => {
  if (!email || email.trim() === "") {
    setError("");
    return;
  }
  const result = validateEmail(email);
  setError(result.error || "");
};
