import Joi from "joi";

export const createUserSchema = Joi.object({
  body: Joi.object({
    firstName: Joi.string().trim().min(2).max(50).required().messages({
      "string.empty": "First name is required.",
      "string.min": "First name must be at least 2 characters.",
      "string.max": "First name cannot exceed 50 characters.",
      "any.required": "First name is required.",
    }),

    lastName: Joi.string().trim().min(2).max(50).required().messages({
      "string.empty": "Last name is required.",
      "string.min": "Last name must be at least 2 characters.",
      "string.max": "Last name cannot exceed 50 characters.",
      "any.required": "Last name is required.",
    }),

    email: Joi.string().trim().lowercase().email().required().messages({
      "string.email": "Please enter a valid email address.",
      "string.empty": "Email is required.",
      "any.required": "Email is required.",
    }),

    password: Joi.string()
      .min(8)
      .max(20)
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_\-+=])[A-Za-z\d@$!%*?&^#()_\-+=]{8,20}$/,
      )
      .required()
      .messages({
        "string.empty": "Password is required.",
        "string.min": "Password must be at least 8 characters.",
        "string.max": "Password cannot exceed 20 characters.",
        "string.pattern.base":
          "Password must contain uppercase, lowercase, number and special character.",
        "any.required": "Password is required.",
      }),

    role: Joi.string()
      .valid("ADMIN", "MANAGER", "TEAM_LEAD", "EMPLOYEE")
      .required()
      .messages({
        "any.only": "Role must be ADMIN, MANAGER, TEAM_LEAD or EMPLOYEE.",
        "any.required": "Role is required.",
      }),

    designation: Joi.string().trim().min(2).max(100).required().messages({
      "string.empty": "Designation is required.",
    }),

    phoneNumber: Joi.string()
      .trim()
      .pattern(/^[6-9]\d{9}$/)
      .optional()
      .messages({
        "string.pattern.base": "Please enter a valid 10-digit mobile number.",
      }),

    profileImage: Joi.string().uri().optional().allow(null, "").messages({
      "string.uri": "Profile image must be a valid URL.",
    }),
  }),
});

export const updateUserSchema = Joi.object({
  params: Joi.object({
    id: Joi.string().required(),
  }),
  body: Joi.object({
    firstName: Joi.string().trim().min(2).max(50).required().messages({
      "string.empty": "First name is required.",
      "string.min": "First name must be at least 2 characters.",
      "string.max": "First name cannot exceed 50 characters.",
      "any.required": "First name is required.",
    }),

    lastName: Joi.string().trim().min(2).max(50).required().messages({
      "string.empty": "Last name is required.",
      "string.min": "Last name must be at least 2 characters.",
      "string.max": "Last name cannot exceed 50 characters.",
      "any.required": "Last name is required.",
    }),

    email: Joi.string().trim().lowercase().email().required().messages({
      "string.email": "Please enter a valid email address.",
      "string.empty": "Email is required.",
      "any.required": "Email is required.",
    }),

    role: Joi.string()
      .valid("ADMIN", "MANAGER", "TEAM_LEAD", "EMPLOYEE")
      .required()
      .messages({
        "any.only": "Role must be ADMIN, MANAGER, TEAM_LEAD or EMPLOYEE.",
        "any.required": "Role is required.",
      }),

    designation: Joi.string().trim().min(2).max(100).required().messages({
      "string.empty": "Designation is required.",
    }),

    phoneNumber: Joi.string()
      .trim()
      .pattern(/^[6-9]\d{9}$/)
      .required()
      .messages({
        "string.pattern.base": "Please enter a valid 10-digit mobile number.",
      }),

    profileImage: Joi.string().uri().optional().allow(null, "").messages({
      "string.uri": "Profile image must be a valid URL.",
    }),
  }),
});
