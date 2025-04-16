import React, { useState } from 'react';

import {
    DocumentStatus,
    DocumentStatusBadge,
} from '@/features/end-of-lease/document-status-badge';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ChevronDown, ChevronRight, X } from 'lucide-react';

// Define the types for our menu structure
export type MenuItem = {
    id?: number;
    name: string;
    title?: string;
    icon?: React.ComponentType<any>;
    color?: string;
    children?: MenuItem[];
    clickable?: boolean;
};

interface TreeViewProps {
    data: MenuItem[];
    handleClick: (parentName: string, item: MenuItem) => void;
    handleSBClick: () => void;
}

// Helper function to count total items in a folder
const countItems = (item: MenuItem): number => {
    if (!item.children || item.children.length === 0) {
        return 1;
    }

    return item.children.reduce((acc, child) => acc + countItems(child), 0);
};

const FolderTreeView: React.FC<TreeViewProps> = ({
    data,
    handleClick,
    handleSBClick,
}) => {
    const [viewMode, setViewMode] = useState<'tree' | 'list'>('tree');
    const [selectedFolder, setSelectedFolder] = useState<{
        parentName: string;
        items: MenuItem[];
    } | null>(null);

    const openListView = (folderName: string, items: MenuItem[]) => {
        const allLeafNodes = items.every((item) => !item.children);

        if (allLeafNodes) {
            setSelectedFolder({ parentName: folderName, items });
            setViewMode('list');
        }
    };

    const goBackToTree = () => {
        setViewMode('tree');
        setSelectedFolder(null);
    };

    return (
        <div className="w-full">
            <AnimatePresence mode="wait">
                {viewMode === 'tree' ? (
                    <motion.div
                        key="tree"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="p-2"
                    >
                        <TreeView
                            data={data}
                            openListView={openListView}
                            handleSBClick={handleSBClick}
                        />
                    </motion.div>
                ) : (
                    <motion.div
                        key="list"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.2 }}
                        className="p-2"
                    >
                        <ListView
                            title={selectedFolder?.parentName || ''}
                            items={selectedFolder?.items || []}
                            goBack={goBackToTree}
                            handleClick={(item) => {
                                if (selectedFolder) {
                                    handleClick(
                                        selectedFolder.parentName,
                                        item,
                                    );
                                }
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

interface TreeViewInnerProps {
    data: MenuItem[];
    openListView: (folderName: string, items: MenuItem[]) => void;
    handleSBClick: () => void;
}

const TreeView: React.FC<TreeViewInnerProps> = ({
    data,
    openListView,
    handleSBClick,
}) => {
    return (
        <div className="w-full">
            {data.map((item, index) => (
                <TreeItem
                    key={index}
                    item={item}
                    openListView={openListView}
                    onItemClick={item.clickable ? handleSBClick : undefined}
                />
            ))}
        </div>
    );
};

interface TreeItemProps {
    item: MenuItem;
    openListView: (folderName: string, items: MenuItem[]) => void;
    onItemClick?: () => void;
}

const TreeItem: React.FC<TreeItemProps> = ({
    item,
    openListView,
    onItemClick,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const hasChildren = item.children && item.children.length > 0;
    const Icon = item.icon;

    const allChildrenAreLeaves =
        hasChildren &&
        item.children!.every(
            (child) => !child.children || child.children.length === 0,
        );

    const toggleOpen = () => {
        if (hasChildren) {
            if (allChildrenAreLeaves) {
                openListView(item.name, item.children!);
            } else {
                setIsOpen(!isOpen);
            }
        }
    };

    // Calculate count for item
    const count =
        item.name === 'Service Bulletins'
            ? 6
            : hasChildren
              ? countItems(item)
              : 0;

    return (
        <div className="select-none">
            <div
                className="flex items-center py-1.5 px-2 hover:bg-gray-100 rounded cursor-pointer transition-colors duration-150"
                onClick={onItemClick !== undefined ? onItemClick : toggleOpen}
            >
                <div className="w-4 mr-1">
                    {hasChildren &&
                        (isOpen ? (
                            <ChevronDown size={16} />
                        ) : (
                            <ChevronRight size={16} />
                        ))}
                </div>

                {Icon && (
                    <Icon className={`mr-2 ${item.color || ''}`} size={16} />
                )}

                <DocumentStatusBadge
                    size="sm"
                    status={
                        item.name === 'Service Bulletins'
                            ? DocumentStatus.requires_attention
                            : DocumentStatus.ai_verified
                    }
                />

                <span className="text-sm font-medium ml-2">{item.name}</span>

                {count > 0 && (
                    <span className="ml-auto text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                        {count}
                    </span>
                )}
            </div>

            {isOpen && hasChildren && !allChildrenAreLeaves && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-6"
                >
                    {item.children!.map((child, idx) => (
                        <TreeItem
                            key={idx}
                            item={child}
                            openListView={openListView}
                        />
                    ))}
                </motion.div>
            )}
        </div>
    );
};

interface ListViewProps {
    title: string;
    items: MenuItem[];
    goBack: () => void;
    handleClick: (item: MenuItem) => void;
}

const ListView: React.FC<ListViewProps> = ({
    title,
    items,
    goBack,
    handleClick,
}) => {
    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-3 pb-2 border-b">
                <div className="flex items-center">
                    <button
                        onClick={goBack}
                        className="mr-2 p-1 rounded-full hover:bg-gray-200 transition-colors duration-150"
                        aria-label="Go back"
                    >
                        <ArrowLeft size={16} />
                    </button>
                    <h3 className="font-semibold">{title}</h3>
                </div>
                <button
                    onClick={goBack}
                    className="p-1 rounded-full hover:bg-gray-200 transition-colors duration-150"
                    aria-label="Close"
                >
                    <X size={16} />
                </button>
            </div>

            <ul className="space-y-1">
                {items.map((item, index) => (
                    <motion.li
                        key={index}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.15, delay: index * 0.05 }}
                        className="p-2 hover:bg-gray-100 rounded cursor-pointer transition-colors duration-150 flex items-center"
                        onClick={() => handleClick(item)}
                    >
                        <DocumentStatusBadge
                            size="sm"
                            status={DocumentStatus.ai_verified}
                        />
                        <span className="text-sm font-medium ml-2">
                            {item.name}
                        </span>
                        {item.title && (
                            <span className="ml-2 text-xs text-gray-500">
                                ({item.title})
                            </span>
                        )}
                    </motion.li>
                ))}
            </ul>
        </div>
    );
};

export default FolderTreeView;
