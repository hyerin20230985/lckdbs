document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('player-list-container');

    if (container) {
        container.addEventListener('click', (event) => {
            const card = event.target.closest('.card');
            if (!card) return;

            document.getElementById('detail-popup')?.remove();

            const rect = card.getBoundingClientRect();

            const detail = document.createElement('div');
            detail.id = 'detail-popup';
            // 동적으로 위치만 설정
            detail.style.top = `${rect.top + window.scrollY}px`;
            detail.style.left = `${rect.right + window.scrollX + 20}px`;

            const select = document.createElement('select');
            select.id = 'year-select';

            const placeholder = document.createElement('option');
            placeholder.value = '';
            placeholder.textContent = '년도별';
            placeholder.disabled = true;
            placeholder.selected = true;
            select.appendChild(placeholder);

            for (let y = 2025; y >= 2017; y--) {
                const opt = document.createElement('option');
                opt.value = y;
                opt.textContent = `${y}년`;
                select.appendChild(opt);
            }

            select.addEventListener('change', e => {
                console.log('선택된 연도:', e.target.value);
            });

            detail.innerHTML = `
              <div>
                <h4>${card.dataset.nickname} (${card.dataset.name})</h4>
                <p>포지션: ${card.dataset.role}</p>
              </div>
            `;

            detail.insertBefore(select, detail.firstChild);

            const closeBtn = document.createElement('button');
            closeBtn.id = 'close-detail';
            closeBtn.textContent = '닫기';

            detail.appendChild(closeBtn);
            document.body.appendChild(detail);

            closeBtn.addEventListener('click', () => detail.remove());
        });
    }
});
