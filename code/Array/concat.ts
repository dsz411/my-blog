const concat = (array: Array<any>, ...values: Array<any>) => {
  let copyArr = [...array];

  if (values.length > 0) {
    for (const i of values) {
      if (Array.isArray(i)) {
        if (i.some((_) => Array.isArray(_))) {
          copyArr.push(i.flat());
        } else {
          i.forEach((_) => copyArr.push(_));
        }
      } else {
        copyArr.push(i);
      }
    }

    return copyArr;
  } else {
    return copyArr;
  }
};

export default concat;

// var array = [1];
// var other = concat(array, 2, [3], [[4]]);
// console.log(other);
// console.log(array);
