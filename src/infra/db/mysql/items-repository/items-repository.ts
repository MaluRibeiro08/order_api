import { ValidateItemsRepository } from '../../../../data/protocols/validate-items-repository'
import { ItemModel, ItemsValidationResult } from '../../../../domain/ItemsValidator'

export class ItemsMySQLRepository implements ValidateItemsRepository {
  async isValid (items: ItemModel[]): Promise<ItemsValidationResult> {
    return await new Promise((resolve) => ({
      result: true,
      error: 'teste'
    })
    )
  }
}
