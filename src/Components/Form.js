import React from "react";
import { Button, Modal, Box, Typography } from "@mui/material";
import FormInput from "./FormInput";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

class Form extends React.Component {
  state = {
    isOpen: false,
  };

  openModal = () => {
    this.setState((prevState) => ({
      ...prevState,
      isOpen: true,
    }));
  };

  closeModal = () => {
    this.setState((prevState) => ({
      ...prevState,
      isOpen: false,
    }));
  };

  render() {
    return (
      <>
        <div style={{ padding: "10px" }}>
          <Button
            onClick={this.openModal}
            style={{ marginTop: "60px" }}
            variant="contained"
          >
            Add
          </Button>
        </div>

        <Modal
          open={this.state.isOpen}
          onClose={this.closeModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add a New User
            </Typography>
            <FormInput
              getLatestData={this.props.getLatestData}
              startLoading={this.props.startLoading}
              stopLoading={this.props.stopLoading}
              isUpdating={false}
            />
          </Box>
        </Modal>
      </>
    );
  }
}

export default Form;
