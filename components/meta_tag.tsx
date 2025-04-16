import React from "react";

interface MetaTagProps {
  tagKey: string;
  text: string;
}

const MetaTag: React.FC<MetaTagProps> = ({ tagKey, text }) => {
  return (
    <div className="flex rounded-xl overflow-hidden border border-gray-300 text-xs mr-2">
      <div className="flex text-[10px] items-center bg-secondary text-white uppercase px-2">
        {tagKey}
      </div>
      <div className="flex items-center text-secondary px-2 py-1 shadow-inner shadow-gray-300">
        {text}
      </div>
    </div>
  );
};

export default MetaTag;
