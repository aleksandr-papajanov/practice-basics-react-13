import '../css/App.css'
import type { DataProvider } from '../DataProvider'
import { MediaPlayer } from './MediaPlayer'

interface AppProps {
  dataProvider: DataProvider
}

function App(props: AppProps) {
  return (
    <>
      <MediaPlayer dataProvider={props.dataProvider} />
    </>
  )
}

export default App
