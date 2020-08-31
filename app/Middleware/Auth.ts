import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SessionUser from 'App/Classes/SessionUser'
import { Exception } from '@poppinss/utils/build'
import Route from '@ioc:Adonis/Core/Route'

export default class Auth {
  public async handle (ctx: HttpContextContract, next: () => Promise<void>, [requirement]: string[]) {
    let user = ctx.session.get('user', null)

    if (!user) {
      return ctx.response.redirect(Route.makeUrl('AuthController.login') as string)
    } else if (requirement === 'staff' && !user.isStaff) {
      throw new Exception('Unauthorized', 401)
    }

    ctx.request.user = new SessionUser(user)
    return next()
  }
}
