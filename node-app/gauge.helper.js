import client from "prom-client";

const activeReqGauge = new client.Gauge({
    name: "active_http_request_total",
    help: "Total active request currently",
    labelNames: ["method", "route"],
});

export default activeReqGauge;