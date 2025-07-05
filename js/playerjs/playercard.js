document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("click", () => {
    // 다른 카드들 초기화
    document.querySelectorAll(".card").forEach(other => {
      if (other !== card) {
        other.classList.remove("active");
      }
    });

    // 현재 카드 토글
    card.classList.toggle("active");
  });
});