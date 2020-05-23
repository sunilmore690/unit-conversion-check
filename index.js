const express = require("express");
const bodyParser = require("body-parser");
var serveStatic = require("serve-static");
const cors = require("cors");

const {f2c,f2k,f2r,r2c,r2f,r2k,c2f,c2k,c2r,cups2liters,k2c,k2f,k2r,liters2cups} = require('./conversion')
let app = express();
app.use(cors());
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(serveStatic("app/build", { index: ["index.html", "index.html"] }));

const conversion = {
  fahrenheit: {
    rankine: f2r,
    kelvin: f2k,
    celsius: f2c,
  },
  rankine: {
    fahrenheit: r2f,
    kelvin: r2k,
    celsius: r2c,
  },
  kelvin: {
    fahrenheit: k2f,
    rankine: k2r,
    celsius: k2c,
  },
  celsius: {
    fahrenheit: c2f,
    rankine: c2r,
    kelvin: c2k,
  },
  cups: {
    liters: cups2liters,
  },
  liters: {
    cups: liters2cups,
  },
};
app.post("/checkconversion", (req, res, next) => {
  console.log("body", req.body);
  const {
    srcUnit = "",
    destUnit = "",
    inputValue = 1,
    outputValue = 1,
  } = req.body;
  const converstionOptions = conversion[srcUnit.toLowerCase()];
  if (!converstionOptions) return res.json({ status: "invalid" });
  if (!converstionOptions[destUnit.toLowerCase()])
    return res.json({ status: "invalid" });
  let output = converstionOptions[destUnit.toLowerCase()](Number(inputValue));
  output = Number(output).toFixed(2);
  let ouput_value = Number(outputValue).toFixed(2);
  console.log("output", output);
  console.log("ouput_value", ouput_value);
  if (output !== ouput_value) {
   return res.json({
      status: "incorrect",
      input: output,
      output: ouput_value,
    });
  }
  res.json({
      status:'correct',
      input: output,
      output: ouput_value,
  })
});
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server listening on ${app.get("port")}`);
});
