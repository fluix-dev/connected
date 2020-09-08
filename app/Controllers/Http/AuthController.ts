import Route from '@ioc:Adonis/Core/Route'
import User from 'App/Models/User'

export default class AuthController {
  public async home ({ session, view, response }) {
    // user logged in
    if (session.get('user')) {
      return response.redirect(Route.makeUrl('AnnouncementController.today'))
    }

    return view.render('login')
  }

  public async login ({ response }) {
    return response.redirect(Route.makeUrl('AuthController.auth'))
  }

  public async logout ({ response, session }) {
    session.clear()

    return response.redirect(Route.makeUrl('AuthController.home'))
  }

  public async auth ({ response, session }) {
    let data = await User.findBy('id', 2) as User
    session.put('user', {
      id: data.id,
      email: data.email,
      isStaff: data.isStaff,
    })
    return response.redirect(Route.makeUrl('AnnouncementController.list'))
  }
}
