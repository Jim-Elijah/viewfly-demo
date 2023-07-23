import { useSignal } from '@viewfly/core'

const infos = [
    `和React基本一样, 包括父子组件通信方式、props、children`,
    `需要注意的是, 当把props解构时, 根据解构的位置不同，很可能会丢失响应式`
]
const child1Title = `child1没有解构props, 可以响应式更新`
const child2Title = `child2在渲染函数中解构props, 可以响应式更新`
const child3Title = `child3在组件主体中解构props, 无法响应式更新`
const child4Title = `child4在组件参数中解构props, 无法响应式更新`

const codeSnippets = [
    `function Child1(props) {
        return () => {
            console.log('child1 render', props, props.age);
            return <>
                <p>{child1Title}</p>
                <span>name: {props.name} age: {props.age}</span>
                <hr />
            </>
        }
    }`,
    `function Child2(props) {
        return () => {
            const { name, age } = props;
            console.log('child2 render', props, props.age);
            return <>
                <p>{child2Title}</p>
                <span>name: {name} age: {age}</span>
                <hr />
            </>
        }
    }`,
    `function Child3(props) {
        const { name, age } = props;
        return () => {
            console.log('child3 render', props, props.age);
            return <>
                <p>{child3Title}</p>
                <span>name: {name} age: {age}</span>
                <hr />
            </>
        }
    }`,
    `function Child4({ name, age }) {
        return () => {
            console.log('child4 render', age);
            return <>
                <p>{child4Title}</p>
                <span>name: {name} age: {age}</span>
            </>
        }
    }`,
]

// 没有解构props, age会更新
function Child1(props) {
    return () => {
        console.log('child1 render', props, props.age);
        return <>
            <p>{child1Title}</p>
            <span>name: {props.name} age: {props.age}</span>
            <hr />
        </>
    }
}
// 在渲染函数中解构props，age会更新
function Child2(props) {
    return () => {
        const { name, age } = props;
        console.log('child2 render', props, props.age);
        return <>
            <p>{child2Title}</p>
            <span>name: {name} age: {age}</span>
            <hr />
        </>
    }
}

// 在组件主体中解构props，age不会更新
function Child3(props) {
    const { name, age } = props;
    return () => {
        console.log('child3 render', props, props.age);
        return <>
            <p>{child3Title}</p>
            <span>name: {name} age: {age}</span>
            <hr />
        </>
    }
}
// 在组件参数中解构props, age不会更新
function Child4({ name, age }) {
    return () => {
        console.log('child4 render', age);
        return <>
            <p>{child4Title}</p>
            <span>name: {name} age: {age}</span>
        </>
    }
}

export default function Component() {
    const user = useSignal({
        name: 'jim',
        age: 20,
    })
    const update = () => {
        const tmp = user();
        user.set({
            ...tmp,
            age: tmp.age + 1,
        })
    }
    return () => {
        return (
            <>
                <ul style="padding-left: 0.2rem;">
                    {
                        infos.map(item => <li>{item}</li>)
                    }
                </ul>
                <button style="margin: 6px;" onClick={update}>
                    age++
                </button>
                <Child1 {...user()}></Child1>
                <Child2 {...user()}></Child2>
                <Child3 {...user()}></Child3>
                <Child4 {...user()}></Child4>
                <div class="code-snippets">
                    {
                        codeSnippets.map(item => <pre><code>{item}</code></pre>)
                    }
                </div>
            </>
        )
    }
}