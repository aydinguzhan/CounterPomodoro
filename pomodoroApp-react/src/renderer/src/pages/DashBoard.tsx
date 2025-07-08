import { usePage } from '@renderer/hooks/usePage'
import { PageRoute } from '@renderer/utils/enums'
import React from 'react'

type Props = {}

export default function DashBoard({}: Props) {
  const { setPage } = usePage()

  return (
    <div>
      DashBoard
      <button className="history-button" onClick={() => setPage(PageRoute.MAIN)}>
        Geri
      </button>
    </div>
  )
}
