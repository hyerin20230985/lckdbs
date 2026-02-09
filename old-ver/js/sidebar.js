document.addEventListener("DOMContentLoaded", () => {
  const filterList = document.querySelectorAll(".role-list li");

  filterList.forEach(li => {
    li.addEventListener("click", () => {
      // 필터링을 클릭할 때마다 카드 목록을 새로 가져옵니다.
      const cards = document.querySelectorAll("div[data-role]");

      // 1. 강조 효과 클래스 처리
      filterList.forEach(l => l.classList.remove("selected"));
      li.classList.add("selected");

      // 2. 카드 필터링 처리
      const selectedRole = li.dataset.role;

      cards.forEach(card => {
        const cardRole = card.dataset.role;

        if (selectedRole === "ALL" || cardRole === selectedRole) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
});