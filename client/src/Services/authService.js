import { instanceApi as api } from "../Utils/apiConfiguration";
//Register the new user
const userRegister = async (data) => {
  try {
    const response = await api.post("/register", data);
    return {data:response.data,error:null};
  } catch (error) {
    return {data:null,error};
  }
};
//Login the user
const userLogin = async (data) => {
  try {
    const response = await api.post("/login", data);
    return {data:response.data, error:null};
  } catch (error) {
    return {data:null, error};
  }
};
// when User Refresh the page its not automatic logout , it can refresh Token
const userRefresh = async (data) => {
  try {
    const response = await api.post("/refresh", data);
    return response;
  } catch (error) {
    return error;
  }
};
//logout 
const userLogOut = async () => {
  try {
    const response = await api.post("/logout");
    return {data:response.data};
  } catch (error) {
    return {data:null,error};
  }
};

export { userRegister, userLogin, userLogOut, userRefresh };