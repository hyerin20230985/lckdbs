document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    // 기존 detail-popup 제거
    const existingDetail = document.getElementById('detail-popup');
    if (existingDetail) existingDetail.remove();

    // 기존 dropdown 제거
    const existingDropdown = document.getElementById('year-select');
    if (existingDropdown) existingDropdown.remove();

    // 카드 위치 가져오기
    const rect = card.getBoundingClientRect();

    // ——— 1. Detail 팝업 생성 (기존 코드) ———
    const detail = document.createElement('div');
    detail.id = 'detail-popup';
    Object.assign(detail.style, {
      position: 'absolute',
      top: `${rect.top + window.scrollY}px`,
      left: `${rect.right + 20}px`,
      width: '300px',
      height: '400px',
      backgroundColor: 'rgba(255,255,255,0.95)',
      boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
      borderRadius: '10px',
      padding: '15px',
      zIndex: '9999',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    });
    detail.innerHTML = `
      <div>
        <h4>${card.dataset.nickname} (${card.dataset.name})</h4>
        <p>포지션: ${card.dataset.position}</p>
        <p>팀: ${card.dataset.team}</p>
      </div>
      <button id="close-detail" style="
        margin-top: 15px;
        padding: 10px;
        width: 100%;
        background-color: #060b40;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
      ">닫기</button>
    `;
    document.body.appendChild(detail);
    document.getElementById('close-detail').addEventListener('click', () => detail.remove());

    // ——— 2. Dropdown 메뉴 생성 ———
    const select = document.createElement('select');
    select.id = 'year-select';
    Object.assign(select.style, {
      position: 'absolute',
      top: `${rect.bottom + window.scrollY + 5}px`, // 카드 바로 아래
      left: `${rect.left + window.scrollX}px`,      // 카드 왼쪽 정렬
      zIndex: '9999',
      padding: '8px',
      fontSize: '14px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      backgroundColor: 'white',
      width: '250px',
    });

    // 현재 연도부터 5년 전까지 옵션 생성
    for (let y = 2025; y >= 2017; y--) {
        const opt = document.createElement('option');
        opt.value = y;
        opt.textContent = `${y}년`;
        select.appendChild(opt);
    }

    // 선택 변경 시 콜백 (예: 콘솔 출력)
    select.addEventListener('change', e => {
      console.log('선택된 연도:', e.target.value);
      // TODO: 여기서 해당 연도 데이터 로드하거나 필터링 처리
    });

    document.body.appendChild(select);

    // 바깥 클릭 시 드롭다운 닫기
    document.getElementById('close-detail').addEventListener('click', () => {
      detail.remove();
      const sel = document.getElementById('year-select');
      if (sel) sel.remove();
    });
  });
});
