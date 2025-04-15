import { useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Counter = () => {
  let values = 10;

  // Create a Local State Variable
  let [value, setValue] = useState(10);

  let [names, setNames] = useState("Sam"); // Sam

  const [bool, setBool] = useState(true); // true

  return (
    <>
      <div className="border border-red-500 py-5">
        <div className="space-x-4">
          <p>Number Value</p>
          <p>{value}</p>
        </div>

        <div className="space-x-4">
          <button
            onClick={() => {
              setValue(value + 1);
              console.log(value);
            }}
            className="inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800">
            +
          </button>

          <button
            onClick={() => {
              setValue(0);
              console.log(value);
            }}
            className="inline-flex items-center rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800">
            Reset
          </button>

          <button
            onClick={() => {
              setValue(value - 1);
              console.log(value);
            }}
            className="inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800">
            -
          </button>
        </div>
      </div>

      <div className="border border-red-500 py-5">
        <div className="space-x-4">
          <p>String Value</p>
          <p>{names}</p>
        </div>

        <div className="space-x-4">
          <button
            onClick={() => {
              setNames("Ram");
            }}
            className="inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800">
            Change Name
          </button>
        </div>
      </div>

      <div className="border border-red-500 py-5">
        <div className="space-x-4">
          <p>Boolean Value</p>
          <p>{bool ? "🚀" : "❌"}</p>
        </div>

        <div className="space-x-4">
          <button
            onClick={() => {
              setBool(false);
              console.log(value);
            }}
            className="inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800">
            change State
          </button>
        </div>
      </div>
    </>
  );
};

export default Counter;
