
import { useSignal, useEffect } from '@viewfly/core'

const title = `useEffect demo`;

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
            <p>{title}</p>
            <div>count1: {count1()} count2: {count2()}</div>
            <button style="margin: 6px;" onClick={() => update(count1)}>
                count1++
            </button>
            <button style="margin: 6px;" onClick={() => update(count2)}>
                count2++
            </button>
        </>
    }
}