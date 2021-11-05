import Route from '@ioc:Adonis/Core/Route'

Route.get('/', (ctx) => {
  ctx.response.send({message: 'Connection successful'})
})

Route.group(() => {

  Route.get('/', (ctx) => {
    ctx.response.send({message: 'api connected'})
  })

  Route.post('login',     'AuthController.login')
  Route.post('register', 'AuthController.register')

  Route.group(() => {
    Route.resource('products',             'ProductController')
    Route.resource('products/category',     'ProductCategoryController')
    Route.resource('products/sub_category', 'ProductSubCategoryController')
  }).middleware('auth:api')

}).prefix('/api/')

