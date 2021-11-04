import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductCategory from 'App/Models/ProductCategory'
import CreateProductCategory  from 'App/Validators/CreateProductCategoryValidator'
import UpdateProductCategory  from 'App/Validators/UpdateProductCategoryValidator'

export default class ProductCategoriesController {

  public async index (ctx: HttpContextContract) {
    const page = ctx.request.input('page', 1)
    const limit = 10
    let product = await ProductCategory.query().paginate(page, limit)

    return ctx.response.json({
      data: product,
      status: 200,
      message: 'Product successfully fetched'
    })
  }

  public async store (ctx: HttpContextContract) {

    try {
      const payload = await ctx.request.validate(CreateProductCategory)
      const product = await ProductCategory.create(payload);

      return ctx.response.json({
        data: await ProductCategory.find(product.id),
        status: 200,
        message: 'Product category successfully created'
    })
    }catch(error) {
      ctx.response.badRequest({
        data: error.messages.errors,
        status: 401,
        message: 'Something went wrong'
      })
    }
  }

  public async show (ctx: HttpContextContract) {
    let productId = ctx.request.params().id;
    try{
      const productCategory = await ProductCategory.find(productId);

      if(productCategory) {
        return ctx.response.json({
          data: productCategory,
          status: 200,
          message: 'Product Category successfully fetched'
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
    let productCatId = ctx.request.params().id;
    let productCategory = await ProductCategory.find(productCatId)

    await ctx.request.validate(UpdateProductCategory)

    try{
      if(productCategory) {
        productCategory.name = ctx.request.input('name')
        productCategory.status = ctx.request.input('status')
        productCategory.save()
        return ctx.response.json({
          data: productCategory,
          status: 200,
          message: 'Product successful updated'
        })
      }
      return ctx.response.status(404).json({
        data: [],
        status: 404,
        message: 'Product Category Not found'
      })
    }catch(error) {
      return ctx.response.json(error)
    }

  }

  public async destroy (ctx: HttpContextContract) {
    let productId = ctx.request.params().id;
    const product = (await ProductCategory.find(productId))?.delete()
    
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
