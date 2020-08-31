import Announcement from 'App/Models/Announcement'
import { DateTime } from 'luxon'
import Route from '@ioc:Adonis/Core/Route'
import Renderer from 'App/Services/Renderer'
import { Exception } from '@poppinss/utils/build'
import AnnouncementValidator from 'App/Services/AnnouncementValidator'
import Club from 'App/Models/Club'

export default class AnnouncementController {
  public async list ({ request, view }) {
    return view.render('announcement_list', {
      announcements: await Announcement
        .queryViewableBy(request.user)
        .select(['id', 'approverId', 'clubId', 'title', 'excerpt', 'date'])
        .preload('club')
        .orderBy('date', 'desc'),
      title: 'All Announcements',
    })
  }

  public async today ({ request, view }) {
    return view.render('announcement_list', {
      announcements: await Announcement
        .queryViewableBy(request.user)
        .select(['id', 'approverId', 'clubId', 'title', 'excerpt', 'date'])
        .preload('club')
        .andWhere(q => q.where('date', DateTime.local().toISODate() as string)),
      title: 'Today',
    })
  }

  public async mine ({ request, view }) {
    throw new Error();
    return view.render('announcement_list', {
      announcements: await Announcement
        .query()
        .select(['id', 'approverId', 'clubId', 'title', 'excerpt', 'date'])
        .preload('club')
        .where('author_id', request.user.id)
        .orderBy('date', 'desc'),
      title: 'My Announcements',
    })
  }

  public async view ({ request, params, view }) {
    const announcement = await Announcement.findBy('id', params.id)
    if (!announcement) {
      throw new Exception('Announcement not found', 404)
    }
    await announcement.preload('club')

    if (!announcement.isViewableBy(request.user)) {
      throw new Exception('Unauthorized to view this announcement', 401)
    }

    return view.render('announcement_view', {
      title: announcement.title,
      announcement: announcement,
    })
  }

  public async createForm ({ view }) {
    return view.render('announcement_create', {
      clubs: await Club.all(),
    })
  }

  public async create ({ request, response, session }) {
    const data = await request.validate(AnnouncementValidator)
    if (!await Club.findBy('id', data.club)) {
      throw new Exception('Club not found!', 404);
    }

    const announcement = new Announcement()
    announcement.title = data.title
    announcement.raw = data.description
    announcement.description = Renderer.render(data.description)
    announcement.excerpt = Renderer.cut(announcement.description)
    announcement.date = DateTime.fromISO(data.date)
    announcement.clubId = data.club
    announcement.authorId = request.user.id

    await announcement.save()

    session.flash({
      success: 'Announcement created!',
    })

    return response.redirect(Route.makeUrl('AnnouncementController.view', {
      params: {
        id: announcement.id,
      },
    }))
  }

  public async approve ({ request, response, params, session }) {
    const announcement = await Announcement.findBy('id', params.id)
    if (!announcement) {
      throw new Exception('Announcement not found', 401)
    }

    await announcement.related('approver').associate(await request.user.getUser())

    session.flash({
      'success': 'Announcement approved!',
    })

    response.redirect(Route.makeUrl('AnnouncementController.view', {
      params: {
        id: announcement.id,
      },
    }))
  }
}
