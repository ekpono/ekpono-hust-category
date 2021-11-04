import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProductValidator {
  constructor (protected ctx: HttpContextContract) {
  }

  public schema = schema.create({

	product_category_id: schema.number([
		rules.exists({ table: 'product_categories', column: 'id' }),
	]),

	product_sub_category_id: schema.number([
		rules.exists({ table: 'product_sub_categories', column: 'id' }),
	]),

	title: schema.string({ trim: true }),

	description: schema.string({ trim: true }),

	price: schema.number()
  })

  public messages = {}
}
