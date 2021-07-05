import jwt from 'jsonwebtoken'

export function generateToken ( id: string, username: string) {
  const token = jwt.sign({ id, username }, process.env.SECRET_TOKEN, {
    expiresIn: 86400
  })

  return token
}