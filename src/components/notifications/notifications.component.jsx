import { Alert, Snackbar } from '@mui/material'
import React from 'react'

const Notifications = ({notification,type,showNotification}) => {
    console.log("noti")
  return (
    <div>

    <Snackbar open={showNotification} message="Helllo" anchorOrigin={{horizontal:"right",vertical:"top"}}>
        <Alert severity={notification?.type}>
        {notification?.message}
    </Alert>
    </Snackbar>
    
    </div>
  )
}

export default Notifications