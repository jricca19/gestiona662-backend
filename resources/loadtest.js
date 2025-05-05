import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
    vus: 10, // Number of virtual users
    duration: "10s", // Duration of the test
};

const BASE_URL = "http://localhost:3000"; // Replace with your server URL
const TOKEN = __ENV.AUTH_TOKEN;

export default function () {
    const headers = {
        headers: {
            Authorization: `Bearer ${TOKEN}`,
        },
    };
    const res = http.get(`${BASE_URL}/v1/`, headers);

    check(res, {
        "status is 200": (r) => r.status === 200,
    });
    sleep(1); // Sleep for 1 second between requests
    // Add more requests here if needed
}