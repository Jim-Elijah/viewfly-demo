import { useSignal } from '@viewfly/core'

const title = `child component demo`

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
            <p>{title}</p>
            <div>{count()}</div>
            <button onClick={() => {
                count.set(count() + 1)
            }}>+1</button>
        </>
    }
}