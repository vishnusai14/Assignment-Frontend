import React from "react";
import { TextField, Box, Button } from "@mui/material";
import axiosInstace from "../service/axiosInstance";

class FormInput extends React.Component {
  state = {
    name: "",
    phoneNumber: "",
    email: "",
    hobbies: "",
    isNameError: false,
    isPhoneNumberError: false,
    isEmailError: false,
    isHobbiesError: false,
    isTotalValid: false,
  };

  componentDidMount = () => {
    if (this.props.isUpdating) {
      this.setState((prevState) => ({
        ...prevState,
        name: this.props.name,
        email: this.props.email,
        hobbies: this.props.hobbies,
        phoneNumber: this.props.phoneNumber,
      }));
    }
  };

  validateEmail = (elementValue) => {
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(elementValue);
  };

  nameChange = (newName) => {
    if (newName.target.value.length >= 4) {
      this.setState((prevState) => ({
        ...prevState,
        name: newName.target.value,
        isNameError: false,
      }));
    } else {
      this.setState((prevState) => ({
        ...prevState,
        name: newName.target.value,
        isNameError: true,
      }));
    }
  };

  emailChange = (newEmail) => {
    let isEmailValidate = this.validateEmail(newEmail.target.value);
    this.setState((prevState) => ({
      ...prevState,
      email: newEmail.target.value,
      isEmailError: !isEmailValidate,
    }));
  };

  phoneNumberChange = (newPhoneNumber) => {
    if (newPhoneNumber.target.value.length === 10) {
      this.setState((prevState) => ({
        ...prevState,
        phoneNumber: newPhoneNumber.target.value,
        isPhoneNumberError: false,
      }));
    } else {
      this.setState((prevState) => ({
        ...prevState,
        phoneNumber: newPhoneNumber.target.value,
        isPhoneNumberError: true,
      }));
    }
  };

  hobbiesChange = (newHobbies) => {
    if (newHobbies.target.value.length >= 4) {
      this.setState((prevState) => ({
        ...prevState,
        hobbies: newHobbies.target.value,
        isHobbiesError: false,
      }));
    } else {
      this.setState((prevState) => ({
        ...prevState,
        hobbies: newHobbies.target.value,
        isHobbiesError: true,
      }));
    }
  };

  updateUser = () => {
    if (
      this.state.isEmailError ||
      this.state.isHobbiesError ||
      this.state.isNameError ||
      this.state.isPhoneNumberError
    ) {
      alert("Please Enter all the field correctly");
    } else {
      if (
        this.state.email !== "" &&
        this.state.hobbies !== "" &&
        this.state.phoneNumber !== "" &&
        this.state.hobbies !== ""
      ) {
        this.props.startLoading();
        let userData = {
          id: this.props.id,
          name: this.state.name,
          email: this.state.email,
          hobbies: this.state.hobbies,
          phoneNumber: this.state.phoneNumber,
        };
        axiosInstace
          .post("/user/updateUser", userData)
          .then((res) => {
            this.props.getLatestData();
          })
          .catch((err) => {
            this.props.stopLoading();
            alert("Error Adding the user.. Please Try Again");
          });
      } else {
        alert("Please Enter all the field correctly");
      }
    }
  };

  saveUser = () => {
    if (
      this.state.isEmailError ||
      this.state.isHobbiesError ||
      this.state.isNameError ||
      this.state.isPhoneNumberError
    ) {
      alert("Please Enter all the field correctly");
    } else {
      if (
        this.state.email !== "" &&
        this.state.name !== "" &&
        this.state.phoneNumber !== "" &&
        this.state.hobbies !== ""
      ) {
        this.props.startLoading();
        let userData = {
          name: this.state.name,
          email: this.state.email,
          hobbies: this.state.hobbies,
          phoneNumber: this.state.phoneNumber,
        };
        axiosInstace
          .post("/user/addUser", userData)
          .then((res) => {
            this.props.getLatestData();
          })
          .catch((err) => {
            this.props.stopLoading();
            alert("Error Adding the user.. Please Try Again");
          });
      } else {
        alert("Please Enter all the field correctly");
      }
    }
  };

  render() {
    return (
      <>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              value={this.state.name}
              error={this.state.isNameError}
              id="outlined-name"
              label="Name"
              helperText={this.state.isNameError && "Please Enter Valid Name"}
              onChange={this.nameChange}
            />
            <TextField
              value={this.state.email}
              error={this.state.isEmailError}
              id="outlined-email"
              label="Email"
              helperText={this.state.isEmailError && "Please Enter Valid Email"}
              onChange={this.emailChange}
            />
          </div>
          <div>
            <TextField
              value={this.state.phoneNumber}
              error={this.state.isPhoneNumberError}
              id="outlined-number"
              label="Number"
              type="number"
              helperText={
                this.state.isPhoneNumberError &&
                "Please Enter Valid Phone Number"
              }
              onChange={this.phoneNumberChange}
            />
            <TextField
              value={this.state.hobbies}
              error={this.state.isHobbiesError}
              id="outlined-hobbies"
              label="Hobbies"
              helperText={
                this.state.isHobbiesError && "Please Enter Valid Hobbies"
              }
              onChange={this.hobbiesChange}
            />
          </div>
        </Box>

        <Button
          onClick={this.props.isUpdating ? this.updateUser : this.saveUser}
        >
          {this.props.isUpdating ? "Update" : "Save"}
        </Button>
      </>
    );
  }
}

export default FormInput;
