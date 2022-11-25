function co(fun) {
  var f = fun();

  function handle(res) {
    if (res.done) return; // 再无 yield
    res.value.then((data) => {
      data.json().then((text) => console.log(text));
      handle(f.next());
    });
  }

  handle(f.next());
}

/********************************************
 * TEST                                     *
 ********************************************/

function* fun() {
  yield fetch("./test1.json");
  yield fetch("./test2.json");
  yield fetch("./test3.json");
}

co(fun);
