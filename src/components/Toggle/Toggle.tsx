import "./Toggle.scss";
import React from "react";

interface IToggleProps {
   isChecked: boolean;
   onToggle: () => void;
}

export const Toggle: React.FC<IToggleProps> = ({ isChecked, onToggle }) => {
   return (
      <label className="toggle">
         <input type="checkbox" checked={isChecked} onChange={onToggle} />
         <span className="toggle__slider toggle__slider--round"></span>
      </label>
   );
};
