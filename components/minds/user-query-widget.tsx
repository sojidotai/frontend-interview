import { motion } from 'framer-motion';

import { Card } from '@/components/ui/card';

type UserQueryWidgetProps = {
    userQuery: string;
};

const bubbleVariants = {
    initial: {
        opacity: 0,
        scale: 0.6,
        y: 20,
    },
    animate: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 300,
            damping: 24,
        },
    },
};

export default function UserQueryWidget({ userQuery }: UserQueryWidgetProps) {
    return (
        <motion.div
            initial="initial"
            animate="animate"
            variants={bubbleVariants}
        >
            <Card className="bg-primary text-white px-3 py-2">{userQuery}</Card>
        </motion.div>
    );
}
