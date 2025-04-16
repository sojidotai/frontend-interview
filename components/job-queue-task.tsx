import React from 'react';

import {
    Database,
    FileText,
    Globe,
    Loader,
    Play,
    Plus,
    RefreshCw,
    RotateCcw,
    Send,
    FolderSyncIcon as Sync,
    Zap,
} from 'lucide-react';

type JobQueueTaskProps = {
    jobName: string;
    isRunning: boolean;
};

const verbToIcon = (verb: string) => {
    if (verb == 'init') return Play;
    if (verb == 'add') return Plus;
    if (verb == 'update') return RefreshCw;
    if (verb == 'send') return Send;
    if (verb == 'sync') return Sync;
    if (verb == 'summarize') return FileText;
    if (verb == 'backfill') return Database;
    if (verb == 'fetch') return RotateCcw;
    if (verb == 'refresh') return RefreshCw;
    if (verb == 'scrape') return Globe;

    return Zap;
};

const verbToColor = (verb: string) => {
    if (verb == 'init') return 'text-blue-700';
    if (verb == 'add') return 'text-green-700';
    if (verb == 'update') return 'text-yellow-700';
    if (verb == 'send') return 'text-purple-700';
    if (verb == 'sync') return 'text-indigo-700';
    if (verb == 'summarize') return 'text-pink-700';
    if (verb == 'backfill') return 'text-orange-700';
    if (verb == 'fetch') return 'text-teal-700';
    if (verb == 'refresh') return 'text-cyan-700';
    if (verb == 'scrape') return 'text-red-700';
};

const JobQueueTask: React.FC<JobQueueTaskProps> = ({ jobName, isRunning }) => {
    const parts = jobName.replace('Task', '').split(/(?=[A-Z])/);
    let verb = parts[0].toLowerCase();
    let taskName = parts.slice(1).join(' ');

    if (parts.length > 2) {
        verb = `${parts[0]}`.toLowerCase();
        taskName = parts.slice(1).join(' ');
    }

    const Icon = verbToIcon(verb);
    const colorClass = verbToColor(verb);

    return (
        <div className="flex items-center">
            <div className={`ml-2 mr-3 ${colorClass}`}>
                {isRunning ? (
                    <Loader className="w-4 h-4 text-primary animate-spin flex-shrink-0" />
                ) : (
                    <Icon className="w-4 h-4 flex-shrink-0" />
                )}
            </div>
            <div className="flex flex-col">
                <h3 className="text-xs text-zinc-500">{verb}</h3>
                <div className="text-sm">{taskName}</div>
            </div>
        </div>
    );
};

export default JobQueueTask;
