document.addEventListener('DOMContentLoaded', () => {

    // =========================================================
    // 🟢 1. 상수 및 DOM 요소 정의 (최상단으로 이동)
    // =========================================================

    const tournamentTabs = document.querySelectorAll('.tournament-tab');
    const scheduleDisplay = document.getElementById('schedule-display');
    const monthSelect = document.getElementById('month-select');

    // 커스텀 드롭다운 관련 요소
    const customSelect = document.getElementById('custom-team-select');
    const selectedItem = customSelect.querySelector('.select-selected');
    const selectList = customSelect.querySelector('.select-items');

    // ⭐️ 오류 해결을 위해 상수를 여기에 정의
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    const stages = ["플레이인 1R", "정규시즌", "8강", "준결승", "결승"];
    const locations = ["서울 LOL PARK", "부산 BEXCO", "대전 드림 아레나", "온라인"];
    const statusOptions = ["종료", "예정"];

    // 사용 가능한 팀 목록과 로고 경로
    const teams = ['T1', 'Gen.G', 'DK', 'KT', 'HLE', 'FOX', 'DNF', 'BRO', 'NS', 'DRX'];
    const teamLogos = {
        'T1': "https://d30q0nmfm6z0r7.cloudfront.net/photos/assets/T1.svg",
        'Gen.G': "https://d30q0nmfm6z0r7.cloudfront.net/photos/assets/GEN.G.svg",
        'DK': "https://d30q0nmfm6z0r7.cloudfront.net/photos/assets/DK.svg",
        'KT': "https://d30q0nmfm6z0r7.cloudfront.net/photos/assets/KT.svg",
        'HLE': "https://d30q0nmfm6z0r7.cloudfront.net/photos/assets/HLE.svg",
        'FOX': "https://d30q0nmfm6z0r7.cloudfront.net/photos/assets/BNK.png",
        'DNF': "https://d30q0nmfm6z0r7.cloudfront.net/photos/assets/DNF.svg",
        'BRO': "https://d30q0nmfm6z0r7.cloudfront.net/photos/assets/BRO.svg",
        'NS': "https://d30q0nmfm6z0r7.cloudfront.net/photos/assets/NS.svg",
        'DRX': "https://d30q0nmfm6z0r7.cloudfront.net/photos/assets/DRX.svg",
        'all': "https://d30q0nmfm6z0r7.cloudfront.net/photos/assets/LCK.svg"
    };

    let currentTournament = 'LCK'; // ⭐️ 초기값 'LCK' 설정

    // =========================================================
    // 🟢 2. 함수 정의: 데이터 생성 및 화면 표시
    // =========================================================

    // 팀 선택 드롭다운에 옵션 동적 추가 (populateTeams 함수는 그대로 사용)
    function populateTeams() {
        const allOption = document.createElement('li');
        allOption.dataset.team = 'all';
        allOption.innerHTML = `<img src="${teamLogos['all']}" alt="전체" class="team-logo">전체`;
        selectList.appendChild(allOption);

        teams.forEach(team => {
            const option = document.createElement('li');
            option.dataset.team = team;
            option.innerHTML = `<img src="${teamLogos[team]}" alt="${team}" class="team-logo">${team}`;
            selectList.appendChild(option);
        });
    }

    // 일정 데이터 생성 함수 (수정된 최종 버전)
    function generateMonthlySchedule(teams) {
        const scheduleList = [];
        const getRandomTeam = () => teams[Math.floor(Math.random() * teams.length)];

        for (let month = 1; month <= 12; month++) {
            for (let i = 0; i < 3; i++) {
                const randomDay = Math.floor(Math.random() * 28) + 1;
                const dateStr = `2025-${String(month).padStart(2, '0')}-${String(randomDay).padStart(2, '0')}`;

                const dateObj = new Date(dateStr);
                const dayOfWeek = dayNames[dateObj.getDay()];

                const time = `${15 + Math.floor(Math.random() * 5)}:00`;
                const team1 = getRandomTeam();
                let team2 = getRandomTeam();
                while (team1 === team2) {
                    team2 = getRandomTeam();
                }

                const status = statusOptions[Math.floor(Math.random() * statusOptions.length)];
                let result = '';
                if (status === '종료') {
                    const winScore = 3;
                    const loseScore = Math.floor(Math.random() * 3);
                    if (Math.random() < 0.5) {
                        result = `${winScore} : ${loseScore}`;
                    } else {
                        result = `${loseScore} : ${winScore}`;
                    }
                } else {
                    result = '';
                }

                scheduleList.push({
                    date: dateStr,
                    dayOfWeek,
                    time,
                    team1,
                    team2,
                    stage: stages[Math.floor(Math.random() * stages.length)],
                    status,
                    result,
                    location: locations[Math.floor(Math.random() * locations.length)],
                });
            }
        }

        scheduleList.sort((a, b) => new Date(a.date) - new Date(b.date));
        return scheduleList;
    }


    // 일정을 화면에 표시하는 함수 (최종 배치 버전)
    function displaySchedule(tournamentName, month, team) {
        const fullSchedule = schedules[tournamentName];

        if (!fullSchedule) {
            scheduleDisplay.innerHTML = `<h2>대회 데이터를 불러올 수 없습니다.</h2>`;
            return;
        }

        let filteredSchedule = fullSchedule;

        // 월별 필터링
        if (month && month !== 'all') {
            filteredSchedule = filteredSchedule.filter(item => {
                const itemMonth = item.date.split('-')[1];
                return itemMonth === month;
            });
        }

        // 팀별 필터링 (team1, team2 속성 사용)
        if (team && team !== 'all') {
            filteredSchedule = filteredSchedule.filter(item => item.team1 === team || item.team2 === team);
        }

        filteredSchedule.sort((a, b) => new Date(a.date) - new Date(b.date));

        scheduleDisplay.innerHTML = '';

        if (filteredSchedule && filteredSchedule.length > 0) {
            let currentDate = null;
            let itemIndex = 0; // 스태거 애니메이션 딜레이용 인덱스

            filteredSchedule.forEach((item) => {

                // 날짜 그룹화 헤더 추가 로직
                if (currentDate !== item.date) {
                    currentDate = item.date;
                    const dateArr = item.date.split('-');
                    const displayHeaderDate = `${dateArr[0]}년 ${dateArr[1]}월 ${dateArr[2]}일 (${item.dayOfWeek})`;

                    const dateHeader = document.createElement('div');
                    dateHeader.className = 'w-full text-lg font-black text-white bg-white/5 border border-white/10 rounded-xl px-6 py-4 mt-8 mb-4 backdrop-blur-md flex items-center gap-3 shadow-[0_4px_20px_rgba(0,0,0,0.2)] animate-fade-in-up';
                    dateHeader.style.animationDelay = `${itemIndex * 0.05}s`;
                    dateHeader.innerHTML = `<div class="w-1.5 h-6 bg-purple-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.6)]"></div> <span class="tracking-wide">${displayHeaderDate}</span>`;
                    scheduleDisplay.appendChild(dateHeader);
                    itemIndex++; // 날짜 헤더도 애니메이션 간격 추가
                }

                // 승리팀/패배팀 판별 및 스코어 분리
                const [score1 = '', score2 = ''] = item.result.split(' : ').map(s => s.trim());
                const isFinished = item.status === '종료';

                const team1IsWinner = isFinished && score1 > score2;
                const team2IsWinner = isFinished && score2 > score1;

                const scoreHtml = isFinished
                    ? `<span class="${team1IsWinner ? 'text-purple-400' : 'text-gray-500'}">${score1}</span> <span class="text-gray-600 font-normal mx-2">:</span> <span class="${team2IsWinner ? 'text-purple-400' : 'text-gray-500'}">${score2}</span>`
                    : '<span class="text-gray-600">-</span>';

                // 2. 경기 상세 정보 행 생성 (아코디언 구조 및 Tailwind 적용)
                const scheduleItem = document.createElement('div');
                scheduleItem.className = 'w-full mb-3 animate-fade-in-up';
                // 0.05초 단위로 스태거 효과 적용 (너무 길어지면 답답하므로 최대값 제한 가능)
                scheduleItem.style.animationDelay = `${itemIndex * 0.05}s`;
                itemIndex++;

                // 경기 렌더링 HTML
                scheduleItem.innerHTML = `
                    <div class="match-card relative bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.05] hover:border-purple-500/50 hover:shadow-[0_0_25px_rgba(168,85,247,0.2)] hover:-translate-y-1 transition-all duration-400 cursor-pointer overflow-hidden group backdrop-blur-md">
                        
                        <!-- LIVE 진행 시 배경 애니메이션 효과 (예정 또는 진행중 강조) -->
                        ${!isFinished ? `<div class="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>` : ''}

                        <div class="flex items-center w-full p-5 relative z-10 transition-all">
                            <!-- 시간 및 상태 -->
                            <div class="w-28 flex-shrink-0 flex items-center justify-between pr-4 border-r border-white/10 mr-6">
                                <span class="text-xl font-bold text-gray-200 tracking-tight group-hover:text-white transition-colors">${item.time}</span>
                                <span class="text-[0.7rem] font-bold px-1.5 py-0.5 rounded ${isFinished ? 'bg-gray-800 text-gray-400' : 'bg-red-500/20 text-red-400 border border-red-500/30 shadow-[0_0_10px_rgba(239,68,68,0.3)]'}">${item.status}</span>
                            </div>
                            
                            <!-- 팀 대진 정보 (가운데) -->
                            <div class="flex-grow flex items-center justify-center gap-8">
                                <div class="flex items-center gap-4 w-40 justify-end transition-transform duration-400 group-hover:-translate-x-2">
                                    <span class="font-bold text-2xl ${isFinished ? (team1IsWinner ? 'text-white' : 'text-gray-500') : 'text-gray-200'} group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] transition-all">${item.team1}</span>
                                    <img src="${teamLogos[item.team1]}" alt="${item.team1}" class="w-14 h-14 object-contain drop-shadow-lg group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all">
                                </div>
                                
                                <div class="match-score text-3xl font-black min-w-[5rem] text-center tracking-widest whitespace-nowrap group-hover:scale-110 transition-transform duration-400">${scoreHtml}</div>
                                
                                <div class="flex items-center gap-4 w-40 justify-start transition-transform duration-400 group-hover:translate-x-2">
                                    <img src="${teamLogos[item.team2]}" alt="${item.team2}" class="w-14 h-14 object-contain drop-shadow-lg group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all">
                                    <span class="font-bold text-2xl ${isFinished ? (team2IsWinner ? 'text-white' : 'text-gray-500') : 'text-gray-200'} group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] transition-all">${item.team2}</span>
                                </div>
                            </div>

                            <!-- 원래있던 다시보기 버튼 및 화살표 -->
                            <div class="w-auto flex items-center justify-end ml-auto flex-shrink-0 gap-4">
                                <button class="replay-btn" style="margin-left: 0;" ${!isFinished ? 'disabled' : ''}>다시보기</button>
                                <svg class="w-6 h-6 text-gray-400 hover:text-white cursor-pointer expand-icon transition-transform duration-300 transform bg-white/5 rounded-full p-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                    </div>
                    
                    <!-- 상세정보 아코디언 요소 (초기 숨김) -->
                    <div class="match-details hidden">
                        <div class="bg-black/40 border-l border-r border-b border-white/5 rounded-b-xl mx-2 p-6 text-sm text-gray-400 shadow-[inset_0_20px_20px_-20px_rgba(0,0,0,0.5)]">
                            ${isFinished ? `
                                <div class="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
                                    <div class="bg-white/5 rounded-lg p-4 flex flex-col items-center justify-center border border-white/5">
                                        <span class="font-bold text-white mb-1">1세트 결과</span>
                                        <span class="text-xs text-gray-500 mb-2">32:45 소요</span>
                                        <span class="text-purple-400 font-bold px-3 py-1 bg-purple-500/10 rounded-full">${item.team1} WIN</span>
                                    </div>
                                    <div class="bg-white/5 rounded-lg p-4 flex flex-col items-center justify-center border border-white/5">
                                        <span class="font-bold text-white mb-1">2세트 결과</span>
                                        <span class="text-xs text-gray-500 mb-2">28:10 소요</span>
                                        <span class="text-purple-400 font-bold px-3 py-1 bg-purple-500/10 rounded-full">${item.team2} WIN</span>
                                    </div>
                                    <div class="bg-white/5 rounded-lg p-4 flex flex-col items-center justify-center border border-white/5">
                                        <span class="font-bold text-white mb-1">3세트 결과</span>
                                        <span class="text-xs text-gray-500 mb-2">41:05 소요</span>
                                        <span class="text-purple-400 font-bold px-3 py-1 bg-purple-500/10 rounded-full">${team1IsWinner ? item.team1 : item.team2} WIN</span>
                                    </div>
                                </div>
                            ` : `
                                <div class="flex flex-col items-center justify-center py-4">
                                    <h4 class="text-white font-bold mb-5 tracking-wide text-base">유저 승부예측</h4>
                                    <div class="flex items-center w-full max-w-lg gap-3 md:gap-6 px-2 md:px-0">
                                        <div class="flex flex-col items-end gap-1 w-12 md:w-auto">
                                            <span class="font-black text-purple-400 text-sm md:text-lg">65%</span>
                                            <span class="text-[9px] md:text-[10px] uppercase text-gray-500">${item.team1}</span>
                                        </div>
                                        <div class="flex-grow h-2.5 bg-gray-800 rounded-full overflow-hidden flex shadow-inner">
                                            <div class="h-full bg-gradient-to-r from-purple-600 to-purple-400 w-[65%]"></div>
                                            <div class="h-full bg-gradient-to-r from-gray-500 to-gray-400 w-[35%]"></div>
                                        </div>
                                        <div class="flex flex-col items-start gap-1 w-12 md:w-auto">
                                            <span class="font-black text-gray-400 text-sm md:text-lg">35%</span>
                                            <span class="text-[9px] md:text-[10px] uppercase text-gray-600">${item.team2}</span>
                                        </div>
                                    </div>
                                    <button class="mt-6 px-8 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg transition-colors shadow-lg">예측 참여하기</button>
                                </div>
                            `}
                        </div>
                    </div>
                `;

                // 아코디언 토글 이벤트 리스너 추가
                const matchCard = scheduleItem.querySelector('.match-card');
                const details = scheduleItem.querySelector('.match-details');
                const icon = scheduleItem.querySelector('.expand-icon');

                matchCard.addEventListener('click', (e) => {
                    // 다시보기 버튼 클릭 시 확장을 막음
                    if (e.target.tagName === 'BUTTON') return;

                    const isHidden = details.classList.contains('hidden');

                    // 다른 모든 아코디언 닫기 (원치 않으면 주석 처리)
                    document.querySelectorAll('.match-details').forEach(el => el.classList.add('hidden'));
                    document.querySelectorAll('.expand-icon').forEach(el => el.style.transform = 'rotate(0deg)');
                    document.querySelectorAll('.match-card').forEach(el => el.classList.remove('rounded-b-none', 'border-b-transparent'));

                    if (isHidden) {
                        details.classList.remove('hidden');
                        icon.style.transform = 'rotate(180deg)';
                        matchCard.classList.add('rounded-b-none', 'border-b-transparent');
                    }
                });

                scheduleDisplay.appendChild(scheduleItem);
            });
        } else {
            scheduleDisplay.innerHTML = `<div class="text-center py-20"><h2 class="text-2xl text-gray-500">선택된 조건에 맞는 일정이 없습니다.</h2></div>`;
        }
    }

    // =========================================================
    // 🟢 3. 초기화 및 이벤트 리스너
    // =========================================================

    // 페이지 로드 시 팀 드롭다운 채우기
    populateTeams();

    // 대회별 일정 데이터를 객체로 정의 (populateTeams 다음에 위치)
    const schedules = {
        '퍼스트 스탠드 토너먼트': generateMonthlySchedule(teams),
        'LCK': generateMonthlySchedule(teams),
        'MSI': generateMonthlySchedule(teams),
        '롤드컵': generateMonthlySchedule(teams)
    };

    // ⭐️ 페이지 로드 시 초기 일정 표시
    const initialMonth = monthSelect.value;
    const initialTeam = 'all'; // 초기 로드 무조건 'all' 기준
    displaySchedule(currentTournament, initialMonth, initialTeam);


    // 커스텀 드롭다운 이벤트 리스너 (기존과 동일)
    selectedItem.addEventListener('click', () => {
        selectList.classList.toggle('select-hide');
    });

    selectList.addEventListener('click', (event) => {
        const selectedTeamElement = event.target.closest('li');
        if (selectedTeamElement) {
            const selectedTeam = selectedTeamElement.dataset.team;
            const logoSrc = teamLogos[selectedTeam];
            const logoHtml = `<img src="${logoSrc}" alt="${selectedTeam}" class="team-logo">`;

            selectedItem.innerHTML = logoHtml + (selectedTeam === 'all' ? '전체' : selectedTeam);
            selectList.classList.add('select-hide');
            customSelect.dataset.currentTeam = selectedTeam; // 현재 팀 상태 저장

            // 일정 업데이트
            if (currentTournament) {
                const selectedMonth = monthSelect.value;
                displaySchedule(currentTournament, selectedMonth, selectedTeam);
            }
        }
    });

    // 다른 영역 클릭 시 드롭다운 닫기 (기존과 동일)
    document.addEventListener('click', (event) => {
        if (!customSelect.contains(event.target)) {
            selectList.classList.add('select-hide');
        }
    });

    // 월 선택 드롭다운 변경 이벤트 리스너 (기존과 동일)
    const updateSchedule = () => {
        if (currentTournament) {
            const selectedMonth = monthSelect.value;
            // 팀 구하기: dataset 속성에서 저장된 임의 상태(dataset.currentTeam)를 쓰도록 추가 수정
            const selectedTeam = customSelect.dataset.currentTeam || 'all';
            displaySchedule(currentTournament, selectedMonth, selectedTeam);
        }
    };

    monthSelect.addEventListener('change', updateSchedule);

    // 로고 클릭 이벤트 리스너 (기존과 동일)
    tournamentTabs.forEach(tab => {
        tab.addEventListener('click', (event) => {
            const button = event.currentTarget.closest('.tournament-tab');
            currentTournament = button.dataset.tournament;
            const selectedMonth = monthSelect.value;
            const selectedTeam = customSelect.dataset.currentTeam || 'all';

            // ⭐️ 로고 클릭 시 해당 로고에 시각적 피드백 추가
            tournamentTabs.forEach(t => t.classList.remove('active'));
            button.classList.add('active');

            displaySchedule(currentTournament, selectedMonth, selectedTeam);
        });
    });

    // =========================================================
    // ⭐️ 4. LCK 랭킹 위젯 아코디언 추가 (동적 포디움)
    // =========================================================
    const rankingItems = document.querySelectorAll('.dynamic-ranking-list .ranking-item');

    rankingItems.forEach(item => {
        item.addEventListener('click', () => {
            // 이미 확장된 상태면 무시 (최소 1개는 열려있어야 함)
            if (item.classList.contains('is-expanded')) return;

            // 1. 기존 항목 축소 (클래스 즉시 교체)
            const currentlyExpanded = document.querySelector('.dynamic-ranking-list .ranking-item.is-expanded');
            if (currentlyExpanded) {
                currentlyExpanded.classList.remove('is-expanded');
                const p = currentlyExpanded.querySelector('.podium-view');
                const l = currentlyExpanded.querySelector('.list-view');

                if (p) p.classList.add('hidden');
                if (l) l.classList.remove('hidden');
            }

            // 2. 새 항목 확장 (버튼 프레스 느낌은 CSS가 처리)
            item.classList.add('is-expanded');
            const targetPodium = item.querySelector('.podium-view');
            const targetList = item.querySelector('.list-view');

            if (targetList) targetList.classList.add('hidden');
            if (targetPodium) targetPodium.classList.remove('hidden');
        });
    });

    // 진입 애니메이션 (champion4 헤더 참조)
    setTimeout(() => {
        const header = document.getElementById('main-header');
        if (header) {
            header.style.transform = 'translate(-50%, 0)';
        }
    }, 100);
});