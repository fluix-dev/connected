declare module '@ioc:Adonis/Core/Request' {
  import SessionUser from 'App/Classes/SessionUser'

  interface RequestContract {
    user?: SessionUser
  }
}
