import { CircularProgress } from '@mui/material'
import React, { Fragment } from 'react'

const Loader = ({variant,value,sx}) => {
  return (
    <Fragment>
       <CircularProgress variant={variant} value={value} sx={sx}/>
    </Fragment>
  )
}

export default Loader