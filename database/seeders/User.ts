import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public static developmentOnly = true

  public async run () {
    await User.createMany([
      {
        email: 'example@tdsb.on.ca',
        isStaff: true,
      },
      {
        email: 'example@student.tdsb.on.ca',
        isStaff: false,
      },
    ])
  }
}
