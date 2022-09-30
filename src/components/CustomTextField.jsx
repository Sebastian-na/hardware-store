import React from 'react'
import { TextField } from '@mui/material'

function CustomTextField(props) {
  return (
    <TextField
      {...props}
      InputProps={{ style: { fontSize: 16 } }}
      InputLabelProps={{ style: { fontSize: 16 } }}
    />
  )
}

export default CustomTextField
