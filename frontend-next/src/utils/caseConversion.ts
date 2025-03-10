export function snakeToCamel<T>(obj: any): T {
  if (Array.isArray(obj)) {
    return obj.map(v => snakeToCamel<T>(v)) as unknown as T;
  } else if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [key.replace(/_([a-z])/g, g => g[1].toUpperCase())]: snakeToCamel<T>(obj[key])
      }),
      {}
    ) as T;
  }
  return obj;
} 