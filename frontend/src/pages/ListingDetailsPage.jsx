/**
 * src/pages/ListingDetailsPage.jsx - Individual listing detail view
 * TODO: Fetch listing by :id, display details, reviews, and neighbourhood panel
 */

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { listingService } from '../services/listingService';
import NeighborhoodPanel from '../components/NeighborhoodPanel';
import { useAuth } from '../context/AuthContext';

const ListingDetailsPage = () => {
    const { id } = useParams();
    const { isAuthenticated, role } = useAuth();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // TODO: listingService.getById(id).then(res => setListing(res.data))
        setLoading(false);
    }, [id]);

    if (loading) return <p>Loading listing details...</p>;
    if (!listing) return <p>Listing not found. <a href="/listings">Go back</a></p>;

    return (
        <div className="listing-details-page">
            {/* TODO: Listing images gallery */}
            <div className="listing-images-placeholder">[Images Placeholder]</div>

            <div className="listing-details-body">
                <div className="listing-main-info">
                    {/* TODO: Render listing title, price, type, amenities, description */}
                    <h1>{listing.title}</h1>
                    <p>₹{listing.rent}/month</p>

                    {/* TODO: Reviews section with star ratings */}
                    <section className="reviews-section">
                        <h2>Reviews</h2>
                        {/* TODO: Map over listing reviews */}
                    </section>
                </div>

                <div className="listing-sidebar">
                    {/* TODO: Enquiry form for students */}
                    {isAuthenticated && role === 'student' && (
                        <div className="enquiry-form-placeholder">[Enquiry Form Placeholder]</div>
                    )}
                    {/* TODO: Add to saved listings button */}

                    {/* Neighbourhood Dashboard Panel */}
                    <NeighborhoodPanel coordinates={listing.address?.coordinates} />
                </div>
            </div>
        </div>
    );
};

export default ListingDetailsPage;
