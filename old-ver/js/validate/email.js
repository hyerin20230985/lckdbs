export function validateEmail(email, domain) {
  const fullEmail = `${email}@${domain}`;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(fullEmail) ? null : "이메일 형식이 올바르지 않습니다!";
}

export function displayEmailValidation() {
  const emailIdInput = document.getElementById("email-id");
  const emailTextInput = document.getElementById("email-text");
  const emailErrorDiv = document.getElementById("email-error");
  const emailSuccessSpan = document.getElementById("email-success");

  function update() {
    const email = emailIdInput.value.trim();
    const domain = emailTextInput.value.trim();
    const error = validateEmail(email, domain);

    emailErrorDiv.innerHTML = "";
    emailSuccessSpan.innerHTML = "";

    if (error) {
      emailErrorDiv.innerHTML = `<span>${error}</span>`;
    } else {
      emailSuccessSpan.innerHTML = '<i class="fa-solid fa-check fa-lg ml-3" style="color: #63E6BE;"></i>';
    }
  }

  emailIdInput.addEventListener("blur", update);
  emailTextInput.addEventListener("blur", update);
}