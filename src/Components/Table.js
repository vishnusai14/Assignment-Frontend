import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Modal, Box, Typography } from "@mui/material";
import FormInput from "./FormInput";
import axiosInstace from "../service/axiosInstance";

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

class Table extends React.Component {
  state = {
    isOpen: false,
    name: "",
    email: "",
    phoneNumber: "",
    hobbies: "",
    id: "",
    selectedRow: [],
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

  columns = [
    { field: "id", headerName: "ID", width: 300 },
    { field: "name", headerName: "Name", width: 200 },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      type: "number",
      width: 200,
    },
    { field: "email", headerName: "Email", width: 250 },
    { field: "hobbies", headerName: "Hobbies", width: 200 },

    {
      width: 150,
      field: "update",
      headerName: "Update Detail",
      renderCell: (params) => (
        <Button
          onClick={() => {
            this.updateUser(params);
          }}
          variant="contained"
        >
          Update
        </Button>
      ),
    },
    {
      width: 150,
      field: "delete",
      headerName: "Delete User",
      renderCell: (params) => (
        <Button
          onClick={() => {
            this.deleteUser(params);
          }}
          variant="contained"
        >
          Delete
        </Button>
      ),
    },
  ];

  deleteUser = (param) => {
    this.props.startLoading();
    let userData = {
      id: param.row.id,
    };
    axiosInstace
      .delete("/user/deleteUser", userData)
      .then((res) => {
        this.props.getLatestData();
      })
      .catch((err) => {
        this.props.stopLoading();
        alert("User Caanot be Deleted");
      });
  };

  updateUser = (param) => {
    this.setState((prevState) => ({
      ...prevState,
      isOpen: true,
      name: param.row.name,
      email: param.row.email,
      phoneNumber: param.row.phoneNumber,
      hobbies: param.row.hobbies,
      id: param.row._id,
    }));
  };

  sendEmail = () => {
    this.props.startLoading();
    let selectedRowSet = new Set(this.state.selectedRow);
    let selectedRowData = this.props.data.filter((d) =>
      selectedRowSet.has(d.id)
    );
    let userData = {
      users: selectedRowData,
    };
    axiosInstace
      .post("/user/sendEmail", userData)
      .then((res) => {
        this.props.stopLoading();
        alert("Data has been mailed succesfully");
      })
      .catch((err) => {
        this.props.stopLoading();
        alert("Problem in sending the mail");
      });
    console.log(selectedRowData);
  };

  render() {
    return (
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={this.props.data}
          columns={this.columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          onSelectionModelChange={(newSelection) => {
            this.setState((prevState) => ({
              ...prevState,
              selectedRow: newSelection,
            }));
          }}
        />
        <Modal
          open={this.state.isOpen}
          onClose={this.closeModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Update the User
            </Typography>
            <FormInput
              getLatestData={this.props.getLatestData}
              startLoading={this.props.startLoading}
              stopLoading={this.props.stopLoading}
              isUpdating={true}
              name={this.state.name}
              email={this.state.email}
              phoneNumber={this.state.phoneNumber}
              hobbies={this.state.hobbies}
              id={this.state.id}
            />
          </Box>
        </Modal>
        <Button
          onClick={this.sendEmail}
          variant="contained"
          style={{ margin: "10px" }}
          disabled={this.state.selectedRow.length === 0 ? true : false}
        >
          Send Selected to Mail
        </Button>
      </div>
    );
  }
}

export default Table;
