'use client';

import React from 'react';

import {
    useConversationAnalytics,
    useRecentSBs,
    useRevisionStats,
    useTopATAChapters,
} from '@/lib/dashboard-api';

import ConversationAnalyticsWidget from '@/components/dashboard/conversation-analytics-widget';
import RecentSBsWidget from '@/components/dashboard/recent-sbs-widget';
import RevisionStatsWidget from '@/components/dashboard/revision-stats-widgets';
import TopATAChaptersWidget from '@/components/dashboard/top-ata-chapters';
import AppHeader from '@/components/page-header';

const Sojisonance = () => {
    const { data: chapters } = useTopATAChapters();
    const { data: recentSbs } = useRecentSBs();
    const { data: revisionStats } = useRevisionStats();
    const { data: analytics } = useConversationAnalytics();

    return (
        <div className="flex-1">
            <AppHeader
                links={[
                    { name: 'Compliance', href: '/' },
                    { name: 'Dashboard', href: '/documentDashboard' },
                ]}
            />

            <div className="grid grid-cols-2 gap-2 max-w-[1200px] px-8 mx-auto my-12">
                {chapters && <TopATAChaptersWidget chapters={chapters} />}
                {recentSbs && <RecentSBsWidget recentSbs={recentSbs} />}
                {revisionStats && (
                    <RevisionStatsWidget revisionStats={revisionStats} />
                )}
                {analytics && (
                    <ConversationAnalyticsWidget analytics={analytics} />
                )}
            </div>
        </div>
    );
};

export default Sojisonance;
