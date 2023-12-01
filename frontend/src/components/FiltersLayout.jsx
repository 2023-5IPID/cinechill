import React from 'react';

function Filters({ handleFilterChange }) {
    const handleGenreChange = (e) => {
        const selectedGenre = e.target.value;
        handleFilterChange({ genre: selectedGenre });
    };

    const handleDurationChange = (e) => {
        const selectedDuration = e.target.value;
        handleFilterChange({ duration: selectedDuration });
    };

    return (
        <div className="filter-section">
            <select onChange={handleGenreChange}>
                <option value="28">Action</option>
                <option value="29">Guerre</option>
                <option value="30">Romance</option>
                {/* Autres options de genres */}
            </select>

            <select onChange={handleDurationChange}>
                <option value="90-120">90-120 min</option>
                {/* Autres options de durées */}
            </select>
            {/* Autres éléments de filtrage */}
        </div>
    );
}

export default Filters;
