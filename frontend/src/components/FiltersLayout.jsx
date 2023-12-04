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
                <option value="31">Science-fiction</option>
                <option value="32">Comédie</option>
                <option value="33">Drame</option>
                <option value="34">Horreur</option>
                <option value="35">Documentaire</option>
                <option value="36">Fantaisie</option>
                <option value="37">Thriller</option>
                <option value="38">Mystère</option>
            </select>

            <select onChange={handleDurationChange}>
                <option value="90-120">(1h30 - 2h)</option>
                <option value="121-150">(2h00 - 2h30)</option>
                <option value="151-180">(2h30 - 3h)</option>
                <option value="181-210">(3h00 - 3h30)</option>
                <option value="211-240">(3h30 - 4h)</option>
            </select>

            {/* Autres éléments de filtrage */}
        </div>
    );
}

export default Filters;
