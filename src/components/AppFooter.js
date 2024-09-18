import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <a href="/" target="_blank" rel="noopener noreferrer">
          PayPilot
        </a>
        <span className="ms-1">&copy; 2024</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Squad 6</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
