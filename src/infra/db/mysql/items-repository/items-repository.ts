import { ValidateItemsRepository } from '../../../../data/protocols/validate-items-repository'
import { ValidateItemModel } from '../../../../domain/usecases/validate-items'
import { ItemModel } from '../../../../domain/models/item'
import database from '../../knex/helper/knex-helper'

export class ItemsMySQLRepository implements ValidateItemsRepository {
  async validate (items: ValidateItemModel[]): Promise<ItemModel[]> {
    const itemsValidationResult: ItemModel[] = []

    for (const item of items) {
      const result = await database.select().table('tbl_item').where('external_id_item', item.id)
      const verifiedItem = result as unknown as ItemModel
      if (verifiedItem[0]) itemsValidationResult.push(verifiedItem[0])
    }
    return itemsValidationResult
  }
}
