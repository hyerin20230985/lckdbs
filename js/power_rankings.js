// Power Rankings Logic

document.addEventListener('DOMContentLoaded', () => {
    // Wait for window.lckTeams to be available
    // Since team.js is loaded synchronously before this script (if we put it after), it should be fine.
    // However, team.js wraps everything in DOMContentLoaded. 
    // We might need to wait or access the data differently if it's not exposed yet.
    // team.js sets window.lckTeams = teams; inside the DOMContentLoaded event? 
    // No, looking at team.js:
    // Line 1: document.addEventListener('DOMContentLoaded', () => {
    // ...
    // Line 185: window.lckTeams = teams;
    // ...
    // });
    // This means window.lckTeams is ONLY available AFTER team.js's DOMContentLoaded callback runs.
    // So we need to make sure our code runs after that. 
    // We can use a slight delay or check periodically, or just put our logic in a window.onload or a later DOMContentLoaded listener.
    // Since event listeners fire in order, if we add ours after team.js, it should be fine? 
    // Actually, if both are DOMContentLoaded, the order depends on when they are added.
    // To be safe, I'll check if window.lckTeams exists, if not wait.

    const checkDataInterval = setInterval(() => {
        if (window.lckTeams) {
            clearInterval(checkDataInterval);
            initPowerRankings();
        }
    }, 100);

    let currentYear = 2024;
    let currentPosition = 'ALL';
    let allPlayers = [];

    function initPowerRankings() {
        renderYearDropdown();
        setupPositionFilters();
        loadData(currentYear);
    }

    function renderYearDropdown() {
        const dropdownBtn = document.getElementById('year-dropdown-btn');
        const dropdownMenu = document.getElementById('year-dropdown-menu');
        const dropdownText = document.getElementById('year-dropdown-text');

        // Years 2024 to 2020
        const years = [2026, 2025, 2024, 2023, 2022, 2021, 2020];
        
        dropdownMenu.innerHTML = '';
        years.forEach(year => {
            const item = document.createElement('div');
            item.className = 'px-4 py-2 hover:bg-neutral-800 cursor-pointer text-sm';
            item.textContent = `${year}`; // Assuming Spring for all as per prompt "2024 Spring" example
            item.onclick = () => {
                currentYear = year;
                dropdownText.textContent = `${year}`;
                dropdownMenu.classList.add('hidden');
                loadData(currentYear);
            };
            dropdownMenu.appendChild(item);
        });

        dropdownBtn.onclick = (e) => {
            e.stopPropagation();
            dropdownMenu.classList.toggle('hidden');
        };

        window.onclick = (e) => {
            if (!dropdownBtn.contains(e.target)) {
                dropdownMenu.classList.add('hidden');
            }
        };
    }

    function setupPositionFilters() {
        const positions = ['ALL', 'TOP', 'JUG', 'MID', 'ADC', 'SUP'];
        const container = document.getElementById('position-filters');
        
        container.innerHTML = '';
        positions.forEach(pos => {
            const btn = document.createElement('button');
            btn.textContent = pos;
            btn.className = `px-4 md:px-6 py-2 rounded-full text-sm md:text-base font-medium transition-colors whitespace-nowrap ${pos === currentPosition ? 'bg-purple-600 text-white' : 'text-neutral-400 hover:text-white'}`;
            btn.onclick = () => {
                currentPosition = pos;
                updatePositionButtons();
                renderRankings();
            };
            container.appendChild(btn);
        });
    }

    function updatePositionButtons() {
        const container = document.getElementById('position-filters');
        Array.from(container.children).forEach(btn => {
            if (btn.textContent === currentPosition) {
                btn.className = 'px-4 md:px-6 py-2 rounded-full text-sm md:text-base font-medium transition-colors whitespace-nowrap bg-purple-600 text-white';
            } else {
                btn.className = 'px-4 md:px-6 py-2 rounded-full text-sm md:text-base font-medium transition-colors whitespace-nowrap text-neutral-400 hover:text-white';
            }
        });
    }

    function loadData(year) {
        const teams = window.lckTeams[year];
        if (!teams) {
            allPlayers = [];
            renderRankings();
            return;
        }

        // Flatten and Mock Data
        allPlayers = [];
        teams.forEach(team => {
            team.players.forEach(player => {
                // Mock Score: Random between 70 and 99.9
                // Mock KDA: Random between 1.5 and 8.0
                // Mock DPM: Random between 200 and 900
                const score = (Math.random() * (99.9 - 70) + 70).toFixed(1);
                const kda = (Math.random() * (8 - 1.5) + 1.5).toFixed(1);
                const dpm = Math.floor(Math.random() * (900 - 200) + 200);

                allPlayers.push({
                    ...player,
                    teamName: team.name,
                    teamLogo: team.logo,
                    score: parseFloat(score),
                    kda: kda,
                    dpm: dpm
                });
            });
        });

        // Sort by score descending
        allPlayers.sort((a, b) => b.score - a.score);

        // Assign Rank
        allPlayers.forEach((p, index) => {
            p.rank = index + 1;
        });

        renderRankings();
    }

    function renderRankings() {
        let filtered = allPlayers;
        if (currentPosition !== 'ALL') {
            // Map ADC to BOT for filtering
            const dataPos = currentPosition === 'ADC' ? 'BOT' : currentPosition;
            filtered = allPlayers.filter(p => p.position === dataPos);
        }

        // Re-rank for the filtered view? 
        // Usually power rankings are global or per role. 
        // If I filter by TOP, the #1 TOP should be #1 in the list?
        // Let's re-assign ranks for the display based on the filter
        const displayData = filtered.map((p, i) => ({...p, displayRank: i + 1}));

        renderPodium(displayData.slice(0, 3));
        renderTable(displayData.slice(3));
    }

    function renderPodium(top3) {
        const podiumContainer = document.getElementById('podium-container');
        podiumContainer.innerHTML = '';

        if (top3.length === 0) return;

        // Order for display: 2nd, 1st, 3rd
        const order = [1, 0, 2]; // Indices in top3 array
        
        order.forEach(idx => {
            if (!top3[idx]) return;
            const player = top3[idx];
            const isFirst = idx === 0;
            
            // Different vertical positions for each rank
            let marginTop = 'mt-16'; // Default for 2nd and 3rd
            if (player.displayRank === 1) {
                marginTop = 'mt-0'; // 1st place is highest
            }
            
            const card = document.createElement('div');
            card.className = `flex flex-col items-center ${marginTop} cursor-pointer transition-transform duration-300 hover:scale-105 md:hover:scale-110`;
            card.onclick = () => selectPlayer(player.name);
            
            // Colors based on rank
            let ringColor = 'border-neutral-700';
            let badgeColor = 'bg-yellow-500';
            let gradientColor = 'from-transparent to-neutral-800/80';
            let boxHeight = 'h-32'; // Default height for 2nd and 3rd
            
            if (player.displayRank === 1) { 
                ringColor = 'border-purple-500'; 
                badgeColor = 'bg-yellow-500';
                gradientColor = 'from-transparent to-purple-900/80';
                boxHeight = 'h-40'; // Tallest for 1st place
            }
            else if (player.displayRank === 2) { 
                ringColor = 'border-gray-400'; 
                badgeColor = 'bg-gray-400';
                gradientColor = 'from-transparent to-gray-800/80';
                boxHeight = 'h-32';
            }
            else if (player.displayRank === 3) { 
                ringColor = 'border-orange-600'; 
                badgeColor = 'bg-orange-600';
                gradientColor = 'from-transparent to-orange-900/80';
                boxHeight = 'h-24';
            }

            card.innerHTML = `
                <div class="relative mb-3 md:mb-4 group">
                    <div class="w-16 h-16 md:w-24 md:h-24 ${isFirst ? 'md:w-32 md:h-32' : ''} rounded-full border-2 md:border-4 ${ringColor} overflow-hidden bg-neutral-900 relative z-0">
                        <img src="${player.image}" alt="${player.name}" class="w-full h-full object-cover object-top">
                    </div>
                    <div class="absolute -bottom-2 md:-bottom-3 left-1/2 -translate-x-1/2 ${badgeColor} text-black font-bold rounded-full w-6 h-6 md:w-8 md:h-8 flex items-center justify-center text-xs md:text-base border-2 border-neutral-900 z-10">
                        ${player.displayRank}
                    </div>
                    <div class="absolute bottom-0 right-0 w-6 h-6 md:w-8 md:h-8 rounded-full bg-neutral-900 p-1 z-20">
                        <img src="${player.teamLogo}" alt="${player.teamName}" class="w-full h-full object-contain">
                    </div>
                </div>
                <div class="relative w-32 md:w-48 ${boxHeight} bg-gradient-to-b ${gradientColor} rounded-2xl md:rounded-3xl p-4 md:p-6 pt-4 md:pt-6 pb-4 md:pb-5 flex items-center justify-center">
                    <div class="text-center">
                        <div class="text-base md:text-xl font-bold text-white mb-1 md:mb-2">${player.name}</div>
                        <div class="inline-block px-2 md:px-3 py-1 rounded-full bg-black/40 text-white font-bold text-xs md:text-sm">
                            ${player.score}
                        </div>
                    </div>
                </div>
            `;
            podiumContainer.appendChild(card);
        });
    }


    function renderTable(restPlayers) {
        const tableBody = document.getElementById('ranking-table-body');
        tableBody.innerHTML = '';

        restPlayers.forEach(player => {
            const row = document.createElement('tr');
            row.className = 'border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer group';
            row.onclick = () => selectPlayer(player.name);

            // Score Bar Width calculation (70-100 scale)
            const scorePercent = ((player.score - 70) / 30) * 100;

            row.innerHTML = `
                <td class="py-4 px-4 text-center text-neutral-400 font-medium w-16">${player.displayRank}</td>
                <td class="py-4 px-4">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-full bg-neutral-800 overflow-hidden">
                            <img src="${player.image}" alt="${player.name}" class="w-full h-full object-cover object-top">
                        </div>
                        <div>
                            <div class="font-bold text-white">${player.name}</div>
                            <div class="text-xs text-neutral-500 flex items-center gap-1">
                                <img src="${player.teamLogo}" class="w-3 h-3 object-contain">
                                ${player.teamName} • ${player.position}
                            </div>
                        </div>
                    </div>
                </td>
                <td class="py-4 px-4 w-1/3">
                    <div class="flex items-center gap-3">
                        <span class="text-purple-400 font-bold w-10">${player.score}</span>
                        <div class="flex-1 h-2 bg-neutral-800 rounded-full overflow-hidden">
                            <div class="h-full bg-purple-600 rounded-full" style="width: ${Math.max(5, scorePercent)}%"></div>
                        </div>
                    </div>
                </td>
                <td class="py-4 px-4 text-center text-neutral-300">${player.kda}</td>
                <td class="py-4 px-4 text-center text-neutral-300">${player.dpm}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    window.selectPlayer = function(playerName) {
        const player = allPlayers.find(p => p.name === playerName);
        if (!player) return;

        // Mock additional stats
        const winRate = (Math.random() * (85 - 60) + 60).toFixed(0);
        
        const detailContainer = document.getElementById('detail-container');
        detailContainer.innerHTML = `
            <div class="bg-gradient-to-b from-purple-900/70 from-10% to-neutral-900/95 to-90% rounded-3xl p-6 md:p-8 lg:sticky lg:top-8">
                <!-- Player Header -->
                <div class="flex flex-col items-center mb-4 md:mb-6">
                    <div class="w-20 h-20 md:w-28 md:h-28 rounded-full border-2 md:border-4 border-purple-500/50 p-1 mb-3 md:mb-4 relative">
                        <div class="w-full h-full rounded-full overflow-hidden bg-[#0a0a0a]">
                             <img src="${player.image}" alt="${player.name}" class="w-full h-full object-cover object-top">
                        </div>
                        <div class="absolute bottom-0 right-0 w-7 h-7 md:w-9 md:h-9 bg-neutral-900 rounded-full border-2 border-purple-500/30 p-1.5">
                             <img src="${player.teamLogo}" class="w-full h-full object-contain">
                        </div>
                    </div>
                    <h2 class="text-xl md:text-2xl font-bold text-white mb-1">${player.name}</h2>
                    <div class="flex items-center gap-2 mb-3">
                        <span class="px-3 py-1 rounded-full bg-purple-600 text-white text-xs font-bold">${player.position}</span>
                        <span class="px-3 py-1 rounded-full bg-neutral-800 text-white text-xs font-bold">${player.teamName}</span>
                    </div>
                </div>

                <!-- Stats Grid -->
                <div class="grid grid-cols-3 gap-2 md:gap-3 mb-4 md:mb-6">
                    <div class="bg-neutral-900/60 rounded-2xl p-4 text-center border border-white/5">
                        <div class="text-xs text-neutral-400 mb-1">Win Rate</div>
                        <div class="text-2xl md:text-2xl font-bold text-white">${winRate}%</div>
                    </div>
                    <div class="bg-neutral-900/60 rounded-2xl p-4 text-center border border-white/5">
                        <div class="text-xs text-neutral-400 mb-1">KDA</div>
                        <div class="text-2xl md:text-2xl font-bold text-white">${player.kda}</div>
                    </div>
                    <div class="bg-neutral-900/60 rounded-2xl p-4 text-center border border-white/5">
                        <div class="text-xs text-neutral-400 mb-1">DPM</div>
                        <div class="text-2xl md:text-2xl font-bold text-white">${player.dpm}</div>
                    </div>
                </div>

                <!-- Radar Chart Placeholder -->
                <div class="bg-neutral-900/60 rounded-2xl p-4 md:p-6 mb-4 md:mb-6 border border-white/5">
                    <div class="relative w-full h-48 flex items-center justify-center">
                        <!-- Hexagon SVG -->
                        <svg viewBox="0 0 200 200" class="w-full h-full">
                            <!-- Background hexagons -->
                            <polygon points="100,20 170,60 170,140 100,180 30,140 30,60" 
                                     fill="none" stroke="#404040" stroke-width="1" opacity="0.3"/>
                            <polygon points="100,40 155,70 155,130 100,160 45,130 45,70" 
                                     fill="none" stroke="#404040" stroke-width="1" opacity="0.3"/>
                            <polygon points="100,60 140,80 140,120 100,140 60,120 60,80" 
                                     fill="none" stroke="#404040" stroke-width="1" opacity="0.3"/>
                            
                            <!-- Data hexagon (purple) -->
                            <polygon points="100,35 160,65 155,125 100,165 45,125 50,65" 
                                     fill="#9333ea" fill-opacity="0.3" stroke="#9333ea" stroke-width="2"/>
                            
                            <!-- Axis lines -->
                            <line x1="100" y1="100" x2="100" y2="20" stroke="#606060" stroke-width="1"/>
                            <line x1="100" y1="100" x2="170" y2="60" stroke="#606060" stroke-width="1"/>
                            <line x1="100" y1="100" x2="170" y2="140" stroke="#606060" stroke-width="1"/>
                            <line x1="100" y1="100" x2="100" y2="180" stroke="#606060" stroke-width="1"/>
                            <line x1="100" y1="100" x2="30" y2="140" stroke="#606060" stroke-width="1"/>
                            <line x1="100" y1="100" x2="30" y2="60" stroke="#606060" stroke-width="1"/>
                            
                            <!-- Labels -->
                            <text x="100" y="15" text-anchor="middle" fill="#9ca3af" font-size="10">공격력</text>
                            <text x="175" y="65" text-anchor="start" fill="#9ca3af" font-size="10">시야</text>
                            <text x="175" y="145" text-anchor="start" fill="#9ca3af" font-size="10">성장성</text>
                            <text x="100" y="195" text-anchor="middle" fill="#9ca3af" font-size="10">팀파이트</text>
                            <text x="20" y="145" text-anchor="end" fill="#9ca3af" font-size="10">라인전</text>
                            <text x="20" y="65" text-anchor="end" fill="#9ca3af" font-size="10">안정성</text>
                        </svg>
                    </div>
                </div>

                <!-- Action Button -->
                <button onclick="navigateToPlayerDetail('${player.name}')" class="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-bold transition-all shadow-lg shadow-purple-500/30">
                    상세 정보 전체보기 →
                </button>
            </div>
        `;
    };

    // Navigate to player detail page
    window.navigateToPlayerDetail = function(playerName) {
        // List of all player detail HTML files (based on playerdetail-html folder)
        // Format: prefix-playername.html where prefix is team initial
        const playerFiles = [
            'b-ddoiv', 'b-effort', 'b-envyy', 'b-fate', 'b-gideon', 'b-karis', 'b-morgan', 
            'b-pollu', 'b-pullbae', 'b-samver', 'b-youngjae',
            'd-aiming', 'd-kingen', 'd-lucid', 'd-moham', 'd-showmaker',
            'dr-pleata', 'dr-rascal', 'dr-setab', 'dr-sponge', 'dr-teddy',
            'f-clear', 'f-clozer', 'f-duro', 'f-execute', 'f-hena', 'f-raptor',
            'g-canyon', 'g-chovy', 'g-kiin', 'g-lehends', 'g-peyz',
            'h-delight', 'h-doran', 'h-peanut', 'h-viper', 'h-zeka',
            'k-bdd', 'k-beryl', 'k-deft', 'k-perfect', 'k-pyosik',
            'kd-andil', 'kd-bulldog', 'kd-cuzz', 'kd-dudu', 'kd-leaper', 'kd-quantum',
            'n-fisher', 'n-guger', 'n-jiwoo', 'n-mihile', 'n-sylvie', 'n-vital',
            't-faker', 't-gumayusi', 't-keria', 't-oner', 't-zeus'
        ];

        // Normalize player name for comparison (lowercase, remove spaces)
        const normalizedPlayerName = playerName.toLowerCase().replace(/\s+/g, '');

        // Find matching file
        const matchingFile = playerFiles.find(file => {
            // Extract player name from file (everything after the dash)
            const filePlayerName = file.split('-')[1];
            return filePlayerName === normalizedPlayerName;
        });

        if (matchingFile) {
            // Navigate to the player detail page
            window.location.href = `../playerdetail-html/${matchingFile}.html`;
        } else {
            // If no match found, navigate to no-info page
            console.warn(`No detail page found for player: ${playerName}`);
            window.location.href = '../playerdetail-html/no-info.html';
        }
    };
});
