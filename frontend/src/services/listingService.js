/**
 * src/services/listingService.js - Listings API calls
 */

import api from './api';

export const listingService = {
    getAll: (params) => api.get('/listings', { params }),   // params: { city, type, rentMin, rentMax }
    getById: (id) => api.get(`/listings/${id}`),
    getMyListings: () => api.get('/listings/my'),
    create: (data) => api.post('/listings', data),
    update: (id, data) => api.put(`/listings/${id}`, data),
    delete: (id) => api.delete(`/listings/${id}`),
};
