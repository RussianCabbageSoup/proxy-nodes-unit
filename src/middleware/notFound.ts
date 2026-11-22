import type { NextFunction, Request, Response } from "express";

export default function(req: Request, res: Response, next: NextFunction) {
    return res.status(404).json({ 'error': `${req.method} ${req.originalUrl} is not found` });
}