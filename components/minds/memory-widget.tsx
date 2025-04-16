import { Clock, File, Tag } from 'lucide-react';

import { Memory } from '@/hooks/useMindsChat';

import List from '../list';

type MemoryWidgetProps = {
    memory: Memory;
};

export default function MemoryWidget({ memory }: MemoryWidgetProps) {
    const memoryData = memory.value;

    return (
        <div className="flex flex-col gap-2 py-2 px-3 overflow-y-auto max-h-[80vh]">
            {memoryData.activeDocument && (
                <>
                    <div className="flex items-center">
                        <File className="w-4 h-4 text-gray-500 mr-2" />
                        <span className="text-sm font-medium">
                            {memoryData.activeDocument?.name}
                        </span>
                    </div>
                    <div className="flex items-center">
                        <Clock className="w-4 h-4 text-gray-500 mr-2" />
                        <span className="text-xs text-gray-600">
                            {new Date(
                                memoryData.activeDocument?.createdAt || '',
                            ).toLocaleString()}
                        </span>
                    </div>
                    <div className="flex items-center">
                        <Tag className="w-4 h-4 text-gray-500 mr-2" />
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {memoryData.activeDocument?.tag}
                        </span>
                    </div>
                </>
            )}
            <div className="space-y-2">
                <h3 className="text-sm font-medium">Documents</h3>
                <p className="text-xs">
                    {memoryData.table.rows.length} documents
                </p>
            </div>
            <div className="space-y-2">
                <h3 className="text-sm font-medium">Domain Knowledge</h3>
                <p className="text-xs">
                    {memoryData.domainKnowledge && (
                        <List list={memoryData.domainKnowledge.split('\n')} />
                    )}
                </p>
            </div>
            <div className="space-y-2">
                <h3 className="text-sm font-medium">Dynamic Examples</h3>
                <p className="text-xs">
                    {memoryData.dynamicExamples && (
                        <List list={memoryData.dynamicExamples.split('\n')} />
                    )}
                </p>
            </div>
        </div>
    );
}
