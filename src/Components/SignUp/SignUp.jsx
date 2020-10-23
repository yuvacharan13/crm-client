import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Alert } from "@material-ui/lab";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
  const history = useHistory();

  const { register, handleSubmit } = useForm();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    access: "",
  });

  const handleClick = () => {
    history.push("/signin");
  };

  const onSubmit = async (data) => {
    setLoading(true);
    console.log(data);
    try {
      var user = await fetch("https://crm-server-app.herokuapp.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => res.json());
      console.log(user);
      if (user.message === "success") {
        console.log(user.message);
        setTimeout(() => history.push("/signin"), 600);
      } else {
        console.log(user.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    display: false,
    message: "",
    severity: "error",
  });

  return (
    <div>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-5 mx-auto">
            <h1 className="heading">CRM</h1>
            <p className="para">CRM application</p>
          </div>
          <div className="shadow p-3 mb-5 bg-white col-md-5 mx-auto">
            <div>
              <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group align-items-center justify-content-center">
                    <input
                      className="form-control input-style"
                      name="name"
                      type="text"
                      ref={register}
                      placeholder="Enter your name"
                      required
                    />
                    <input
                      className="form-control input-style"
                      name="email"
                      type="email"
                      ref={register}
                      placeholder="Enter email address"
                      required
                    />
                    <input
                      className="form-control input-style"
                      name="password"
                      type="password"
                      ref={register}
                      placeholder="Enter password"
                      required
                    />
                    <select
                      name="access"
                      ref={register}
                      style={{ width: "50%", margin: "10px 25%" }}
                      className="custom-select"
                      required
                    >
                      <option value="">Register As</option>
                      <option value="employee">Employee</option>
                      <option value="manager">Manager</option>
                    </select>
                    <input
                      value="Sign Up"
                      className="btn btn-primary btn-lg btn-block font-weight-bold"
                      type="submit"
                    />
                  </div>
                </form>
                <hr />
                <button className="createAcc" onClick={handleClick}>
                  Already have an account?
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
