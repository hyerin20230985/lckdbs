let bannedWords = [];
fetch("json/hateword_list.json")
  .then(res => res.json())
  .then(data => { bannedWords = Array.isArray(data) ? data : data.words; });

export function validateNickname(nickname) {
  const errors = [];
  if (nickname.length < 2) errors.push("닉네임이 2글자 이하입니다!");
  if (nickname.length > 8) errors.push("닉네임이 8글자 이상입니다!");
  if (bannedWords.some(word => nickname.includes(word))) {
    errors.push("부적절한 단어가 포함된 닉네임은 사용할 수 없습니다!");
  }
  return errors;
}

export function displayNicknameValidation() {
  const input = document.getElementById("nickname-input");
  const errorDiv = document.getElementById("nickname-error");
  const successSpan = document.getElementById("nickname-success");

  input.addEventListener("blur", () => {
    const value = input.value.trim();
    const errors = validateNickname(value);

    errorDiv.innerHTML = "";
    successSpan.innerHTML = "";

    if (errors.length > 0) {
      errorDiv.innerHTML = errors.map(msg => `<span>${msg}</span>`).join("<br>");
    } else {
      successSpan.innerHTML = '<i class="fa-solid fa-check fa-lg ml-3" style="color: #63E6BE;"></i>';
    }
  });
}