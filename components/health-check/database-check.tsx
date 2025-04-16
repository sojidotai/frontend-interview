import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DatabaseStatus } from "@/lib/types";
import { Database, Server, Layers, Puzzle } from "lucide-react";
import StatusBadge from "../status-badge";

type DatabaseStatusCardProps = {
  databaseInfo: DatabaseStatus | null;
};

export default function DatabaseCheck({
  databaseInfo,
}: DatabaseStatusCardProps) {
  const isConnected = !!databaseInfo;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Database Status</span>
          <StatusBadge
            status={isConnected}
            text={isConnected ? "Connected" : "Disconnected"}
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isConnected ? (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Server className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Version:</span>
              <span className="text-xs text-muted-foreground">
                {databaseInfo.version}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Database className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Database:</span>
              <span className="text-sm text-muted-foreground">
                {databaseInfo.databaseName}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Layers className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Size:</span>
              <span className="text-sm text-muted-foreground">
                {databaseInfo.databaseSize}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Server className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Connections:</span>
              <span className="text-sm text-muted-foreground">
                {databaseInfo.connectionCount}
              </span>
            </div>
            <div className="flex items-end gap-2 space-y-2">
              <div className="flex items-center space-x-2">
                <Puzzle className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Extensions:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {databaseInfo.extensions.map((extension) => (
                  <Badge key={extension} variant="secondary">
                    {extension}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Please check your database connection settings and try again.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
