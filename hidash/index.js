module.exports = {
  forEach (arr, fn) {
    // for (let i = 0; i < arr.length; i++) {
    //   const value = arr[i];
    //   fn(value, i);
    // }

    for (let index in arr) {
      fn(arr[index], index);
    }
  },

  map (arr, fn) {
    const result = [];
    for (let index in arr) {
      result[index] = fn(arr[index], index);
    }
    return result;
  }
};
