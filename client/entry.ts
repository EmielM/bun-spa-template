import { apiGet } from "./api";

console.log("XXX");
console.log(await apiGet("hello", { name: "world" }));
