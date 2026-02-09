export function validatePassword(pw, repw) {
  const errors = [];
  if (!/\d/.test(pw)) errors.push("숫자가 포함되어있지 않습니다!");
  if (!/[a-z]/.test(pw)) errors.push("소문자가 포함되어있지 않습니다!");
  if (pw.length < 8) errors.push("비밀번호가 8글자 이하입니다!");
  if (pw.length > 20) errors.push("비밀번호가 20글자 이상입니다!");
  const match = pw === repw;
  return { errors, match };
}

export function displayPasswordValidation() {
  const pwInput = document.getElementById("passwd-input");
  const repwInput = document.getElementById("repasswd-input");
  const pwError = document.getElementById("passwd-error");
  const repwError = document.getElementById("repasswd-error");
  const pwSuccess = document.getElementById("passwd-success");
  const repwSuccess = document.getElementById("repasswd-success");

  function update() {
    const pw = pwInput.value.trim();
    const repw = repwInput.value.trim();
    const { errors, match } = validatePassword(pw, repw);

    pwError.innerHTML = "";
    repwError.innerHTML = "";
    pwSuccess.innerHTML = "";
    repwSuccess.innerHTML = "";

    if (errors.length > 0) {
      pwError.innerHTML = errors.map(msg => `<span>${msg}</span>`).join("<br>");
    } else {
      pwSuccess.innerHTML = '<i class="fa-solid fa-check fa-lg ml-3" style="color: #63E6BE;"></i>';
    }

    if (!match) {
      repwError.innerHTML = "<span>비밀번호가 일치하지 않습니다!</span>";
    } else if (pw && repw) {
      repwSuccess.innerHTML = '<i class="fa-solid fa-check fa-lg ml-3" style="color: #63E6BE;"></i>';
    }
  }

  pwInput.addEventListener("blur", update);
  repwInput.addEventListener("blur", update);
}