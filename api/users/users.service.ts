// src/Users/Users.service.ts

/**
 * Data Model Interfaces
 */
import { BaseUser, User } from "./user.interface";
import { Users } from "./users.interface";
import * as path from "path";
import { Low, JSONFile } from "lowdb";
import { fileURLToPath } from "url";
import * as fs from "fs";

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

export const findAll = async (): Promise<User[]> => {
  let iUsers = (await readFile(
    path.resolve(__dirname, "../data/users.json")
  )) as Object;
  writeFile(iUsers);

  return Object.values(iUsers);
};

export const login = async (password: string, email: string): Promise<User> => {
  let Users = (await readFile(
    path.resolve(__dirname, "../data/users.json")
  )) as Object;
  let iUsers: User[] = Object.values(Users);
  let user: User = { id: "", email: "", name: "", password: "" };

  for (let i = 0; i < iUsers.length; i++) {
    if (iUsers[i].email === email && iUsers[i].password === password) {
      user = iUsers[i];
    }
  }
  return user;
};

export const create = async (newUser: BaseUser): Promise<User> => {
  let Users = (await readFile(
    path.resolve(__dirname, "../data/users.json")
  )) as Object;
  const id = new Date().valueOf().toString();
  let iUsers: User[] = Object.values(Users);

  iUsers.push({
    id,
    ...newUser,
  });

  fs.writeFileSync(
    path.resolve(__dirname, "../data/users.json"),
    convertArrayToJSON(iUsers)
  );

  // writeFile();
  return iUsers[iUsers.length - 1];
};

// export const update = async (
//   id: number,
//   UserUpdate: User
// ): Promise<User | null> => {
//   const User = await find(id);

//   if (!User) {
//     return null;
//   }
//   console.log("UserUpdate:. ", UserUpdate)
//   let Users = (await readFile(
//     path.resolve(__dirname, "../data/users.json")
//   )) as Object;
//   let iUsers: User[] = Object.values(Users);

//   iUsers[id] = {  ...UserUpdate };

//   fs.writeFileSync(
//     path.resolve(__dirname, "../data/users.json"),
//     convertArrayToJSON(iUsers)
//   );

//   return iUsers[id];
// };

// export const remove = async (id: string): Promise<null | void> => {

//   const User = await find(id);

//   if (!User) {
//     return null;
//   }

//   let Users = (await readFile(
//     path.resolve(__dirname, "../data/users.json")
//   )) as Object;
//   let iUsers: User[] = Object.values(Users);

//    delete iUsers[id];

//   fs.writeFileSync(
//     path.resolve(__dirname, "../data/users.json"),
//     convertArrayToJSON(iUsers)
//   );

// };

export const writeFile = async (Users: any) => {
  console.log("Users: ", Users);
  fs.writeFileSync(
    path.resolve(__dirname, "../data/users.json"),
    JSON.stringify(Users)
  );
};

function convertArrayToJSON(Users: User[]) {
  console.log("Users[]: ", Users);

  let obj: Users = {};
  Users.forEach((User: User, index: number) => (obj[index] = User));

  // #2 Converting the object to JSON...
  let json = JSON.stringify(obj);

  console.log("json: ", json);
  return json;
}
