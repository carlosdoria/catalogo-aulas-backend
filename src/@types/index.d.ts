import * as express from "express"
declare global {
    namespace Express {
        interface Request {
            userId? : Record<string,any>
            username? : Record<string,any>
            isAdmin? : Record<boolean,any>
        }
    }
}
