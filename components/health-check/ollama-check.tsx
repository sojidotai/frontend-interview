import { Server } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { InfoIcon } from "lucide-react";
import CodeBlock from "@/components/code-block";
import StatusBadge from "../status-badge";
import { OllamaStatus } from "@/lib/types";

type OllamaCheckProps = {
  ollamaStatus: OllamaStatus | null;
};

export default function OllamaCheck({ ollamaStatus }: OllamaCheckProps) {
  if (!ollamaStatus) return;
  const status = ollamaStatus.connected ? "Operational" : "Not running";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-row justify-between">
          Ollama Status
          <StatusBadge status={ollamaStatus.connected} text={status} />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <InfoIcon className="h-4 w-4" />
          <AlertTitle>Configuration Check</AlertTitle>
          <AlertDescription>
            Ensure Ollama is reachable, typically via localhost:11434 or Docker
            internal network (http://host.docker.internal:11434)
          </AlertDescription>
        </Alert>

        <div className="flex items-center space-x-2">
          <Server className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Ollama Host Configured:</span>
          <span className="text-xs text-muted-foreground">
            {ollamaStatus?.host}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Models:</span>
          <span className="text-xs text-muted-foreground">
            {ollamaStatus?.models.join(", ")}
          </span>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="docker-setup">
            <AccordionTrigger>Docker Setup</AccordionTrigger>
            <AccordionContent>
              <p className="mb-2">Run the Sonance backend using Docker:</p>
              <CodeBlock
                code={`
docker stop sonance && docker kill sonance-worker
docker run --rm -d
-e DATABASE_URL="postgres://soji:soji@postgres:5432/soji"
-e OLLAMA_HOST="host.docker.internal"
-e ENV=production
-v ~/sonance/data:/data
-p 8003:8000
--net=soji --add-host=host.docker.internal:host-gateway
--name sonance sonance python -m sonance.main

docker run --rm -d
-e DATABASE_URL="postgres://soji:soji@postgres:5432/soji"
-e OLLAMA_HOST="host.docker.internal"
-e ENV=production
-v ~/sonance/data:/data
--net=soji --add-host=host.docker.internal:host-gateway
--name sonance-worker sonance python -m sonance.worker_main
                                `}
              />
              <p className="mt-2 text-sm text-muted-foreground">
                Note: The OLLAMA_HOST environment variable for Sonance must be
                set using the -e flag in the Docker run command as shown above.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="env-setup">
            <AccordionTrigger>Environment Setup</AccordionTrigger>
            <AccordionContent>
              <p className="mb-2">
                Set OLLAMA_HOST to 0.0.0.0 in the Docker image.
              </p>
              <p className="mb-2">For Linux systemd service:</p>
              <ol className="list-decimal list-inside space-y-2">
                <li>
                  Edit the systemd service:
                  <CodeBlock
                    code={`
                                            sudo systemctl edit ollama.service
                                        `}
                  />
                </li>
                <li>
                  Add environment variables:
                  <CodeBlock
                    code={`
                                            [Service]
                                            Environment="OLLAMA_HOST=0.0.0.0"
                                    `}
                  />
                </li>
              </ol>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
