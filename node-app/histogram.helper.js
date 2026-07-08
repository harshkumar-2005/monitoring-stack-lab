import client from "prom-client";

const histogram = new client.Histogram({
    name: "histogram_http_req_total",
    help: "this the histogram",
    labelNames: ["method", "route", "status_code"],
    buckets: [0.1, 5, 15, 50, 100, 300, 500, 1000, 3000, 5000],
});

export default histogram;