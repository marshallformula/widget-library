import React from 'react'

const displayStyle= {
  width: '400px',
  backgroundColor: '#fff',
  padding: '1em',
  boxShadow: '0px 0px 8px 1px rgba(140,137,140,1)'
}

export default ({ children }) =>
  <div style={displayStyle}>{children}</div>
