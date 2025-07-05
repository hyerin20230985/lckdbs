document.addEventListener("DOMContentLoaded", () => {
  const filterList = document.querySelectorAll(".role-list li");
  const cards = document.querySelectorAll("div[data-role]");

  filterList.forEach(li => {
    li.addEventListener("click", () => {
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

