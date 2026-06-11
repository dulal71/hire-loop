import { requireRole } from '@/lib/api/session';
import React from 'react';

const SeekerLayout =async ({children}) => {
    await requireRole('seeker')
    return children
};

export default SeekerLayout;