import Announcement from 'App/Models/Announcement'
import { Exception } from '@poppinss/utils'
import UserData from 'App/Classes/UserData'

export default class AnnouncementService {
  public static async getAnnouncement (id: number, user? : UserData) {
    const announcement = await Announcement.findBy('id', id)
    if (!announcement) {
      throw new Exception('Announcement not found!', 404)
    }
    if (user && !announcement.isViewableBy(user)) {
      throw new Exception('You are not authorized to view this announcement!', 404)
    }
    return announcement
  }
}
