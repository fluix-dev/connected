import { rules, schema } from '@ioc:Adonis/Core/Validator'

export default class ClubValidator {
  public schema = schema.create({
    name: schema.string({}, [ rules.maxLength(50) ]),
  })

  public cacheKey = 'clubValidator'
}
