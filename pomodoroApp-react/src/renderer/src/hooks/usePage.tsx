import { PageRoute } from '@renderer/utils/enums'
import React, { createContext, useContext, useState } from 'react'

interface PageContextType {
  page: PageRoute
  setPage: (p: PageRoute) => void
}

const PageContext = createContext<PageContextType | undefined>(undefined)

export const PageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [page, setPage] = useState<PageRoute>(PageRoute.MAIN)

  return <PageContext.Provider value={{ page, setPage }}>{children}</PageContext.Provider>
}

export const usePage = () => {
  const ctx = useContext(PageContext)
  if (!ctx) throw new Error('usePage must be used within a PageProvider')
  return ctx
}
