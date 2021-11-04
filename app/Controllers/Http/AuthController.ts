import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import CreateUser from 'App/Validators/CreateUserValidator'




export default class AuthController {

    public async register(ctx: HttpContextContract) {

        try{
            const payload = await ctx.request.validate(CreateUser)
            const user = await User.create(payload)
            
            //Todo: Send confirmation email

            // let newUser = await User.find(user.id);

            const token = await ctx.auth.use("api").login(user, {
                expiresIn: "10 days",
            });
            
            return ctx.response.json({
                data: token,
                status: 200,
                message: 'User successfully created'
            })
        }catch (error) {
            ctx.response.badRequest({
                data: error.messages.errors,
                status: 401,
                message: 'Something went wrong'
            })
        }
    }

    public async login(ctx: HttpContextContract) {

        const email = ctx.request.input('email')
        const password = ctx.request.input('password')

        try {
            const token = await (await ctx.auth.use('api').attempt(email, password))
            return ctx.response.json({token: token.token})
        } catch {
            return ctx.response.badRequest({
                data: null,
                status: 401,
                message: 'Invalid credentials'
            })
        }
    }
}
