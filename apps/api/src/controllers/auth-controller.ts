import { Router, Request, Response } from "express";
import { login, LoginPayload, AuthService, UserService } from "app-domain";

export class AuthController {
    public router = Router();
    
    constructor(private authService: AuthService, private userService: UserService) {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post("/login", this.login.bind(this));
    }

    async login(req: Request, res: Response): Promise<void> {
        const payload: LoginPayload = req.body;
        const loginResponse = await login({
            authService: this.authService,
            userService: this.userService
        }, payload);

        res.status(200).json(loginResponse);
    }
}