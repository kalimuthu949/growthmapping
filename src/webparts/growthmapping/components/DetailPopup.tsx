import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import DetailTable from "./DetailTable";
import Typography from "@material-ui/core/Typography";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();
  return;
  // return {
  //   top: `${top}%`,
  //   left: `${left}%`,
  //   transform: `translate(-${top}%, -${left}%)`,
  // };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    minHeight: "10vh",
    maxHeight: "90vh",
    maxWidth: "70vw",
    overflow: "auto",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function DetailPopup(props) {
  console.log(props);
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const handleClose = () => {
    props.closeclick();
  };
  const body = (
    <div className={classes.paper}>
      <Typography className="modalHeader">
        {props.Department} Growth Map
      </Typography>
      <Typography className="modalHeader">
        {props.itemdetails.length>0?props.itemdetails[0].Position:""}
      </Typography>
      <DetailTable itemdetails={props.itemdetails} />
      <div className="modalBtnSection">
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );

  return (
    <div>
      <Modal
        className="DepartmentModal"
        open={props.modal}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
