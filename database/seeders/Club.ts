import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Club from 'App/Models/Club'

export default class ClubSeeder extends BaseSeeder {
  public async run () {
    await Club.createMany([
      {
        name: 'Test Club 1',
      },
      {
        name: 'Test Club 2',
      },
    ])
  }
}
