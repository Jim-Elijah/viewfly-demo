
import { useSignal, useEffect } from '@viewfly/core'

const infos = [
    `一方面类似Vue3的watch，可以监听一个或多个值`,
    `另一方面类似React的useEffect，可以返回一个函数用于清理工作`,
    `但是viewfly只能监听signal，没有immediate、deep等，返回了一个unlisten函数`,
]

const count1 = useSignal(10)
const count2 = useSignal(20)

useEffect(count1, (newValue, oldValue) => {
    console.log(`count1 changed, newVlaue is ${newValue}, oldValue is ${oldValue}`)
})

useEffect([count1, count2], (newValues, oldValues) => {
    console.log(`count1 or count2 changed, newVlaues is ${newValues}, oldValues is ${oldValues}`)
})

useEffect(() => {
    return count1() + count2()
}, (newValue, oldValue) => {
    console.log(`sum changed, newVlaues is ${newValue}, oldValues is ${oldValue}`)
})

const unlisten = useEffect(count2, (newValue, oldValue) => {
    const timerId = setTimeout(() => {
        console.log(`count2 changed, newVlaue is ${newValue}, oldValue is ${oldValue}`)
    }, 0);
    return () => {
        console.log('clear timerId');
        timerId && clearTimeout(timerId)
    }
})

setTimeout(() => {
    console.log('unlisten');
    unlisten()
}, 10 * 1000);

const update = (key) => {
    // key是signal
    key.set(key() + 1);
};

export default function Component() {
    return () => {
        return <>
            <ul style="padding-left: 0.2rem;">
                {
                    infos.map(item => <li>{item}</li>)
                }
            </ul>
            <div style="display: flex; align-items: center;">
                <div>count1: {count1()}</div>
                <button style="margin: 6px;" onClick={() => update(count1)}>count1++</button>
            </div>
            <div style="display: flex; align-items: center;">
                <div>count2: {count2()}</div>
                <button style="margin: 6px;" onClick={() => update(count2)}>count2++</button>
            </div>
        </>
    }
}