import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, HelpCircle } from "lucide-react";

type StatusBadgeProps = {
  status: boolean | undefined;
  text?: string;
};

const StatusBadge = ({ status, text }: StatusBadgeProps) => {
  const getStatusColor = (status: boolean | undefined): string => {
    switch (status) {
      case true:
        return "bg-green-500";
      case false:
        return "bg-red-500";
      default:
        return "bg-yellow-500";
    }
  };

  const getStatusIcon = (status: boolean | undefined) => {
    switch (status) {
      case true:
        return <CheckCircle2 className="h-6 w-6 text-green-500" />;
      case false:
        return <XCircle className="h-6 w-6 text-red-500" />;
      default:
        return <HelpCircle className="h-6 w-6 text-yellow-500" />;
    }
  };

  const getStatusText = (status: boolean | undefined): string => {
    switch (status) {
      case true:
        return "Operational";
      case false:
        return "Down";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {getStatusIcon(status)}
      <Badge
        variant="secondary"
        className={`${getStatusColor(status)} text-primary-foreground`}
      >
        {text || getStatusText(status)}
      </Badge>
    </div>
  );
};

export default StatusBadge;
