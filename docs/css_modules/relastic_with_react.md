---
sidebar_position: 6
---

# CSS Modules 结合 React 实践

在 `className` 处直接使用 css 中 `class` 名即可

```css
/* dialog.css */
.root {}
.confirm {}
.disabledConfirm {}
```

```jsx
import classNames from 'classnames';
import styles from './dialog.css';
 
export default class Dialog extends React.Component {
  render() {
    const cx = classNames({
      [styles.confirm]: !this.state.disabled,
      [styles.disabledConfirm]: this.state.disabled
    });
 
    return <div className={styles.root}>
      <a className={cx}>Confirm</a>
      ...
    </div>
  }
}
```

注意，一般把组件最外层节点对应的 class 名称为 `root`。这里使用了 [classnames](https://www.npmjs.com/package/classnames) 库来操作 class 名

如果你不想频繁的输入 `styles.**`，可以试一下 [react-css-modules](https://github.com/gajus/react-css-modules)，它通过高阶函数的形式来避免重复输入 `styles.**`