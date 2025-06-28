//아이디

const idInput = document.getElementById("id-input");
const checkBtn = document.getElementById("check-id-btn");
const errorDiv = document.getElementById("id-error");
const succSpan = document.getElementById("id-success");

checkBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const idValue = idInput.value.trim();
    const errors = [];

    errorDiv.innerHTML = "";
    succSpan.innerHTML = "";

    if (!/^[A-Za-z]/.test(idValue)){
        errors.push("아이디가 영문으로 시작하지 않습니다!");
    }
    if (idValue.length < 3){
        errors.push("아이디가 3글자 이하입니다!");
    }
    if (idValue.length > 10) {
      errors.push("아이디가 10글자 이상입니다!");
    }
    if (!/\d/.test(idValue)) {
      errors.push("숫자가 존재하지 않습니다!");
    }
    if (/[^A-Za-z0-9]/.test(idValue)) {
    errors.push("특수문자는 사용할 수 없습니다!");
    }

    if (errors.length > 0) {
        errorDiv.innerHTML = errors.map(msg => `<span>${msg}</span>`).join("<br>");
        succSpan.innerHTML = "";
    } else {
        succSpan.innerHTML = '<i class="fa-solid fa-check fa-lg ml-3" style="color: #63E6BE;"></i>';
        errorDiv.innerHTML = "";
    }
})

//비밀번호

const passwdInput = document.getElementById("passwd-input");
const repasswdInput = document.getElementById("repasswd-input");
const passwdErrorDiv = document.getElementById("passwd-error");
const repasswdErrorDiv = document.getElementById("repasswd-error");
const passwdSuccSpan = document.getElementById("passwd-success");
const repasswdSuccSpan = document.getElementById("repasswd-success");

function validatePassword() {
    const pw = passwdInput.value.trim();
    const repw = repasswdInput.value.trim();
    const errors = [];

    passwdErrorDiv.innerHTML = "";
    repasswdErrorDiv.innerHTML = "";
    passwdSuccSpan.innerHTML = "";

    if (!/\d/.test(pw)) {
        errors.push("숫자가 포함되어있지 않습니다!");
    }
    if (!/[a-z]/.test(pw)) {
        errors.push("소문자가 포함되어있지 않습니다!");
    }
    if (pw.length < 8) {
        errors.push("비밀번호가 8글자 이하입니다!");
    }
    if (pw.length > 20) {
        errors.push("비밀번호가 20글자 이상입니다!");
    }

    if (pw !== repw) {
        repasswdErrorDiv.innerHTML = "비밀번호가 일치하지 않습니다!";
        repasswdSuccSpan.innerHTML = "";
    } else {
        repasswdSuccSpan.innerHTML = '<i class="fa-solid fa-check fa-lg ml-3" style="color: #63E6BE;"></i>';
        repasswdErrorDiv.innerHTML = "";
    }

    if (errors.length > 0) {
        passwdErrorDiv.innerHTML = errors.map(msg => `<span>${msg}</span>`).join("<br>");
        passwdSuccSpan.innerHTML = "";
    } else {
        passwdSuccSpan.innerHTML = '<i class="fa-solid fa-check fa-lg ml-3" style="color: #63E6BE;"></i>';
        passwdErrorDiv.innerHTML = "";
    }
}
document.getElementById("passwd-input").addEventListener("blur", validatePassword);
document.getElementById("repasswd-input").addEventListener("blur", validatePassword);

//닉네임

const nicknameInput = document.getElementById("nickname-input");
const nicknameErrorDiv = document.getElementById("nickname-error");
const nicknameSuccSpan = document.getElementById("nickname-success");
let bannedWords = [];

fetch("json/hateword_list.json")
    .then(res => {
        if (!res.ok) throw new Error("JSON 파일을 불러올 수 없습니다.");
        return res.json();
    })
    .then(data => {
        bannedWords = Array.isArray(data) ? data : data.words;
    })
    .catch(err => {
        console.error("닉네임 검열 검사 중 오류가 발생했습니다.", err);
    })

function validateNickname() {
    const nickname = nicknameInput.value.trim();
    const errors = [];

    nicknameErrorDiv.innerHTML = "";
    nicknameSuccSpan.innerHTML = "";

    if (nickname.length < 2){
        errors.push("닉네임이 2글자 이하입니다!");
    }
    if (nickname.length > 8){
        errors.push("닉네임이 8글자 이상입니다!");
    }
    
    const hateWord = bannedWords.some(word => nickname.includes(word));
    if (hateWord) {
        errors.push("부적절한 단어가 포함된 닉네임은 사용할 수 없습니다!");
    }

    if (errors.length > 0){
        nicknameErrorDiv.innerHTML = errors.map(msg => `<span>${msg}</span>`).join("<br>");
        nicknameSuccSpan.innerHTML = "";
    } else {
        nicknameSuccSpan.innerHTML = '<i class="fa-solid fa-check fa-lg ml-3" style="color: #63E6BE;"></i>';
        nicknameErrorDiv.innerHTML = "";
    }
}

nicknameInput.addEventListener("blur", validateNickname);

//이메일

const emailIdInput = document.getElementById("email-id");
const emailTextInput = document.getElementById("email-text");
const emailErrorDiv = document.getElementById("email-error");
const emailSuccSpan = document.getElementById("email-success");

function validateEmail() {
    const emailValue = emailIdInput.value.trim();
    let domain = emailTextInput.value.trim();

    emailErrorDiv.innerHTML = "";
    emailSuccSpan.innerHTML = "";

    const fullEmail = `${emailValue}@${domain}`;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(fullEmail)) {
        emailErrorDiv.innerHTML = "이메일 형식이 올바르지 않습니다!";
        emailSuccSpan.innerHTML = "";
        return;
    }
    
    emailSuccSpan.innerHTML = '<i class="fa-solid fa-check fa-lg ml-3" style="color: #63E6BE;"></i>';
    //emailErrorDiv.innerHTML = "";
}

emailIdInput.addEventListener("blur", validateEmail);
emailTextInput.addEventListener("blur", validateEmail);

//submit


const signupForm = document.getElementById("signup-form");
const agreePrivacy = document.getElementById("agree-privacy");
const agreeAge = document.getElementById("agree-age");

signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    validateEmail();
    validateNickname();
    validatePassword();

    if (!agreePrivacy.checked || !agreeAge.checked) {
        alert("필수 약관에 모두 동의해주세요.");
        return;
    }

    const errorElements = document.querySelectorAll(".text-red-500");
    const haveError = Array.from(errorElements).some(el => el.innerHTML.trim() !== "");
    if (haveError) {
        alert("양식이 올바르지 않습니다.");
        return;
    }

    const id = document.getElementById("id-input").value.trim();
    const password = document.getElementById("passwd-input").value.trim();
    const nickname = document.getElementById("nickname-input").value.trim();
    const emailId = document.getElementById("email-id").value.trim();
    const name = document.getElementById("name-input").value.trim();
    const birthYear = document.getElementById("birth-year").value.trim();
    const birthMonth = document.getElementById("birth-month").value.trim();
    const birthDay = document.getElementById("birth-day").value.trim();
    const birth = `${birthYear}-${birthMonth}-${birthDay}`;
    const emailText = document.getElementById("email-text").value.trim();
    const email = `${emailId}@${emailText}`;

    const userData = {
        id,
        password,
        nickname,
        name,
        email,
        birth,
    };

    try {
        const response = await fetch ("/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            //응답 실패일 경우 서버가 보낸 json 을 await response.json()으로 파싱해서
            //그 안에 있는 메세지 출력
            //const errorData = await response.json();
            alert("회원가입 실패: " + errorData.message);
            return;
        }
        const result = await response.json();
        alert("회원가입이 완료되었습니다!");
        //페이지 이동 처리 자리
        //window.location.href = "/home";
    } catch (err) {
        console.error("회원가입 요청 중 오류가 발생했습니다.");
        alert("서버와의 통신에 실패했습니다.");
    }

}); 

