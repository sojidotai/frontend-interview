import { useRecentUserQuestions } from '@/lib/api';

import { Card, CardContent, CardHeader } from '@/components/ui/card';

import SuggestionsList from '../suggestions-list';

type PlaceholderQuestionsProps = {
    onSuggestionClicked: (suggestion: string) => void;
};

export default function PlaceHolderQuestions({
    onSuggestionClicked,
}: PlaceholderQuestionsProps) {
    const { data: recentUserQuestions } = useRecentUserQuestions();
    const fallbackSuggestions = [
        "What's the effectivity of 72-1033",
        'What are the compliance requirements for SB 72-1033',
        'Give me the SBs that affects the HPT Blades',
        'What is the intent of  SB 72-1033',
    ];

    const suggestions =
        recentUserQuestions && recentUserQuestions.length > 3
            ? recentUserQuestions
            : fallbackSuggestions;

    return (
        <Card className="max-w-3xl bg-hidden">
            <CardHeader></CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
                <div className="text-zinc-600 text-sm">
                    Ask Sonance all your technical questions or choose a
                    suggestion from below
                </div>

                <SuggestionsList
                    suggestions={suggestions}
                    onSelect={onSuggestionClicked}
                />
            </CardContent>
        </Card>
    );
}
