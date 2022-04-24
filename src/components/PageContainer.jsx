import React from 'react'
import '../styles/global.css'
import '../styles/bottom-tab.css'

export default function PageContainer({children}) {
  return <div className="container-page">{children}</div>
}