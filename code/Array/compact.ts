const compact = ( array: Array<any> ) => {
  let resultArr: Array<any> = [];

  for (const i of array) {
    if (i) {
      resultArr.push(i)
    }
  }

  return resultArr;
}

export default compact;

// console.log(compact([0, 1, false, 2, '', 3]));