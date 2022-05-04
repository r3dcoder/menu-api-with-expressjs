/**
 * Required External Modules and Interfaces
 */

import { BaseItem, Item } from "../items/item.interface";
import * as ItemService from "../items/items.service";
import * as fs from "fs";


import multer, { FileFilterCallback } from 'multer'
import express, { Request, Response } from "express";

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

export const storage = multer.diskStorage({
  destination: function (req: Request, _file: any, cb: any) {
    const dir = './src/assets/';
    cb(null, dir)
    // fs.mkdir(dir, (err) => {
    //   cb(err, dir)
    // });
  },
  filename: function (_req: Request, file: any, cb: any) {
    cb(null, new Date().toISOString() + file.originalname)
  }
});

const upload = multer({
  storage: storage
});

/**
 * Router Definition
 */
export const fileUploadRouter = express.Router();

/**
 * Controller Definitions
 */
 
 

// POST items

fileUploadRouter.post("/", upload.single("itemImage"), async (req: Request, res: Response) => {
  try {
    let item: BaseItem = req.body;
    item.image = req?.file?.path||"";
    const newItem = await ItemService.create(item);

    res.status(201).json(newItem);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});


// fileUploadRouter.post("/id", upload.single("itemImage"), async (req: Request, res: Response) => {
//   try {
//     let item: BaseItem = req.body;
//     item.image = req?.file?.path||"";
//     console.log(req)
//     const newItem = await ItemService.create(item);

//     res.status(201).json(newItem);
//   } catch (e: any) {
//     res.status(500).send(e.message);
//   }
// });

// PUT items/:id

fileUploadRouter.post("/:id", upload.single("itemImage"), async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
   try {
    const itemUpdate: Item = req.body;
    itemUpdate.id = id;
    itemUpdate.image = req?.file?.path||"";
    console.log("hi ",req);
    const existingItem: Item = await ItemService.find(id);
     if (existingItem) {
      const updatedItem = await ItemService.update(id, itemUpdate);
      return res.status(200).json(updatedItem);
    }

    const newItem = await ItemService.create(itemUpdate);

    res.status(201).json(newItem);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

// DELETE items/:id

fileUploadRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    await ItemService.remove(id);

    res.sendStatus(204);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});