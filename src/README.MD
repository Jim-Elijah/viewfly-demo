## 组件
组件是一个函数，函数的返回值称为渲染函数，函数体其他部分称为组件主体。
其中，组件主体只会执行一次，直至销毁，而渲染函数则会随着数据的更改，执行多次。
```jsx
import { useSignal } from '@viewfly/core'

const initialName = 'jim'
const count = useSignal(0)
const name = useSignal(initialName)

let repeatCount = 0;
const threshold = 5;
// 每隔一秒，在name后面拼接repeatCount，指导repeatCount超过threshold
// 虽然name改变，但不会重新render，因为没在渲染内容中使用
const timerId = setInterval(() => {
    if (repeatCount++ < threshold) {
        name.set(initialName + repeatCount)
        console.log('name', name())
    } else {
        timerId && clearInterval(timerId)
    }
}, 1 * 1000);

export default function App() {
    // 组件主体
    console.log('App body')
    // 渲染函数, 相当于react的render
    return () => {
        // 渲染内容改变，render函数就会执行
        console.log('App render')
        // 返回值是渲染的内容
        return <>
            <div>{count()}</div>
            <button onClick={() => {
                count.set(count() + 1)
            }}>+1</button>
        </>
    }
}
```

## 响应式
Viewfly 的更新本质是采用 === 运算符判断 signal.set() 传入的值和原来的值是否相等，如果不相等则触发更新
```jsx
const user = useSignal({
  name: 'Jack',
  age: 23
})

function App() {
  function update() {
    const data = user()
    user.set({
        ...data, // 这样写不会更新？？？
    //   name: 'Bob',
    //   age: 35
    })
  }
  return () => {
    const data = user()
    return <>
      <div>username: {data.name}</div>
      <div>age: {data.age}</div>
      <button onClick={update}>click me</button>
    </>
  }
}
```
Viewfly 采用依赖收集的方式实现组件更新（Proxy，类似Vue3），Viewfly 会在调用渲染函数时记录渲染内容使用到的 Siganl，当这些 Signal 数据产生变化时，则会触发组件重新渲染。需要注意的是，==组件的渲染是异步的==，所以当你改变了某一个 Signal 的值时，并不能立即获取到最新的渲染结果。


## 子组件
和React基本一样，父组件传prop给子组件，子组件在props拿到父组件传下来的所有prop。children
需要注意的是，==当我们把 props 解构后，将只能拿到初始的值，丢失响应式==

## 数据共享
React Hook有很多限制，而 Signal 没有 Hook 规则和闭包陷阱，可以用于 Hook 里面和外面，多个组件共享数据就不需要传prop，也不要状态管理库。

## useEffect
一方面类似Vue3的watch，可以监听一个或多个值；另一方面类似React的useEffect，可以返回一个函数用于清理工作。
但是viewfly只能监听signal，没有immediate、deep等，返回了一个unlisten函数

## useRef
Viewfly 中同一个 Ref 对象，可以绑定到多个 DOM 节点上。虚拟 DOM 节点的 ref 属性还可以绑定一组 Ref 对象。