import { ValidateItemsRepository } from '../../../../data/protocols/validate-items-repository'
import { ValidateItemModel } from '../../../../domain/usecases/validate-items'
import { ItemModel } from '../../../../domain/models/item'
import database from '../../knex/helper/knex-helper'

export class ItemsMySQLRepository implements ValidateItemsRepository {
  async validate (items: ValidateItemModel[]): Promise<ItemModel[]> {
    const itemsAmount = items.length

    let itemsValidationResult: ItemModel[]
    // eslint-disable-next-line prefer-const
    itemsValidationResult = []

    let i = 0

    while (i < itemsAmount) {
      const result = await database.select().table('tbl_item').where('external_id_item', items[i].id)
      const verifiedItem = result as unknown as ItemModel
      if (verifiedItem[0]) itemsValidationResult.push(verifiedItem[0])
      i += 1
    }
    return itemsValidationResult
  }
}
