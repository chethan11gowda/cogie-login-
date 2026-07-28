/**
 * Cogie — Login page behavior
 * Handles: password visibility toggle, client-side validation,
 * accessible error messaging, and a mock submit flow.
 */

(function () {
  "use strict";

  const form = document.getElementById("login-form");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const emailError = document.getElementById("email-error");
  const passwordError = document.getElementById("password-error");
  const formStatus = document.getElementById("form-status");
  const toggleBtn = document.getElementById("toggle-password");
  const iconEye = toggleBtn.querySelector(".icon-eye");
  const iconEyeOff = toggleBtn.querySelector(".icon-eye-off");
  const submitBtn = form.querySelector(".btn--primary");
  const submitLabel = submitBtn.querySelector(".btn__label");
  const submitSpinner = submitBtn.querySelector(".btn__spinner");

  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  /* ---------------------------------------------------------------------
   * Password visibility toggle
   * ------------------------------------------------------------------- */
  toggleBtn.addEventListener("click", () => {
    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";
    toggleBtn.setAttribute("aria-pressed", String(isPassword));
    toggleBtn.setAttribute("aria-label", isPassword ? "Hide password" : "Show password");
    iconEye.hidden = isPassword;
    iconEyeOff.hidden = !isPassword;
  });

  /* ---------------------------------------------------------------------
   * Field-level validation helpers
   * ------------------------------------------------------------------- */
  function setError(input, errorEl, message) {
    if (message) {
      input.setAttribute("aria-invalid", "true");
      errorEl.textContent = message;
    } else {
      input.removeAttribute("aria-invalid");
      errorEl.textContent = "";
    }
  }

  function validateEmail() {
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

  // Validate on blur (don't nag while the user is still typing the first pass)
  emailInput.addEventListener("blur", validateEmail);
  passwordInput.addEventListener("blur", validatePassword);

  // Clear an error as soon as it's fixed
  emailInput.addEventListener("input", () => {
    if (emailInput.getAttribute("aria-invalid") === "true") validateEmail();
  });
  passwordInput.addEventListener("input", () => {
    if (passwordInput.getAttribute("aria-invalid") === "true") validatePassword();
  });

  /* ---------------------------------------------------------------------
   * Submit flow
   * ------------------------------------------------------------------- */
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    formStatus.dataset.state = "";

    if (!isEmailValid || !isPasswordValid) {
      formStatus.textContent = "Please fix the highlighted fields and try again.";
      const firstInvalid = !isEmailValid ? emailInput : passwordInput;
      firstInvalid.focus();
      return;
    }

    // Mock async submit (swap for a real API call)
    formStatus.textContent = "";
    submitBtn.disabled = true;
    submitLabel.textContent = "Signing in…";
    submitSpinner.hidden = false;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitLabel.textContent = "Sign In";
      submitSpinner.hidden = true;
      formStatus.dataset.state = "success";
      formStatus.textContent = "Signed in successfully.";
    }, 1200);
  });
})();
