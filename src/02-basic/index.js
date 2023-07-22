import Tabs from '../components/Tabs';
import Component from './01-Component';
import Reactivity from './02-Reactivity'
import ChildComponent from "./04-ChildComponent";
import UseEffect from './05-useEffect'
import UseRef from './06-useRef'
import { basicTabItemList } from '../constant'

const mapKey2Component = {
    Component,
    Reactivity,
    ChildComponent,
    UseEffect,
    UseRef,
    "Other": <h2>Other</h2>
}

const tabItems = basicTabItemList.map(item => ({
    ...item,
    children: mapKey2Component[item.key]
}))

export default function Basic() {
    return () => {
        return <>
            <Tabs items={tabItems}></Tabs>
        </>
    }
}