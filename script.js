// Wait for the HTML document to be fully loaded before running the script.
document.addEventListener('DOMContentLoaded', () => {

    // --- Element Selections (Used across multiple parts) ---
    const checkAgeBtn = document.getElementById('checkAgeBtn');
    const calculateDoseBtn = document.getElementById('calculateDoseBtn');
    const toggleSideEffectsBtn = document.getElementById('toggleSideEffectsBtn');
    
    // =================================================================
    // Part 1: Variable Declarations and Conditionals
    // Goal: Demonstrate understanding of variables, data types, and if/else logic.
    // =================================================================
    
    checkAgeBtn.addEventListener('click', () => {
        // Grab the input element and its value
        const ageInput = document.getElementById('ageInput');
        const age = parseInt(ageInput.value); // Convert string to number
        const ageResult = document.getElementById('ageResult');

        // Declare a variable to hold our message
        let message = ''; 

        // Use an if/else if/else conditional to make a decision
        if (isNaN(age) || age <= 0) {
            message = 'Please enter a valid age.';
        } else if (age < 18) {
            message = '⚠️ For patients under 18, please consult a pediatrician.';
        } else if (age >= 65) {
            message = '⚠️ For patients over 65, dosage may need adjustment. Consult a doctor.';
        } else {
            message = '✅ Standard dosage guidelines likely apply. Always follow package instructions.';
        }

        // Output the result to the webpage (DOM Manipulation)
        ageResult.textContent = message;
    });

    // =================================================================
    // Part 2: Custom Functions
    // Goal: Build reusable blocks of logic to keep code clean and DRY.
    // =================================================================

    /**
     * Function 1: Capitalizes the first letter of a string.
     * @param {string} str - The string to format.
     * @returns {string} The formatted string.
     */
    function formatMedicationName(str) {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    /**
     * Function 2: Calculates the next medication dose time.
     * @param {string} lastDoseTime - The last dose time in 'HH:mm' format.
     * @param {number} frequencyHours - The number of hours between doses.
     * @returns {string} The calculated next dose time.
     */
    function calculateNextDose(lastDoseTime, frequencyHours) {
        if (!lastDoseTime || isNaN(frequencyHours)) {
            return 'Invalid input.';
        }
        
        const [hours, minutes] = lastDoseTime.split(':').map(Number);
        
        const lastDoseDate = new Date();
        lastDoseDate.setHours(hours, minutes, 0, 0);

        // Add the frequency in hours to the date object
        lastDoseDate.setHours(lastDoseDate.getHours() + frequencyHours);

        // Format the new time back to HH:mm
        const nextHours = String(lastDoseDate.getHours()).padStart(2, '0');
        const nextMinutes = String(lastDoseDate.getMinutes()).padStart(2, '0');

        return `Your next dose is at ${nextHours}:${nextMinutes}.`;
    }

    // Event listener to use the calculateNextDose function
    calculateDoseBtn.addEventListener('click', () => {
        const lastDoseInput = document.getElementById('lastDoseInput').value;
        const frequencyInput = parseInt(document.getElementById('frequencyInput').value);
        const doseResult = document.getElementById('doseResult');
        
        // Call the function and display its return value
        doseResult.textContent = calculateNextDose(lastDoseInput, frequencyInput);
    });


    // =================================================================
    // Part 3: Loops
    // Goal: Practice controlling flow with repetition and iteration.
    // =================================================================

    // --- Loop Example 1: `forEach` to generate dynamic content ---
    const commonMedications = ['paracetamol', 'ibuprofen', 'aspirin', 'loratadine', 'amoxicillin'];
    const medicationList = document.getElementById('medicationList');

    commonMedications.forEach(med => {
        // Create a new list item element (DOM Manipulation)
        const listItem = document.createElement('li');
        
        // Use our function from Part 2 to format the name
        listItem.textContent = formatMedicationName(med);
        
        // Add the new element to the page (DOM Manipulation)
        medicationList.appendChild(listItem);
    });

    // --- Loop Example 2: `for` loop for a console countdown ---
    console.log("Starting a simple reminder countdown...");
    for (let i = 5; i > 0; i--) {
        console.log(`Reminder in ${i} seconds...`);
    }
    console.log("🔔 Time for your medication!");


    // =================================================================
    // Part 4: DOM Interactions
    // Goal: Make the static HTML page interactive.
    // Note: Other DOM interactions are included in Parts 1 and 3.
    // =================================================================

    // --- DOM Interaction 3: Toggling a class to show/hide content ---
    const sideEffectsInfo = document.getElementById('sideEffectsInfo');

    toggleSideEffectsBtn.addEventListener('click', () => {
        // The classList.toggle method adds the class if it's not there,
        // and removes it if it is.
        sideEffectsInfo.classList.toggle('hidden');

        // Update the button text for better user experience
        if (sideEffectsInfo.classList.contains('hidden')) {
            toggleSideEffectsBtn.textContent = 'Show Common Side Effects';
        } else {
            toggleSideEffectsBtn.textContent = 'Hide Common Side Effects';
        }
    });
});