let page = 1,
  limit = 5;
let filter = document.querySelector("#filter");
let postsContainer = document.querySelector(".postsContainer");
let loading = document.querySelector(".loader");
let container = document.querySelector(".container");

async function getPosts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );
  const data = await res.json();
  return data;
}

async function showPosts() {
  const posts = await getPosts();

  posts.forEach((post) => {
    const postEl = document.createElement("div");
    postEl.classList.add("post");
    postEl.innerHTML = `
          <div class='number'>${post.id}</div>
          <div class='postInfo'>
            <h2 class='postTitle'>${post.title}</h2>
            <p class='postBody'>${post.body}</p>
          </div>
        `;

    postsContainer.appendChild(postEl);
  });

  container.addEventListener("scroll", processWindowScroll, false);
}

async function showLoading() {
  container.removeEventListener("scroll", processWindowScroll, false);

  loading.classList.add("show");

  await showPosts();
  page++;

  filterProcess();

  loading.classList.remove("show");
}

showLoading();

/** Don't use document.querySelector('body').onscroll */
container.addEventListener("scroll", processWindowScroll, false);

function processWindowScroll() {
  const { scrollTop, scrollHeight, clientHeight } = container;
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
  }
}

filter.addEventListener("input", filterPosts, false);

function filterPosts() {
  filterProcess();
}

function filterProcess() {
  const term = filter.value.toUpperCase();
  if (term) {
    const posts = document.querySelectorAll(".post");
    posts.forEach((post) => {
      const title = post.querySelector(".postTitle").innerText.toUpperCase();
      const body = post.querySelector(".postBody").innerText.toUpperCase();

      if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
        post.style.display = "flex";
      } else {
        post.style.display = "none";
      }
    });
  } else {
    // ...
  }
}
