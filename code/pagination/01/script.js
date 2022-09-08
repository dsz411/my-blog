let item = 0;

let prev = document.querySelector(".pagination .prev");
let next = document.querySelector(".pagination .next");

next.onclick = function () {
  item = item + 1;

  if (item < 6) {
    document.querySelector(".item" + (item - 1)).classList.remove("active");
    document.querySelector(".item" + item).classList.add("active");
  } else {
    item = 0;

    document.querySelector(".item5").classList.remove("active");
    document.querySelector(".item" + item).classList.add("active");
  }
};

prev.onclick = function () {
  item = item - 1;

  if (item >= 0) {
    document.querySelector(".item" + (item + 1)).classList.remove("active");
    document.querySelector(".item" + item).classList.add("active");
  } else {
    item = 5;

    document.querySelector(".item0").classList.remove("active");
    document.querySelector(".item" + item).classList.add("active");
  }
};
