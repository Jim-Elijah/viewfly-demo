import { onMounted, onUpdated, onPropsChanged, onDestroy } from '@viewfly/core'

const title = `lifecycle demo`

export default function Lifecycle() {
    onMounted(() => {
        // 组件挂载后调用
        console.log('onMounted');
        return () => {
            // 组件销毁时调用
            console.log('onMounted');
        }
    })

    onUpdated(() => {
        // 组件每一次渲染完成时调用
        console.log('onMounted');

        return () => {
            // 组件下一次渲染完成时调用
            console.log('onMounted')

        }
    })

    onPropsChanged((newProps, oldProps) => {
        // 组件每一次渲染完成时调用
        console.log('onMounted');

        return () => {
            // 组件下一次渲染完成时调用
            console.log('onMounted');
        }
    })

    onDestroy(() => {
        // 组件销毁时调用
        console.log('onMounted');
    })

    return () => <>
        <p>{title}</p>
    </>
}