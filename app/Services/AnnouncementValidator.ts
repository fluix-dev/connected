import { rules, schema } from '@ioc:Adonis/Core/Validator'

export default class AnnouncementValidator {
  public schema = schema.create({
    title: schema.string({}),
    description: schema.string({}, [ rules.maxLength(10000) ]),
    club: schema.number(),
    date: schema.date({
      format: 'yyyy-MM-dd',
    }),
  })

  public cacheKey = 'announcementValidator'
}
