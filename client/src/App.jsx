import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import PostTweet from "./Pages/PostTweetPage/PostTweet";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./Pages/Error/NotFound";
import FollowersList from "./Pages/UsersList/FollowersList";
import FollowingList from "./Pages/UsersList/FollowingList";
import UserList from "./Pages/UsersList/UsersList";
import PrivateRoute from "./Components/Protected/ProtectedRoutes";
import Comments from "./Pages/Comments/Comments";
import ShareSlider from "./Components/shareSlider/ShareSlider";
import EditProfile from "./Components/Modal/EditProfile";
function App(){
  return (
   <>
      <Routes>
        <Route exact path="/auth/login" element={<Login />}></Route>
        <Route exact path="/auth/signUp" element={<SignUp />}></Route>
        <Route exact path="/" element={<PrivateRoute > <Home/>  </PrivateRoute> }></Route>
        <Route exact path="/users" element={<PrivateRoute >  <UserList/> </PrivateRoute> }></Route>
        <Route exact path="/postNewTweet" element={ <PrivateRoute >  <PostTweet/>  </PrivateRoute> }></Route>
        <Route exact path="/profile/:userId" element={<PrivateRoute >    <Profile />   </PrivateRoute> }></Route>
        <Route exact path="/profile/followers/:userId" element={ <PrivateRoute >   <FollowersList />  </PrivateRoute> }></Route>
        <Route exact path="/profile/following/:userId" element={<PrivateRoute >  <FollowingList />   </PrivateRoute> }></Route>
        <Route exact path="/comments/:postId" element={<PrivateRoute >  <Comments/>  </PrivateRoute> }></Route>
        <Route exact path="*" element={<NotFound />}></Route>
      </Routes>
       <ToastContainer width={"3rem"} size={100} closeOnClick={false} position="bottom-center" autoClose={500} limit={1} hideProgressBar newestOnTop={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
       <ShareSlider/>
       <EditProfile/>
    </>
  );
}

export default App;
