export const isInt = (value) =>
  !isNaN(value) &&
  !isNaN(parseInt(value, 10)) &&
  parseInt(Number(value)) == value;

export const zip = (a, b) =>
  Array.from(Array(Math.max(b.length, a.length)), (_, i) => [a[i], b[i]]);

export const isSubArray = (parent, sub) =>
  parent.join(",").includes(sub.join(","));

export const isRepeatableKey = (key) =>
  isInt(key) || ["+", "-", "√"].includes(key);

export const hasUnrepeatedKeyClash = (keys) =>
  zip(keys.slice(1), keys.slice(0, -1)).reduce(
    (arr, i) => arr || (!isRepeatableKey(i[0]) && !isRepeatableKey(i[1])),
    false
  );
