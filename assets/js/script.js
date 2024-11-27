// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', function() {
    // Arrays of sample texts for each difficulty level
    const easyTexts = [
        "The cat sat on the mat.",
        "A quick brown fox jumps over the lazy dog.",
        "She sells seashells by the seashore."
    ];

    const mediumTexts = [
        "To be or not to be, that is the question.",
        "All that glitters is not gold.",
        "A journey of a thousand miles begins with a single step."
    ];

    const hardTexts = [
        "It was the best of times, it was the worst of times.",
        "In the beginning God created the heavens and the earth.",
        "The only thing we have to fear is fear itself."
    ];

    // Get references to DOM elements
    const difficultySelect = document.getElementById('difficulty');
    const sampleTextDiv = document.getElementById('sample-text');
    const startButton = document.getElementById('start-btn');
    const stopButton = document.getElementById('stop-btn');
    const timeDisplay = document.getElementById('time');
    const wpmDisplay = document.getElementById('wpm');
    const levelDisplay = document.getElementById('level');
    const userInput = document.getElementById('user-input');

    // Variables to store the start and end times of the test
    let startTime, endTime;

    // Function to get a random text from an array of texts
    function getRandomText(textArray) {
        const randomIndex = Math.floor(Math.random() * textArray.length);
        return textArray[randomIndex];
    }

    // Function to update the sample text based on the selected difficulty
    function updateSampleText() {
        let selectedDifficulty = difficultySelect.value;
        let selectedText;

        if (selectedDifficulty === 'easy') {
            selectedText = getRandomText(easyTexts);
        } else if (selectedDifficulty === 'medium') {
            selectedText = getRandomText(mediumTexts);
        } else if (selectedDifficulty === 'hard') {
            selectedText = getRandomText(hardTexts);
        }

        sampleTextDiv.textContent = selectedText;
    }

    // Function to start the typing test
    function startTest() {
        startTime = new Date(); // Record the start time
        startButton.disabled = true; // Disable the start button
        stopButton.disabled = false; // Enable the stop button
        userInput.disabled = false; // Enable the user input area
        userInput.value = ''; // Clear any existing text in the input area
        userInput.focus(); // Set focus to the input area
    }

    // Function to stop the typing test and calculate results
    function stopTest() {
        endTime = new Date(); // Record the end time
        const elapsedTime = (endTime - startTime) / 1000; // Calculate elapsed time in seconds
        timeDisplay.textContent = elapsedTime.toFixed(2) + 's'; // Display the elapsed time
        startButton.disabled = false; // Enable the start button
        stopButton.disabled = true; // Disable the stop button
        userInput.disabled = true; // Disable the user input area

        // Get the sample text and user input text
        const sampleText = sampleTextDiv.textContent;
        const userText = userInput.value.trim();
        const sampleWords = sampleText.split(' ');
        const userWords = userText.split(' ');

        // Calculate the number of correctly typed words
        let correctWords = 0;
        for (let i = 0; i < userWords.length; i++) {
            if (userWords[i] === sampleWords[i]) {
                correctWords++;
            }
        }

        // Calculate WPM (Words Per Minute)
        const wpm = Math.round((correctWords / elapsedTime) * 60);
        wpmDisplay.textContent = wpm; // Display the WPM
        levelDisplay.textContent = difficultySelect.value.charAt(0).toUpperCase() + difficultySelect.value.slice(1); // Display the difficulty level
    }

    // Add event listeners to the difficulty select, start button, and stop button
    difficultySelect.addEventListener('change', updateSampleText);
    startButton.addEventListener('click', startTest);
    stopButton.addEventListener('click', stopTest);

    // Initialize with a random text from the default difficulty level
    updateSampleText();
});