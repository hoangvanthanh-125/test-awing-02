// Find Index Array By Key
export function findIndexByKey<T>(array: T[], key: keyof T, value: any): number {
    return array.findIndex((element) => element[key] === value);
  }
  // Find Item Array By Key
  export function findItemByKey<T>(
    array: T[],
    key: keyof T,
    value: any
  ): T | undefined {
    return array.find((element) => element[key] === value);
  }