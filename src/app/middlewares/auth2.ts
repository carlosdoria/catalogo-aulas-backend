import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { UserModel } from '../model/user';

export default async function (req: Request, res: Response, next: NextFunction) {
  if (req.headers && req.headers.authorization) {
    var authorization = req.headers.authorization.split(' ')[1],
        decoded;
    try {
        decoded = jwt.verify(authorization, process.env.SECRET_TOKEN);
    } catch (e) {
        return res.status(401).json('unauthorized');
    }
    var userId = decoded.id;

    const user = await UserModel.findOne({_id: userId})

    return res.status(200).json(user)
}
  return res.json(500);
}
