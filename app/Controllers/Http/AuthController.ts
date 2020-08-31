import Route from '@ioc:Adonis/Core/Route'
import User from 'App/Models/User'

export default class AuthController {
  public async login ({ response }) {
    return response.redirect(Route.makeUrl('AuthController.auth'))
  }

  public async auth ({ response, session }) {
    let data = await User.findBy('id', 1) as User
    session.put('user', {
      id: data.id,
      email: data.email,
      isStaff: data.isStaff,
    })
    return response.redirect(Route.makeUrl('AnnouncementController.list'))
  }
}
