let prev = document.querySelector(".pagination .prev");
let next = document.querySelector(".pagination .next");
let pages = document.querySelectorAll(".pageNum");
let postsContainer = document.querySelector(".posts");

const data = {
  posts: [],
  pageNum: 1,
};

const dataProxy = new Proxy(data, {
  set(target, property, value) {
    if (property === "pageNum") {
      Reflect.set(...arguments);
      return updateActive(value);
    } else if (property === "posts") {
      Reflect.set(...arguments);
      return updatePosts(value);
    }
  },
  get(target, property) {
    return Reflect.get(...arguments);
  },
});

const getPosts = async function (pageNum) {
  const res = await (
    await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${pageNum}`
    )
  ).json();

  dataProxy.posts = res;
};

const updateActive = (pageNum) => {
  pages.forEach((_, key) => {
    if (key + 1 === pageNum) {
      _.classList.add("active");
    } else {
      _.classList.remove("active");
    }
  });
};

const updatePosts = (posts) => {
  postsContainer.innerHTML = ``;

  let postFragment = document.createDocumentFragment();

  for (let post of posts) {
    let postHTML = `
      <div class='number'>${post.id}</div>
      <div class='postInfo'>
        <h2 class='postTitle'>${post.title}</h2>
        <p class='postBody'>${post.body}</p>
      </div>`;
    let postContainer = document.createElement("div");
    postContainer.classList.add("post");
    postContainer.innerHTML = postHTML;
    postFragment.appendChild(postContainer);
  }

  postsContainer.appendChild(postFragment);
};

pages.forEach((page, key) => {
  page.addEventListener("click", () => {
    dataProxy.pageNum = key + 1;
    getPosts(dataProxy.pageNum);
  });
});

next.onclick = function () {
  dataProxy.pageNum++;

  if (dataProxy.pageNum <= 6) {
    updateActive(dataProxy.pageNum);
  } else {
    dataProxy.pageNum = 1;
    updateActive(dataProxy.pageNum);
  }

  getPosts(dataProxy.pageNum);
};

prev.onclick = function () {
  dataProxy.pageNum--;

  if (dataProxy.pageNum >= 1) {
    updateActive(dataProxy.pageNum);
  } else {
    dataProxy.pageNum = 6;
    updateActive(dataProxy.pageNum);
  }

  getPosts(dataProxy.pageNum);
};

getPosts(dataProxy.pageNum);
