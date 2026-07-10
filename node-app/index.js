import express from "express";
import morgan from "morgan";
import responseTime from "response-time";
import CounterClient from "./counter.helper.js";
import GaugeClient from "./gauge.helper.js";
import HistogramClient from "./histogram.helper.js";
import masterRouter from "./routes/index.js";

const app = express();

const middleware = (req, res, next) => {

    if (req.originalUrl === "/api/v1/metrics") {
        return next();
    }

    let startTime = Date.now();

    // Increase the gauge value
    GaugeClient.inc({
        method: req.method,
        route: req.originalUrl,
    });

    res.on("finish", () => {
        let endTime = Date.now();
        let duration = endTime - startTime; 

        // Increase the counter.
        CounterClient.inc({
            method: req.method,
            route: req.originalUrl,
            status_code: res.statusCode
        });

        // Decrease the gauge value
        GaugeClient.dec({
            method: req.method,
            route: req.originalUrl,
        });

        // Observer the duration of time it takes 
        HistogramClient.observe({
            method: req.method,
            route: req.originalUrl,
            status_code: res.statusCode
        }, duration);
    });
    next();
}

app.use(express.json());

app.use(responseTime());

app.use(morgan(':method :url :status - :response-time ms'));

app.use(middleware);

app.use("/api/v1" ,masterRouter);

app.get("/", async (req, res) => {

    // await new Promise(resolve => setTimeout(resolve, 5000));

    res.status(200).json({
        success: true,
        message: "This is the home page"
    });
});

app.get("/health", (req, res) => {
    res.status(200).send("<h1>App is healthy....</h1>");
});

const PORT = 8080;

app.listen(PORT, ()=>{
    console.log(`App is running at http://localhost:${PORT}`);
})
