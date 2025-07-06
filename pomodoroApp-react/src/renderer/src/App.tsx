import Versions from './components/Versions'
import Counter from './components/Counter'
import { useState } from 'react'

function App(): React.JSX.Element {
  const [focused, setFocused] = useState(true)
  return (
    <>
      <Counter />
      <Versions></Versions>
    </>
  )
}

export default App
