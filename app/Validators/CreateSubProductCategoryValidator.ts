import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateSubProductCategoryValidator {
  constructor (protected ctx: HttpContextContract) {
  }
  public schema = schema.create({

	name: schema.string({ trim: true }, [
		rules.unique({table: 'product_sub_categories', column: 'name'}),
		rules.minLength(2),
		rules.maxLength(40)
	]),

	status: schema.boolean(),

	product_category_id: schema.number([
		rules.exists({ table: 'product_categories', column: 'id' })
	])
  })

  public messages = {}

}
