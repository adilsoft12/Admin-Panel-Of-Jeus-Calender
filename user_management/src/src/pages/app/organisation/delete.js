import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function DeleteButton(props) {
  const { onClick, handleClickOpen, handleClose, open, id } = props

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button> */}
      <Button
        variant="contained"
        color="dark"
        sx={{
          backgroundColor: 'lightgreen',
          borderColor: 'green',
        }}
        onClick={() => {
          handleClickOpen()
        }}
      >
        Delete
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{'Employelist'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            You want to Delete.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            style={{
              // backgroundColor: "#49ff3c"
              color: '#000000',
            }}
            onClick={handleClose}
          >
            Disagree
          </Button>
          <Button
            color="primary"
            style={{
              // backgroundColor: "#49ff3c"
              color: '#000000',
            }}
            onClick={() => onClick(id)}
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}