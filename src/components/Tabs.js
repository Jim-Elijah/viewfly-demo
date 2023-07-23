import { useSignal, onPropsChanged } from '@viewfly/core'
import { tabPostionList } from '../constant'
import "./tabs.less"
/**
 * 
 * @param {object} props 
 * props.items []
 * props.defaultActiveKey string
 * props.onChange function
 * props.onTabClick function
 * props.tabPosition top | left | right | bottom
 * @returns 
 */

export default function Tabs(props) {
    const defaultActiveKey = props.defaultActiveKey || props.items[0]?.key
    const defaultTabPosition = tabPostionList.find(item => item === props.tabPosition) || tabPostionList[0];
    const activeKey = useSignal(defaultActiveKey)
    const tabPosition = useSignal(defaultTabPosition)

    const setActiveKey = (e) => {
        const { id } = e.target || {}
        console.log('id', id);
        if (id !== activeKey()) {
            activeKey.set(id)
            if (typeof props.onChange === 'function') {
                props.onChange(id)
            }
        }
        if (typeof props.onTabClick === 'function') {
            props.onTabClick(id, e)
        }
    }

    onPropsChanged((newProps, oldProps) => {
        console.log('tabs onPropsChanged', newProps, oldProps);
        tabPosition.set(props.tabPosition)
    })
    console.log('Tabs props', props);
    return () => {
        const Child = props.items.find(item => item.key === activeKey())?.children || ''
        console.log('Child', Child);
        const tabsNav = <div class="viwefly-tabs-nav">
            {
                props.items.map(item =>
                    <div class={["viewfly-tabs-tab", { 'viewfly-tabs-tab-active': item.key === activeKey() }]} key={item.key} id={item.key} onClick={setActiveKey} >{item.label}</div>
                )
            }
        </div>
        const tabsContent = <div class="viewfly-tabs-content">
            {typeof Child === 'function' ? <Child></Child> : Child}
        </div>
        return <div class={["viewfly-tabs", `viewfly-tabs-${tabPosition()}`]}>
            {
                tabPostionList.slice(0, 2).includes(tabPosition()) ? <>
                    {tabsNav}{tabsContent}
                </> : <>
                    {tabsContent}{tabsNav}
                </>
            }
        </div>
    }
}

