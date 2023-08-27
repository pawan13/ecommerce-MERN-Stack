import { signInWithEmailAndPassword } from 'firebase/auth'
import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { auth } from '../../firebase'
import { getUserAction } from '../user/userAction'

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.user);


    useEffect(() => {
        //
    
        user?.uid && navigate("/");
      }, [user, navigate]);

const handleOnSubmit = async(e)=>{
       try {
        e.preventDefault()

       const resPending = signInWithEmailAndPassword(auth, email, password)

       toast.promise(resPending,{
        pending:"Please wait..."
       })

       const {user} = await resPending;
       if(user?.uid){
        toast.success("Logged in successfully, redirecting to home page");
        dispatch(getUserAction(user?.uid));
       }
       } catch (error) {
        let msg = error.message;

        if (msg.includes("auth/user-not-found")) {
          msg = "Wrong credentials";
        }
        toast.error(msg);
       }
      }
  
const loginForm=()=><form onSubmit={handleOnSubmit}>
      <input
      name='email'
      type='email'
      className='form-control'
      onChange={e=>setEmail(e.target.value)}
      placeholder='Email'
      
      />
      <input
      name='password'
      type='password'
      className='form-control mt-2'
      onChange={e=>setPassword(e.target.value)}
      placeholder='Password'
      />
     <div className="d-flex justify-content-center">
     <button type='submit' className="btn btn-raised btn-info mt-3" >
        LogIn</button>
     </div>
     <div className='d-flex justify-content-end'>
        <Link to="/forgot/password">Forgot Password</Link>
     </div>
      </form>
    return (
      <div className="container p-5">
          <div className="row">
              <div className="col-md-6 offset-md-3">
                  <h4 className='text-center'>Login</h4>
                  {loginForm()}
         
              </div>
          </div>
      </div>
    )
}
