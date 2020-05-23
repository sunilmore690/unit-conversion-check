import React, { Component } from "react";
import "./styles.css";
import axios from "axios";
class ConversionCheck extends Component {
  state = {
    srcUnit: "Fahrenheit",
    destUnit: "Celsius",
    inputValue: 1,
    result: "",
    outputValue: 1,
    output:1,
    units: [
      "Fahrenheit",
      "Rankine",
      "Kelvin",
      "cups",
      "liters",
      "gallons",
      "Celsius",
      "dog"
    ]
  };
  handleChange = key => e => {
    console.log(key, e.target.value);
    this.setState({ [key]: e.target.value });
  }
  checkConversion = async () => {
    try {
      console.log(this.state);
      let response = await axios.post("/checkconversion", {
        ...this.state,
        units: undefined
      });
      // console.log("res", response.data);
      this.setState({ result: response.data.status,output:response.data.input });
    } catch (e) {
      console.error(e);
    }
  };
  render() {
    let appendClass = "circleBase ";
    if (this.state.result === "incorrect") {
      appendClass += "danger";
    } else if (this.state.result === "invalid") {
      appendClass += "warning";
    } else if (this.state.result === "correct") {
      appendClass += "success";
    }
    return (
      <div className="row container">
        <div className="col-sm-6 col-sm-offset-2">
          <div>
            <h4>Unit Conversion Check</h4>
          </div>
          <div className="form-group">
            <label>Input Value:</label>
            <input
              type="number"
              className="form-control"
              id="email"
              autoComplete="off"
              onChange={this.handleChange("inputValue")}
            />
          </div>
          <div className="form-group">
            <label>Unit of Measure:</label>
            <select
              className="form-control"
              onChange={this.handleChange("srcUnit")}
            >
              {this.state.units.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Target Unit of Measure:</label>
            <select
              className="form-control"
              onChange={this.handleChange("destUnit")}
              value={this.state.destUnit}
            >
              {this.state.units
                .filter((unit) => unit !== this.state.srcUnit)
                .map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
            </select>
          </div>
          <div className="form-group">
            <label> Student's numeric response</label>
            <input
              type="number"
              className="form-control"
              id="email"
              autoComplete="off"
              onChange={this.handleChange("outputValue")}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.checkConversion}
          >
            Check
          </button>
        </div>
        <div className="col-sm-4">
          {this.state.result ? (
            <>
              <div className={appendClass}>
                <span>{this.state.result}</span>
              </div>
              <div style={{ marginLeft: "50px", marginTop: "10px" }}>
                {this.state.result === "incorrect"
                  ? "Expected Output: " + this.state.output
                  : ""}
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  }
}
export default ConversionCheck;
