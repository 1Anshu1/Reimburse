const errorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Something went wrong";

    res.status(Number(err.statusCode)).json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
};

const notFound = (req, res) => {
    res.status(404).json({ message: "Invalid path" });
};
export { errorMiddleware, notFound };
