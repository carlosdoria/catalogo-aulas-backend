import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export default async function (req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization

  if(!authHeader) {
    return res.status(401).json({ message: 'Token não foi informado' })
  }

  const parts = authHeader.split(' ')

  if(parts.length !== 2){
    return res.status(401).json({ message: 'Token não foi informado' })
  }

  const [ scheme, token ] = parts

  if(!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ message: 'Token mal formatado' })
  }

  jwt.verify(token, process.env.SECRET_TOKEN, ( error, decoded ) => {
    if(error) {
      return res.status(400).json({ message: 'Token inválido' })
    }

    req.userId = decoded.id
    req.username = decoded.username

    return next()
  })
}
