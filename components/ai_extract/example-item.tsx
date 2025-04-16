import { useState } from 'react'
import { DbExample } from '../../lib/types'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trash2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface ExampleItemProps {
    example: DbExample;
    onDelete: (id: number) => void;
}

export function ExampleItem({ example, onDelete }: ExampleItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{example.type}</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{`ID: ${example.id}`}</Badge>
            <Button variant="ghost" size="icon" onClick={() => onDelete(example.id)} className="h-8 w-8">
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
          <Button variant="link" className="p-0 h-auto text-left hover:no-underline">
              <p className="line-clamp-2 text-sm text-muted-foreground">
                {example.context.length > 50
                  ? `${example.context.slice(0, 50)}...`
                  : example.context}
              </p>
            </Button>

          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Full Context</DialogTitle>
              <DialogDescription>
                {example.context}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </CardContent>
      <CardFooter>
        <p className="text-sm font-medium">Value: {example.value}</p>
      </CardFooter>
    </Card>
  )
}
