import { Logger } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import { keys } from '../common/constants/output-keys';
import { IBasicUserDetails } from 'src/digilocker/interface/user-details.interface';
import { KeyFilteration } from './keyfilteration';

/**
 * Utility class for decoding JWT tokens and filtering the decoded data based on specified keys.
 */
export class JwtDecoder {
  private readonly logger = new Logger(JwtDecoder.name);
  private filterKeys = new KeyFilteration();
  /**
   * Decodes the provided JWT token and filters the decoded data based on specified keys.
   * @param token The JWT token to decode.
   * @returns The decoded user details filtered based on specified keys.
   */
  decodeToken(token: string): IBasicUserDetails {
    try {
      // Decode the token
      const decoded = jwt.decode(token);
      // Filter the decoded data based on specified keys
      const data = this.filterKeys.filterKeys(decoded, keys);
      return data;
    } catch (error) {
      // If an error occurs during decoding, return null or handle the error as needed
      this.logger.error('Error decoding JWT token:', error);
      return null;
    }
  }
}
