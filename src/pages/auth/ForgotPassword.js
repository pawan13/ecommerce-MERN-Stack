import React,{useEffect, useState}from 'react';
import {auth} from "../../firebase";
import {toast} from "react-toastify";
import { sendPasswordResetEmail } from 'firebase/auth';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const navigate = useNavigate()
  const {user} = useSelector((state)=>state.user)

  useEffect(()=>{
   if(user && user.uid) navigate("/")
  }, [user, navigate])

    const handleOnSubmit = async(e)=>{
        e.preventDefault()

        const config= {
            url: process.env.REACT_APP_PASSWORD_REDIRECT_URL,
            handleCodeInApp: true
        }
        await sendPasswordResetEmail(auth, email, config)
        .then(() => {
            setEmail('')
          // The link was successfully sent. Inform the user.
          toast.success(`Email is send to the ${email}. Please click the link to complete the password reset.`)
          
        })
        .catch((error) => {
          const errorMessage = error.message;
          toast.error(errorMessage)
        });
    }

    const ForgotPasswordForm=()=><form onSubmit={handleOnSubmit}>
    <input
    type='email'
    className='form-control'
    value={email}
    onChange={e=>setEmail(e.target.value)}
    autoFocus
    />
    <button type='submit' className="btn btn-raised btn-info mt-3" >Submit</button>
    </form>
  return (
    <div className="container p-5">
        <div className="row">
            <div className="col-md-6 offset-md-3">
                <h4>Password Reset Email</h4>
                {ForgotPasswordForm()}
            </div>
        </div>
    </div>
  )
}
