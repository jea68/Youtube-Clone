import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Similar to makign a FLASK or FAST api, we just made an express API in typescript
// above is a GET endpoint we have created => when a get request made at "/" we execute the function => res.send


app.listen(port, () => {
    console.log(`Video processing service listening at http://localhost:${port}`);
})


// above is Starting our Server which is on our port (in FAST the server is started in the terminal via a link)