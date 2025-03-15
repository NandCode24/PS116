const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    console.error(`[ERROR] ${statusCode} - ${message}`);

    res.status(statusCode).json({
        success: false,
        error: message,
    });
};

export default errorHandler;
