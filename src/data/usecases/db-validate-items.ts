import { ItemModel } from '../../domain/models/item'
import { ValidateItems, ValidateItemModel } from '../../domain/usecases/validate-items'
import { ValidateItemsRepository } from '../protocols/validate-items-repository'

export class DbValidateItems implements ValidateItems {
  private readonly validateItemsRepository: ValidateItemsRepository

  constructor (validateItemsRepository: ValidateItemsRepository) {
    this.validateItemsRepository = validateItemsRepository
  }

  async validate (items: ValidateItemModel[]): Promise<ItemModel[]> {
    const itemsValidationResult = await this.validateItemsRepository.validate(items)
    return itemsValidationResult
  }
}
