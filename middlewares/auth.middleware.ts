import {Request, Response , NextFunction} from 'express';
import HttpException from '../exception/httpException';
import { JWT_SECRET } from '../utils/constants';
import jwt from 'jsonwebtoken';
import { JwtPayload } from '../dto/jwt-payload';



const getToken= (req: Request): string => {
    const token:string=req.headers.authorization;
    //console.log(token)
    if(!token){
        throw new HttpException(401,"Not authorized")
    }
    const tokenSplits=token.split(' ');
    if(tokenSplits.length !=2)
        throw new HttpException(401,"invalid Token")
    return tokenSplits[1]
}

export const authMiddleWare= (req: Request, res:Response,next:NextFunction) => {
    const token=getToken(req);
    //console.log(token)
    if(!token){
        throw new HttpException(401, "Not authorized")
    }
    try{
        const payload=jwt.verify(token,JWT_SECRET) as JwtPayload
        req.user=payload
    }
    catch{
        throw new HttpException(401,"Invalid or expired token")
    }   
    next();
}