import React,{useEffect, useState}from 'react';
import {toast} from "react-toastify";
import {auth, db} from "../../firebase";
import {signInWithEmailLink, updatePassword} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import { useDispatch } from 'react-redux';
import { doc, setDoc } from 'firebase/firestore';
import { getUserAction } from '../user/userAction';


export default function RegisterComplete() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(()=>{
    setEmail(window.localStorage.getItem("emailForSignIn"))
  },[])

    const handleOnSubmit = async(e)=>{
      
        e.preventDefault()

        if(!email || !password){
            toast.error("Email and Password is required!")
            return;
        }

        if(password.length < 6){
            toast.error("Password must be at least 6 character long.")
        }

        try {
            const result = await signInWithEmailLink(
                auth,
                email,
                window.location.href
            )
            const {user} = result;
            if(result.user.emailVerified){
                window.localStorage.removeItem('emailForSignIn')

                let user = auth.currentUser;
                try {
                    await updatePassword(user, password);
                } catch (updatePasswordError) {
                    toast.error(updatePasswordError.message);
                }
            }

            
            if (user?.id){

                //add user in the table 
                await setDoc(doc(db, "users", user?.uid), email, password)
                toast.success("new user has been created")
                dispatch(getUserAction(user.uid))
            }
        
           navigate("/")
        } catch (error) {
            toast.error(error.message)
        }

    }

    

    const CompleteRegistrationForm=()=><form onSubmit={handleOnSubmit}>
    <input
    type='email'
    name='email'
    className='form-control'
    value={email}
    onChange={e=>setEmail(e.target.value)}
   disabled
    />
    <input
    type='password'
    name='password'
    className='form-control mt-2'
    value={password}
    onChange={e => setPassword(e.target.value)}
    placeholder='Password'
    autoFocus
    />
    <button type='submit' className="btn btn-raised btn-info mt-3" >
        Complete Registration</button>
    </form>
  return (
    <div className="container p-5">
        <div className="row">
            <div className="col-md-6 offset-md-3">
                <h4>Complete Registration</h4>
                {CompleteRegistrationForm()}
                
            </div>
        </div>
    </div>
  )
}
