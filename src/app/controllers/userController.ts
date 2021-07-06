import { Request, Response} from 'express'
import bcrypt from 'bcryptjs'
import { UserModel } from '../model/user'
import { generateToken } from '../../utils/generateToken'


class UserController {
  async create (req: Request, res: Response) {
    const { username, name, password } = req.body

    if(!username || !name || !password) {
      return res.status(400).json({ message: 'Um campo obrigatório não foi informado.' })
    }

    try {
      if (await UserModel.findOne({ username })) {
        return res.status(400).json({ message: 'Esse username já está em uso' })
      }

      const newUser = await UserModel.create({
        username,
        name,
        password
      })

      // tornando o password undefined para que não apareça no retorno do newUser
      newUser.password = undefined

      return res.status(200).json({
        newUser,
        token: generateToken( newUser._id, newUser.username, false )
      })

    } catch (error) {
      return res.status(400).json({ error })
    }
  }

  async authenticate (req: Request, res: Response) {
    const { username, password } = req.body

    if(!username || !password) {
      return res.status(400).json({ message: 'Um campo obrigatório não foi informado.' })
    }

    try {
      const user = await UserModel.findOne({ username: username }, ['username', 'password', 'isAdmin'])

      if (!user){
        return res.status(400).json({ message: 'Usuário não encontrado.' })
      }

      if (!await bcrypt.compare(password, user.password)) {
        return res.status(400).json({ message: 'Senha inválida.' })
      }

      user.password = undefined

      return res.status(200).json({
        user,
        token: generateToken( user._id, user.username, user.isAdmin )
      })
    } catch (error) {
      return res.status(400).json({ error })
    }
  }

  async list (req: Request, res: Response) {
    try {
      const allUsers = await UserModel.find()

      return res.status(200).json({ allUsers })

    } catch (error){
      return res.status(400).json({ error })
    }
  }

  async show (req: Request, res: Response) {
    const { userId } = req.params

    try {
      const user = await UserModel.findById(userId)
      return res.status(200).json({ user })

    } catch (error){
      return res.status(404).json({ message: 'Usuário não encontrado.' })
    }
  }

  async patch (req: Request, res: Response) {
    const { userId } = req.params
    const { username, name, password } = req.body

    try {
        const user = await UserModel.findById(userId)

        if(!user) {
          return res.status(404).json({ message: 'Usuário não localizada.' })
        }

      await user.updateOne(
        {
          username: !username ? user.username : username,
          name: !name ? user.name : name,
          password: !password ? user.password : password,
        }
      )

      return res.status(200).json({ message: 'Usuário atualizado com sucesso' })
    } catch (error){
      return res.status(400).json({ error })
    }
  }

  async patchAdmin (req: Request, res: Response) {
    const { userId } = req.params

    try {
        const user = await UserModel.findById(userId)

        if(!user) {
          return res.status(404).json({ message: 'Usuário não localizada.' })
        }

      await user.updateOne(
        {
          isAdmin: true
        }
      )

      return res.status(200).json({ message: 'Usuário atualizado com sucesso' })
    } catch (error){
      return res.status(400).json({ error })
    }
  }

  async delete (req: Request, res: Response) {
    const { userId } = req.params

    try {
      await UserModel.deleteOne({
        _id: userId
      })

      return res.status(200).json({ message: 'Usuário deletado com sucesso!' })
    } catch (error){
      return res.status(400).json({ error })
    }
  }
}

export default new UserController()
