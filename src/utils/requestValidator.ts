import { string, number, array, object } from 'yup'
import { RequestValidator } from '../presentation/protocols/requestValidator'

export class YupRequestValidator implements RequestValidator {
  async isValid (reqData: string): Promise<boolean> {
    try {
      await CustomerSchema.validate(reqData)
      return true
    } catch (error) {
      console.log(error.errors)
      return error.errors
    }
  }
}

export const CustomerSchema = object().shape({
  customer: object().shape({
    name: string().matches(/^[aA-zZ\s]+$/, "Costumer's name can't have numbers").required(),
    document: string().matches(/^[0-9]{11}/, 'Document should have 11 numbers').required()
  }),
  items: array().of(object().shape({
    id: string().matches(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i, 'Invalid item id format').required(),
    amount: number().positive().integer().min(1).required()
  })).required(),
  address: object().shape({
    zip_code: string().matches(/^[0-9]{8}/).required(), // /^[0-9]{5}-[0-9]{3}/
    house_number: string().required(),
    street: string().required(),
    neighborhood: string().required(),
    city: string().required(),
    uf: string().required().length(2),
    complement: string(),
    reference: string().required()
  }).required()
})
