import { useState, useContext } from "react";
// import "../App.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { TextField, Button, InputAdornment, List, } from "@mui/material";
import LabelModalList from "./LabelModalListItem";
import Modal from "@mui/material/Modal";
import { LabelModal, SnackText } from "../contexts/HomeContext";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
import axios from "axios";
import { LabelContext } from "../contexts/LabelContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function AddLabelModal() {
  const { modalOpen, setModalOpen } = useContext(LabelModal);
  const { dispatchSnack } = useContext(SnackText);
  const [labelKey, setLabelKey] = useState("");
  const { labels, setLabels } = useContext(LabelContext);
  const handleClose = () => setModalOpen(false);
  const addLabel = (labelKey) => {
    axios.post("https://keeper-backend-psi.vercel.app/newLabel", { key: labelKey }, {
      headers: { Authorization: localStorage.getItem("token") },
    })
      .then((res) => {
        console.log(res);
        setLabels([...res.data.data])
        dispatchSnack({ type: "OPEN_SUCCESS_SNACK" });
      })
      .catch(() => {
        dispatchSnack({ type: "OPEN_ERROR_SNACK" });
      });
  };
  const editLabel = (oldKey, newKey) => {
    axios.patch("https://keeper-backend-psi.vercel.app/editLabel", { oldKey, newKey }, {
      headers: { Authorization: localStorage.getItem("token") },
    })
      .then((res) => {
        console.log(res);
        setLabels([...res.data.data])
        dispatchSnack({ type: "OPEN_SUCCESS_SNACK" });
      })
      .catch(() => {
        dispatchSnack({ type: "OPEN_ERROR_SNACK" });
      });
  };
  function deleteLabel(labelid){
        axios.delete(`https://keeper-backend-psi.vercel.app/deleteLabel?id=${labelid}`, {
          headers: { Authorization: localStorage.getItem("token") }}).then((response)=>{
            console.log(response)
            setLabels([...response.data.data])
          dispatchSnack({ type: "OPEN_SUCCESS_SNACK" });
          }
            
          ).catch((error)=>{console.log(error)
          dispatchSnack({ type: "OPEN_ERROR_SNACK" });})
    }
  return (
    <div>
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="subtitle1" component="h2">
            Edit labels
          </Typography>
          <TextField
            value={labelKey}
            onChange={(e) => setLabelKey(e.target.value)}
            variant="standard"
            placeholder="Create new Label"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AddIcon></AddIcon>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Button color="success" onClick={() => {
                    setLabelKey("")
                    addLabel(labelKey)}}>
                    <DoneIcon></DoneIcon>
                  </Button>
                </InputAdornment>
              ),
            }}
          />
          <Box style={{ width: "100%", alignSelf: "center", maxHeight: "250px", overflowX: "hidden", overflowY: "scroll" }} id="labelModalList">
            <List>
              {labels.map((label, index) => {
                return (
                  <LabelModalList key={label._id} label={label} index={index} editLabel={editLabel}
                  deleteLabel={deleteLabel}></LabelModalList>
                )
              })}
            </List>

          </Box>
          <Button
            type="submit"
            variant="text"
            onClick={handleClose}
            size="small"
            style={{ right: "0", position: "absolute", bottom: "0" }}
            color="success"
          >
            Done
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
