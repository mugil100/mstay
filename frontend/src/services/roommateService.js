/**
 * src/services/roommateService.js - Roommate API calls
 */

import api from './api';

export const roommateService = {
    createOrUpdateProfile: (data) => api.post('/roommate/profile', data),
    getMyProfile: () => api.get('/roommate/profile'),
    // TODO: /matches endpoint calls AI-powered matching backend
    getMatches: () => api.get('/roommate/matches'),
    browse: () => api.get('/roommate/browse'),
};
