import { Errorr } from "../utils/error.util";
import { AddressRepository } from "../repositories/address.repository";
import { address } from "../models/address.model";

export class AddressService {
  addressRepository: AddressRepository;
  error: Errorr;
  constructor() {
    this.addressRepository = new AddressRepository();
    this.error = new Errorr();
  }
  async createAddress(
    FirstName: string,
    LastName: string,
    Email: string,
    Street: string,
    City: string,
    State: string,
    Zipcode: number,
    Country: string,
    Phone: string
  ): Promise<void> {
    try {
      await this.addressRepository.createAddress(
        FirstName,
        LastName,
        Email,
        Street,
        City,
        State,
        Zipcode,
        Country,
        Phone
      );
    } catch (error: any) {
      return this.error.GenerateError(error);
    }
  }
  async GetAddress(): Promise<address[]> {
    try {
      return await this.addressRepository.GetAddress();
    } catch (error: any) {
      return this.error.GenerateError(error);
    }
  }
}
