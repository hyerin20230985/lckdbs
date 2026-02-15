document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================================
    // 🟢 1. 상수 및 DOM 요소 정의 (최상단으로 이동)
    // =========================================================
    
    const tournamentLogos = document.querySelectorAll('.tournament_logo');
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
        'DRX':"https://d30q0nmfm6z0r7.cloudfront.net/photos/assets/DRX.svg",
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
            filteredSchedule.forEach(item => {
                
                // 날짜 정보 (Header 없이 통합)
                const [monthNum, day] = item.date.split('-').slice(1);
                const displayDateInfo = `${monthNum}/${day}(${item.dayOfWeek})`; 
                
                // 승리팀/패배팀 판별 및 스코어 분리
                const [score1 = '', score2 = ''] = item.result.split(' : ').map(s => s.trim());
                const isFinished = item.status === '종료';
                
                const team1IsWinner = isFinished && score1 > score2;
                const team2IsWinner = isFinished && score2 > score1;

                const scoreHtml = isFinished 
                    ? `<span class="score-1 ${team1IsWinner ? 'winner-score' : ''}">${score1}</span> : <span class="score-2 ${team2IsWinner ? 'winner-score' : ''}">${score2}</span>`
                    : '-';

                // 2. 경기 상세 정보 행 생성 (복잡한 배치 HTML)
                const scheduleItem = document.createElement('div');
                scheduleItem.classList.add('match-row');
                
                scheduleItem.innerHTML = `
                    <div class="match-time-date">
                        <span class="match-time">${item.time}</span>
                        <span class="match-date">${displayDateInfo}</span>
                    </div>
                    
                    <div class="match-status-stage">
                        <span class="match-status">${item.status}</span>
                        <span class="match-stage">${item.stage}</span>
                    </div>
                    
                    <div class="team team-1 ${team1IsWinner ? 'winner' : ''}">
                        <span class="team-name">${item.team1}</span>
                        <img src="${teamLogos[item.team1]}" alt="${item.team1}" class="team-logo">
                    </div>
                    
                    <div class="match-score">${scoreHtml}</div>
                    
                    <div class="team team-2 ${team2IsWinner ? 'winner' : ''}">
                        <img src="${teamLogos[item.team2]}" alt="${item.team2}" class="team-logo">
                        <span class="team-name">${item.team2}</span>
                    </div>
                    
                    <button class="replay-btn" ${!isFinished ? 'disabled' : ''}>다시보기</button>
                    <div class="match-location">${item.location}</div>
                `;
                scheduleDisplay.appendChild(scheduleItem);
            });
        } else {
            scheduleDisplay.innerHTML = `<h2>선택된 조건에 맞는 일정이 없습니다.</h2>`;
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
    const initialMonth = monthSelect.value; // 'all'
    // selectedItem에 있는 '전체' 옵션의 alt 속성 값을 가져옴 ('all')
    const initialTeam = selectedItem.querySelector('.team-logo').alt; 
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
            const selectedTeam = selectedItem.querySelector('.team-logo').alt;
            displaySchedule(currentTournament, selectedMonth, selectedTeam);
        }
    };
    
    monthSelect.addEventListener('change', updateSchedule);
    
    // 로고 클릭 이벤트 리스너 (기존과 동일)
    tournamentLogos.forEach(logo => {
        logo.addEventListener('click', (event) => {
            currentTournament = event.target.dataset.tournament;
            const selectedMonth = monthSelect.value;
            const selectedTeam = selectedItem.querySelector('.team-logo').alt;
            
            // ⭐️ 로고 클릭 시 해당 로고에 시각적 피드백 추가 (CSS에 정의 필요)
            tournamentLogos.forEach(l => l.classList.remove('selected'));
            event.target.classList.add('selected');

            displaySchedule(currentTournament, selectedMonth, selectedTeam);
        });
    });
});