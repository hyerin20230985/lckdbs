document.addEventListener('DOMContentLoaded', () => {

    // --- Sample Data ---
    // [Mod] User requested to keep only T1 and Gen.G data. Others removed.
    const playerData = [
        // T1 (Image Path Convention: playersjpg/*.jpg)
        {
            id: 1, name: 'Zeus', fullName: 'Choi Woo-je', club: 'T1', position: 'TOP', image: 'https://d30q0nmfm6z0r7.cloudfront.net/photos/playerspng/Zeus.png',
            games: 18, wins: 15, losses: 3, kda: 4.5, kills: 70, deaths: 30, assists: 95, dpm: 550, dtpm: 450, gpm: 420, cspm: 8.9,
            radarStats: { kda: 4.5, dpm: 5.5, gpm: 8.0, cspm: 8.9, vision: 3.0 },
            champions: [
                { name: "Rumble", games: 7, wins: 6, losses: 1, img: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/75.png" },
                { name: "K'Sante", games: 5, wins: 4, losses: 1, img: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/162.png" },
                { name: "Jayce", games: 3, wins: 2, losses: 1, img: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/100.png" },
            ]
        },
        {
            id: 2, name: 'Oner', fullName: 'Moon Hyeon-jun', club: 'T1', position: 'JGL', image: 'https://d30q0nmfm6z0r7.cloudfront.net/photos/playersjpg/Oner.jpg',
            games: 18, wins: 15, losses: 3, kda: 5.2, kills: 60, deaths: 25, assists: 130, dpm: 450, dtpm: 500, gpm: 380, cspm: 6.5,
            radarStats: { kda: 5.2, dpm: 4.5, gpm: 7.5, cspm: 6.5, vision: 6.0 },
            champions: [
                { name: "Lee Sin", games: 6, wins: 5, losses: 1, img: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/73.png" },
                { name: "Sejuani", games: 4, wins: 4, losses: 0, img: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/91.png" },
                { name: "Vi", games: 4, wins: 3, losses: 1, img: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/109.png" },
            ]
        },
        {
            id: 3, name: 'Faker', fullName: 'Lee Sang-hyeok', club: 'T1', position: 'MID', image: 'https://d30q0nmfm6z0r7.cloudfront.net/photos/playersjpg/Faker.jpg',
            games: 18, wins: 15, losses: 3, kda: 5.8, kills: 80, deaths: 25, assists: 65, dpm: 650, dtpm: 320, gpm: 450, cspm: 9.5,
            radarStats: { kda: 5.8, dpm: 6.5, gpm: 8.5, cspm: 9.5, vision: 4.0 },
            champions: [
                { name: "Azir", games: 8, wins: 7, losses: 1, img: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/121.png" },
                { name: "Ahri", games: 6, wins: 5, losses: 1, img: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/89.png" },
                { name: "Orianna", games: 4, wins: 3, losses: 1, img: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/77.png" }
            ]
        },
        {
            id: 4, name: 'Gumayusi', fullName: 'Lee Min-hyeong', club: 'T1', position: 'ADC', image: 'https://d30q0nmfm6z0r7.cloudfront.net/photos/playersjpg/Gumayusi.jpg',
            games: 18, wins: 15, losses: 3, kda: 6.1, kills: 90, deaths: 22, assists: 75, dpm: 680, dtpm: 350, gpm: 470, cspm: 10.0,
            radarStats: { kda: 6.1, dpm: 6.8, gpm: 8.8, cspm: 10.0, vision: 3.8 },
            champions: [
                { name: "Varus", games: 7, wins: 6, losses: 1, img: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/97.png" },
                { name: "Jinx", games: 5, wins: 4, losses: 1, img: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/116.png" },
                { name: "Kalista", games: 4, wins: 3, losses: 1, img: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/122.png" }
            ]
        },
        {
            id: 5, name: 'Keria', fullName: 'Ryu Min-seok', club: 'T1', position: 'SUP', image: 'https://d30q0nmfm6z0r7.cloudfront.net/photos/playersjpg/Keria.jpg',
            games: 18, wins: 15, losses: 3, kda: 7.1, kills: 20, deaths: 18, assists: 190, dpm: 250, dtpm: 250, gpm: 310, cspm: 1.5,
            radarStats: { kda: 7.1, dpm: 2.5, gpm: 6.0, cspm: 1.5, vision: 9.5 },
            champions: [
                { name: "Renata Glasc", games: 6, wins: 5, losses: 1, img: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/159.png" },
                { name: "Thresh", games: 5, wins: 4, losses: 1, img: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/110.png" },
                { name: "Nautilus", games: 3, wins: 3, losses: 0, img: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/93.png" }
            ]
        },

        // Gen.G (Image Path Convention: playerspng/*.png)
        {
            id: 6, name: 'Kiin', fullName: 'Kim Gi-in', club: 'GEN', position: 'TOP', image: 'https://d30q0nmfm6z0r7.cloudfront.net/photos/playerspng/Kiin.png',
            games: 18, wins: 16, losses: 2, kda: 4.8, kills: 75, deaths: 28, assists: 100, dpm: 560, dtpm: 440, gpm: 430, cspm: 9.0,
            radarStats: { kda: 4.8, dpm: 5.6, gpm: 8.2, cspm: 9.0, vision: 3.2 },
            champions: [
                { name: "K'Sante", games: 9, wins: 8, losses: 1, img: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/162.png" },
                { name: "Gnar", games: 5, wins: 4, losses: 1, img: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/120.png" },
                { name: "Jax", games: 4, wins: 4, losses: 0, img: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/12.png" }
            ]
        },
        {
            id: 7, name: 'Canyon', fullName: 'Kim Geon-bu', club: 'GEN', position: 'JGL', image: 'https://d30q0nmfm6z0r7.cloudfront.net/photos/playerspng/Canyon.png',
            games: 18, wins: 16, losses: 2, kda: 5.5, kills: 65, deaths: 24, assists: 135, dpm: 460, dtpm: 480, gpm: 390, cspm: 6.8,
            radarStats: { kda: 5.5, dpm: 4.6, gpm: 7.8, cspm: 6.8, vision: 6.2 },
            champions: [
                { name: "Kindred", games: 5, wins: 4, losses: 1, img: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/127.png" },
                { name: "Nocturne", games: 4, wins: 4, losses: 0, img: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/72.png" },
                { name: "Graves", games: 4, wins: 3, losses: 1, img: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/85.png" }
            ]
        },
        {
            id: 8, name: 'Chovy', fullName: 'Jeong Ji-hoon', club: 'GEN', position: 'MID', image: 'https://d30q0nmfm6z0r7.cloudfront.net/photos/playerspng/Chovy.png',
            games: 18, wins: 16, losses: 2, kda: 6.2, kills: 95, deaths: 22, assists: 70, dpm: 720, dtpm: 290, gpm: 480, cspm: 10.1,
            radarStats: { kda: 6.2, dpm: 7.2, gpm: 9.0, cspm: 10.1, vision: 3.5 },
            champions: [
                { name: "Azir", games: 12, wins: 9, losses: 3, img: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/121.png" },
                { name: "Corki", games: 7, wins: 4, losses: 3, img: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/37.png" },
                { name: "Ahri", games: 3, wins: 3, losses: 0, img: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/89.png" }
            ]
        },
        {
            id: 9, name: 'Peyz', fullName: 'Kim Su-hwan', club: 'GEN', position: 'ADC', image: 'https://d30q0nmfm6z0r7.cloudfront.net/photos/playersjpg/Peyz.jpg',
            games: 18, wins: 16, losses: 2, kda: 6.5, kills: 98, deaths: 20, assists: 80, dpm: 700, dtpm: 330, gpm: 490, cspm: 10.2,
            radarStats: { kda: 6.5, dpm: 7.0, gpm: 9.2, cspm: 10.2, vision: 3.6 },
            champions: [
                { name: "Zeri", games: 8, wins: 7, losses: 1, img: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/158.png" },
                { name: "Aphelios", games: 6, wins: 5, losses: 1, img: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/147.png" },
                { name: "Lucian", games: 4, wins: 4, losses: 0, img: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/115.png" }
            ]
        },
        {
            id: 10, name: 'Lehends', fullName: 'Son Si-woo', club: 'GEN', position: 'SUP', image: 'https://d30q0nmfm6z0r7.cloudfront.net/photos/playerspng/Lehends.png',
            games: 18, wins: 16, losses: 2, kda: 6.8, kills: 22, deaths: 20, assists: 180, dpm: 260, dtpm: 260, gpm: 320, cspm: 1.6,
            radarStats: { kda: 6.8, dpm: 2.6, gpm: 6.2, cspm: 1.6, vision: 9.0 },
            champions: [
                { name: "Nami", games: 7, wins: 6, losses: 1, img: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/108.png" },
                { name: "Rakan", games: 6, wins: 5, losses: 1, img: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/136.png" },
                { name: "Leona", games: 3, wins: 3, losses: 0, img: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/79.png" }
            ]
        }
    ].map(p => ({
        ...p,
        winrate: p.games > 0 ? parseFloat(((p.wins / p.games) * 100).toFixed(1)) : 0,
        champions: p.champions || [] // Ensure champions array exists
    }));

    // --- Stat Definitions ---
    // [Changed] Reordered for 2x6 grid layout (12 items total)
    const statCategories = [
        // Row 1: Key performance indicators
        { key: 'kda', label: 'KDA', description: '(킬 + 어시스트) / 데스' },
        { key: 'winrate', label: '승률', description: '(승리 / 총 게임 수) * 100' },
        { key: 'dpm', label: 'DPM', description: '분당 가한 데미지 (Damage Per Minute)' },
        { key: 'gpm', label: 'GPM', description: '분당 획득한 골드 (Gold Per Minute)' },
        { key: 'cspm', label: 'CSPM', description: '분당 CS (미니언+몬스터) 수 (Creep Score Per Minute)' },
        { key: 'dtpm', label: 'DTPM', description: '분당 받은 데미지 (Damage Taken Per Minute)' },
        // Row 2: Raw numbers and game counts
        { key: 'kills', label: '킬', description: '기록한 총 킬 수' },
        { key: 'deaths', label: '데스', description: '기록한 총 데스 수' },
        { key: 'assists', label: '어시스트', description: '기록한 총 어시스트 수' },
        { key: 'games', label: '게임수', description: '선수가 참여한 총 게임 수' },
        { key: 'wins', label: '승리', description: '선수가 승리한 총 게임 수' },
        { key: 'losses', label: '패배', description: '선수가 패배한 총 게임 수' },
    ];
    const radarLabels = ['KDA', 'DPM', 'GPM', 'CSPM', '시야'];

    // --- DOM Elements ---
    const elements = {
        comparison: {
            player1Select: document.getElementById('player1-select'),
            player2Select: document.getElementById('player2-select'),
            player1CardWrapper: document.getElementById('player1-card'),
            player2CardWrapper: document.getElementById('player2-card'),
            statsContainer: document.getElementById('stats-container-comparison'),
            winPredictionContainer: document.getElementById('win-prediction-container'),
            teamFilter1: document.getElementById('team-filter1'),
            positionFilter1: document.getElementById('position-filter1'),
            teamFilter2: document.getElementById('team-filter2'),
            positionFilter2: document.getElementById('position-filter2'),
            radarCanvas: document.getElementById('radarChartComparison')
        },
        single: {
            playerSelect: document.getElementById('player-select-single'),
            playerCardWrapper: document.getElementById('player-card-single'),
            statsContainer: document.getElementById('stats-container-single'),
            teamFilter: document.getElementById('team-filter-single'),
            positionFilter: document.getElementById('position-filter-single'),
            radarCanvas: document.getElementById('radarChartSingle')
        },
        tabs: document.querySelectorAll('.tab-button'),
        contentViews: document.querySelectorAll('.view-content')
    };
    
    let comparisonRadarChartInstance = null;
    let singleRadarChartInstance = null;
    const teams = [...new Set(playerData.map(p => p.club))].sort();
    const positions = ['TOP', 'JGL', 'MID', 'ADC', 'SUP'];

    // --- Normalization Logic for Prediction Model ---
    const statMetrics = {};
    const kpisForPrediction = ['kda', 'dpm', 'gpm', 'cspm', 'winrate', 'dtpm'];

    function calculateStatMetrics() {
        kpisForPrediction.forEach(kpi => {
            const values = playerData.map(p => p[kpi]).filter(v => typeof v === 'number');
            if(values.length > 0) {
                statMetrics[kpi] = { min: Math.min(...values), max: Math.max(...values) };
            } else {
                 statMetrics[kpi] = { min: 0, max: 1 }; // Fallback
            }
        });
    }

    function normalize(value, kpi) {
        if (!statMetrics[kpi]) return 0.5; // Safety check
        const { min, max } = statMetrics[kpi];
        if (max === min) return 0.5;
        return (value - min) / (max - min);
    }

    // --- Tab Switching Logic ---
    function initTabs() {
        elements.tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                const newViewId = e.currentTarget.dataset.view;
                elements.tabs.forEach(t => t.classList.remove('active'));
                elements.contentViews.forEach(v => v.classList.remove('active'));
                e.currentTarget.classList.add('active');
                document.getElementById(newViewId).classList.add('active');
                if (newViewId === 'view-comparison') updateComparisonView();
                else if (newViewId === 'view-single') updateSingleView();
            });
        });
    }

    // --- General Initialization Functions ---
    function populateFilterDropdowns() {
        const uniqueTeams = [...new Set(playerData.map(p => p.club))].sort();
        uniqueTeams.forEach(team => {
            elements.comparison.teamFilter1.add(new Option(team, team));
            elements.comparison.teamFilter2.add(new Option(team, team));
            elements.single.teamFilter.add(new Option(team, team));
        });
        positions.forEach(pos => {
            elements.comparison.positionFilter1.add(new Option(pos, pos));
            elements.comparison.positionFilter2.add(new Option(pos, pos));
            elements.single.positionFilter.add(new Option(pos, pos));
        });
    }

    function updatePlayerDropdown(playerSelect, teamFilter, positionFilter) {
        const selectedTeam = teamFilter.value;
        const selectedPosition = positionFilter.value;
        const currentSelectedId = playerSelect.value; 

        let filteredPlayers = playerData;
        if (selectedTeam !== 'all') filteredPlayers = filteredPlayers.filter(p => p.club === selectedTeam);
        if (selectedPosition !== 'all') filteredPlayers = filteredPlayers.filter(p => p.position === selectedPosition);

        playerSelect.innerHTML = `<option value="">${playerSelect.id === 'player-select-single' ? '선수를 선택하세요' : '선수 선택'}</option>`;
        filteredPlayers.sort((a, b) => a.name.localeCompare(b.name)).forEach(player => {
            playerSelect.add(new Option(`${player.name} (${player.club})`, player.id));
        });
        
        if (filteredPlayers.some(p => String(p.id) === currentSelectedId)) {
            playerSelect.value = currentSelectedId;
        }
    }

    // --- Player Card Rendering ---
    const placeholderCardHTML = `
        <div class="player-card placeholder">
            <div class="placeholder-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
            </div>
        </div>`;

    function createPlayerCardHTML(player, playerClass = '') {
        let championsHTML = '';
        if (player.champions && player.champions.length > 0) {
            const bestChampions = [...player.champions]
                .sort((a, b) => {
                    if (b.wins !== a.wins) return b.wins - a.wins;
                    return b.games - a.games;
                })
                .slice(0, 3);

            championsHTML = `
                <div class="best-champions">
                    <h4>Best Champions</h4>
                    ${bestChampions.map(champ => `
                        <div class="champion-card">
                            <img src="${champ.img}" alt="${champ.name}" class="champion-card-img" onerror="this.src='https://via.placeholder.com/40x40/333/888?text=?'; this.onerror=null;">
                            <div class="champion-info">
                                <strong class="champion-name">${champ.name}</strong>
                                <span class="champion-stats">${champ.games}G ${champ.wins}W ${champ.losses}L (${((champ.wins/champ.games)*100).toFixed(0)}%)</span>
                            </div>
                        </div>
                    `).join("")}
                </div>`;
        }

        return `
            <div class="player-card ${playerClass}">
                <img src="${player.image}" alt="${player.name}" class="player-card-image" onerror="this.src='https://placehold.co/120x120/333/888?text=${player.name}'; this.onerror=null;">
                <div class="player-card-name">${player.name}</div>
                <div class="player-card-fullname">${player.fullName}</div>
                ${championsHTML}
                <div class="player-card-kda-wrapper">
                    <span class="kda-label">KDA</span>
                    <span class="player-card-kda">${player.kda}</span>
                </div>
            </div>`;
    }

    // --- Radar Chart Rendering (Generic) ---
    function renderRadarChart(canvas, datasets, chartInstance) {
        if (chartInstance) chartInstance.destroy();
        
        const chartOptions = {
            devicePixelRatio: window.devicePixelRatio || 1,
            maintainAspectRatio: false,
            scales: { r: { angleLines: { color: 'rgba(255, 255, 255, 0.2)' }, grid: { color: 'rgba(255, 255, 255, 0.2)' }, pointLabels: { color: '#e2e2e2', font: { size: 12 } }, ticks: { display: false, max: 12, min: 0 } } },
            plugins: { legend: { display: datasets.length > 1, labels: { color: '#e2e2e2' } } }
        };

        if (datasets.length === 0) {
            return new Chart(canvas.getContext('2d'), {
                type: 'radar',
                data: { labels: radarLabels, datasets: [{ data: [12,12,12,12,12], borderColor: 'rgba(255, 255, 255, 0.2)', borderWidth: 1, pointRadius: 0 }] },
                options: { ...chartOptions, plugins: { legend: { display: false }, tooltip: { enabled: false } } }
            });
        }
        
        return new Chart(canvas.getContext('2d'), { type: 'radar', data: { labels: radarLabels, datasets: datasets }, options: chartOptions });
    }

    // --- Comparison View Logic ---
    function updateComparisonView() {
        const player1 = playerData.find(p => p.id == elements.comparison.player1Select.value);
        const player2 = playerData.find(p => p.id == elements.comparison.player2Select.value);

        elements.comparison.player1CardWrapper.innerHTML = player1 ? createPlayerCardHTML(player1, 'player1') : placeholderCardHTML;
        elements.comparison.player2CardWrapper.innerHTML = player2 ? createPlayerCardHTML(player2, 'player2') : placeholderCardHTML;

        const radarDatasets = [];
        if (player1 && player1.radarStats) radarDatasets.push({ label: player1.name, data: Object.values(player1.radarStats), backgroundColor: 'rgba(66, 153, 225, 0.2)', borderColor: 'rgba(66, 153, 225, 1)', borderWidth: 2 });
        if (player2 && player2.radarStats) radarDatasets.push({ label: player2.name, data: Object.values(player2.radarStats), backgroundColor: 'rgba(159, 122, 234, 0.2)', borderColor: 'rgba(159, 122, 234, 1)', borderWidth: 2 });
        comparisonRadarChartInstance = renderRadarChart(elements.comparison.radarCanvas, radarDatasets, comparisonRadarChartInstance);

        if (player1 && player2) {
            renderWinPrediction(player1, player2);
            renderComparisonTable(player1, player2);
        } else {
            elements.comparison.winPredictionContainer.innerHTML = `<div class="initial-message" style="padding: 20px 0;">두 명의 선수를 선택하여 승부예측을 확인하세요.</div>`;
            elements.comparison.statsContainer.innerHTML = `<div class="initial-message">두 명의 선수를 선택하여 비교하세요.</div>`;
        }
    }

    function calculateWinPrediction(p1, p2) {
        const kpisConfig = { 'kda': { higherIsBetter: true }, 'winrate': { higherIsBetter: true }, 'dpm': { higherIsBetter: true }, 'gpm': { higherIsBetter: true }, 'cspm': { higherIsBetter: true }, 'dtpm': { higherIsBetter: false } };
        let score1 = 0, score2 = 0;
        for (const kpi in kpisConfig) {
            if (p1[kpi] !== undefined && p2[kpi] !== undefined) {
                const normalizedP1 = normalize(p1[kpi], kpi);
                const normalizedP2 = normalize(p2[kpi], kpi);
                if (kpisConfig[kpi].higherIsBetter) { score1 += normalizedP1; score2 += normalizedP2; } 
                else { score1 += (1 - normalizedP1); score2 += (1 - normalizedP2); }
            }
        }
        const totalScore = score1 + score2;
        const p1_chance = totalScore === 0 ? 50 : Math.round((score1 / totalScore) * 100);
        return { p1_chance, p2_chance: 100 - p1_chance };
    }

    function renderWinPrediction(player1, player2) {
        const prediction = calculateWinPrediction(player1, player2);
        elements.comparison.winPredictionContainer.innerHTML = `
            <h3 class="prediction-title">승부 예측</h3>
            <div class="prediction-details">
                <span class="player1-name">${player1.name}</span>
                <span class="player2-name">${player2.name}</span>
            </div>
            <div class="prediction-bar-container">
                <div class="prediction-bar player1-bar" style="width: ${prediction.p1_chance}%;"><span>${prediction.p1_chance}%</span></div>
                <div class="prediction-bar player2-bar" style="width: ${prediction.p2_chance}%;"><span>${prediction.p2_chance}%</span></div>
            </div>`;
    }

    function renderComparisonTable(player1, player2) {
        elements.comparison.statsContainer.innerHTML = '';
        statCategories.forEach(stat => {
            const row = document.createElement('div');
            row.className = 'stat-row';
            let p1_val = player1[stat.key], p2_val = player2[stat.key];
            let p1_display = stat.key === 'winrate' ? p1_val + '%' : p1_val;
            let p2_display = stat.key === 'winrate' ? p2_val + '%' : p2_val;
            let p1_highlight = '', p2_highlight = '';
            let diffIndicatorP1 = `<div class="stat-diff-indicator player1"></div>`, diffIndicatorP2 = `<div class="stat-diff-indicator player2"></div>`;

            const diff = p1_val - p2_val;
            if (diff !== 0) {
                const roundedDiff = parseFloat(Math.abs(diff).toFixed(1));
                const diffText = `▲${roundedDiff}`;
                const lowerIsBetter = ['losses', 'deaths', 'dtpm'];
                if (lowerIsBetter.includes(stat.key)) {
                    if (diff < 0) { p1_highlight = 'highlight'; diffIndicatorP2 = `<div class="stat-diff-indicator player2">${diffText}</div>`; } 
                    else { p2_highlight = 'highlight'; diffIndicatorP1 = `<div class="stat-diff-indicator player1">${diffText}</div>`; }
                } else {
                    if (diff > 0) { p1_highlight = 'highlight'; diffIndicatorP1 = `<div class="stat-diff-indicator player1">${diffText}</div>`; } 
                    else { p2_highlight = 'highlight'; diffIndicatorP2 = `<div class="stat-diff-indicator player2">${diffText}</div>`; }
                }
            }
            const total = p1_val + p2_val;
            let p1_bar_width = 50, p2_bar_width = 50;
            if (total > 0) { p1_bar_width = (p1_val / total) * 100; p2_bar_width = (p2_val / total) * 100; }

            row.innerHTML = `<span class="stat-value player1-stat ${p1_highlight}">${p1_display}</span>${diffIndicatorP1}<div class="stat-center"><span class="stat-label" data-tooltip="${stat.description}">${stat.label}</span><div class="stat-bar-container"><div class="stat-bar player1-bar" style="width: ${p1_bar_width}%;"></div><div class="stat-bar player2-bar" style="width: ${p2_bar_width}%;"></div></div></div>${diffIndicatorP2}<span class="stat-value player2-stat ${p2_highlight}">${p2_display}</span>`;
            elements.comparison.statsContainer.appendChild(row);
        });
    }

    // --- Single View Logic ---
    function updateSingleView() {
        const player = playerData.find(p => p.id == elements.single.playerSelect.value);

        if (player) {
            elements.single.playerCardWrapper.innerHTML = createPlayerCardHTML(player, 'player1');
            const radarDatasets = (player.radarStats) ? [{ label: player.name, data: Object.values(player.radarStats), backgroundColor: 'rgba(66, 153, 225, 0.2)', borderColor: 'rgba(66, 153, 225, 1)', borderWidth: 2 }] : [];
            singleRadarChartInstance = renderRadarChart(elements.single.radarCanvas, radarDatasets, singleRadarChartInstance);
            renderSinglePlayerTable(player);
        } else {
            elements.single.playerCardWrapper.innerHTML = placeholderCardHTML;
            singleRadarChartInstance = renderRadarChart(elements.single.radarCanvas, [], singleRadarChartInstance);
            elements.single.statsContainer.innerHTML = `<div class="initial-message">선수를 선택하여 스탯을 확인하세요.</div>`;
        }
    }

    function renderSinglePlayerTable(player) {
        let html = '<div class="single-player-stats-grid">';
        statCategories.forEach(stat => {
            const value = player[stat.key];
            const displayValue = stat.key === 'winrate' ? value + '%' : value;
            html += `<div class="stat-card">
                        <span class="single-stat-label" data-tooltip="${stat.description}">${stat.label}</span>
                        <span class="single-stat-value">${displayValue !== undefined ? displayValue : '-'}</span>
                     </div>`;
        });
        html += '</div>';
        elements.single.statsContainer.innerHTML = html;
    }

    // --- Event Listeners Setup ---
    [elements.comparison.teamFilter1, elements.comparison.positionFilter1].forEach(el => {
        el.addEventListener('change', () => updatePlayerDropdown(elements.comparison.player1Select, elements.comparison.teamFilter1, elements.comparison.positionFilter1));
    });
    [elements.comparison.teamFilter2, elements.comparison.positionFilter2].forEach(el => {
        el.addEventListener('change', () => updatePlayerDropdown(elements.comparison.player2Select, elements.comparison.teamFilter2, elements.comparison.positionFilter2));
    });
    elements.comparison.player1Select.addEventListener('change', updateComparisonView);
    elements.comparison.player2Select.addEventListener('change', updateComparisonView);

    [elements.single.teamFilter, elements.single.positionFilter].forEach(el => {
        el.addEventListener('change', () => updatePlayerDropdown(elements.single.playerSelect, elements.single.teamFilter, elements.single.positionFilter));
    });
    elements.single.playerSelect.addEventListener('change', updateSingleView);
    
    // --- Initial Execution ---
    calculateStatMetrics();
    populateFilterDropdowns();
    initTabs();
    updateComparisonView();
    updateSingleView(); 
});