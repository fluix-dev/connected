import { env } from '@adonisjs/env/build/standalone'

export const clientConfig = {
  clientId: env.getOrFail('OAUTH_CLIENT_ID') as string,
  clientSecret: env.getOrFail('OAUTH_SECRET') as string,
  redirectUri: env.getOrFail('OAUTH_DOMAIN') as string + '/auth',
  scope: [
    'email',
  ],
}

export const studentDomain = 'student.tdsb.on.ca'
export const staffDomain = 'tdsb.on.ca'
