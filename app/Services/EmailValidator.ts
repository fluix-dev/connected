import { rules, schema } from '@ioc:Adonis/Core/Validator'

export default class EmailValidator {
  public schema = schema.create({
    email: schema.string({}, [ rules.maxLength(50) ]),
  })

  public cacheKey = 'emailValidator'
}
