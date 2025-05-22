import { NextFunction, Request, Response } from "express"

export const loggerMiddleware= (req: Request, resp: Response, next: NextFunction) =>{
    resp.on("finish", () => {
        const statusCode= resp.statusCode;
        console.log(`${new Date().toISOString()} ${req.method} ${req.originalUrl} ${statusCode}`);
    })
    next();
}