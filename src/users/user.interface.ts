// src/Users/User.interface.ts

export interface BaseUser {
    name: string;
    email: string;
    password: string;
    image?: string;
  }
  
  export interface User extends BaseUser {
    id: string;
  }