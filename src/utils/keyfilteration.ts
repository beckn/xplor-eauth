export class KeyFilteration {
  /**
   * Filters an object based on specified keys.
   * @param obj The object to filter.
   * @param keys The keys to include in the filtered object.
   * @returns The filtered object containing only the specified keys.
   */
  filterKeys(obj: any, keys: string[]): any {
    return keys.reduce((acc, key) => {
      if (obj.hasOwnProperty(key)) {
        acc[key] = obj[key];
      }

      return acc;
    }, {});
  }
}
