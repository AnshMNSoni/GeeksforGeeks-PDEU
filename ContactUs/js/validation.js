document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".validate-form");
    const inputs = document.querySelectorAll(".validate-input .input100");
    const submitButton = document.querySelector(".contact100-form-btn");

    // Validate form on submit
    form.addEventListener("submit", function (e) {
        let isValid = true;

        inputs.forEach((input) => {
            if (!validate(input)) {
                showValidate(input);
                isValid = false;
            }
        });

        if (!isValid) {
            e.preventDefault(); // Prevent form submission if invalid
        }
    });

    // Remove validation alert on focus
    inputs.forEach((input) => {
        input.addEventListener("focus", function () {
            hideValidate(input);
        });
    });

    // Listen for Enter key to move focus to the next input
    inputs.forEach((input, index) => {
        input.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
                // Prevent form submission on Enter key
                e.preventDefault();

                // Move focus to the next input field, or to the submit button if it's the last field
                if (index < inputs.length - 1) {
                    inputs[index + 1].focus();
                } else {
                    submitButton.focus(); // Focus on the submit button after the last input
                }
            }
        });
    });

    // Validation logic for input fields
    function validate(input) {
        if (input.type === "email" || input.name === "email") {
            // Check for valid email format
            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/;
            return emailPattern.test(input.value.trim());
        } else {
            // Check for non-empty value
            return input.value.trim() !== "";
        }
    }

    // Show validation alert (without error message)
    function showValidate(input) {
        const parent = input.parentElement;
        parent.classList.add("alert-validate"); // Add class for visual feedback (e.g., red border)
    }

    // Hide validation alert
    function hideValidate(input) {
        const parent = input.parentElement;
        parent.classList.remove("alert-validate"); // Remove the alert class when input is focused
    }
});
