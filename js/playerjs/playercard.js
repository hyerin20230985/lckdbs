document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('player-list-container');

    if (players && container) {
        players.forEach(player => {
            const card = document.createElement('div');
            card.className = 'card';
            card.id = player.id;
            card.dataset.role = player.role;
            card.dataset.nickname = player.nickname;
            card.dataset.name = player.name;
            card.dataset.image = player.image;
            card.dataset.team = player.team; // 팀 정보 추가

            // 팀별 배경 클래스 결정
            const teamBgClass = player.team ? `team-${player.team.replace(/\./g, '')}-bg` : 'default-player-card-bg';

            card.innerHTML = `
                <div class="card-inner">
                    <div class="card-front">
                        <div class="player-card bg-gradient-to-r from-blue-900 via-indigo-950 to-blue-900">
                            <img src="${player.image}" alt="${player.nickname}">
                            <div class="overlay bg-gradient-to-t from-black/70 from-50%">
                                <div class="position">${player.role}</div>
                                <div class="nickname">${player.nickname}</div>
                                <div class="name">${player.name}</div>
                            </div>
                        </div>
                    </div>
                    <div class="card-back bg-gradient-to-r from-indigo-950 via-blue-900 to-indigo-950">
                        <div class="info">
                            <p class="text-sm">${player.nickname} (${player.name})</p>
                            <p class="text-sm">포지션: ${player.role}</p>
                            <p class="text-sm">팀: ${player.team}</p> <!-- 팀 정보 표시 -->
                        </div>
                    </div>
                </div>
            `;

            container.appendChild(card);
        });
    }
});

const scrollBtn = document.getElementById('scrollTopBtn');

  // 스크롤 위치가 300px 이상 내려가면 버튼 보이기
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollBtn.classList.remove('hidden');
    } else {
      scrollBtn.classList.add('hidden');
    }
  });
