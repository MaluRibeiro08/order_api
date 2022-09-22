export interface RequestConsummator {
  saleRegister: (costumerItemsData: any) => Promise<boolean> // Deveria retornar o id/infos da Sale
  saleNotifier: (saleData: any) => Promise<boolean>
  saleDeliveryRegister: (saleAddresData: any) => Promise<boolean>
}
