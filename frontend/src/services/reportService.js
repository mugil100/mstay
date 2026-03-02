/**
 * src/services/reportService.js - Reports & Analytics API calls
 */

import api from './api';

export const reportService = {
    getPlatformReport: () => api.get('/reports/platform'),
    getOwnerReport: () => api.get('/reports/owner'),
    getStudentReport: () => api.get('/reports/student'),
};
