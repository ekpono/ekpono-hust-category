import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import  ProductSubCatory  from 'App/Models/ProductSubCategory';
import CreateProductSubCategory from 'App/Validators/CreateSubProductCategoryValidator'


export default class ProductSubCategoriesController {
  
  public async index (ctx: HttpContextContract) {
    
    const page = ctx.request.qs().page ?? 1;
    const limit = 10

    let product = await ProductSubCatory.query().paginate(page, limit)

    return ctx.response.json({
      data: product,
      status: 200,
      message: 'Product Categories successfully fetched'
    })
  }

  public async store (ctx: HttpContextContract) {

    try {
      const payload = await ctx.request.validate(CreateProductSubCategory)
      const productSubCategory = await ProductSubCatory.create(payload);
      
      ctx.response.json({
        data: await ProductSubCatory.find(productSubCategory.id),
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
      const productCategory = await ProductSubCatory.find(productId);

      if(productCategory) {
        await productCategory.load('category')
    
        
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
    let productCategory = await ProductSubCatory.find(productCatId)
    
    if(productCategory) {
      productCategory.name = ctx.request.input('name')
      productCategory.product_category_id = ctx.request.input('product_category_id')
      productCategory.status = ctx.request.input('status')
      productCategory.save()
      return ctx.response.json({
        data: productCategory,
        status: 200,
        message: 'Product successful updated'
      })
    }
  }

  public async destroy (ctx: HttpContextContract) {
    let productCatId = ctx.request.params().id;
    const product = (await ProductSubCatory.find(productCatId))?.delete()
    
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
      message: 'Product Subcategory Not found'
    })
  }
}
