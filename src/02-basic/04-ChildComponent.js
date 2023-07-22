import { useSignal } from '@viewfly/core'

const title = `child component demo`
const childTitle = `没有解构props, 可以响应式更新`
const child1Title = `解构props后无法响应式更新`

function Child(props) {
    return () => {
        console.log('child render', props);
        return <div>
            <h3>{childTitle}</h3>
            <span>name: {props.name} age: {props.age}</span>
        </div>
    }
}
function Child1(props) {
    const { name, age } = props; 
    return () => {
        console.log('child1 render', props, name, age);
        return <div>
            <h3>{child1Title}</h3>
            <span>name: {name} age: {age}</span>
        </div>
    }
}

export default function Component() {
    console.log('Component');
    const user = useSignal({
        name: 'jim',
        age: 20,
    })
    return () => {
        console.log('Component render', user());
        return (
            <div>
                <p>{title}</p>
                <button style="margin: 6px;" onClick={() => {
                    const tmp = user();
                    user.set({
                        ...tmp,
                        age: tmp.age + 1,
                    })
                }}>
                    age++
                </button>
                <Child {...user()}></Child>
                <Child1 {...user()}></Child1>
            </div>
        )
    }
}