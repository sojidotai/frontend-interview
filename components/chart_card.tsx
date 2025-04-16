import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

type ChartCardProps = {
  title: string;
  children: React.ReactNode;
};

export default function ChartCard({ title, children }: ChartCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent>{children}</CardContent>
    </Card>
  );
}
