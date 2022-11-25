const chunk = (array: Array<any>, size?: number) => {
  if (size) {
    if (size >= array.length) {
      return [...array];
    } else {
      let resultArr: Array<Array<any>> = [];

      while (array.length > size) {
        resultArr.push(array.splice(0, size));
      }

      resultArr.push(array);

      return resultArr;
    }
  } else {
    return [...array];
  }
}

export default chunk;

// console.log(chunk(['a', 'b', 'c', 'd'], 2));
// console.log(chunk(['a', 'b', 'c', 'd'], 3));
// console.log(chunk(['a', 'b', 'c', 'd']));
// console.log(chunk(['a', 'b', 'c', 'd'], 6));