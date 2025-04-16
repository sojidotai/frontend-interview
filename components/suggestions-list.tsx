import { Button } from './ui/button';

type SuggestionListProps = {
    suggestions: string[];
    onSelect: (selection: string) => void;
};

export default function SuggestionsList({
    suggestions,
    onSelect,
}: SuggestionListProps) {
    return (
        <div className="flex flex-wrap gap-2 p-4 justify-center">
            {suggestions.map((question, index) => (
                <Button
                    size="sm"
                    variant="ghost"
                    key={index}
                    onClick={() => onSelect(question)}
                    className="text-xs bg-zinc-50/50"
                >
                    {question}
                </Button>
            ))}
        </div>
    );
}
