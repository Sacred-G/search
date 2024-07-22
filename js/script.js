document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('menu-button');
    const dropdown = document.getElementById('dropdown');
    const luckyButton = document.querySelector('.lucky-button');
    const searchButton = document.getElementById('search-button');
    const searchBar = document.getElementById('search-input');
    const searchIcon = document.getElementById('search-icon');
    const micIcon = document.getElementById('mic-icon');
    const themeToggle = document.getElementById('theme-toggle');

    const phrases = [
        "I'm Feeling Lucky",
        "I'm Feeling Hungry",
        "I'm Feeling like a Bouldin",
        "I'm Feeling Playful",
        "I'm Feeling Stellar",
        "I'm Feeling Doodleidy",
        "I'm Feeling Trendy",
        "I'm Feeling Artistic",
        "I'm Feeling Funny"
    ];

    // Function to show the dropdown menu
    function showDropdown() {
        dropdown.style.display = 'block';
    }

    // Function to hide the dropdown menu
    function hideDropdown() {
        setTimeout(() => {
            if (!dropdown.matches(':hover') && !menuButton.matches(':hover')) {
                dropdown.style.display = 'none';
            }
        }, 300);
    }

    // Add event listeners for the dropdown menu
    menuButton.addEventListener('mouseover', showDropdown);
    menuButton.addEventListener('mouseout', hideDropdown);
    dropdown.addEventListener('mouseover', showDropdown);
    dropdown.addEventListener('mouseout', hideDropdown);

    // Add event listeners for the "I'm Feeling Lucky" button
    luckyButton.addEventListener('mouseover', () => {
        const randomIndex = Math.floor(Math.random() * phrases.length);
        luckyButton.textContent = phrases[randomIndex];
    });

    luckyButton.addEventListener('mouseout', () => {
        luckyButton.textContent = "I'm Feeling Lucky";
    });

    // Function to perform search
    function performSearch() {
        let query = searchBar.value;
        if (query) {
            window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        }
    }

    // Function to perform "I'm Feeling Lucky" search
    function performLuckySearch() {
        let query = searchBar.value;
        if (query) {
            window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}&btnI=I`;
        }
    }

    // Add event listener for the search button
    searchButton.addEventListener('click', performSearch);

    // Add event listener for the search icon
    searchIcon.addEventListener('click', performSearch);

    // Add event listener for the "I'm Feeling Lucky" button
    luckyButton.addEventListener('click', performLuckySearch);

    // Add event listener for the Enter key in the search bar
    searchBar.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Add event listener for the microphone icon
    micIcon.addEventListener('click', function() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert('Speech recognition is not supported in this browser.');
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.start();

        recognition.onresult = function(event) {
            const transcript = event.results[0][0].transcript;
            searchBar.value = transcript;
        };

        recognition.onspeechend = function() {
            recognition.stop();
        };

        recognition.onerror = function(event) {
            console.error('Speech recognition error:', event.error);
            alert('Error occurred in speech recognition: ' + event.error);
        };
    });

    // Theme toggle functionality
    themeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    });

    // Load theme preference from local storage
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
        document.documentElement.classList.toggle('dark', storedTheme === 'dark');
    }
});
