/**
 * Defines a schema for validating and setting default values for environment variables
 * related to application configuration, such as NODE_ENV, PORT, DIGILOCKER_BASE_URL,
 * DIGILOCKER_CLIENT_ID, DIGILOCKER_SECRET, DIGILOCKER_REDIRECT_URL, and GOOGLE_CLIENT_ID.
 *
 * Uses Joi for schema validation and default values assignment.
 */
import * as Joi from 'joi';
export default () => ({
  NODE_ENV: Joi.string().valid('development', 'production', 'test', 'provision').default('development').required(),
  PORT: Joi.number().port().default(4000).required(),
  DIGILOCKER_BASE_URL: Joi.string().required(),
  DIGILOCKER_CLIENT_ID: Joi.string().required(),
  DIGILOCKER_SECRET: Joi.string().required(),
  DIGILOCKER_REDIRECT_URL: Joi.string().default('https://www.google.com/').required(),
  GOOGLE_CLIENT_ID: Joi.string().required(),
});
