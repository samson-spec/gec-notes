// -------------------------------
// -------------------------------
// global error handling middleware
app.use((err, req, res, next) => {

    console.error("ERROR 💥", err);

    // Mongoose Validation Error
    if (err.name === "ValidationError") {

        const errors = {};

        Object.keys(err.errors).forEach((key) => {
            errors[key] = {
                message: err.errors[key].message,
            };
        });

        return res.status(400).json({
            status: "error",
            error: {
                errors,
            },
        });
    }

    // Duplicate key error (MongoDB)
    if (err.code === 11000) {
        return res.status(409).json({
            status: "error",
            error: {
                message: "Email already exists",
            },
        });
    }

    // Default error
    res.status(500).json({
        status: "error",
        error: {
            message: err.message,
        },
    });
});
// -------------------------------
// -------------------------------