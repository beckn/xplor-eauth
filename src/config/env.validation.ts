/**
 * Defines a schema for validating and setting default values for environment variables
 * related to application configuration, such as NODE_ENV, PORT, DIGILOCKER_BASE_URL,
 * DIGILOCKER_CLIENT_ID, DIGILOCKER_SECRET, DIGILOCKER_REDIRECT_URL, and GOOGLE_CLIENT_ID.
 *
 * Uses Joi for schema validation and default values assignment.
 */
import * as Joi from 'joi';
export default () => ({
  NODE_ENV: Joi.string().valid('development', 'production', 'test', 'provision').default('development'),
  PORT: Joi.number().port().default(3000),
  DIGILOCKER_BASE_URL: Joi.string(),
  DIGILOCKER_CLIENT_ID: Joi.string(),
  DIGILOCKER_SECRET: Joi.string(),
  DIGILOCKER_REDIRECT_URL: Joi.string().default('https://www.google.com/'),
  GOOGLE_CLIENT_ID: Joi.string(),
});
