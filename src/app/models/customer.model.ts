export class CustomerModel {
  constructor(
    public id: number,
    public name: string,
    public phone: string,
    public email: string,
    public address: string,    
    public documentNumber: string,
    public documentType: number,
  ) {}
}

export class CustomerResponse {
  id: number = 0;
  name: string = '';
  phone: string = '';
  email: string = '';
  address: string = '';    
  documentNumber: string = '';
  documentType: number = 0;
}