import { PageProvider, usePage } from './hooks/usePage'
import PageRouter from './pages/PageRouter'

function App(): React.JSX.Element {
  return (
    <PageProvider>
      <PageRouter />
    </PageProvider>
  )
}

export default App
