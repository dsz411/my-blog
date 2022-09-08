class Waterfull {
  constructor(options) {
    this.$el = null; // 父容器
    this.count = 3; // 列数
    this.gap = 20; // 间距
    this.width = 0; // 列的宽度
    this.items = []; // 子元素集合
    this.H = []; // 存储每列的高度方便计算
    // this.flag = null; // 虚拟节点集合
    Object.assign(this, options);

    this.init();
  }

  init() {
    this.items = Array.from(this.$el.children);
    // this.flag = new DocumentFragment();
    this.$el.style.position = "relative";
    // this.$el.innerHTML = "";

    this.render();

    window.addEventListener("resize", this.render.bind(this));
  }

  render() {
    this.width =
      (this.$el.clientWidth - (this.count - 1) * this.gap) / this.count;
    this.H = new Array(this.count).fill(0);

    const { width, items, H, gap } = this;

    items.forEach((item) => {
      item.style.width = `${width}px`;
      item.style.position = `absolute`;
      let placedPos = H.indexOf(Math.min(...H));
      item.style.left = `${placedPos * (width + gap)}px`;
      item.style.top = `${H[placedPos]}px`;
      H[placedPos] += item.clientHeight + gap;
      // this.flag.appendChild(item);
    });

    this.$el.style.height = `${Math.max(...H)}px`;
  }
}

new Waterfull({ $el: document.querySelector(".wrapper") });