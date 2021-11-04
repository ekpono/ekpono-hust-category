import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'
import CreateProduct from 'App/Validators/CreateProductValidator'

export default class ProductsController {

  public async index (ctx: HttpContextContract) {
    let product = await Product.query().preload("category").preload('sub_category')

    return ctx.response.json({
      data: product,
      status: 200,
      message: 'Product successfully fetched'
    })
  }


  public async store (ctx: HttpContextContract) {
    try{
      const user = await ctx.auth.authenticate();      
      const payload = await ctx.request.validate(CreateProduct)
      const product = await Product.create(Object.assign(payload, {user_id: user.id}))

      ctx.response.json({
        data: await Product.find(product.id),
        status: 200,
        message: 'Product successfully created'
      })
    }catch(error) {
      ctx.response.status(422).json({
        data: error.messages.errors,
        status: 422,
        message: 'Something went wrong'
      })
    }
  }

  public async show (ctx: HttpContextContract) {
    let productId = ctx.request.params().id;
    try{
      const product = await Product.findBy('id', productId);

      if(product) {
        await product.load('category')
        await product.load('sub_category')
        
        return ctx.response.json({
          data: product,
          status: 200,
          message: 'Product successfully fetched'
        })
      }
      ctx.response.status(404).json({
        data: [],
        status: 404,
        message: 'Not record found'
      })
    }catch(error) {
      ctx.response.status(401).json({
        data: error.messages.errors,
        status: 401,
        message: 'Something went wrong'
      })
    }
  }

  public async update (ctx: HttpContextContract) {
    let productId = ctx.request.params().id;
    let product = await Product.find(productId)
      
    await ctx.request.validate(CreateProduct)

    if(product) {
      product.price = ctx.request.input('price') ?? product.price
      product.description = ctx.request.input('description') ?? product.description
      product.title = ctx.request.input('title') ?? product.title
      product.title = ctx.request.input('title') ?? product.title
      product.product_sub_category_id = ctx.request.input('product_sub_category_id') ?? product.product_sub_category_id
      product.product_category_id = ctx.request.input('product_category_id') ?? product.product_category_id
      product.save()
      return ctx.response.json({
        data: product,
        status: 200,
        message: 'Product successful updated'
      })
    }
  }

  public async destroy (ctx: HttpContextContract) {
    let productId = ctx.request.params().id;
    const user = await ctx.auth.authenticate();
    const product = await Product.query().where('user_id', user.id).where('id', productId).delete();

    if(product) {
      return ctx.response.json({
        data: [],
        status: 200,
        message: 'Delete successful'
      })
    }

    return ctx.response.status(404).json({
      data: [],
      status: 404,
      message: 'Product Not found'
    })
    
  }
}
