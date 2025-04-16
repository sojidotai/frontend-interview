interface HighlightCardProps {
  children: React.ReactNode;
  className?: string;
}

export const HighlightCard = ({ children, className }: HighlightCardProps) => {
  return (
    <div className="relative rounded-2xl overflow-hidden border-b border-black">
      {/* Base background */}
      <div className="absolute inset-0 bg-[#1a1e22]">
        {/* Radial gradient from top right */}
        <div
          className="absolute -top-1/2 -right-1/2 w-[200%] h-[200%]"
          style={{
            background:
              "radial-gradient(circle at top right, rgba(62, 99, 221, 1.0), transparent 70%)",
            mixBlendMode: "screen",
          }}
        ></div>
      </div>
      {/* Content */}
      <div className="relative z-10 text-white h-full flex flex-col">
        {children}
      </div>
    </div>
  );
};
