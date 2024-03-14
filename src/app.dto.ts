/**
 * Represents the structure of a provider object, typically used for storing information about various authentication providers.
 */
export interface ProviderDto {
  code: string;
  iconLink: string;
  title: string;
  subTitle: string;
  redirectUrl: string;
}

/**
 * Represents the structure of a health check response object, typically used for reporting the health status of a microservice.
 */
export interface HealthCheckDto {
  status: string;
  version: string;
  serverMessage: string;
}
