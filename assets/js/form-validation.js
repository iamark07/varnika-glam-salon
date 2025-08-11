const contact_form = document.getElementById("contact-form");
const franchise_form = document.getElementById("franchise-form");
const appointment_form = document.getElementById("appointment-form");
const newsletter_form = document.getElementById("newsletter-form");


document.addEventListener("DOMContentLoaded", function () {
  handleFormSubmission();
});

function handleFormSubmission() {
  // appointment_form
  if (appointment_form) {
    appointment_form.elements["phone"].addEventListener("input", function () {
      this.value = this.value.replace(/\D/g, "").slice(0, 10); // Allow only numbers, limit to 10 digits
    });

    appointment_form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!validateForm(appointment_form)) {
        return;
      } else {
        appointment_form.submit();
      }
    });
  }
  // contact_form
  if (contact_form) {
    contact_form.elements["phone"].addEventListener("input", function () {
      this.value = this.value.replace(/\D/g, "").slice(0, 10); // Allow only numbers, limit to 10 digits
    });

    contact_form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!validateForm(contact_form)) {
        return;
      } else {
        contact_form.submit();
      }
    });
  }

  // franchise_form
  if (franchise_form) {
    franchise_form.elements["phone"].addEventListener("input", function () {
      this.value = this.value.replace(/\D/g, "").slice(0, 10); // Allow only numbers, limit to 10 digits
    });

    franchise_form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!validateForm(franchise_form)) {
        return;
      } else {
        franchise_form.submit();
      }
    });
  }
  // newsletter_form
  if (newsletter_form) {
    newsletter_form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!validateForm(newsletter_form)) {
        return;
      } else {
        newsletter_form.submit();
      }
    });
  }
}

function validateForm(active_form) {
  let isValid = true;
  const phoneRegex = /^[6-9]\d{9}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // Clear all previous errors
  document
    .querySelectorAll("[class^='error-']")
    .forEach((el) => (el.innerText = ""));

  Array.from(active_form.elements).forEach((input) => {
    const { type, name, value, checked, id } = input;
    console.log(
      "Validating input:",
      name,
      "Type:",
      type,
      "Value:",
      value,
      "Checked:",
      checked,
      "ID:",
      id
    );

    if (!name && type != "submit") {
      console.warn("Skipping unnamed input field.", input);
      return; // Skip unnamed fields like submit buttons
    }

    // Validate text with 3-60 characters
    if (name == "full_name") {
      if (!value.trim()) {
        showError(active_form, id, "Enter your name");
        isValid = false;
      } else if (value.trim().length < 3) {
        showError(active_form, id, "Name must be at least 3 characters.");
        isValid = false;
      } else if (value.trim().length > 60) {
        showError(active_form, id, "Name must not exceed 60 characters.");
        isValid = false;
      }
    }
    // Validate subject text with 3-60 characters
    if (name == "subject") {
      if (!value.trim()) {
        showError(active_form, id, "Enter a subject");
        isValid = false;
      } else if (value.trim().length < 3) {
        showError(active_form, id, "Subject must be at least 3 characters.");
        isValid = false;
      } else if (value.trim().length > 60) {
        showError(active_form, id, "Subject must not exceed 60 characters.");
        isValid = false;
      }
    }

    // Validate Phone Number
    if (name == "phone") {
      if (!value.trim()) {
        showError(active_form, id, "Enter your phone number.");
        isValid = false;
      } else if (!phoneRegex.test(value.trim())) {
        showError(
          active_form,
          id,
          "Phone number must be 10 digits and start with 6-9."
        );
        isValid = false;
      }
    }

    // Validate Email
    if (name == "email") {
      if (!value.trim()) {
        showError(active_form, id, "Enter your email address.");
        isValid = false;
      } else if (!emailRegex.test(value.trim())) {
        showError(active_form, id, "Enter a valid email address.");
        isValid = false;
      }
    }
    
    // Validate select (for both investment-range and business-experience)
    if (
      (name === "investment-range" || name === "business-experience" || name === "service") && value.trim().length < 1
    ) {
      showError(active_form, id, "Select an option.");
      isValid = false;
    }

    // Validate City
    if (name == "city") {
      if (!value.trim()) {
        showError(active_form, id, "Enter your city.");
        isValid = false;
      } else if (value.trim().length < 3) {
        showError(active_form, id, "city name must be at least 3 characters.");
        isValid = false;
      } else if (value.trim().length > 100) {
        showError(active_form, id, "City name must not exceed 100 characters.");
        isValid = false;
      }
    }

    // Validate Message
    if (
      name == "message" &&
      (value.trim().length < 3 || value.trim().length > 160)
    ) {
      showError(
        active_form,
        id,
        "Message must be between 3 and 160 characters."
      );
      isValid = false;
    }

    // Validate Checkbox
    if (name == "agree" && !checked) {
      showError(active_form, id, "You must agree to terms & conditions.");
      isValid = false;
    }
  });
  console.log("Form validation completed. Is valid:", isValid);
  return isValid;
}
function showError(active_form, id, message) {
  if (!id) {
    console.warn("Input does not have an ID, cannot show error.");
    return; // Ensure the input has an ID
  }
  console.warn("Showing error for ID:", id, "Message:", message);
  const errorElement = active_form.querySelector(`.error-${id}`);
  if (errorElement) {
    errorElement.innerText = message;
  }
}
