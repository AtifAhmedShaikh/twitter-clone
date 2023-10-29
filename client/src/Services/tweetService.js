import { instanceApi as api } from "../Utils/apiConfiguration";
//fetch All Tweets for home page
const fetchTweets = async () => {
  try {
    const response = await api.get("/api/v1/tweets");
    return { data:response.data,error:null};
  } catch (error) {
    return { data:null,error};
  }
};
//post new Post
const postTweet = async (data) => {
  try {
    const response = await api.post("/tweet", data);
    return {data:response.data,error:null};
  } catch (error) {
    return {data:null,error}
  }
};
const likePostById=async(postId)=>{
    try{
        const response=await api.post(`/likepost/${postId}`);
        return {data:response.data,error:null};
    }catch(error){
        return {data:null,error};
    }
}
const unlikePostById=async(postId)=>{
    try{
        const response=await api.post(`/unlike/${postId}`);
        return {data:response.data,error:null};
    }catch(error){
        return {data:null,error};
    }
}
export { fetchTweets, postTweet,unlikePostById,likePostById};