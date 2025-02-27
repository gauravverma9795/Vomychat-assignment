const Joi = require('joi');

class ValidationSchemas {
  // User registration validation
  registerSchema = Joi.object({
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),

    email: Joi.string()
      .email()
      .required(),

    password: Joi.string()
      .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'))
      .required()
      .messages({
        'string.pattern.base': 'Password must contain at least one uppercase, one lowercase, one number, and one special character'
      }),

    referralCode: Joi.string().optional()
  });

  // Login validation schema
  loginSchema = Joi.object({
    email: Joi.string()
      .email()
      .required(),

    password: Joi.string()
      .required()
  });

  // Password reset validation
  passwordResetSchema = Joi.object({
    token: Joi.string().required(),
    newPassword: Joi.string()
      .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'))
      .required()
      .messages({
        'string.pattern.base': 'Password must contain at least one uppercase, one lowercase, one number, and one special character'
      })
  });

  // Validate registration data
  validateRegistration(data) {
    return this.registerSchema.validate(data);
  }

  // Validate login data
  validateLogin(data) {
    return this.loginSchema.validate(data);
  }

  // Validate password reset
  validatePasswordReset(data) {
    return this.passwordResetSchema.validate(data);
  }
}

module.exports = new ValidationSchemas();