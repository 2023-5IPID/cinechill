import React, { useEffect, useState } from 'react';

function App() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    return (
        <div>
            <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className=""
            >
                {isDarkMode ? '☀️' : '🌙'}
            </button>

            
        </div>
    );
}

export default App;
