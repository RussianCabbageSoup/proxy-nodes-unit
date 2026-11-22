export default class ApiError extends Error {
    public code: number;

    constructor(code: number, message: string) {
        super(message);
        this.code = code;
        this.message = message;
    }
    
    static badRequest(message: string) {
        return new ApiError(400, message);
    }

    static notFound(message: string) {
        return new ApiError(404, message);
    }

    static internal(message: string) {
        return new ApiError(500, message);
    }
}