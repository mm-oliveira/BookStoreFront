export class RentBookModel {
  constructor(
    public rentBookId: number,
    public customerId: number,
    public bookId: number,
    public status?: number,
  ) {}
}

export class RentBookResponse {
  rentBookId: number = 0;
  customerId: number = 0;
}