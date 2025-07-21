import { validateId, displayIdValidation } from '../validate/id.js';
import { validatePassword, displayPasswordValidation } from '../validate/password.js';
import { validateNickname, displayNicknameValidation } from '../validate/nickname.js';
// import { validateEmail, displayEmailValidation } from '../validate/email.js';

 document.addEventListener("DOMContentLoaded", () => {
    displayIdValidation();
    displayPasswordValidation();
    displayNicknameValidation();
    // displayEmailValidation();

    const signupForm = document.getElementById("signup-form");
    const agreePrivacy = document.getElementById("agree-privacy");
    const agreeAge = document.getElementById("agree-age");

    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const id = document.getElementById("id-input").value.trim();
        const password = document.getElementById("passwd-input").value.trim();
        const repassword = document.getElementById("repasswd-input").value.trim();
        const nickname = document.getElementById("nickname-input").value.trim();
        // const emailId = document.getElementById("email-id").value.trim();
        // const emailText = document.getElementById("email-text").value.trim();
        const name = document.getElementById("name-input").value.trim();
        // const birth = `${document.getElementById("birth-year").value.trim()}-${document.getElementById("birth-month").value.trim()}-${document.getElementById("birth-day").value.trim()}`;

        const errors = [];

        const idErrors = validateId(id);
        if (idErrors.length) errors.push(...idErrors);

        const { errors: pwErrors, match } = validatePassword(password, repassword);
        if (pwErrors.length) errors.push(...pwErrors);
        if (!match) errors.push("비밀번호가 일치하지 않습니다!");

        const nicknameErrors = validateNickname(nickname);
        if (nicknameErrors.length) errors.push(...nicknameErrors);

        // const emailError = validateEmail(emailId, emailText);
        // if (emailError) errors.push(emailError);

        if (!agreePrivacy.checked || !agreeAge.checked) {
            errors.push("필수 약관에 모두 동의해주세요.");
        }

        if (errors.length > 0) {
            alert("입력 오류:\n" + errors.join("\n"));
            return;
        }
        
        const userData = {
            id,
            password,
            nickname,
            name,
            // email: `${emailId}@${emailText}`,
            // birth,
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
})

