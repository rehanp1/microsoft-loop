import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <img src="/logo.png" className="w-9" />
      <h3 className="font-semibold text-lg text-slate-800">Loop</h3>
    </div>
  );
};

export default Logo;
