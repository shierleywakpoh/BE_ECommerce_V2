import express from "express";
import { AddressController } from "../controllers/address.controller";

const router = express.Router();

const address = new AddressController();

router.post(
  "/",

  address.createAddress.bind(address)
);
router.get("/", address.GetAddress.bind(address));

export default router;
