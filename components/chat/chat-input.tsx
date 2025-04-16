import { useState } from 'react';

import { FileDown, PlusCircle, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';

type Props = {
    onSearch: (query: string) => void;
    onReset: () => void;
    onDownload: () => void;
};

const ChatInput: React.FC<Props> = ({ onSearch, onReset, onDownload }) => {
    const [input, setInput] = useState<string>('');

    const handleSearch = (query: string) => {
        onSearch(query);
        setInput('');
    };

    return (
        <div className="mx-auto flex items-center space-x-2 w-[40em]">
            <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch(input)}
                    placeholder="Search or start new chat"
                    className="pl-10 pr-4"
                />
            </div>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" onClick={onReset}>
                            <PlusCircle className="h-4 w-4" />
                            <span className="sr-only">New conversation</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>New conversation</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={onDownload}
                        >
                            <FileDown className="h-4 w-4" />
                            <span className="sr-only">
                                Download conversation
                            </span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Download conversation</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
};

export default ChatInput;
