import React, { ReactNode } from 'react'

import './Layout.scss'

const Layout = ({ children }: { children: ReactNode }) => {
  return <div className="container">{children}</div>
}

export default Layout
