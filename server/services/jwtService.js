const jwt = require('jsonwebtoken');
const {  accessTokenSecretKey,accessRefreshTokenSecret}=require("../config/index");
const RefreshToken = require("../models/Token");
const ACCESS_TOKEN_SECRET=accessTokenSecretKey
const REFRESH_TOKEN_SECRET=accessRefreshTokenSecret
class JWTService{
    // sign access token
    static signAccessToken(payload, expiryTime){
        return jwt.sign(payload, ACCESS_TOKEN_SECRET, {expiresIn: expiryTime});
    }
    // sign refresh token
    static signRefreshToken(payload, expiryTime){
        return jwt.sign(payload, REFRESH_TOKEN_SECRET, {expiresIn: expiryTime});
    }
    // verify access token
    static verifyAccessToken(token){
        return jwt.verify(token, ACCESS_TOKEN_SECRET);
    }
    // verify refresh token
    static verifyRefreshToken(token){
        return jwt.verify(token, REFRESH_TOKEN_SECRET)
    }
    // store refresh token
    static async storeRefreshToken(token, userId){
        try{
            const newToken = new RefreshToken({
                token: token,
                userId: userId
            });
            // store in datanse
            await newToken.save();
        }
        catch(error){
            console.log(error);
        }
    }
}

module.exports = JWTService;