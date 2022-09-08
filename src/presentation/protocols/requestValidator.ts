export interface RequestValidator {
  isValid: (reqData: any) => Promise<boolean>
  // TIPAR O FORMATO DA REQ
}
