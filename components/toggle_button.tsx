import React, { useState } from "react";

type ToggleButtonProps = {
  children: React.ReactNode;
  isEnabled: boolean;
  setIsEnabled: (value: boolean) => void;
};
export function ToggleButton(props: ToggleButtonProps) {
  const { isEnabled, setIsEnabled } = props;

  const handleToggle = () => {
    setIsEnabled(!isEnabled);
  };

  return (
    <button
      onClick={handleToggle}
      className={`px-2 py-1 border rounded-md transition ${
        isEnabled
          ? "shadow-inner"
          : "bg-white text-black border-gray-300 shadow"
      }`}
    >
      {props.children}
    </button>
  );
}
