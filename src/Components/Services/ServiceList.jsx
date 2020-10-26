import React, { useState, useEffect } from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Table, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { setCurrentUser } from "../../Redux/User/user-actions";

const ServiceList = ({ setShow, setData }) => {
  useEffect(() => {
    fetch("https://crm-server-app.herokuapp.com/service", {
      method: "GET",
      headers: {
        auth: localStorage.getItem("crmApplication"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.message === "success") {
          console.log(data);
          setService(data.service);
        } else {
          setCurrentUser(null);
        }
      })
      .catch((err) => {
        setLoading(false);
        setAlert({
          display: true,
          message: "Something went wrong try again later",
        });
      });
  }, []);
  const [services, setService] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ display: false, message: "" });

  if (loading)
    return (
      <>
        <Skeleton variant="rect" height={"50px"} />
        <Skeleton variant="rect" height={"50px"} />
        <Skeleton variant="rect" height={"50px"} />{" "}
      </>
    );
  else
    return (
      <>
        {alert.display ? (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {alert.message}
            <strong> - check it out!</strong>
          </Alert>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Customer contact</th>
                <th>Description</th>
                <th>Status</th>
                <th>Created By</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service._id}>
                  <td>{service.email}</td>
                  <td>{service.description}</td>
                  <td>{service.status}</td>
                  <td>{service.createdBy.name}</td>
                  <td>
                    <Button
                      onClick={() => {
                        setShow("flex");
                        setData({
                          _id: service._id,
                          email: service.email,
                          description: service.description,
                          status: service.status,
                        });
                      }}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </>
    );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ServiceList);
