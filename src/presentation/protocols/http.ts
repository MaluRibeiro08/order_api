export interface HttpResponse {
  statusCode: number
  body: any
}

export interface HttpRequest {
  body?: any // Se for uma req GET, não tem body, por isso é opcional (?). Esse body, pode ser bem diverso, por isso any
}
