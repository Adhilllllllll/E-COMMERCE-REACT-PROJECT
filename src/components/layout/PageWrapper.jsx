import React from 'react'
import { Children } from 'react'

const PageWrapper = ({children}) => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        {children}

    </div>
  )
}

export default PageWrapper