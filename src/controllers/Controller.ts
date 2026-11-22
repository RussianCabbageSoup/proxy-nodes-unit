import type { NextFunction, Request, Response } from "express";
import ApiError from "../error/ApiError.js";

class Controller {
    async health(req: Request, res: Response, next: NextFunction) {
        try {
            const domain = process.env.PROXY_HOST;
            if (!domain) return next(ApiError.internal('Proxy host is not defined'));

            return res.json({
                'status': 'OK',
                'domain': `${domain}:${process.env.PORT}`
            });
        } catch (error) {
            next(error);
        }
    }

    async proxy(req: Request, res: Response, next: NextFunction) {
        try {

            
        } catch (error) {
            next(error);
        }
    }
}

export default new Controller();