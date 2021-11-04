import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import ProductCategory from './ProductCategory'
import ProductSubCategory from './ProductSubCategory'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number

  @column()
  public product_category_id: number

  @column()
  public product_sub_category_id: number

  @column()
  public title: string

  @column()
  public description?: string

  @column()
  public price: number
 
  @belongsTo(() => ProductCategory, {
    foreignKey: 'product_category_id', 
  })
  public category: BelongsTo<typeof ProductCategory>


  @belongsTo(() => ProductSubCategory, {
    foreignKey: 'product_sub_category_id', 
  })
  public sub_category: BelongsTo<typeof ProductSubCategory>
}
