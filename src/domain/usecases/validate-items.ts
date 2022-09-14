import { ItemModel } from '../models/item'

export interface ValidateItemModel {
  id: string
  amount: number
}

export interface ValidateItems {
  validate: (items: ValidateItemModel[]) => Promise<ItemModel[]>
}
