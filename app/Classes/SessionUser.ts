import User from '../Models/User'
import UserData from 'App/Classes/UserData'

export default class SessionUser implements UserData {
  public id: number
  public email: string
  public isStaff: boolean

  constructor ({ id, email, isStaff }) {
    this.id = id
    this.email = email
    this.isStaff = isStaff
  }

  public async getUser () {
    return await User.findBy('id', this.id)
  }
}
