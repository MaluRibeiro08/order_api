export interface RequestConsummator {
  startServer: () => Promise<void>
  saleRegister: (costumerItemsData: any) => Promise<boolean> // Deveria retornar o id/infos da Sale
  saleNotifier: (saleData: any) => Promise<boolean>
  saleDeliveryRegister: (saleAddresData: any) => Promise<boolean>
}
