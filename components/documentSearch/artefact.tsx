import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import useApiKey from "@/hooks/useApiKey";
import { baseUrl } from "@/lib/config";
import { PDFHit } from "@/lib/types";

type ArtefactProps = {
  artefact: PDFHit;
};

const Artefact: React.FC<ArtefactProps> = ({ artefact }) => {
  const [apiKey, _] = useApiKey();
  const page = artefact.chunk?.meta?.page;

  return (
    <Card className="mx-0">
      <CardHeader>
        <CardTitle>{artefact.document.name}</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row justify-between">
            {page && <div>Page {page}</div>}
            <div>
              {new Date(artefact.document.createdAt).toLocaleDateString()}
            </div>
          </div>
          <a
            href={`${baseUrl}/api/preview/document/${artefact.document.id}?page=${page || 1}&api_key=${apiKey}#page=${page || 1}`}
            target="_blank"
            className="text-blue-600 underline flex items-center space-x-8"
            rel="noopener noreferrer"
          >
            Open PDF File
          </a>
          <div className="text-sm text-zinc-500">
            {artefact.matches} Matche(s)
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Artefact;
