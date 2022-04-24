import React from 'react'
import { Link } from 'react-router-dom'

export default function LinkButton({ path, children }) {
    return <Link className="primary-btn" to={path}>
      {children}  
    </Link>
}