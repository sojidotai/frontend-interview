import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type CreateDialogProps = {
    onCreate: (content: string) => void;
};

export const CreateDialog = ({ onCreate }: CreateDialogProps) => {
    const [text, setText] = useState('');
    const canSave = text.length > 3;

    const handleClickSave = () => {
        onCreate(text);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost">Add Fact</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add a new Domain Fact</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Domain Fact
                        </Label>
                        <Input
                            id="name"
                            className="col-span-3"
                            value={text}
                            onChange={(t) => setText(t.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            type="submit"
                            onClick={handleClickSave}
                            disabled={!canSave}
                        >
                            Save
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
