import { useSignal } from '@viewfly/core'

const infos = [
    `组件是一个函数，函数的返回值称为渲染函数，函数体其他部分称为组件主体`,
    `组件主体只会执行一次，直至销毁，而渲染函数则会随着数据的更改，执行多次`,
    `该组件声明了两个signal——count和name, 渲染内容只用到count, name的改变不会导致再次执行渲染函数`,
    `部分代码如下`,
]
const codeSnippets = [
    `const initialName = 'jim'`,
    `const count = useSignal(0)`,
    `const name = useSignal(initialName)`,
    `\n`,
    `<div>count: {count()}</div>`
]
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

const updateCount = () => {
    count.set(count() + 1)
}
export default function Component() {
    // 组件主体
    console.log('Component body')
    // 渲染函数, 相当于react的render
    return () => {
        // 渲染内容改变，render函数就会执行
        console.log('Component render')
        // 返回值是渲染的内容
        return <>
            <ul style="padding-left: 0.2rem;">
                {
                    infos.map(item => <li>{item}</li>)
                }
            </ul>
            <div class="code-snippets">
                {
                    codeSnippets.map(item => <pre><code>{item}</code></pre>)
                }
            </div>
            <div style="display: flex; align-items: center;">
                <div>count: {count()}</div>
                <button style="margin: 6px;" onClick={updateCount}>+1</button>
            </div>
        </>
    }
}