const TryCatch = (func) => {
    return async (req, res, next) => {
        try {
            await func(req, res, next);
        }
        catch (error) {
            res.status(500).json({
                message: error.message,
                success: false
            });
        }
    };
};
export default TryCatch;
//# sourceMappingURL=TryCatchBlock.js.map