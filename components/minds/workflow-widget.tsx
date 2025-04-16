import { WorkflowOutput } from '@/hooks/useMindsChat';

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';

import { Button } from '../ui/button';
import StepProgress from './step-progress';

type WorkflowWidgetProps = {
    flow: WorkflowOutput;
};

export default function WorkflowWidget({ flow: tool }: WorkflowWidgetProps) {
    const toolData = tool.value;

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-zinc-50 pr-1"
                >
                    <StepProgress step={toolData.name} />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] max-h-[500px] overflow-x-auto">
                <div className="text-[10px] font-mono whitespace-pre-wrap overflow-auto">
                    {toolData.output}
                </div>
            </PopoverContent>
        </Popover>
    );
}
