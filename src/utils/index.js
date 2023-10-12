export function camelToHyphen(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/([A-Z])([A-Z])([a-z])/g, '$1-$2$3')
      .toLowerCase();
  }