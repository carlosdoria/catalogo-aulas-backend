import jwt from 'jsonwebtoken'

export function generateToken ( id: string, username: string, isAdmin: boolean) {
  const token = jwt.sign({ id, username, isAdmin }, process.env.SECRET_TOKEN, {
    expiresIn: 86400
  })

  return token
}
