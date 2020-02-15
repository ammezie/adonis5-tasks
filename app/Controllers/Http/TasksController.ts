import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, validator } from '@ioc:Adonis/Core/Validator'
import Task from 'App/Models/Task'

export default class TasksController {
  public async index ({ view }: HttpContextContract) {
    /**
     * this throws an error: `The operator "undefined" is not permitted`,
     * for falsy values: `false` or `0`
     * but works for truthy values: `true` or `1`
     */
    // const tasks = await Task.query().where('is_completed', false).exec()
    // const tasks = await Task.query().where('is_completed', true).exec()

    // but works this way
    const tasks = await Task.query().where('is_completed', '=', false).exec()

    return view.render('tasks.index', { tasks })
  }

  public async store ({ request, session, response }: HttpContextContract) {
    // TODO: validation

    // I don't seem to understand how the new valiadtion works

    const taskSchema = validator.compile(schema.create({
      title: schema.string(),
    }))

    // TS is throwing a warning on request: `Expected 1 arguments, but got 2`
    await validator.validate(taskSchema, request.only(['title']))

    // validate form input
    // const validation = await validate(request.all(), {
    //   title: 'required|min:3|max:255'
    // })

    // show error messages upon validation fail
    // if (validation.fails()) {
    //   session.withErrors(validation.messages())
    //     .flashAll()

    //   return response.redirect('back')
    // }

    // persist to database
    Task.create({ title: request.input('title') })

    // flash a success message
    session.flash({ notification: 'Task added!' })

    return response.redirect('back')
  }

  public async update ({ params, session, response }: HttpContextContract) {
    const task = await Task.find(params.id)

    task.is_completed = true

    await task.save()

    // flash success message to session
    session.flash({ notification: 'Task deleted!' })

    return response.redirect('back')
  }

  public async destroy ({ params, session, response }: HttpContextContract) {
    const task = await Task.find(params.id)

    await task.delete()

    // flash success message to session
    session.flash({ notification: 'Task deleted!' })

    return response.redirect('back')
  }
}
