import { Button } from '@mui/material'

const CommonButton = ({children,variant,onClick,startIcon,endIcon,style,type}) => {
  return (
    <Button
    variant={variant}
    onClick={onClick}
    startIcon={startIcon}
    endIcon={endIcon}
    type={type}
    sx={{
        width: 300,
        color: 'blue',
      }}
      style={style}
    >
        {children}
    </Button>
  )
}

export default CommonButton