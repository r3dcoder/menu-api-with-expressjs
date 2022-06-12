/**
 * Required External Modules and Interfaces
 */

 import express, { Request, Response } from "express";
 import * as UserService from "./users.service";
 import { BaseUser, User } from "./user.interface";

/**
 * Router Definition
 */
 export const usersRouter = express.Router();

/**
 * Controller Definitions
 */

// GET Users
usersRouter.get("/", async (req: Request, res: Response) => {
    try {
      const Users: User[] = await UserService.findAll();
  
      res.status(200).json(Users);
    } catch (e:any) {
      res.status(500).send(e.message);
    }
  });

// GET Users/:id
usersRouter.post("/login", async (req: Request, res: Response) => {

  console.log(req.body)
    const {email, password}:{email:string, password:string} = req.body;
    // const email: string = req.params.email;
    // const password: string = "";
    // const password: string = req.params.password;
  
    try {
      const User: User = await UserService.login(password, email);
  
      if (User.email) {
        return res.status(200).send(User);
      }
  
      res.status(404).send("User not found");
    } catch (e:any) {
      res.status(500).send(e.message);
    }
  });
  // GET Users
usersRouter.get("/test", async (req: Request, res: Response) => {
  try {
    const Users: User[] = await UserService.findAll();
  
      res.status(200).send(Users);
  } catch (e:any) {
    res.status(500).send(e.message);
  }
});

  // POST Users
  
  usersRouter.post("/", async (req: Request, res: Response) => {
    try {
      const User: BaseUser = req.body;
  
      const newUser = await UserService.create(User);
  
      res.status(201).json(newUser);
    } catch (e:any) {
      res.status(500).send(e.message);
    }
  });
  
  // PUT Users/:id
  
  // usersRouter.put("/:id", async (req: Request, res: Response) => {
  //   const id: number = parseInt(req.params.id, 10);
  
  //   try {
  //     const UserUpdate: User = req.body;
  
  //     const existingUser: User = await UserService.find(id);
  
  //     if (existingUser) {
  //       const updatedUser = await UserService.update(id, UserUpdate);
  //       return res.status(200).json(updatedUser);
  //     }
  
  //     const newUser = await UserService.create(UserUpdate);
  
  //     res.status(201).json(newUser);
  //   } catch (e:any) {
  //     res.status(500).send(e.message);
  //   }
  // });
  
  // DELETE Users/:id
  
  // usersRouter.delete("/:id", async (req: Request, res: Response) => {
  //   try {
  //     const id: number = parseInt(req.params.id, 10);
  //     await UserService.remove(id);
  
  //     res.sendStatus(204);
  //   } catch (e:any) {
  //     res.status(500).send(e.message);
  //   }
  // });