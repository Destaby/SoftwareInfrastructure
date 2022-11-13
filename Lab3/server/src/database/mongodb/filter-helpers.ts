import { FilterQuery } from 'mongoose';
import { DocumentType } from '@typegoose/typegoose';
import { IFilter } from './storage-interfaces';
import { escapeRegExp, merge } from 'lodash';

/**
 * "And" composition (value should be an array of objects).
 */
function toAndQuery(value: any) {
  if (!Array.isArray(value)) {
    throw new Error(`Expected array as argument of 'AND', got ${typeof value}`);
  }
  return {
    $and: value.map((obj: any) =>
      Object.entries(obj)
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        .map(([k, v]) => toQuery(k, v))
        .reduce((acc, query) => ({ ...acc, ...query }), {})
    ),
  };
}

/**
 * Check if every property array item is contained in the filter array.
 */
function toArrayEveryQuery(key: string, value: any) {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error(`The _every filter needs to be a non-empty array: ${key}`);
  }
  return {
    [key]: { $all: value },
  };
}

/**
 * Check if at least one property array item is contained in the filter array.
 */
function toArraySomeQuery(key: string, value: any) {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error(`The _some filter needs to be a non-empty array: ${key}`);
  }
  return {
    $or: value.map((item) => ({ [key]: { $eq: item } })),
  };
}

/**
 * Match property exactly, or if it is an array, match all property items with all filter items.
 */
function toEqualityQuery(key: string, value: any) {
  return {
    [key]: value,
  };
}

/**
 * Check if property is contained in array.
 */
function toInQuery(key: string, value: any) {
  return {
    [key]: { $in: value },
  };
}

/**
 * Check if property is not contained in array.
 */
function toNotInQuery(key: string, value: any) {
  return {
    [key]: { $nin: value },
  };
}

/**
 * Check if value is a substring of a property (case-insensitive).
 */
function toMatchesQuery(key: string, value: string) {
  return {
    [key]: { $regex: new RegExp(escapeRegExp(value), 'i') },
  };
}

/**
 * Allows to unsafely match for regex strings. Left here in case we ever need it
 */
function toMatchesUnsafeQuery(key: string, value: string) {
  return {
    [key]: { $regex: new RegExp(value, 'i') },
  };
}

/**
 * "Or" composition (value should be an array of objects).
 */
function toOrQuery(value: any) {
  if (!Array.isArray(value)) {
    throw new Error(`Expected array as argument of 'OR', got ${typeof value}`);
  }
  return {
    $or: value.map((obj: any) =>
      Object.entries(obj)
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        .map(([k, v]) => toQuery(k, v))
        .reduce((acc, query) => ({ ...acc, ...query }), {})
    ),
  };
}

/**
 * Check if key is larger or equal to value, and if a[key] is falsy then fallback to false.
 */
function toFromQuery(key: string, value: any) {
  return {
    [key]: { $gt: value },
  };
}

/**
 * Check if key is lower or equal to value,  and if a[key] is falsy then fallback to false.
 */
function toToQuery(key: string, value: any) {
  return {
    [key]: { $lt: value },
  };
}

/**
 * Check if key contains any non-nil value
 */

function toExistsNotNullableQuery(key: string, value: any) {
  if (typeof value !== 'boolean') {
    throw new Error(`Expected value to be a boolean, but received value of type ${typeof value}`);
  }

  return {
    [key]: { $exists: value, $ne: null },
  };
}

/**
 * Check if key exists
 */

function toExistsQuery(key: string, value: any) {
  return {
    [key]: { $exists: value },
  };
}

function toQuery(key: string, value: any): FilterQuery<any> {
  const adjustedKey = key
    .replace(/__/gm, '.')
    .replace(/^id((?=_)|$)/, '_id')
    .replace(/\.id((?=_)|$)/, '._id');
  if (key.endsWith('_every')) {
    return toArrayEveryQuery(adjustedKey.replace(/_every$/, ''), value);
  }
  if (key.endsWith('_some')) {
    return toArraySomeQuery(adjustedKey.replace(/_some$/, ''), value);
  }
  if (key.endsWith('_not_in')) {
    return toNotInQuery(adjustedKey.replace(/_not_in$/, ''), value);
  }
  if (key.endsWith('_in')) {
    return toInQuery(adjustedKey.replace(/_in$/, ''), value);
  }
  if (key.endsWith('_matches')) {
    return toMatchesQuery(adjustedKey.replace(/_matches$/, ''), value);
  }
  if (key.endsWith('_matches_unsafe')) {
    return toMatchesUnsafeQuery(adjustedKey.replace(/_matches$/, ''), value);
  }
  if (key.endsWith('_from')) {
    return toFromQuery(adjustedKey.replace(/_from$/, ''), value);
  }
  if (key.endsWith('_to')) {
    return toToQuery(adjustedKey.replace(/_to$/, ''), value);
  }
  if (key.endsWith('_exists')) {
    return toExistsQuery(adjustedKey.replace(/_exists$/, ''), value);
  }
  if (key.endsWith('_exists_not_nullable')) {
    return toExistsNotNullableQuery(adjustedKey.replace(/_exists_not_nullable$/, ''), value);
  }
  if (key === 'AND') {
    return toAndQuery(value);
  }
  if (key === 'OR') {
    return toOrQuery(value);
  }
  if (!key.includes('_') || adjustedKey.includes('.')) {
    return toEqualityQuery(adjustedKey, value);
  }
  throw new Error(`Filter ${key} not implemented`);
}

export function getQueryFromFilter<T>(filter: IFilter<T>): FilterQuery<DocumentType<T>> {
  return Object.entries(filter)
    .map(([k, v]) => toQuery(k, v))
    .reduce((acc, query) => merge(acc, query), {});
}
