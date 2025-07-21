const navItems    = document.querySelectorAll('.match-nav .match-nav-item');
  const matchesGrid = document.getElementById('matchesGrid');

  // ① “오늘의 경기” HTML (이미 페이지에 있는 상태라면, innerHTML을 복사해 둡니다)
  const todayHTML = matchesGrid.innerHTML;

  // ② “예정된 경기” HTML: (없을 때 메시지)
  const upcomingHTML = `
    <div class="matches-empty">
      현재 예정된 경기가 없습니다.
    </div>
  `;

  // (③ 필요하다면 “최근 경기 결과” 컨텐츠도 같은 방식으로 정의)
  const recentHTML = `
    <div class="matches-empty">
      최근 경기 결과가 없습니다.
    </div>
  `;

  const tabContent = {
    today:    todayHTML,
    upcoming: upcomingHTML,
    recent:   recentHTML
  };

  navItems.forEach(item => {
  item.addEventListener('click', () => {
    // 1) active 토글
    navItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');

    // 2) 본문 내용 교체
    const tab = item.dataset.tab;
    matchesGrid.innerHTML = tabContent[tab] || '';

    // 3) 그리드 on/off 제어
    // today만 그리드, 그 외(upcoming, recent)는 플렉스→no-grid
    if (tab === 'today') {
      matchesGrid.classList.remove('no-grid');
    } else {
      matchesGrid.classList.add('no-grid');
    }
  });
});
