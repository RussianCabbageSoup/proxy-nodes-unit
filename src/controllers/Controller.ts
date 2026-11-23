import type { NextFunction, Request, Response } from "express";
import ApiError from "../error/ApiError.js";
import type { ProxyRequest } from "../types/types.js";
import axios from "axios";

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
            const { currentIndex, chain, targetUrl, method, length }: ProxyRequest = req.body || {};

            if (currentIndex === undefined || currentIndex === null) return next(ApiError.badRequest('currentIndex is not defined'));
            if (!chain) return next(ApiError.badRequest('chain is not defined'));
            if (!method) return next(ApiError.badRequest('method is not defined'));
            if (!targetUrl) return next(ApiError.badRequest('targetUrl is not defined'));
            if (!length) return next(ApiError.badRequest('length is not defined'));

            if (currentIndex === length - 1) {
                try {
                    const { data } = await axios.request({
                        url: targetUrl,
                        method,
                        timeout: 20000
                    });
                    return res.json(data);
                } catch (error) {
                    return next(ApiError.internal(`Error on last node: ${error}`));
                }
            }

            const { data } = await axios.post(`${chain[currentIndex + 1]?.domain}/proxy`, {
                targetUrl,
                method,
                chain,
                length,
                currentIndex: currentIndex + 1
            }, { timeout: 20000 });
            return res.json(data);
        } catch (error) {
            next(error);
        }
    }
}

export default new Controller();