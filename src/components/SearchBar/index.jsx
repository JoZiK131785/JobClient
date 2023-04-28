import './index.css';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faFilter } from '@fortawesome/free-solid-svg-icons'

const SearchBar = ({ countries, keys }) => {
    const [width, setWidth] = useState(window.innerWidth);
    const [locationFilter, setLocationFilter] = useState("");
    const [keysFilter, setKeysFilter] = useState("");
    const [fullTimeFilter, setFullTimeFilter] = useState("");
    const [showLocationResults, setShowLocationResults] = useState(false);
    const [showKeysResults, setShowKeysResults] = useState(false);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [filteredKeys, setFilteredKeys] = useState([]);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (locationFilter) {
        const filtered = countries.filter(country =>
            country.toLowerCase().includes(locationFilter.toLowerCase())
        );
        setFilteredCountries(filtered.length > 0 ? filtered : ["Aucune correspondance"]);
        } else {
        setFilteredCountries([]);
        }
    }, [ locationFilter, countries ]);

    useEffect(() => {
        if (keysFilter) {
        const filtered = keys.filter(key =>
            key.toLowerCase().includes(keysFilter.toLowerCase())
        );
        setFilteredKeys(filtered.length > 0 ? filtered : ["Aucune correspondance"]);
        } else {
            setFilteredKeys([]);
        }
    }, [ keysFilter, keys ]);

    const handleLocationSelect = (e, country) => {
        e.preventDefault();
        setLocationFilter(country);
        setShowLocationResults(false);
    };

    const handleKeysSelect = (e, key) => {
        e.preventDefault();
        setKeysFilter(key);
        setShowKeysResults(false);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        console.log(locationFilter)
        
    }

    return (
        <>
        <form className="search-bar" onSubmit={handleSearchSubmit}>
            <div className="search-bar-filter">
            <input
                placeholder={width < 1200 ? 'Filter by title…' : 'Filter by title, companies, expertise…'}
                value={keysFilter}
                onChange={(e) => {
                    setKeysFilter(e.target.value);
                }}
                onFocus={() => {
                    setShowKeysResults(true);
                }}
                onBlur={() => {
                    setShowKeysResults(false);
                }}
            />
            {showKeysResults && (
                <ul className="filtered-list">
                {filteredKeys.length === 0 ? (
                    <li>No match found.</li>
                ) : (
                    filteredKeys.map(key => (
                    <li key={key} onClick={(e) => handleKeysSelect(e, key)}>
                        {key}
                    </li>
                    ))
                )}
                </ul>
                )}
            {width >= 768 && (
                <FontAwesomeIcon
                icon={faMagnifyingGlass}
                size="xl"
                style={{ color: '#5964e0' }}
                className="search-icon"
                />
            )}
            {width < 768 && (
                <FontAwesomeIcon icon={faFilter} size="xl" className="filter-icon" />
            )}
            {width < 768 && (
                <FontAwesomeIcon
                icon={faMagnifyingGlass}
                size="xl"
                className="search-icon-mobile"
                />
            )}
            </div>
            {width >= 768 && (
            <div className="search-bar-location">
                <input
                placeholder="Filter by location…"
                value={locationFilter}
                onChange={(e) => {
                    setLocationFilter(e.target.value);
                }}
                onFocus={() => {
                    setShowLocationResults(true);
                }}
                onBlur={() => {
                    setShowLocationResults(false);
                }}
                />
                <FontAwesomeIcon
                icon={faLocationDot}
                size="xl"
                style={{ color: '#5964e0' }}
                className="location-icon"
                />
                {showLocationResults && (
                <ul className="filtered-list">
                {filteredCountries.length === 0 ? (
                    <li>No match found.</li>
                ) : (
                    filteredCountries.map(country => (
                    <li key={country} onClick={(e) => handleLocationSelect(e, country)}>
                        {country}
                    </li>
                    ))
                )}
                </ul>
                )}
            </div>
            )}
            {width >= 768 && (
            <div className="search-bar-cta">
                <input
                    className="checkbox"
                    type="checkbox"
                    onChange={() => setFullTimeFilter(!fullTimeFilter)}
                />
                <p>{width > 1200 ? 'Full Time Only' : 'Full Time'}</p>
                <button className="primary-button">Search</button>
            </div>
            )}
        </form>
        </>
    );
};

export default SearchBar;