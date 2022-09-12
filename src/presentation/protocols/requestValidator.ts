export interface ReqValidationResult {
  result: boolean
  error?: string
}

export interface RequestValidator {
  isValid: (reqData: any) => Promise<ReqValidationResult>
  // TIPAR O FORMATO DA REQ
}
