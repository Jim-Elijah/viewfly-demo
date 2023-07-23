import { useRef } from '@viewfly/core'

const infos = [
    `Viewfly 中同一个 Ref 对象，可以绑定到多个 DOM 节点上`,
    `虚拟 DOM 节点的 ref 属性还可以绑定一组 Ref 对象`,
    `组件除了返回渲染函数外，还可以返回一个对象，该对象至少包含$render方法($render就是渲染函数)`,
    `父组件可以通过useRef获取到子组件返回的对象，并可访问对象上的属性和方法。`,
]
const codeSnippets = [
    `<div ref={[nodeRef1, nodeRef2]}>我绑定了多个ref, 点我</div>`,
    `<div ref={nodeRef1}>我绑定了一个ref, 点我</div>`,
    `<Child1 ref={childRef}></Child1>`,
    `<Child2 ref={childRef}></Child2>`,
    `function Child1() {
        return {
            show() {
                alert('我是child1的show方法')
            },
            $render() {
                return (
                    <div>我是返回包含渲染函数和其他方法的组件Child1, show方法在我渲染2s后执行</div>
                )
            }
        }
    }`,
    `function Child2() {
        return () => {
            return <div>
                我是普通的组件child2
            </div>
        }
    }`,
]

const nodeRef1 = useRef(nativeNode => {
    console.log('nativeNode', nativeNode)
    const fn = (e) => {
        alert(`${e.target.innerHTML}`);
    }
    nativeNode.style = "cursor: pointer;"
    nativeNode.addEventListener('click', fn)
    return () => {
        nativeNode.removeEventListener('click', fn)
    }
})

console.log('nodeRef1', nodeRef1);

const nodeRef2 = useRef(node => {
    console.log('node', node);
})
console.log('nodeRef2', nodeRef2);


function Child1() {
    return {
        show() {
            alert('我是child1的show方法')
        },
        $render() {
            return (
                <div>我是返回包含渲染函数和其他方法的组件Child1, show方法在我渲染2s后执行</div>
            )
        }
    }
}

const childRef = useRef(childInstance => {
    console.log('childInstance', childInstance);
    if (typeof childInstance.show === 'function') {
        setTimeout(() => {
            childInstance.show()
        }, 2 * 1000);
    }
})

function Child2() {
    return () => {
        return <div>
            我是普通的组件child2
        </div>
    }
}

export default function App() {
    return () => {
        return (
            <>
                <ul style="padding-left: 0.2rem;">
                    {
                        infos.map(item => <li>{item}</li>)
                    }
                </ul>
                <hr />
                <div ref={[nodeRef1, nodeRef2]}>我绑定了多个ref, 点我</div>
                <div ref={nodeRef1}>我绑定了一个ref, 点我</div>
                <Child1 ref={childRef}></Child1>
                <Child2 ref={childRef}></Child2>
                <div class="code-snippets">
                    {
                        codeSnippets.map(item => <pre><code>{item}</code></pre>)
                    }
                </div>
            </>
        )
    }
}