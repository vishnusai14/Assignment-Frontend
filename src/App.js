import "./App.css";
import Table from "./Components/Table";
import Form from "./Components/Form";
import { CircularProgress } from "@mui/material";
import React from "react";
import axiosInstace from "./service/axiosInstance";

class App extends React.Component {
  state = {
    isLoading: false,
    data: [],
  };

  getLatestData = () => {
    this.setState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));
    axiosInstace
      .get("/user/getUsers")
      .then((res) => {
        console.log(res);
        this.setState((prevState) => ({
          ...prevState,
          isLoading: false,
          data: res.data.data.map((d) => {
            return {
              ...d,
              id: d._id,
            };
          }),
        }));
      })
      .catch((err) => {
        this.setState((prevState) => ({
          ...prevState,
          isLoading: false,
        }));
        console.log(err);
      });
  };

  startLoading = () => {
    this.setState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));
  };

  stopLoading = () => {
    this.setState((prevState) => ({
      ...prevState,
      isLoading: false,
    }));
  };

  componentDidMount = () => {
    this.getLatestData();
  };

  render() {
    return (
      <div className="App">
        {this.state.isLoading ? (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <CircularProgress />
            </div>
          </>
        ) : (
          <>
            <Table
              data={this.state.data}
              getLatestData={this.getLatestData}
              startLoading={this.startLoading}
              stopLoading={this.stopLoading}
            />
            <Form
              getLatestData={this.getLatestData}
              startLoading={this.startLoading}
              stopLoading={this.stopLoading}
            />
          </>
        )}
      </div>
    );
  }
}

export default App;
