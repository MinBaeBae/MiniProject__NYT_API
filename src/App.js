import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./routes/Home";
import Clip from "./routes/Clip";

const App = () => {
  return (
    <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Clip" element={<Clip />} />
          {/* 유효하지 않은 URL에 대한 예외처리 */}
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
    </div>
  );
};

export default App;
