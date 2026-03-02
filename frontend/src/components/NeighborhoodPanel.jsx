/**
 * src/components/NeighborhoodPanel.jsx - Neighborhood insights panel
 *
 * TODO: Neighborhood Dashboard Integration
 *   - Integrate with a Maps API (Google Maps / Mapbox) to display nearby POIs
 *   - Show: nearest colleges, hospitals, metro stations, restaurants
 *   - Use listing.address.coordinates (lat/lng) as the center point
 *   - Add a safety index score (sourced from third-party API or admin input)
 *   - Analytics: track which neighborhoods are most searched
 */

const NeighborhoodPanel = ({ coordinates }) => {
    return (
        <div className="neighborhood-panel">
            <h3>🗺️ Neighbourhood</h3>
            <div className="map-placeholder">
                [Interactive Map Placeholder]
                {coordinates && (
                    <p style={{ fontSize: '0.75rem', opacity: 0.6 }}>
                        Lat: {coordinates.lat}, Lng: {coordinates.lng}
                    </p>
                )}
            </div>

            {/* TODO: Display nearby amenity chips (🏫 University 1.2km, 🏥 Hospital 0.5km ...) */}
            <div className="poi-list-placeholder">
                <p className="placeholder-text">Nearby places will appear here.</p>
            </div>
        </div>
    );
};

export default NeighborhoodPanel;
