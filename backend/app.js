    const express = require('express');

    const cors = require('cors');

    const cookieParser  = require('cookie-parser');
    const {errorHandler , notFound } = require("./middlewares/errorMiddleware");

    const authRoutes = require("./routes/authRoutes")
    const app = express();

    app.use(cors({
        origin:process.env.CLIENT_URL || "http:localhost:3000",
        crediantials: true,
    })
);

app.use(express.json({limit: "10kb"}));
app.use(express.urlencoded({extended: true}));

app.use(cookieParser());

app.get("/health", (req, res)=>{
    res.status(200).json({sucess:true, message: "Jobbr api is running"});
})

app.use("/api/auth", authRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;