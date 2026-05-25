import { pool } from "../config/db";
import { address } from "../models/address.model";
import { Errorr } from "../utils/error.util";

export class AddressRepository {
  error: Errorr;

  constructor() {
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
      const sql =
        "INSERT INTO address (first_name,last_name,email_address,street,city,state,zip_code,country,phone) VALUES ($1, $2, $3,$4,$5,$6,$7,$8,$9)";
      await pool.query(sql, [
        FirstName,
        LastName,
        Email,
        Street,
        City,
        State,
        Zipcode,
        Country,
        Phone,
      ]);
    } catch (error: any) {
      return this.error.GenerateError(error);
    }
  }
  async GetAddress(): Promise<address[]> {
    try {
      const sql = "SELECT * FROM address";
      return (await pool.query(sql)).rows;
    } catch (error: any) {
      return this.error.GenerateError(error);
    }
  }
}
