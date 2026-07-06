import express from "express";
import morgan from "morgan";
import responseTime from "response-time";
import counterMetric from "./helper.js";
import masterRouter from "./routes/index.js";

const app = express();

const middleware = (req, res, next) => {
    res.on("finish", () => {
        // Increase the counter.
        counterMetric.inc({
            method: req.method,
            route: req.originalUrl,
            status_code: res.statusCode
        });
    });
    next();
}

app.use(express.json());

app.use(responseTime());

app.use(morgan(':method :url :status - :response-time ms'));

app.use(middleware);

app.use("/api/v1" ,masterRouter);

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "This is the home page"
    });
});

app.get("/health", (req, res) => {
    res.status(200).send("<h1>App is healthy....</h1>");
});

const PORT = 3000;

app.listen(PORT, ()=>{
    console.log(`App is running at http://localhost:${PORT}`);
})
