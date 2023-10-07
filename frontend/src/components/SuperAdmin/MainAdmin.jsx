import React from "react";
import Header from "../HomePage/Header";

function MainAdmin() {
  const tofe = (div) => {
    window.location.replace(`/admin/${div}`);
  };

  return (
    <div>
      <Header />
        <center>
          <h3>Admin</h3>
        </center>
      <div className="tdash sdash">
        <div className="years">
          <div onClick={() => tofe("teachers")} className="yearbox">
            <p>Teachers</p>
          </div>
          <div className="yearbox" onClick={() => tofe("divisions")}>
            <p>Divisions</p>
          </div>
          <div className="yearbox" onClick={() => tofe("batches")}>
            <p>Batches</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainAdmin;
