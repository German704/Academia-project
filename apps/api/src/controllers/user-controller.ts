// apps/api/src/controllers/UserController.ts

import { Router, Request, Response } from "express";
import { UserServiceImplement } from "../services/user-service-implement.js"; // Se sigue inyectando el servicio
// import { isUUID } from "class-validator";

import { register } from "app-domain";
import { AuthServiceImplement } from "../services/auth-service-implement.js";

export class UserController {
  public router = Router();

  constructor(
    private userService: UserServiceImplement,
    private authService: AuthServiceImplement
  ) {}

  async registerUser(req: Request, res: Response): Promise<void> {
    const payload = req.body;
    const newUser = await register(
      { userService: this.userService, authService: this.authService },
      payload
    );
    res.status(201).json(newUser);
  }
}
