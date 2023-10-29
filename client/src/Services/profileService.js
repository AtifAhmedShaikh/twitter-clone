import { instanceApi as api } from "../Utils/apiConfiguration";
//fetch the all Users its return only user info :name,username
const fetchUsers = async () => {
  try {
    const response = await api.get("/api/v1/users");
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};
// fetch the specific User profile its take whole user Info and its Tweet
const fetchUserProfile = async (profileId) => {
  try {
    const response = await api.get(`/api/v1/profiles/${profileId}`);
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};
//follow the User by given Id
const followUserById = async (userId) => {
  try {
    const response = await api.post(`/follow/${userId}`);
    console.log({ data: response.data, error: null });
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};
//Unfollow the User by given Id
const unfollowUserById = async (userId) => {
  try {
    const response = await api.post(`/unfollow/${userId}`);
    return { data: response.data, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error };
  }
};
const fetchUserFollowersById = async (userId) => {
  try {
    const response = await api.get(`/api/v1/users/followers/${userId}`);
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};
const fetchUserFollowingById = async (userId) => {
  try {
    const response = await api.get(`/api/v1/users/following/${userId}`);
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};
const editProfileInfo = async (userId,data) => {
  try {
    const response = await api.post(`/api/v1/users/updateUser/${userId}`,data);
    console.log(response)
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};
export {
  fetchUsers,
  editProfileInfo,
  fetchUserProfile,
  followUserById,
  unfollowUserById,
  fetchUserFollowersById,
  fetchUserFollowingById,
};
