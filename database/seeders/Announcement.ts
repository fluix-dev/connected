import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Announcement from 'App/Models/Announcement'
import { DateTime } from 'luxon'

export default class AnnouncementSeeder extends BaseSeeder {
  public static developmentOnly = true

  public async run () {
    for (let announcement of await Announcement.query()) {
      await announcement.delete()
    }

    await Announcement.create({
      title: 'Hello!',
      raw: 'Hi!!',
      description: 'Hi!!',
      excerpt: 'Hi!!',
      date: DateTime.fromMillis(1597989499447),
      authorId: 1,
      approverId: 2,
      clubId: 1,
    })

    await Announcement.create({
      title: 'Unapproved',
      raw: 'Example of an unapproved announcement, should not be visible for user 1',
      description: 'Example of an unapproved announcement, should not be visible for user 1',
      excerpt: 'Example of an unapproved announcement, should not be visible for user 1',
      authorId: 2,
      date: DateTime.fromMillis(1598075909247),
      clubId: 2,
    })

    await Announcement.create({
      title: 'Hello!',
      raw: 'Hi!!',
      description: 'Hi!!',
      excerpt: 'Hi!!',
      date: DateTime.fromMillis(1598075909247),
      authorId: 1,
      approverId: 2,
      clubId: 2,
    })
  }
}
