import { Request, Response } from "express";
import { AddressService } from "../services/address.service";

export class AddressController {
  addressService: AddressService;
  constructor() {
    this.addressService = new AddressService();
  }

  async createAddress(req: Request, res: Response) {
    
    const {
      FirstName,
      LastName,
      Email,
      Street,
      City,
      State,
      Zipcode,
      Country,
      Phone,
    } = JSON.parse(req.body.address);
    if (
      !FirstName ||
      !LastName ||
      !Email ||
      !Street ||
      !City ||
      !State ||
      !Zipcode ||
      !Country ||
      !Phone
    ) {
      
      return res
        .status(400)
        .json({ message: "Email, name, and password are required" });
    }
    try {
      await this.addressService.createAddress(
        FirstName as string,
        LastName as string,
        Email as string,
        Street as string,
        City as string,
        State as string,
        Zipcode,
        Country as string,
        Phone as string
      );
      return res.status(201).json({ message: "Register succesfully" });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
  async GetAddress(req: Request, res: Response) {
    try {
      const result = await this.addressService.GetAddress();
      res
        .status(200)
        .json({ result: result, message: "fetch data successfully" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
