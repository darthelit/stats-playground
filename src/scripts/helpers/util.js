const util ={
  valueIsTruePrimitive(obj) {
    return (typeof obj === 'string') || (typeof obj === 'number') || (typeof obj === 'boolean') || obj instanceof Date;
  },
  isEmpty(obj) {
    if ((obj === null) || (obj === undefined)) {
      return true;
    } else if (typeof obj === 'function') {
      return false;
    } else if (Array.isArray(obj) || (typeof obj === 'string')) {
      return obj.length === 0;
    } else if (!this.valueIsTruePrimitive(obj)) {
      return Object.keys(obj).length === 0;
    } else if (this.valueIsTruePrimitive(obj)) {
      return false;
    }
    return true;
  }
};

export default util;