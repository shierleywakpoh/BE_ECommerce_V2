import { Request, Response } from "express";
import { ProductService } from "../services/product.service";

export class Product {
  productService: ProductService;
  constructor() {
    this.productService = new ProductService();
  }
  async create(req: Request, res: Response) {
    let newPathImages: string[] = [];

    try {
      const value = JSON.parse(req.body.productData);
      console.log("value", value);

      let pathImages = req.files as Express.Multer.File[];

      if (pathImages) {
        pathImages?.map((value: any, index: any) => {
          newPathImages.push(pathImages[index].path.replace(/\\/g, "/"));
        });

        
      } else {
        throw new Error("file is required");
      }

      await this.productService.create(
        value.name,
        value.description,
        value.category,
        value.price,
        value.offerPrice,
        newPathImages
      );

      return res.status(201).json({ message: "Added product is sucessfully" });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
  async getAll(req: Request, res: Response) {
    try {
      const result = await this.productService.getAll();
      res
        .status(200)
        .json({ result: result, message: "fetch data successfully" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
  async getById(req: Request, res: Response) {
    try {
      const value = Number(req.params.id as string);
      const result = await this.productService.getById(value);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
  async updateById(req: Request, res: Response) {
    const id = req.params.id as string;
    console.log("id", id);
    const { instock } = req.body;
    console.log("instock", instock);

    try {
      await this.productService.updateById(
        id,

        instock
      );

      return res.status(200).json({ message: "Changed item is successfully" });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
  async deleteById(req: Request, res: Response) {
    const id = req.params.id as string;

    try {
      await this.productService.deleteById(id);

      return res
        .status(200)
        .json({ message: "Deleted product is successfully" });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
  async search(req: Request, res: Response) {
    const { search } = req.params;
    try {
      const result = await this.productService.search(search as string);
      res.json({ result });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}
