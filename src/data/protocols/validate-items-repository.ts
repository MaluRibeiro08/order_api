import { ValidateItemModel } from '../../domain/usecases/validate-items'
import { ItemModel } from '../../domain/models/item'

export interface ValidateItemsRepository {
  validate: (items: ValidateItemModel[]) => Promise<ItemModel[]>
}
