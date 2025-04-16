import { format } from "date-fns";
import { CommitInfo } from "@/lib/types";
import { GitCommit } from "lucide-react";
import Link from "next/link";

const REPO_URL = "https://github.com/sojidotai/sonance";

type BuildProps = {
  buildInfo: CommitInfo;
};

const Build = ({ buildInfo }: BuildProps) => {
  if (buildInfo.commitDate == "") return;

  const formattedDate = format(new Date(buildInfo.commitDate), "yyyy-MM-dd");
  const shortSha = buildInfo.commitSha.slice(0, 7);

  return (
    <div className="flex items-center space-x-2 text-sm p-2 rounded-xl">
      <GitCommit className="h-4 w-4 text-gray-500" />
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <Link
            href={`${REPO_URL}/commit/${buildInfo.commitSha}`}
            className="font-mono text-xs text-blue-500 hover:underline"
            target="_blank"
          >
            {shortSha}
          </Link>
          <span className="text-gray-500 text-xs">{formattedDate}</span>
        </div>
        <p className="text-gray-700 truncate" title={buildInfo.commitMessage}>
          {buildInfo.commitMessage}
        </p>
      </div>
    </div>
  );
};

export default Build;
