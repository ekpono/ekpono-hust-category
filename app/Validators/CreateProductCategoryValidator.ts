import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateProductCategoryValidator {
  constructor (protected ctx: HttpContextContract) {
	  console.log(this.ctx.params.id);
	  
  }
  
  public schema = schema.create({

	name: schema.string({ trim: true }, [
		rules.unique({table: 'product_categories', column: 'name' }),
		rules.minLength(2),
		rules.maxLength(40)
	]),

	status: schema.boolean()

  })

  public messages = {}
  
}
