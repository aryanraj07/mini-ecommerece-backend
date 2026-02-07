import express from "express";
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
    return res.json({ status: "Server is up and runnings" });
});
app.listen(8000, () => {
    console.log("Server is listening on port 8000");
});
