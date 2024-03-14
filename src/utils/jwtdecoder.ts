import { Logger } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import { keys } from '../common/constants/output-keys';
import { IBasicUserDetails } from 'src/digilocker/interface/user-details.interface';

/**
 * Utility class for decoding JWT tokens and filtering the decoded data based on specified keys.
 */
export class JwtDecoder {
  private readonly logger = new Logger(JwtDecoder.name);
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
      const data = this.filterKeys(decoded, keys);
      return data;
    } catch (error) {
      // If an error occurs during decoding, return null or handle the error as needed
      this.logger.error('Error decoding JWT token:', error);
      return null;
    }
  }

  /**
   * Filters an object based on specified keys.
   * @param obj The object to filter.
   * @param keys The keys to include in the filtered object.
   * @returns The filtered object containing only the specified keys.
   */
  private filterKeys(obj: any, keys: string[]): any {
    return keys.reduce((acc, key) => {
      if (obj.hasOwnProperty(key)) {
        acc[key] = obj[key];
      }

      return acc;
    }, {});
  }
}
