import { instanceApi as api } from "../Utils/apiConfiguration";
//post the new comment on the post by  given post Id
const writeComments=async(postId,commentText)=>{
    try {
        const response = await api.post(`/comment/${postId}`,{
          commentText,
        });
        return {data:response.data,error:null};
      } catch (error) {
        return {data:null,error};
      }
}
// fetch the specific post comments by post Id
const fetchCommentsByPostId=async(postId)=>{
    try{
        const response=await api.get(`/api/v1/comments/${postId}`)
        return {data:response.data, error:null};
      }catch(error){
        return {data:null,error};
    }
}
export{
    fetchCommentsByPostId,
    writeComments
}