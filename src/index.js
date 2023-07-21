import { createApp } from '@viewfly/platform-browser'
import StartUp from './01-startup';
import Basic from './02-basic';

function App() {
  console.log('App mounted');
  return () => {
    console.log('App render');
    return <>
      <StartUp></StartUp>
      <Basic></Basic>
    </>
  }
}

const app = createApp(document.getElementById('app'), <App />)
console.log('app', app);