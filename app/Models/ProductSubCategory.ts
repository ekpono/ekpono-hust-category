import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import ProductCategory from './ProductCategory'

export default class ProductSubCategory extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name:string

  @column()
  public product_category_id: number

  @column()
  public status: boolean

  @belongsTo(() => ProductSubCategory, {
    foreignKey: 'id', 
  })
  public category: BelongsTo<typeof ProductSubCategory>
}
