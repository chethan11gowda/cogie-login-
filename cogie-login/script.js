/**
 * Cogie — Multi-page behavior
 */

(function () {
  "use strict";

  const form = document.querySelector("form.login-form");
  if (!form) return; // Exit if no form found on page

  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const fullnameInput = document.getElementById("fullname");
  
  const emailError = document.getElementById("email-error");
  const passwordError = document.getElementById("password-error");
  const fullnameError = document.getElementById("fullname-error");
  
  const formStatus = document.getElementById("form-status");
  const toggleBtn = document.getElementById("toggle-password");
  const submitBtn = form.querySelector("button[type='submit']");
  const submitLabel = submitBtn.querySelector(".btn__label");
  const submitSpinner = submitBtn.querySelector(".btn__spinner");

  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  /* ---------------------------------------------------------------------
   * Password visibility toggle
   * ------------------------------------------------------------------- */
  if (toggleBtn && passwordInput) {
    toggleBtn.addEventListener("click", () => {
      const iconEye = toggleBtn.querySelector(".icon-eye");
      const iconEyeOff = toggleBtn.querySelector(".icon-eye-off");
      const isPassword = passwordInput.type === "password";
      passwordInput.type = isPassword ? "text" : "password";
      toggleBtn.setAttribute("aria-pressed", String(isPassword));
      toggleBtn.setAttribute("aria-label", isPassword ? "Hide password" : "Show password");
      if (iconEye) iconEye.hidden = isPassword;
      if (iconEyeOff) iconEyeOff.hidden = !isPassword;
    });
  }

  /* ---------------------------------------------------------------------
   * Field-level validation helpers
   * ------------------------------------------------------------------- */
  function setError(input, errorEl, message) {
    if (!input || !errorEl) return;
    if (message) {
      input.setAttribute("aria-invalid", "true");
      errorEl.textContent = message;
    } else {
      input.removeAttribute("aria-invalid");
      errorEl.textContent = "";
    }
  }

  function validateEmail() {
    if (!emailInput) return true;
    const value = emailInput.value.trim();
    if (!value) {
      setError(emailInput, emailError, "Email is required.");
      return false;
    }
    if (!EMAIL_PATTERN.test(value)) {
      setError(emailInput, emailError, "Enter a valid email address.");
      return false;
    }
    setError(emailInput, emailError, "");
    return true;
  }

  function validatePassword() {
    if (!passwordInput) return true;
    const value = passwordInput.value;
    if (!value) {
      setError(passwordInput, passwordError, "Password is required.");
      return false;
    }
    if (value.length < 8) {
      setError(passwordInput, passwordError, "Password must be at least 8 characters.");
      return false;
    }
    setError(passwordInput, passwordError, "");
    return true;
  }

  function validateFullname() {
    if (!fullnameInput) return true;
    const value = fullnameInput.value.trim();
    if (!value) {
      setError(fullnameInput, fullnameError, "Full name is required.");
      return false;
    }
    setError(fullnameInput, fullnameError, "");
    return true;
  }

  // Validate on blur
  if (emailInput) emailInput.addEventListener("blur", validateEmail);
  if (passwordInput) passwordInput.addEventListener("blur", validatePassword);
  if (fullnameInput) fullnameInput.addEventListener("blur", validateFullname);

  // Clear an error as soon as it's fixed
  if (emailInput) {
    emailInput.addEventListener("input", () => {
      if (emailInput.getAttribute("aria-invalid") === "true") validateEmail();
    });
  }
  if (passwordInput) {
    passwordInput.addEventListener("input", () => {
      if (passwordInput.getAttribute("aria-invalid") === "true") validatePassword();
    });
  }
  if (fullnameInput) {
    fullnameInput.addEventListener("input", () => {
      if (fullnameInput.getAttribute("aria-invalid") === "true") validateFullname();
    });
  }

  /* ---------------------------------------------------------------------
   * Submit flow
   * ------------------------------------------------------------------- */
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isFullnameValid = validateFullname();

    if (formStatus) formStatus.dataset.state = "";

    if (!isEmailValid || !isPasswordValid || !isFullnameValid) {
      if (formStatus) formStatus.textContent = "Please fix the highlighted fields and try again.";
      const firstInvalid = [fullnameInput, emailInput, passwordInput].find(
        (el) => el && el.getAttribute("aria-invalid") === "true"
      );
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Mock async submit
    if (formStatus) formStatus.textContent = "";
    submitBtn.disabled = true;
    const originalLabel = submitLabel.textContent;
    submitLabel.textContent = "Processing…";
    if (submitSpinner) submitSpinner.hidden = false;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitLabel.textContent = originalLabel;
      if (submitSpinner) submitSpinner.hidden = true;
      if (formStatus) {
        formStatus.dataset.state = "success";
        formStatus.textContent = "Success!";
      }
      
      // Redirect to dashboard if it's the login form
      if (form.id === "login-form") {
         window.location.href = "dashboard.html";
      } else if (form.id === "signup-form") {
         window.location.href = "dashboard.html";
      } else if (form.id === "forgot-form") {
         if (formStatus) formStatus.textContent = "Reset link sent to your email.";
      }
    }, 1200);
  });
})();
