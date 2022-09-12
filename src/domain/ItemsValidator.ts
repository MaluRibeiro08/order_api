export interface ItemsValidationResult {
  result: boolean
  error?: string
}

export interface ItemModel {
  id: string
  amount: number
}

export interface isValid {
  validate: (items: ItemModel[]) => Promise<ItemsValidationResult>
}
