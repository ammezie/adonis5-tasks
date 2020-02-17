import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task'
import TaskValidator from 'App/Validators/Task'

export default class TasksController {
  public async index ({ view }: HttpContextContract) {
    const tasks = await Task.query().where('isCompleted', '=', false)

    return view.render('tasks.index', { tasks })
  }

  public async store ({ request, session, response }: HttpContextContract) {
    const data = await request.validate(TaskValidator)

    await Task.create(data)

    session.flash({ notification: 'Task added!' })

    return response.redirect('back')
  }

  public async update ({ params, session, response }: HttpContextContract) {
    const task = await Task.findOrFail(params.id)

    task.isCompleted = true
    await task.save()

    session.flash({ notification: 'Task updated!' })

    return response.redirect('back')
  }

  public async destroy ({ params, session, response }: HttpContextContract) {
    const task = await Task.findOrFail(params.id)
    await task.delete()

    session.flash({ notification: 'Task deleted!' })

    return response.redirect('back')
  }
}
