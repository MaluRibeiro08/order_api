import { string, number, array, object } from 'yup'
import { RequestValidator, ReqValidationResult } from '../presentation/protocols/requestValidator'

export class YupRequestValidator implements RequestValidator {
  async isValid (reqData: string): Promise<ReqValidationResult> {
    try {
      await CustomerSchema.validate(reqData, { abortEarly: false })
      return {
        result: true
      }
    } catch (error) {
      return {
        result: false,
        error: error.errors
      }
    }
  }
}

export const CustomerSchema = object().shape({
  customer: object().shape({
    name: string().matches(/^[aA-zZ\s]+$/, "Costumer's name can't have numbers or be empty").required(),
    document: string().matches(/^[0-9]{11}/, 'Document should have 11 numbers').required()
  }),
  items: array().of(object().shape({
    id: string().uuid('Invalid item id format').required(),
    amount: number().positive().integer().min(1).required()
  })).required(),
  address: object().shape({
    zip_code: string().matches(/^[0-9]{8}/, 'Zip-code must have 8 digits and the must be numbers').required(), // /^[0-9]{5}-[0-9]{3}/
    house_number: string().required(),
    street: string().required(),
    neighborhood: string().required(),
    city: string().required(),
    uf: string().required().length(2),
    complement: string(),
    reference: string().required()
  }).required()
})
