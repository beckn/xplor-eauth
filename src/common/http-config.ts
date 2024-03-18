/**
 * Class responsible for configuring HTTP requests.
 */
export class HttpConfig {
  /**
   * Returns the HTTP headers for form URL-encoded data.
   * @returns An object containing HTTP headers for form URL-encoded data.
   */
  formUrlEncodedData(): { headers: { 'Content-Type': string } } {
    return {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
  }

  /**
   * Returns the HTTP headers for refreshing access token data.
   * @param client_id The client ID used for authentication.
   * @param client_secret The client secret used for authentication.
   * @returns An object containing HTTP headers for refreshing access token data.
   */
  RefreshAcessTokenData(
    client_id?: string,
    client_secret?: string,
  ): { headers: { Authorization: string; 'Content-Type': string } } {
    // Encode client credentials to base64
    const credentials = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

    return {
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
  }
}
