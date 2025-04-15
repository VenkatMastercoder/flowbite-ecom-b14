import React, { useState } from "react";
import ComponentB from "../ComponentB/ComponentB";

const ComponentA = () => {
  const [user, setUser] = useState("Ram");

  // const handleChange = (data) => {
  //   setUser(data)
  // }

  return (
    <div>
      <div className="border border-red-500">
        <p>- ComponentA -</p>
        <p>{user}</p>

        <button onClick={() => setUser("Sam")} className="bg-blue-500">
          Change by ComponentA
        </button>
      </div>

      {/* <ComponentB data={user} handleChange={handleChange} /> */}
    </div>
  );
};

export default ComponentA;
