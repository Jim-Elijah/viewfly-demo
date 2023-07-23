import { createApp } from '@viewfly/platform-browser'
import { useSignal } from '@viewfly/core'
import Tabs from './components/Tabs';
import StartUp from './01-startup';
import Basic from './02-basic';
import Lifecycle from './03-lifecycle';
import { tabItemList, tabPostionList } from './constant';
import "./index.less"

const activeKey = tabItemList[0].key

const mapKey2Component = {
  StartUp,
  Basic,
  Lifecycle,
}

const tabItems = tabItemList.map(item => ({
  ...item,
  children: mapKey2Component[item.key]
}))

const onTabChange = (key) => {
  console.log('tab change', key);
}

const onTabClick = (key, e) => {
  console.log('tab click', key, e);
}

function App() {
  const tabPosition = useSignal(tabPostionList[1])
  const setTabPosition = (e) => {
    console.log('setTabPosition', e.target.id);
    tabPosition.set(e.target.id)
  }
  return () => {
    return <>
      <div class="viewfly-header header">This is a demo for learning viewfly</div>
      <div class="tab-position-selector"> tabPosition:
        {
          tabPostionList.map(item => <span class={{ 'selected': tabPosition() === item }} key={item} id={item} onClick={setTabPosition}>{item}</span>)
        }
      </div>
      <main>
        <Tabs items={tabItems} defaultActiveKey={activeKey} tabPosition={tabPosition()} onChange={onTabChange} onTabClick={onTabClick}></Tabs>
      </main>
      <div class="viewfly-footer">
        <div class="copyright">Copyright@{new Date().getFullYear()}
          <a href="https://github.com/Jim-Elijah/viewfly-demo">
            <img src="https://cdn.icon-icons.com/icons2/509/PNG/96/Github_icon-icons.com_49946.png" />
          </a>
        </div>
      </div>
    </>
  }
}

const app = createApp(document.getElementById('app'), <App />)
console.log('app', app);