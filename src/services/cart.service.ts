import { pool } from "../config/db";
import { CartRepository } from "../repositories/cart.repository";
import { Errorr } from "../utils/error.util";
import { carts } from "../models/cart.models";
import { ProductRepository } from "../repositories/product.repository";

export class CartService {
  cartRepository: CartRepository;
  error: Errorr;
  productRepository: ProductRepository;
  constructor() {
    this.cartRepository = new CartRepository();
    this.error = new Errorr();
    this.productRepository = new ProductRepository();
  }
  async create(id: string, productId: number, quantity: number): Promise<void> {
    try {
      const findId = await this.cartRepository.findEmail(id);

      await this.cartRepository.createCartItems(findId, productId, quantity);
    } catch (error: any) {
      return this.error.GenerateError(error);
    }
  }
  async getById(id: string): Promise<carts[]> {
    try {
      const resultGet = await this.cartRepository.getCart(id);

      return resultGet;
    } catch (error: any) {
      return this.error.GenerateError(error);
    }
  }
  async update(id: number, quantity: number, productId: number): Promise<void> {
    console.log(id, quantity, productId);
    try {
      await this.cartRepository.updateCart(id, quantity, productId);


    } catch (error: any) {
      return this.error.GenerateError(error);
    }
  }
  async delete(id: number): Promise<void> {
    try {
   
      await this.cartRepository.deleteCart(id);
    } catch (error: any) {
      return this.error.GenerateError(error);
    }
  }
}
