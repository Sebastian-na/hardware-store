import React from 'react'
import { CircularProgress } from '@mui/material'

function Loader() {
  return (
    <CircularProgress
      size={100}
      thickness={5}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -50,
        marginLeft: -50,
      }}
    />
  )
}

export default Loader
