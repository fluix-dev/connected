import Email from '../../Models/Email'
import EmailValidator from 'App/Services/EmailValidator'
import { Exception } from '@poppinss/utils'
import Route from '@ioc:Adonis/Core/Route'

export default class EmailController {
  public async list ({ view }) {
    return view.render('email_list', {
      emails: await Email.all(),
    })
  }

  public async add ({ request, session, response }) {
    const email = await request.validate(EmailValidator)

    await Email.create({
      email: email.email,
    })

    session.flash({
      success: 'Successfully created email!',
    })

    response.redirect(Route.makeUrl('EmailController.list'))
  }

    public async delete ({ params, response, session }) {
      const email = await Email.findBy('id', params.id)
      if (!email) {
        throw new Exception('Email not found!', 404)
      }

      await email.delete()

      session.flash({
        success: 'Email deleted!',
      })

      response.redirect(Route.makeUrl('EmailController.list'))
    }
}
