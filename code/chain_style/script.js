let styleProxy = {
  get: (object, property) => {
    return (value) => {
      if (value) {
        object[property] = value;
        return new Proxy(object, styleProxy);
      }
      return object[property];
    }
  }
}

let style = (selector) => {
  let element = document.querySelector(selector);

  return new Proxy(element.style, styleProxy);
}

