const express = require("express");
const mainRouter = require("./routes/index.js");
const PORT = 3000;
const cors= require("cors");

const app = express();

app.use(cors({}));
app.use(express.json());

app.use("/app/v1", mainRouter);

app.listen(PORT, ()=>{
    console.log("Running on PORT - ",{PORT});
})

// api/v1/user/signup
// api/v1/user/signin
// api/v1/user/changePassword

// api/v1/account/transferMoney
// api/v1/account/balance


