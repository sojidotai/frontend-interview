import _ from "lodash";

type AnyObject = Record<string, any>;

export const convertObjectKeys = (
  obj: AnyObject,
  converter: (key: string) => string,
): AnyObject => {
  if (_.isArray(obj)) {
    return obj.map((v) => convertObjectKeys(v, converter));
  } else if (_.isObject(obj) && !_.isFunction(obj)) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [converter(key)]: convertObjectKeys(obj[key], converter),
      }),
      {},
    );
  }
  return obj;
};

export const toSnakeCase = (obj: AnyObject): AnyObject => {
  return convertObjectKeys(obj, _.snakeCase);
};

export function toCamelCase<Type>(obj: AnyObject): Type {
  return convertObjectKeys(obj, _.camelCase) as Type;
}

export function convertToCamelCase(str: string): string {
  if (!str) return str

  const words = str
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .split(" ")
    .filter(Boolean)

  if (words.length === 0) return ""

  const firstWord = words[0].toLowerCase()

  const remainingWords = words.slice(1).map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())

  return firstWord + remainingWords.join("")
}
