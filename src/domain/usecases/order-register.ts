import { ValidateItemModel } from '../../domain/usecases/validate-items'
import { HttpResponse } from '../../presentation/protocols/http'

export interface RegistrateOrderModel {
  customer: {
    name: string
    document: string
  }
  items: ValidateItemModel[]
  address:
  {
    zip_code: string
    house_number: string
    street: string
    neighborhood: string
    city: string
    uf: string
    complement: string
    reference: string
  }
}

export interface RegistrateOrder {
  registrate: (orderData: RegistrateOrderModel) => Promise<HttpResponse>
}
