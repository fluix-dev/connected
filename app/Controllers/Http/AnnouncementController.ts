import Announcement from 'App/Models/Announcement'
import { DateTime } from 'luxon'
import Route from '@ioc:Adonis/Core/Route'
import Renderer from 'App/Services/Renderer'
import { Exception } from '@poppinss/utils/build'
import AnnouncementValidator from 'App/Services/AnnouncementValidator'
import Club from 'App/Models/Club'
import AnnouncementService from 'App/Services/AnnouncementService'

export default class AnnouncementController {
  public async list ({ request, view }) {
    return view.render('announcement_list', {
      announcements: await Announcement.filterList(
        Announcement.filterViewableBy(Announcement.query(), request.user)
      ).orderBy('date', 'desc'),
      title: 'All Announcements',
    })
  }

  public async today ({ request, view }) {
    return view.render('announcement_list', {
      announcements: await Announcement.filterList(
        Announcement.filterViewableBy(Announcement.query(), request.user)
      ).andWhere(q => q.where('date', DateTime.local().toISODate() as string)),
      title: 'Today',
    })
  }

  public async mine ({ request, view }) {
    return view.render('announcement_list', {
      announcements: await Announcement.filterList(Announcement.query())
        .where('author_id', request.user.id)
        .orderBy('date', 'desc'),
      title: 'My Announcements',
    })
  }

  public async view ({ request, params, view }) {
    const announcement = await AnnouncementService.getAnnouncement(params.id, request.user)
    await announcement.preload('club')

    return view.render('announcement_view', {
      title: announcement.title,
      announcement: announcement,
    })
  }

  public async createForm ({ view }) {
    return view.render('announcement_editor', {
      clubs: await Club.all(),
      submitUrl: Route.makeUrl('AnnouncementController.create'),
    })
  }

  public async create ({ request, response, session }) {
    const data = await request.validate(AnnouncementValidator)
    if (!await Club.findBy('id', data.club)) {
      throw new Exception('Club not found!', 404)
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
    const announcement = await AnnouncementService.getAnnouncement(params.id)
    if (announcement.approverId) {
      throw new Exception('Announcement already approved!', 400)
    }

    announcement.approverId = request.user.id
    await announcement.save()

    session.flash({
      'success': 'Announcement approved!',
    })

    response.redirect(Route.makeUrl('AnnouncementController.view', {
      params: {
        id: announcement.id,
      },
    }))
  }

  public async editForm ({ request, params, view }) {
    const announcement = await AnnouncementService.getAnnouncement(params.id, request.user)
    if (!announcement.isEditableBy(request.user)) {
      throw new Exception('Unauthorized to edit this announcement!', 401)
    }
    return view.render('announcement_editor', {
      clubs: await Club.all(),
      announcement: announcement,
      editing: true,
      submitUrl: Route.makeUrl('AnnouncementController.edit', { params: { id: params.id }}),
    })
  }

  public async edit ({ request, params, response, session }) {
    const data = await request.validate(AnnouncementValidator)
    let announcement = await AnnouncementService.getAnnouncement(params.id, request.user)
    if (!announcement.isEditableBy(request.user)) {
      throw new Exception('Unauthorized to edit this announcement!', 401)
    }

    if (!await Club.findBy('id', data.club)) {
      throw new Exception('Club not found!', 404)
    }

    announcement.title = data.title
    announcement.raw = data.description
    announcement.description = Renderer.render(data.description)
    announcement.excerpt = Renderer.cut(announcement.description)
    announcement.date = DateTime.fromISO(data.date)
    announcement.clubId = data.club

    await announcement.save()

    session.flash({
      'success': 'Successfully edited announcement',
    })

    response.redirect(Route.makeUrl('AnnouncementController.view', {
      params: {
        id: announcement.id,
      },
    }))
  }

  public async delete ({ params, request, response, session }) {
    const announcement = await AnnouncementService.getAnnouncement(params.id, request.user)
    if (!announcement) {
      throw new Exception('Announcement not found!', 404)
    }

    await announcement.delete()

    session.flash({
      success: 'Announcement deleted!',
    })

    response.redirect(Route.makeUrl('AnnouncementController.list'))
  }
}
