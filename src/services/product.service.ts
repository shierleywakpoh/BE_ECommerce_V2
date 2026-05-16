import { ProductRepository } from "../repositories/product.repository";
import { Errorr } from "../utils/error.util";
import { products } from "../models/product.models";

export class ProductService {
  productRepository: ProductRepository;
  error: Errorr;
  constructor() {
    this.productRepository = new ProductRepository();
    this.error = new Errorr();
  }
  async create(
    name: string,
    description: string,
    category: string,
    price: number,
    offerPrice: number,
    newPathImages: string[]
  ): Promise<void> {
    try {
      console.log(
        name,
        description,
        category,
        price,
        offerPrice,
        newPathImages
      );
      await this.productRepository.create(
        name,
        description,
        category,
        price,
        offerPrice,
        newPathImages
      );
      /**
       *
       */
    } catch (error: any) {
      return this.error.GenerateError(error);
    }
  }
  async getAll(): Promise<products[]> {
    try {
      return await this.productRepository.getAll();
    } catch (error: any) {
      return this.error.GenerateError(error);
    }
  }
  async getById(id: number): Promise<products> {
    try {
      return await this.productRepository.getById(id);
    } catch (error: any) {
      return this.error.GenerateError(error);
    }
  }
  async updateById(id: string, instock: boolean): Promise<void> {
    try {
      await this.productRepository.updateById(id, instock);
    } catch (error: any) {
      return this.error.GenerateError(error);
    }
  }
  async deleteById(id: string): Promise<void> {
    try {
      console.log("id1", id);
      await this.productRepository.deleteById(id);
    } catch (error: any) {
      return this.error.GenerateError(error);
    }
  }
  async search(search: string): Promise<products[]> {
    try {
      return await this.productRepository.search(search);
    } catch (error: any) {
      return this.error.GenerateError(error);
    }
  }
}
