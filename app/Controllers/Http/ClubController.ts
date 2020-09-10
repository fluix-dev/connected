import Club from '../../Models/Club'
import ClubValidator from 'App/Services/ClubValidator'
import Route from '@ioc:Adonis/Core/Route'

export default class ClubController {
  public async list ({ view }) {
    return view.render('club_list', {
      clubs: await Club.all(),
    })
  }

  public async add ({ request, session, response }) {
    const club = await request.validate(ClubValidator)

    await Club.create({
      name: club.name,
    })

    session.flash({
      success: 'Successfully created club!',
    })

    response.redirect(Route.makeUrl('ClubController.list'))
  }
}
