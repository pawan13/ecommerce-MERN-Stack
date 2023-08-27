import { setUser } from './userSlice'
import { toast } from "react-toastify";
import { db } from "../../firebase";
import { doc, getDoc } from 'firebase/firestore';

export  const getUserAction=(uid)=> async(dispatch)=> {
 try {
   const userSnap = await  getDoc(doc(db, "users", uid))
   if (userSnap.exists()) {
    const user = userSnap.data();
    console.log(user);

    dispatch(setUser({ ...user, uid }));
  }
 } catch (error) {
    toast.error(error.message)
 }
}
