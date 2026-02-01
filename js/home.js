// 설정 객체 - 여기서 모든 값을 쉽게 변경할 수 있음
const heroConfig = {
    liveBadge: 'LIVE MATCH',
    title: '숙명의<br>라이벌전',
    subtitle: '2026 LCK 썸머 스플릿 1위 결정전',
    description: 'T1 과 젠지의 자존심을 건 승부가 지금 시작됩니다.',
    btnWatchText: '중계 보기',
    btnDetailsText: '상세 보기',
    team1: {
        logo: 'photos/assets/T1.svg',
        name: 'T1',
        color: '#dc143c' // T1 레드
    },
    team2: {
        logo: 'photos/assets/GEN.G.svg',
        name: 'Gen.G',
        color: '#c8aa6e' // Gen.G 골드
    }
};

// DOM 요소에 설정 적용
function applyHeroConfig() {
    // 텍스트 콘텐츠 업데이트
    document.getElementById('liveBadge').textContent = heroConfig.liveBadge;
    document.getElementById('heroTitle').innerHTML = heroConfig.title;
    document.getElementById('heroSubtitle').textContent = heroConfig.subtitle;
    document.getElementById('heroDescription').textContent = heroConfig.description;
    document.getElementById('btnWatch').textContent = heroConfig.btnWatchText;
    document.getElementById('btnDetails').textContent = heroConfig.btnDetailsText;

    // 팀 로고 업데이트
    const team1LogoEl = document.getElementById('team1Logo');
    const team2LogoEl = document.getElementById('team2Logo');
    
    team1LogoEl.src = heroConfig.team1.logo;
    team1LogoEl.alt = heroConfig.team1.name;
    team2LogoEl.src = heroConfig.team2.logo;
    team2LogoEl.alt = heroConfig.team2.name;

    // 배경 그라데이션 색상 업데이트
    document.documentElement.style.setProperty('--team1-color', heroConfig.team1.color);
    document.documentElement.style.setProperty('--team2-color', heroConfig.team2.color);
}

// 스크롤 시 배경 페이드 아웃 효과
function handleScrollFade() {
    const heroBackground = document.querySelector('.hero-background');
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    
    // 스크롤 위치에 따라 opacity 계산 (0 ~ windowHeight * 0.8 범위에서 1 -> 0)
    // 더 부드럽게 사라지도록 범위를 조정
    const fadeStart = 0;
    const fadeEnd = windowHeight * 0.8;
    const opacity = Math.max(0, Math.min(1, 1 - ((scrollPosition - fadeStart) / (fadeEnd - fadeStart))));
    
    heroBackground.style.opacity = opacity;
}

// 탭 전환 기능
function initTabSwitching() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const teamTable = document.getElementById('teamTable');
    const playerTable = document.getElementById('playerTable');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tab = button.getAttribute('data-tab');

            // 모든 탭 버튼에서 active 클래스 제거
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // 클릭된 버튼에 active 클래스 추가
            button.classList.add('active');

            // 테이블 전환
            if (tab === 'team') {
                teamTable.style.display = 'flex';
                playerTable.style.display = 'none';
            } else if (tab === 'player') {
                teamTable.style.display = 'none';
                playerTable.style.display = 'flex';
            }
        });
    });
}

// 날짜 탭 전환 기능
function initDateTabSwitching() {
    const dateTabs = document.querySelectorAll('.date-tab');

    dateTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // 모든 날짜 탭에서 active 클래스 제거
            dateTabs.forEach(t => t.classList.remove('active'));
            
            // 클릭된 탭에 active 클래스 추가
            tab.classList.add('active');

            // 여기에 날짜별 경기 데이터를 로드하는 로직을 추가할 수 있습니다
            // 예: loadMatchesByDate(tab.textContent);
        });
    });
}

// 페이지 로드 시 설정 적용
document.addEventListener('DOMContentLoaded', () => {
    applyHeroConfig();
    
    // 스크롤 이벤트 리스너 추가
    window.addEventListener('scroll', handleScrollFade);
    
    // 초기 상태 설정
    handleScrollFade();

    // 탭 전환 기능 초기화
    initTabSwitching();

    // 날짜 탭 전환 기능 초기화
    initDateTabSwitching();
});
