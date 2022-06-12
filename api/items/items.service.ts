// src/items/items.service.ts

/**
 * Data Model Interfaces
 */
import { BaseItem, Item } from "./item.interface";
import { Items } from "./items.interface";
import * as path from "path";
import { Low, JSONFile } from "lowdb";
import { fileURLToPath } from "url";
import * as fs from "fs";
 

let items: Items = {
  1: {
    id: 1,
    name: "Burger",
    price: 599,
    description: "Tasty",
    image: "https://cdn.auth0.com/blog/whatabyte/burger-sm.png",
  },
  2: {
    id: 2,
    name: "Pizza",
    price: 299,
    description: "Cheesy",
    image: "https://cdn.auth0.com/blog/whatabyte/pizza-sm.png",
  },
  3: {
    id: 3,
    name: "Tea",
    price: 199,
    description: "Informative",
    image: "https://cdn.auth0.com/blog/whatabyte/tea-sm.png",
  },
};

/**
 * Service Methods
 */

// read file
async function readFile(path: any) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", function (err, data) {
      if (err) {
        reject(err);
      }
      resolve(JSON.parse(data));
    });
  });
}

export const findAll = async (): Promise<Item[]> => {
  // let iItems = (await readFile(
  //   path.resolve(__dirname, "../data/db.json")
  // )) as Object;
  writeFile(items);

  return Object.values(items);
};

export const find = async (id: number): Promise<Item> => {
  let items = (await readFile(
    path.resolve(__dirname, "../data/db.json")
  )) as Object;
  let iItems: Item[] = Object.values(items).filter((item) => item.id === id);
  return iItems[0];
};

export const create = async (newItem: BaseItem): Promise<Item> => {
  let items = (await readFile(
    path.resolve(__dirname, "../data/db.json")
  )) as Object;
  const id = new Date().valueOf();
  let iItems: Item[] = Object.values(items);

  iItems.push({
    id,
    ...newItem,
  });

  fs.writeFileSync(
    path.resolve(__dirname, "../data/db.json"),
    convertArrayToJSON(iItems)
  );

  // writeFile();
  return iItems[id];
};

export const update = async (
  id: number,
  itemUpdate: Item
): Promise<Item | null> => {
  const item = await find(id);
  
  if (!item) {
    return null;
  }
  console.log("itemUpdate:. ", itemUpdate)
  let items = (await readFile(
    path.resolve(__dirname, "../data/db.json")
  )) as Object;
  let iItems: Item[] = Object.values(items);

  iItems[id] = {  ...itemUpdate };

  fs.writeFileSync(
    path.resolve(__dirname, "../data/db.json"),
    convertArrayToJSON(iItems)
  );

  return iItems[id];
};

export const remove = async (id: number): Promise<null | void> => {
 
  const item = await find(id);

  if (!item) {
    return null;
  }

  let items = (await readFile(
    path.resolve(__dirname, "../data/db.json")
  )) as Object;
  let iItems: Item[] = Object.values(items);

   delete iItems[id];
   
  fs.writeFileSync(
    path.resolve(__dirname, "../data/db.json"),
    convertArrayToJSON(iItems)
  );

  
};

export const writeFile = async (items: any) => {
  console.log("items: ", items);
  fs.writeFileSync(
    path.resolve(__dirname, "../data/db.json"),
    JSON.stringify(items)
  );
};

function convertArrayToJSON(items: Item[]) {
  console.log("items[]: ", items);

  let obj: Items = {};
  items.forEach((item: Item, index: number) => (obj[index] = item));

  // #2 Converting the object to JSON...
  let json = JSON.stringify(obj);

  console.log("json: ", json);
  return json;
}
