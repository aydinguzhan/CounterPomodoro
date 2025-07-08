import { usePage } from '../hooks/usePage'
import Main from './Main'
import DashBoard from './DashBoard'
import { PageRoute } from '@renderer/utils/enums'

export default function PageRouter() {
  const { page } = usePage()

  return (
    <>
      {page === PageRoute.MAIN && <Main />}
      {page === PageRoute.DASHBOARD && <DashBoard />}
    </>
  )
}
