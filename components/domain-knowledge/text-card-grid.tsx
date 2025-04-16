import { useEffect, useState } from 'react';

import { toast } from 'sonner';

import { useDeleteDomainKnowledge, useUpdateDomainKnowledge } from '@/lib/api';
import { DomainKnowledge } from '@/lib/types';

import { Input } from '@/components/ui/input';

import BentoGrid from '../bento-grid';
import { TextCard } from './text-card';

interface TextCardsGridProps {
    cardData: DomainKnowledge[];
    onEdit?: (fact: DomainKnowledge) => void;
    onDelete?: (fact: DomainKnowledge) => void;
    onSearch?: (query: string) => void;
}

export function TextCardsGrid({ cardData, onSearch }: TextCardsGridProps) {
    const [searchTerm, setSearchTerm] = useState('');

    const deleteDomainKnowledge = useDeleteDomainKnowledge();
    const updateDomainKnowledge = useUpdateDomainKnowledge();

    useEffect(() => {
        const timer = setTimeout(() => {
            onSearch && onSearch(searchTerm);
        }, 200);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    /* Handlers */
    const handleEdit = (card: DomainKnowledge) =>
        toast.promise(updateDomainKnowledge.mutateAsync(card), {
            loading: 'Updating domain knowledge',
            success: 'Domain knowledge updated',
        });

    const handleDelete = (card: DomainKnowledge) =>
        toast.promise(deleteDomainKnowledge.mutateAsync(card), {
            loading: 'Deleting domain knowledge',
            success: 'Domain knowledge deleted',
        });

    return (
        <div className="flex flex-col">
            <Input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-8"
            />
            <BentoGrid cols={3} className="gap-1">
                {cardData.map((card, index) => (
                    <TextCard
                        key={index}
                        content={card.content}
                        onEdit={(content: string) =>
                            handleEdit({ ...card, content })
                        }
                        onDelete={() => handleDelete(card)}
                    />
                ))}
            </BentoGrid>
        </div>
    );
}
