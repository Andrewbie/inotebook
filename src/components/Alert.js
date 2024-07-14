import React from 'react'

const Alert = (props) => {
  return (
    <>
    <div className={`alert alert-${props.type} d-flex align-items-center`} role="alert">   
      <div>
        {props.message}
      </div>
    </div>
    </>
  )
}

export default Alert