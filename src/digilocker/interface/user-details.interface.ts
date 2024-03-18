/**
 * DTO (Data Transfer Object) representing user information from Digilocker.
 * This class encapsulates the relevant user details obtained from Digilocker API response.
 */
export class IBasicUserDetails {
  given_name: string; // The given name of the user
  preferred_username: string; // The preferred username of the user
  email: string; // The email address of the user
  birthdate: string; // The birthdate of the user
  phone_number: string; // The phone number of the user
  user_sso_id: string; // The user's single sign-on ID
  pan_number: string; // The PAN number of the user
  driving_licence: string; // The driving licence number of the user
  masked_aadhaar: string; // The masked Aadhaar number of the user
  digilockerid?: string; // The Digilocker ID of the user
  verified?: boolean | false; // Whether the user is verified
}
