/**
 * src/components/ListingCard.jsx - Card component for a single listing
 * Used on ListingsPage grid and dashboard sections.
 */

import { Link } from 'react-router-dom';

const ListingCard = ({ listing }) => {
    return (
        <div className="listing-card">
            <div className="listing-card-image">
                {listing.images?.[0] ? (
                    <img src={listing.images[0]} alt={listing.title} />
                ) : (
                    <div className="image-placeholder">No Image</div>
                )}
            </div>

            <div className="listing-card-body">
                <span className="listing-type-badge">{listing.type}</span>
                <h3 className="listing-title">{listing.title}</h3>
                <p className="listing-city">{listing.address?.city}</p>
                <p className="listing-rent">₹{listing.rent} / month</p>

                <div className="listing-amenities">
                    {listing.amenities?.slice(0, 3).map((a) => (
                        <span key={a} className="amenity-tag">{a}</span>
                    ))}
                </div>

                <div className="listing-card-footer">
                    <span className="listing-rating">⭐ {listing.averageRating?.toFixed(1) || 'New'}</span>
                    <Link to={`/listings/${listing._id}`} className="btn-view">View Details</Link>
                </div>
            </div>
        </div>
    );
};

export default ListingCard;
