import React from 'react'

interface Props {
    children : React.ReactNode
}

const callLayout = ({children} : Props) => {
  return (
    <div className='h-screen bg-black'>
      {children}
    </div>
  )
}

export default callLayout
