import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MigrationStatus } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import StatusBadge from "../status-badge";

type MigrationsCheckProps = {
  status: MigrationStatus | null;
};

export default function MigrationsCheck({ status }: MigrationsCheckProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <CardTitle>Migrations</CardTitle>
        <StatusBadge
          status={status !== null}
          text={status ? "Applied" : "Pending"}
        />
      </CardHeader>
      <CardContent>
        {status ? (
          <div className="space-y-2">
            <div className="flex flex-row text-xs gap-4 items-end">
              <Badge>{status.latestName}</Badge>
              <Badge>{new Date(status.latestDate).toLocaleDateString()}</Badge>
              <Badge variant="secondary">{status.totalCount} migrations</Badge>
            </div>
          </div>
        ) : (
          <div className="space-y-2">No migrations ran</div>
        )}
      </CardContent>
    </Card>
  );
}
