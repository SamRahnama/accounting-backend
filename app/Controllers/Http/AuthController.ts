import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import LoginValidator from 'App/Validators/LoginValidator'
import RegisterUserValidator from 'App/Validators/RegisterUserValidator'

export default class AuthController {
  public async login({auth, request}: HttpContextContract) {
    const payload = await request.validate(LoginValidator)
    const token = await auth.attempt(payload.email, payload.password)
    return {token}
  }

  public async register({request, auth}: HttpContextContract) {
    const payload = await request.validate(RegisterUserValidator)
    const rememberMe = payload.remember_me
    delete payload.remember_me
    const user = await User.create(payload)
    const token = await auth.attempt(payload.email, payload.password)
    return {user, token, rememberMe}
  }

  public async validate({auth}: HttpContextContract) {
    const isLoggedIn = await auth.check()
    return {isLoggedIn}
  }
  public async logout({auth}: HttpContextContract) {
    const result = await auth.logout()
    return {result}
  }
}
