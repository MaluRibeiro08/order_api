import { ValidateItems, ValidateItemModel } from '../../domain/usecases/validate-items'
import { ValidateItemsRepository } from '../protocols/validate-items-repository'

export class DbValidateItems implements ValidateItems {
  private readonly validateItemsRepository: ValidateItemsRepository

  constructor (validateItemsRepository: ValidateItemsRepository) {
    this.validateItemsRepository = validateItemsRepository
  }

  async validate (items: ValidateItemModel[]): Promise<boolean> {
    const validItems = await this.validateItemsRepository.validate(items)
    if (validItems.length !== items.length) {
      throw new Error('Invalid item(s) provided')
    }
    return true
  }
}
