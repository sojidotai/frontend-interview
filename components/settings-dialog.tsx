import React from 'react';

import { CheckedState } from '@radix-ui/react-checkbox';
import { toast } from 'sonner';

import { useFlags, useToggleFlag } from '@/lib/api';

import { useSettings } from '@/hooks/useSettings';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export function SettingsDialog({
    open,
    onClose,
}: {
    open: boolean;
    onClose: () => void;
}) {
    const { settings, updateSettings } = useSettings();
    const { data: flags } = useFlags();
    const toggleFlag = useToggleFlag();

    // Use local state to track changes before saving
    const [localSettings, setLocalSettings] = React.useState(settings);

    // Update local settings when dialog opens
    React.useEffect(() => {
        if (open) {
            setLocalSettings(settings);
        }
    }, [open, settings]);

    const handleToggle = async (name: string) => {
        await toggleFlag.mutateAsync(name, {
            onSuccess: () => toast.success('Toggled flag'),
            onError: () => toast.error('Toggle failed'),
        });
    };

    const handleDebugChange = (checked: CheckedState) => {
        setLocalSettings((prev) => ({
            ...prev,
            isDebug: checked.valueOf() as boolean,
        }));
    };

    const handleSave = () => {
        updateSettings(localSettings);
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Settings</DialogTitle>
                    <DialogDescription>
                        Customize your application settings. Enable debug mode
                        to see detailed logs.
                    </DialogDescription>
                </DialogHeader>

                <div className="my-2">
                    <ul className="divide-y divide-gray-200">
                        {flags?.map((flag) => (
                            <li key={flag.name} className="px-4 py-4 sm:px-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <Label className="text-sm font-medium text-gray-900">
                                            {flag.name}
                                        </Label>
                                    </div>
                                    <div className="flex flex-row gap-2 items-center">
                                        <Switch
                                            id={flag.name}
                                            checked={flag.enabled}
                                            onCheckedChange={() =>
                                                handleToggle(flag.name)
                                            }
                                        />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex items-center space-x-2 mt-4">
                    <Checkbox
                        checked={localSettings.isDebug}
                        onCheckedChange={handleDebugChange}
                        id="debugMode"
                    />
                    <label htmlFor="debugMode" className="text-sm">
                        Enable Debug Mode
                    </label>
                </div>

                <DialogFooter>
                    <Button onClick={handleSave}>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
