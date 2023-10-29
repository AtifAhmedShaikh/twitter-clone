const mongoose=require("mongoose");
const {mongooseDBConnectString}=require("../config/index");
const connectDatabase = async() => {
  try {
      const databse = await   mongoose.connect(mongooseDBConnectString,{
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log("databse has Conncected Successfully Ok !");
    } catch (error) {
      console.log("Error  Databsehas Not Connecte!!!!!!!",error)
    }
  };
  module.exports=connectDatabase;