import React from "react";

const ComponentB = (props) => {
  console.log(props);

  const { user, handleChange } = props;

  // 1. onChange={()=>setData("Sdfvfsd")} -  When Ever Your Senting a Props
  // 2. onChage={handleChange} - Only Call A Function

  return (
    <div>
      <div className="border border-red-500">
        <p>- ComponentB -</p>
        <p>{user}</p>

        <button className="bg-blue-500" onClick={() => handleChange("Sam")}>
          Change ComponentB
        </button>
      </div>
    </div>
  );
};

export default ComponentB;
