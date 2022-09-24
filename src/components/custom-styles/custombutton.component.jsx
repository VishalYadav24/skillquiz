import { Button } from '@mui/material'

const CommonButton = ({children,variant,onClick,startIcon,endIcon,style}) => {
  return (
    <Button
    variant={variant}
    onClick={onClick}
    startIcon={startIcon}
    endIcon={endIcon}
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