import client from "prom-client";

const counterMetric = new client.Counter({
    name: "http_req_total",
    help: "Total number of HTTP req",
    labelNames: ["method", "route", "status_code"]
});

export default counterMetric;