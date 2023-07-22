import { useRef } from '@viewfly/core'

const nodeRef = useRef(nativeNode => {
    console.log('nativeNode', nativeNode)
    const fn = (e) => {
        console.log('clicked', e.target.innerHTML);
    }

    nativeNode.addEventListener('click', fn)

    return () => {
        nativeNode.removeEventListener('click', fn)
    }
})

console.log('nodeRef', nodeRef);

const nodeRef2 = useRef(node => {
    console.log('node', node);
})
console.log('nodeRef2', nodeRef2);


function Child() {
    return {
        show() {
            console.log('method show called!')
        },
        $render() {
            return (
                <div>child</div>
            )
        }
    }
}

const childRef = useRef(childInstance => {
    console.log('childInstance', childInstance);
    // childInstance.show()
})

function Child2() {
    return () => {
        return <div>
            child2
        </div>
    }
}

export default function App() {
    return () => {
        return (
            <>
                <div ref={[nodeRef, nodeRef2]}>useRef demo</div>
                <div ref={nodeRef}>hhh</div>
                <Child ref={childRef}></Child>
                <Child2 ref={childRef}></Child2>
            </>
        )
    }
}