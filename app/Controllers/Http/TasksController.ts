import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task'
import TaskValidator from 'App/Validators/Task'

export default class TasksController {
  public async index ({ view }: HttpContextContract) {
    /**
     * this throws an error: `The operator "undefined" is not permitted`,
     * for falsy values: `false` or `0`
     * but works for truthy values: `true` or `1`
     */
    /**
     * @virk
     * Confirmed Bug
     */
    // const tasks = await Task.query().where('is_completed', false).exec()
    // const tasks = await Task.query().where('is_completed', true).exec()

    // but works this way
    // @virk: The `exec` method is not required, so we can skip it
    const tasks = await Task.query().where('isCompleted', '=', false)
    return view.render('tasks.index', { tasks })
  }

  public async store ({ request, session, response }: HttpContextContract) {
    // @virk: If you will hover over data variable, you will notice
    // it also has type information
    const data = await request.validate(TaskValidator)

    // persist to database
    await Task.create(data)

    // flash a success message
    session.flash({ notification: 'Task added!' })

    return response.redirect('back')
  }

  public async update ({ params, session, response }: HttpContextContract) {
    const task = await Task.findOrFail(params.id)

    /**
     * @virk
     * Shouldn't we accept whether the task is completed or not in the request body?
     */
    task.isCompleted = true
    await task.save()

    // flash success message to session
    session.flash({ notification: 'Task deleted!' })

    return response.redirect('back')
  }

  public async destroy ({ params, session, response }: HttpContextContract) {
    const task = await Task.findOrFail(params.id)
    await task.delete()

    // flash success message to session
    session.flash({ notification: 'Task deleted!' })

    return response.redirect('back')
  }
}
