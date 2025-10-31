import React from "react";

interface SeparatorProps {
  text?: string;
}

const Separator: React.FC<SeparatorProps> = ({ text = "Or Continue with" }) => {
  return (
    <div className="flex items-center justify-center my-6">
      <div className="grow border-t border-gray-600"></div>
      <span className="mx-4 text-gray-400 text-sm uppercase tracking-wider">
        {text}
      </span>
      <div className="grow border-t border-gray-600"></div>
    </div>
  );
};

export default Separator;
