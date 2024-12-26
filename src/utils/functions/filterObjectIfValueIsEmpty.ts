const isEmptyObject = (obj: object): boolean => {
  return Object.keys(obj).length === 0
}

const filterObjectIfValueIsEmpty = <T extends Record<string, any>>(
  obj: T,
): Partial<T & object> => {
  const result: Partial<T[Extract<keyof T, string>] & object> = {}
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key]
      if (
        value !== undefined &&
        value !== null &&
        value !== '{}' &&
        value !== '' &&
        !((value as any) instanceof File) &&
        !(Array.isArray(value) && value.length === 0)
      ) {
        if (
          typeof value === 'object' &&
          !Array.isArray(value) &&
          !((value as any) instanceof File)
        ) {
          const filteredValue = filterObjectIfValueIsEmpty(value)
          if (!isEmptyObject(filteredValue)) {
            result[key] = filteredValue
          }
        } else {
          result[key] = value
        }
      } else if ((value as any) instanceof File) {
        result[key] = value
      }
    }
  }
  return result
}

export default filterObjectIfValueIsEmpty
