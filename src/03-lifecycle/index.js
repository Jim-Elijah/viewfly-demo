import { useSignal, onMounted, onUpdated, onPropsChanged, onDestroy } from '@viewfly/core'

const title = `lifecycle demo`

function Child() {
    onMounted(() => {
        // 组件挂载后调用
        console.log('called when mounted');
        return () => {
            // 组件销毁时调用
            console.log('called when unmounted');
        }
    })

    onUpdated(() => {
        // 组件每一次渲染完成时调用
        console.log('called when updated');
        return () => {
            // 组件下一次渲染完成时调用
            console.log('called when next mounted');
        }
    })

    onPropsChanged((newProps, oldProps) => {
        // 组件每一次渲染完成时调用
        console.log('onPropsChanged', newProps, oldProps);
        // console.log('called when updated');

        return () => {
            // 组件下一次渲染完成时调用
            console.log('onPropsChanged1', newProps, oldProps);
        }
    })

    onDestroy(() => {
        // 组件销毁时调用
        console.log('called when destroyed');
    })

    return () => {
        return <>
            <div>我是Child</div>
            <div style="display: flex; align-items: center;">
                <span>count: {count()}</span>
                <button style="margin: 6px;" onClick={() => {
                    count.set(count() + 1)
                }}>
                    count++
                </button>
            </div>
        </>
    }
}

const count = useSignal(0)
const showChild = useSignal(true)

export default function Lifecycle() {
    const toggleShow = () => {
        showChild.set(!showChild())
    }
    return () => <>
        <p>{title}</p>
        <div style="display: flex; align-items: center;">
            <div>showChild: {showChild()}</div>
            <button style="margin: 6px;" onClick={toggleShow}>toggle</button>
        </div>
        {showChild() ? <Child count={count()}></Child> : ''}
    </>
}