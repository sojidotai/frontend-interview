import { useEffect, useState } from 'react';

import { Ban, Pencil, Save, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

interface TextCardProps {
    content: string;
    onEdit?: (content: string) => void;
    onDelete?: () => void;
}

export function TextCard({ content, onEdit, onDelete }: TextCardProps) {
    const [edit, setEdit] = useState(false);
    const [newText, setNewText] = useState(content);

    const onClickEdit = () => setEdit(true);
    const onClickSave = () => {
        onEdit && onEdit(newText);
        setEdit(false);
    };
    const onClickCancel = () => {
        setNewText(content);
        setEdit(false);
    };

    useEffect(() => {
        setNewText(content);
    }, [content]);

    return (
        <Card className="px-4 pt-3 hover:shadow transition-shadow">
            {edit ? (
                <Textarea
                    className="text-xs"
                    value={newText}
                    onChange={(t) => setNewText(t.target.value)}
                    rows={6}
                />
            ) : (
                <div className="text-xs">{content}</div>
            )}
            <CardFooter className="flex justify-between gap-2 p-1">
                {edit ? (
                    <Button variant="ghost" onClick={onClickSave}>
                        <Save className="text-green-600 h-4 w-4 hover:scale-105 transition-all" />
                    </Button>
                ) : (
                    <Button variant="ghost" onClick={onClickEdit}>
                        <Pencil className="text-primary h-4 w-4 hover:scale-105 transition-all" />
                    </Button>
                )}

                {edit ? (
                    <Button variant="ghost" onClick={onClickCancel}>
                        <Ban className="text-red-600 h-4 w-4 hover:scale-105 transition-all" />
                    </Button>
                ) : (
                    <Button variant="ghost" onClick={onDelete}>
                        <Trash2 className="text-red-600 h-4 w-4 hover:scale-105 transition-all" />
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}
