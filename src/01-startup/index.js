import { useSignal } from '@viewfly/core'

const title = `startup demo`
export default function StartUp() {
    console.log('StartUp');
    const number = useSignal(0)
    return () => {
        console.log('render');
        return (
            <div>
                <p>{title}</p>
                <span>{number()}</span>
                <button style="margin: 6px;" onClick={() => {
                    number.set(number() + 1)
                }}>
                    +1
                </button>
            </div>
        )
    }
}