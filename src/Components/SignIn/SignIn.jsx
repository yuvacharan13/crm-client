import React, {useState} from 'react'
import {Form , Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import {setCurrentUser} from '../../Redux/User/user-actions'
import {Alert} from '@material-ui/lab'
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import "./SignIn.css";

const SignIn = ({setCurrentUser}) => {

  const history = useHistory();

  const { register, handleSubmit } = useForm();

  const handleClick = () => {
    history.push("/signup");
  };

  const onSubmit = async (data) => {
    setLoading(true)
    // event.preventDefault()
    //Send data to server
    try {
    var user = await fetch("https://crm-server-app.herokuapp.com/signin",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body : JSON.stringify(data)
    }).then((res) => res.json())
    .then(data => {
      console.log(data)
      if(data.message === "success"){
        setLoading(false)
        
        
        localStorage.setItem("crmApplication",data.jwtToken)
        localStorage.setItem("userDetails",JSON.stringify(data.user))
        setTimeout(() => setCurrentUser(data.user) , 0);
        history.push("/dashboard")
        }
        else{
          setLoading(false)
          setAlert({display : "flex" , message : data.message.name })
          console.log(data.message.name)
    
        }

    })
    
    

  }
  catch(err) {
    console.log(err)
    setLoading(false)
  }

  }

  

  // const [data, setData] = useState({email : '' , password : "" })
  const [loading , setLoading ] = useState(false)
  const [alert , setAlert ] = useState({display : "none" , message : "" })

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
                    <input
                      value={loading ? "please wait.." : "Log In"}
                      className="btn btn-primary btn-lg btn-block font-weight-bold"
                      type="submit"
                    />
                  </div>
                  <Alert severity="error" style={{display : alert.display }} onClose={() => {setAlert({display : 'none'})}}>{alert.message}</Alert>
                </form>
                <div>
                  <a className="forgotpassword" href="">
                    Forgotten password?
                  </a>
                </div>
                <hr />
                <button className="createAcc" onClick={handleClick} disabled={loading}>
                  Create an Account here
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
        </div>
    )
}

const mapStateToProps = (state) => (null)

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});


export default connect(null,mapDispatchToProps)(SignIn)
