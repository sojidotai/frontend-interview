import { PDFHit } from "@/lib/types";
import { cn } from "@/lib/utils";

type ArtefactButtonProps = {
  pdfHit: PDFHit | undefined;
  onClick: () => void;
  selected: boolean;
};

const ArtefactButton: React.FC<ArtefactButtonProps> = ({
  pdfHit,
  onClick,
  selected,
}) => {
  if (!pdfHit) return;

  const page = pdfHit.chunk?.meta?.page;
  const name = pdfHit.document.name.substring(0, 18) + "...";

  return (
    <div
      className={cn(
        "m-2 border rounded-xl flex flex-col p-2 items-center justify-center",
        "max-w-20 h-20 hover:text-primary cursor-pointer",
        selected && "border-2 border-secondary",
      )}
      onClick={onClick}
    >
      <div className="text-sm">PDF</div>
      {page && <div className="text-xs">p. {page}</div>}
    </div>
  );
};

export default ArtefactButton;
