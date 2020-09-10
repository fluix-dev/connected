import Route from '@ioc:Adonis/Core/Route'
import User from 'App/Models/User'
import OAuthService from 'App/Services/OAuthService'
import { Exception } from '@poppinss/utils'
import { staffDomain, studentDomain } from '../../../config/oauth'
import { parseOneAddress } from 'email-addresses'
import * as url from 'url'

export default class AuthController {
  public async home ({ session, view, response }) {
    // user logged in
    if (session.get('user')) {
      return response.redirect(Route.makeUrl('AnnouncementController.today'))
    }

    return view.render('login')
  }

  public async login ({ response, request }) {
    return response.redirect(await OAuthService.getRedirect(request.get().next))
  }

  public async logout ({ response, session }) {
    session.clear()

    return response.redirect(Route.makeUrl('AuthController.home'))
  }

  public async auth ({ request, response, session }) {
    const qs = request.get()
    const code = qs.code
    if (typeof code !== 'string') {
      throw new Exception('OAuth token not found', 400)
    }
    let googleUser
    try {
      googleUser = await OAuthService.getUser(code)
    } catch(e) {
      throw new Exception('Invalid OAuth token', 400)
    }
    let user = await User.findBy('email', googleUser.email)
    // @ts-ignore
    // this just seems to be either the library being bad or ts messing up because .domain definitely exists...
    let domain = parseOneAddress(googleUser.email).domain
    if (!domain) {
      throw new Error('Invalid domain for user ' + googleUser.email)
    }

    if (domain !== studentDomain && domain !== studentDomain) {
      throw new Exception('User email unauthorized!', 401)
    }

    if (!user) {
      user = await User.create({
        email: googleUser.email,
        isStaff: domain === staffDomain,
      })
    }

    session.put('user', {
      id: user.id,
      email: user.email,
      isStaff: true,
    })

    if (qs.state) {
      return response.redirect(url.parse(qs.state).path)
    } else {
      return response.redirect(Route.makeUrl('AnnouncementController.today'))
    }
  }
}
