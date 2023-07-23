import { useSignal } from '@viewfly/core'

const info = `welcome to Jim-Elijah's viewfly-demo.`
export default function StartUp() {
    const count = useSignal(0)
    return () => {
        return (
            <>
                <p>{info}</p>
                <div style="display: flex; align-items: center;">
                    <span>count: {count()}</span>
                    <button style="margin: 6px;" onClick={() => {
                        count.set(count() + 1)
                    }}>
                        count++
                    </button>
                </div>
            </>
        )
    }
}