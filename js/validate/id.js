export function validateId(idValue) {
  const errors = [];
  if (!/^[A-Za-z]/.test(idValue)) errors.push("아이디가 영문으로 시작하지 않습니다!");
  if (idValue.length < 3) errors.push("아이디가 3글자 이하입니다!");
  if (idValue.length > 10) errors.push("아이디가 10글자 이상입니다!");
  if (!/\d/.test(idValue)) errors.push("숫자가 존재하지 않습니다!");
  if (/[^A-Za-z0-9]/.test(idValue)) errors.push("특수문자는 사용할 수 없습니다!");
  return errors;
}

export function displayIdValidation() {
    const idInput = document.getElementById("id-input");
    const checkBtn = document.getElementById("check-id-btn");
    const errorDiv = document.getElementById("id-error");
    const succSpan = document.getElementById("id-success");


  checkBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const idvalue = idInput.value.trim();
    const errors = validateId(idvalue);

    errorDiv.innerHTML = "";
    succSpan.innerHTML = "";

    if (errors.length > 0) {
        errorDiv.innerHTML = errors.map(msg => `<span>${msg}</span>`).join("<br>");
        succSpan.innerHTML = "";
    } else {
        succSpan.innerHTML = '<i class="fa-solid fa-check fa-lg ml-3" style="color: #63E6BE;"></i>';
        errorDiv.innerHTML = "";
    }
  });
}