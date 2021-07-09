import { Request, Response } from 'express'
import { ClassModel } from '../model/class'

class classController {
  async create (req: Request, res: Response) {
    const { module, title, link, classDate } = req.body

    if(!module || !title || !link || !classDate) {
      return res.status(400).json({ message: 'Um campo obrigatório não foi informado.' })
    }

    try {
      if (await ClassModel.findOne({ title })) {
        return res.status(400).json({ message: 'Já esxiste uma aula com esse nome' })
      }

      const newClass = await ClassModel.create({
        module,
        title,
        link,
        classDate
      })

      return res.status(201).json({
        newClass,
      })

    } catch (error) {
      return res.status(400).json({ error })
    }
  }

  async listAll (req: Request, res: Response) {
    try {
      const allClasses = await ClassModel.find().populate('module').sort('title')

      return res.status(200).json( allClasses )

    } catch (error){
      return res.status(400).json({ error })
    }
  }

  async list (req: Request, res: Response) {
    const { id } =req.params

    try {
      const allClasses = await ClassModel.find({
        module: { _id: id }
      }).populate('module').sort('title')

      return res.status(200).json( allClasses )

    } catch (error){
      return res.status(400).json({ error })
    }
  }

  async patch (req: Request, res: Response) {
    const { classId } = req.params
    const { title, link, classDate } = req.body

    try {
      const classFound = await ClassModel.findById(classId)

      if(!classFound) {
        return res.status(404).json({ message: 'Aula não localizada.' })
      }

      await classFound.updateOne({
        title: !title ? classFound.title : title,
        link: !link ? classFound.link : link,
        classDate: !classDate ? classFound.classDate : classDate,
      })

      return res.status(200).json({ message: 'Aula atualizada com sucesso.' })
    } catch (error){
      return res.status(400).json({ error })
    }
  }

  async delete (req: Request, res: Response) {
    const { classId } = req.params

    try {
      await ClassModel.deleteOne({
        _id: classId
      })

      return res.status(200).json({ message: 'Aula deletada com sucesso!' })
    } catch (error){
      return res.status(400).json({ error })
    }
  }
}

export default new classController()
