/**
 * Retrieves configuration parameters from environment variables and returns an object containing
 * various configuration options such as port,node_env, DigiLocker and Google OAuth
 * client information.
 *
 * @returns Configuration object with environment-based settings.
 */

export default () => ({
  port: parseInt(process.env.PORT, 10) || 5000,
  node_env: process.env.NODE_ENV || 'development',
  digilocker_base_url: process.env.DIGILOCKER_BASE_URL,
  digilocker_client_id: process.env.DIGILOCKER_CLIENT_ID,
  digilocker_secret: process.env.DIGILOCKER_SECRET,
  digilocker_redirect_url: process.env.DIGILOCKER_REDIRECT_URL,
  google_client_id: process.env.GOOGLE_CLIENT_ID,
});
