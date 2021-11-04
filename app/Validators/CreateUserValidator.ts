import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserValidator {
  constructor (protected ctx: HttpContextContract) {
  }

  public schema = schema.create({

	email: schema.string({ trim: true }, [
		rules.email(),
		rules.unique({table: 'users', column: 'email'}),
		rules.minLength(4),
		rules.maxLength(40)
	]),

	username: schema.string({ trim: true }, [
		rules.unique({table: 'users', column: 'username'}),
		rules.minLength(3),
		rules.maxLength(40)
	]),

	password: schema.string({ trim: true }),

	first_name: schema.string({ trim: true }),

	last_name: schema.string({ trim: true }),

	gender: schema.enum(
		['male', 'female'] as const
	),

	contact_number: schema.string({ trim: true }),

	address: schema.string({ trim: true }),

  })

  public messages = {}
}
