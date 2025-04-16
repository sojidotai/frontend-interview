'use client';

import { useEffect, useState } from 'react';

import { useRagModels } from '@/lib/api';
import { RAGModel } from '@/lib/types';

type Settings = {
    isDebug: boolean;
    aiModel: RAGModel | undefined;
    menuSize: 'small' | 'normal';
};

const DEFAULT_SETTINGS: Settings = {
    isDebug: false,
    aiModel: undefined,
    menuSize: 'normal',
};

const SETTINGS_UPDATED_EVENT = 'settingsUpdated';

function modelExists(model: RAGModel, models: RAGModel[]): boolean {
    return models.map((m) => m.id).includes(model.id);
}

export function useSettings() {
    const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
    const { data: ragModels } = useRagModels();

    useEffect(() => {
        const loadSettings = () => {
            const savedSettings = localStorage.getItem('settings');
            if (savedSettings) {
                try {
                    const parsed: Settings = JSON.parse(savedSettings);

                    if (ragModels && ragModels.length > 0) {
                        // If the stored aiModel is missing or not in the current list, update it.
                        if (
                            !parsed.aiModel ||
                            !modelExists(parsed.aiModel, ragModels)
                        ) {
                            parsed.aiModel = ragModels[0];

                            localStorage.setItem(
                                'settings',
                                JSON.stringify(parsed),
                            );
                        }
                    }

                    setSettings(parsed);
                } catch (e) {
                    console.error('Failed to parse settings:', e);
                    setSettings(DEFAULT_SETTINGS);
                }
            } else if (ragModels && ragModels.length > 0) {
                // No settings saved; initialize with the first available model.
                const newSettings: Settings = {
                    ...DEFAULT_SETTINGS,
                    aiModel: ragModels[0],
                };
                setSettings(newSettings);
                localStorage.setItem('settings', JSON.stringify(newSettings));
            }
        };

        loadSettings();

        const handleSettingsUpdate = () => loadSettings();
        window.addEventListener(SETTINGS_UPDATED_EVENT, handleSettingsUpdate);

        return () => {
            window.removeEventListener(
                SETTINGS_UPDATED_EVENT,
                handleSettingsUpdate,
            );
        };
    }, [ragModels]);

    const updateSettings = (newSettings: Settings) => {
        setSettings(newSettings);
        localStorage.setItem('settings', JSON.stringify(newSettings));
    };

    const aiModel = settings.aiModel;
    const setAIModel = (aiModel: RAGModel) =>
        updateSettings({ ...settings, aiModel });

    return {
        settings,
        updateSettings,
        aiModel,
        setAIModel,
        ragModels,
    };
}
