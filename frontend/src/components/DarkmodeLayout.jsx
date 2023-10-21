import React, { useEffect, useState } from 'react';

function App() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const logoPath = isDarkMode ? '../src/assets/logored.png' : '../src/assets/logoblue.png';

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    return (
        <div className="flex items-center">
            <img
                src={logoPath}
                alt="Logo"
                className="h-6 mr-3 sm:h-9"
            />
            <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className=""
            >
                {isDarkMode ? '☀️' : '🌑'}
            </button>
        </div>


    );
}

export default App;
