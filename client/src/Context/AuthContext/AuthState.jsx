import  {   useEffect,  useState } from "react";
import AuthContext from "./AuthContext";
import PropTypes from 'prop-types'
import { userRefresh } from "../../Services/authService";
import { useNavigate } from "react-router-dom";
const NoteState = ({children}) => {
  const [activeIconIndex,setActiveIconIndex]=useState(0);
  const navigate=useNavigate();
  const [userState, setUserState] = useState({
    email: "",
    username: "",
    _id: "testId",
    auth: false,
   });
   // when user Refresh the page its not logout the App
   useEffect(()=>{
    const refreshPage=async()=>{
    const response=await userRefresh();
    if(response.status===200){
    setUserState({...response.data.user,auth:response.data.auth})
    navigate("/");
    }else{
    setUserState({...userState})
    }
  }
    window.addEventListener("load",refreshPage);
    return ()=>removeEventListener("load",refreshPage);
},[userState,navigate]);
   return(
    <AuthContext.Provider value={{ userState, setUserState,activeIconIndex,setActiveIconIndex }}>
      {children}
    </AuthContext.Provider>
  )
};
NoteState.propTypes={
  children:PropTypes.object.isRequired  
}
export default NoteState;