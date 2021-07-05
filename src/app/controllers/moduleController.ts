import { Request, Response } from 'express'
import { ModuleModel } from '../model/module'

class moduleController {
  async create (req: Request, res: Response) {
    const { title } = req.body

    if(!title) {
      return res.status(400).json({ message: 'O título do módulo não foi informado.' })
    }

    try {
      if (await ModuleModel.findOne({ title })) {
        return res.status(400).json({ message: 'Já esxiste um módulo com esse nome' })
      }

      const newmodule = await ModuleModel.create({
        title,
        user: req.userId
      })

      return res.status(200).json({
        newmodule,
      })

    } catch (error) {
      return res.status(400).json({ error })
    }
  }

  async list (req: Request, res: Response) {
    try {
      const allModules = await ModuleModel.find()

      return res.status(200).json({ allModules })

    } catch (error){
      return res.status(400).json({ error })
    }
  }

  async put (req: Request, res: Response) {
    const { moduleId } = req.params
    const { title } = req.body

    try {
      await ModuleModel.findByIdAndUpdate( moduleId,
        {
          title
        }
      )

      return res.status(200).json({ message: 'Módulo atualizado com sucesso' })
    } catch (error){
      return res.status(400).json({ error })
    }
  }

  async delete (req: Request, res: Response) {
    const { moduleId } = req.params

    try {
      await ModuleModel.deleteOne({
        _id: moduleId
      })

      return res.status(200).json({ message: 'Módulo deletado com sucesso!' })
    } catch (error){
      return res.status(400).json({ error })
    }
  }
}

export default new moduleController()
