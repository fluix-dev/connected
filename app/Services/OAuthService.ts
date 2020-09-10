import { GoogleOAuth } from '@openauth/google'
import { clientConfig } from '../../config/oauth'

export default class OAuthService {
  private static client = new GoogleOAuth(clientConfig)

  public static async getRedirect (redirectUrl?: string) {
    return this.client.getAuthRequestUri(redirectUrl ? {
      state: redirectUrl,
    }: {})
  }

  public static async getUser (code: string) {
    const { accessToken } = await this.client.getAccessTokenResponse(code)
    return await this.client.getAuthUser(accessToken)
  }
}
