import { ItemModel, ItemsValidationResult } from '../../domain/ItemsValidator'

export interface ValidateItemsRepository {
  isValid: (items: ItemModel[]) => Promise<ItemsValidationResult>
}
