import React,{useEffect, useState}from 'react';
import {auth} from "../../firebase";
import { sendSignInLinkToEmail } from "firebase/auth";
import {toast} from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Register() {
  const [email, setEmail] = useState("Pawanshiwakoti13@gmail.com")

  const navigate = useNavigate()
  const {user} = useSelector((state)=>state.user)

  useEffect(()=>{
   if(user && user.uid) navigate("/")
  }, [user, navigate])


    const handleOnSubmit = async(e)=>{
        e.preventDefault()

        const config= {
            url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
            handleCodeInApp: true
        }
        await sendSignInLinkToEmail(auth, email, config)
        .then(() => {
          // The link was successfully sent. Inform the user.
          toast.success(`Email is send to the ${email}. Please click the link to complete the registration.`)
          // Save the email locally so you don't need to ask the user for it again
          // if they open the link on the same device.
          window.localStorage.setItem('emailForSignIn', email);
          // ...
          setEmail('')
        })
        .catch((error) => {
          const errorMessage = error.message;
          toast.error(errorMessage)
        });
    }

    const registrationForm=()=><form onSubmit={handleOnSubmit}>
    <input
    type='email'
    className='form-control'
    value={email}
    onChange={e=>setEmail(e.target.value)}
    autoFocus
    />
    <button type='submit' className="btn btn-raised btn-info mt-3" >Register</button>
    </form>
  return (
    <div className="container p-5">
        <div className="row">
            <div className="col-md-6 offset-md-3">
                <h4>Register</h4>
                {registrationForm()}
            </div>
        </div>
    </div>
  )
}
