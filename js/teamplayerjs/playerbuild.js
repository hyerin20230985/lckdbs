// Build players overlay on team card click
            (function(){
                const altToTeam = { 'T1':'T1', 'GEN.G':'GEN.G', 'HLE':'HLE', 'KT':'KT', 'DK':'DK', 'KDF':'KDF', 'FOX':'FOX', 'BRO':'BRO', 'DRX':'DRX', 'NS':'NS' };
                const fallback = [
                    { nickname:'Player1', image:'' },
                    { nickname:'Player2', image:'' },
                    { nickname:'Player3', image:'' },
                    { nickname:'Player4', image:'' },
                    { nickname:'Player5', image:'' },
                ];

                function getTeamPlayers(teamKey, role){
                    try {
                        const src = (typeof players !== 'undefined') ? players : (Array.isArray(window.players) ? window.players : []);
                        if (Array.isArray(src)) {
                            let list = src.filter(p => p.team === teamKey);
                            if (role && role !== 'ALL') {
                                list = list.filter(p => (p.role || '').toUpperCase() === role);
                            }
                            // For ALL: cap to 5; For filtered roles: show up to 5, no placeholders
                            return list.slice(0,5);
                        }
                    } catch(e) { /* ignore */ }
                    return fallback;
                }

                function renderPanel(card, list){
                    let panel = card.querySelector('.players-panel');
                    if (!panel){
                        panel = document.createElement('div');
                        panel.className = 'players-panel items-center justify-center';
                        card.appendChild(panel);
                    }
                    // Rebuild content every time to match current role selection
                    panel.innerHTML = '';
                    const rows = document.createElement('div');
                    rows.className = 'rows';
                    const top = document.createElement('div');
                    top.className = 'row';
                    const bottom = document.createElement('div');
                    bottom.className = 'row';
                    list.slice(0,3).forEach(p => top.appendChild(makeChip(p)));
                    list.slice(3,5).forEach(p => bottom.appendChild(makeChip(p)));
                    rows.appendChild(top);
                    rows.appendChild(bottom);
                    panel.appendChild(rows);
                }

                function normalizeTeamKey(name){
                    return (name || '')
                        .toUpperCase()
                        .replace(/\s+/g, '')
                        .replace(/\./g, '');
                }

                function resolveAssetPath(path){
                    if (!path) return '../photos/assets/8.png';
                    if (path.startsWith('http')) return path;
                    if (path.startsWith('../') || path.startsWith('./')) return path;
                    if (path.startsWith('/')) return `..${path}`;
                    return `../${path.replace(/^\.?\//, '')}`;
                }

                function logoFromSeasonData(team){
                    const key = normalizeTeamKey(team);
                    if (!key || !window.lckTeams) return null;
                    for (const year of Object.keys(window.lckTeams)) {
                        const entry = window.lckTeams[year].find(t => normalizeTeamKey(t.name) === key);
                        if (entry?.logo) return resolveAssetPath(entry.logo);
                    }
                    return null;
                }

                // Map team code in player data -> asset filename
                function teamAsset(team){
                    const key = normalizeTeamKey(team);
                    const fromData = logoFromSeasonData(team);
                    if (fromData) return fromData;
                    switch (key) {
                        case 'GENG':
                        case 'GEN.G':
                            return '../photos/assets/GEN.G.svg';
                        case 'T1':
                            return '../photos/assets/T1.svg';
                        case 'HLE':
                            return '../photos/assets/HLE.svg';
                        case 'KT':
                            return '../photos/assets/KT.svg';
                        case 'DK':
                        case 'DPLUSKIA':
                            return '../photos/assets/DK.svg';
                        case 'KDF':
                            return '../photos/assets/KDF.svg';
                        case 'NS':
                            return '../photos/assets/NS.svg';
                        case 'DRX':
                            return '../photos/assets/DRX.svg';
                        case 'BRO':
                        case 'BRION':
                            return '../photos/assets/BRO.svg';
                        case 'FOX':
                        case 'BNK':
                            return '../photos/assets/BNK.png';
                        case 'DNF':
                            return '../photos/assets/DNF.svg';
                        default:
                            return '../photos/assets/8.png';
                    }
                }

                const popup = document.getElementById('player-popup');
                const popupAvatar = popup?.querySelector('.player-popup-avatar');
                const popupNickname = popup?.querySelector('.player-popup-nickname');
                const popupName = popup?.querySelector('.player-popup-name');
                const popupTeamLogo = popup?.querySelector('.player-popup-teamlogo');
                const popupTeamName = popup?.querySelector('.player-popup-teamname');
                const popupCloseBtn = popup?.querySelector('.player-popup-close');
                const seasonTabs = popup ? Array.from(popup.querySelectorAll('.season-tab')) : [];
                const radarSvg = popup?.querySelector('.radar-chart');
                const radarGrid = popup?.querySelector('.radar-grid');
                const radarArea = popup?.querySelector('.radar-area');
                const radarLabels = popup?.querySelector('.radar-labels');
                const detailBtn = popup?.querySelector('.detail-link-btn');
                const radarCenter = 130;
                const radarRadius = 100;
                const profileFallback = '../photos/assets/8.png';
                const radarMetrics = [
                    { key: 'attack', label: '\uACF5\uACA9' },
                    { key: 'defense', label: '\uC218\uBE44' },
                    { key: 'lane', label: '\uB77C\uC778\uC804' },
                    { key: 'macro', label: '\uC6B4\uC601' },
                    { key: 'vision', label: '\uC2DC\uC57C' },
                    { key: 'growth', label: '\uC131\uC7A5' },
                ];
                const defaultSeasonStats = {
                    '2024': { attack: 78, defense: 72, lane: 74, macro: 80, vision: 76, growth: 77 },
                    '2023': { attack: 82, defense: 75, lane: 79, macro: 84, vision: 80, growth: 81 },
                };
                let currentSeason = '2024';
                let currentPlayer = null;
                const detailPrefixMap = {
                    'T1':'t',
                    'GEN.G':'g', 'GEN':'g',
                    'HLE':'h',
                    'KT':'k',
                    'DK':'k',
                    'DRX':'dr',
                    'KDF':'kd',
                    'BRO':'b',
                    'FOX':'f',
                    'NS':'n'
                };
                const detailBase = '/playerdetail-html/';
                const detailFallback = '/playerdetail-html/no-info.html';

                function nicknameSlug(str){
                    return (str || '').toString().trim().toLowerCase().replace(/[^a-z0-9]/g,'');
                }

                function detailPathFor(player){
                    const nick = nicknameSlug(player?.nickname || player?.name);
                    if (!nick) return detailFallback;
                    const team = (player?.team || '').toUpperCase();
                    const prefix = detailPrefixMap[team] || '';
                    const file = prefix ? `${prefix}-${nick}.html` : `${nick}.html`;
                    return `${detailBase}${file}`;
                }

                function setPopupState(open){
                    if (!popup) return;
                    if (open) {
                        popup.classList.add('visible');
                        popup.setAttribute('aria-hidden', 'false');
                    } else {
                        popup.classList.remove('visible');
                        popup.setAttribute('aria-hidden', 'true');
                    }
                }

                function polarPoint(idx, value){
                    const angle = -Math.PI / 2 + idx * ((Math.PI * 2) / radarMetrics.length);
                    const scale = Math.max(0, Math.min(100, value || 0)) / 100;
                    const r = radarRadius * scale;
                    const x = radarCenter + r * Math.cos(angle);
                    const y = radarCenter + r * Math.sin(angle);
                    return [x, y];
                }

                function buildRadarGrid(){
                    if (!radarGrid) return;
                    const rings = [0.25, 0.5, 0.75, 1];
                    radarGrid.innerHTML = rings.map(step => {
                        const pts = radarMetrics.map((_, idx) => polarPoint(idx, step * 100).join(',')).join(' ');
                        return `<polygon points="${pts}"></polygon>`;
                    }).join('');
                }

                function renderRadarLabels(){
                    if (!radarLabels) return;
                    const labelRadius = radarRadius + 16;
                    radarLabels.innerHTML = radarMetrics.map((m, idx) => {
                        const angle = -Math.PI / 2 + idx * ((Math.PI * 2) / radarMetrics.length);
                        const lx = radarCenter + (labelRadius * Math.cos(angle));
                        const ly = radarCenter + (labelRadius * Math.sin(angle));
                        return `<text x="${lx}" y="${ly}" text-anchor="middle" dominant-baseline="middle">${m.label}</text>`;
                    }).join('');
                }

                function renderRadar(stats){
                    if (!radarArea) return;
                    const vals = radarMetrics.map(m => (stats && typeof stats[m.key] === 'number') ? stats[m.key] : 0);
                    const pts = vals.map((v, idx) => polarPoint(idx, v).join(',')).join(' ');
                    radarArea.setAttribute('points', pts);
                }

                function getSeasonStats(player, season){
                    if (player && player.stats && player.stats[season]) return player.stats[season];
                    return defaultSeasonStats[season] || defaultSeasonStats['2024'];
                }

                function setActiveSeason(season){
                    currentSeason = season;
                    seasonTabs.forEach(btn => {
                        const active = btn.dataset.season === season;
                        btn.classList.toggle('active', active);
                        btn.setAttribute('aria-selected', active ? 'true' : 'false');
                    });
                    renderRadar(getSeasonStats(currentPlayer, season));
                }

                function wireSeasonTabs(){
                    seasonTabs.forEach(btn => {
                        btn.addEventListener('click', (evt) => {
                            evt.preventDefault();
                            setActiveSeason(btn.dataset.season);
                        });
                    });
                }

                function setDetailLink(player){
                    if (!detailBtn) return;
                    const target = player?.detailUrl || detailPathFor(player);
                    detailBtn.onclick = () => {
                        window.location.href = target || detailFallback;
                    };
                }

                wireSeasonTabs();
                buildRadarGrid();
                renderRadarLabels();
                setActiveSeason(currentSeason);

                // Enhanced popup: season stats chart + detail link
                function openPlayerPopup(player){
                    if (!popup) return;
                    const data = player || {};
                    const nickname = data.nickname || data.name || 'Player';
                    const korName = data.name || '\uC774\uB984 \uC815\uBCF4 \uC5C6\uC74C';
                    const teamLabel = data.team || '\uD300 \uBBF8\uC815';
                    currentPlayer = data;
                    if (popupAvatar) {
                        popupAvatar.src = data.image || profileFallback;
                        popupAvatar.alt = `${nickname} \uD504\uB85C\uD544`;
                    }
                    if (popupNickname) {
                        popupNickname.textContent = nickname;
                    }
                    if (popupName) {
                        popupName.textContent = korName;
                    }
                    if (popupTeamLogo) {
                        popupTeamLogo.src = teamAsset(data.team);
                        popupTeamLogo.alt = `${teamLabel} 濡쒓퀬`;
                    }
                    if (popupTeamName) {
                        popupTeamName.textContent = teamLabel;
                    }
                    setDetailLink(data);
                    setActiveSeason(currentSeason);
                    setPopupState(true);
                }

                function closePlayerPopup(){
                    setPopupState(false);
                }

                popupCloseBtn?.addEventListener('click', closePlayerPopup);
                document.addEventListener('keydown', (event) => {
                    if (event.key === 'Escape') {
                        closePlayerPopup();
                    }
                });

                function makePlayerCardInteractive(card, player){
                    if (!card) return;
                    const launch = (evt) => {
                        evt?.preventDefault?.();
                        openPlayerPopup(player);
                    };
                    card.addEventListener('click', launch);
                    card.setAttribute('role', 'button');
                    card.tabIndex = 0;
                    card.addEventListener('keypress', (evt) => {
                        if (evt.key === 'Enter' || evt.key === ' ') {
                            launch(evt);
                        }
                    });
                }

                function showTeamGrid(){
                    const teamSec = document.getElementById('team-section');
                    const playerSec = document.getElementById('player-section');
                    if (teamSec) teamSec.classList.remove('hidden');
                    if (playerSec) playerSec.classList.add('hidden');
                    // Unhide all team cards if any were filtered by search
                    const allCards = document.querySelectorAll('#team-grid .team-card');
                    allCards.forEach(c=>c.classList.remove('hidden'));
                }

                function showPlayerGrid(role){
                    const teamSec = document.getElementById('team-section');
                    const playerSec = document.getElementById('player-section');
                    const grid = document.getElementById('player-grid');
                    if (!grid || !playerSec) return;
                    if (teamSec) teamSec.classList.add('hidden');
                    playerSec.classList.remove('hidden');

                    // Pull matching players
                    const src = (typeof players !== 'undefined') ? players : (Array.isArray(window.players) ? window.players : []);
                    const normalizedRole = (role || '').toUpperCase();
                    const list = Array.isArray(src) ? src.filter(p => (p.role||'').toUpperCase() === normalizedRole) : [];

                    // Build cards
                    grid.innerHTML = '';
                    list.forEach(p => {
                        const card = document.createElement('div');
                        card.className = 'player-card aspect-square';
                        const img = document.createElement('img');
                        img.className = 'avatar';
                        img.alt = p.nickname || p.name || 'player';
                        img.src = p.image || '../photos/assets/8.png';
                        const name = document.createElement('div');
                        name.className = 'nickname';
                        name.textContent = p.nickname || p.name || 'Player';
                        const teamLogo = document.createElement('img');
                        teamLogo.className = 'team-mini';
                        teamLogo.alt = p.team || 'team';
                        teamLogo.src = teamAsset(p.team);
                        card.appendChild(img);
                        card.appendChild(name);
                        card.appendChild(teamLogo);
                        makePlayerCardInteractive(card, p);
                        grid.appendChild(card);
                    });
                }

                // Filter team grid by query (case-insensitive substring on alt)
                function filterTeamGridByQuery(q){
                    const teamSec = document.getElementById('team-section');
                    const playerSec = document.getElementById('player-section');
                    const grid = document.getElementById('team-grid');
                    if (!grid) return false;
                    const qq = (q || '').toLowerCase();
                    let any = false;
                    grid.querySelectorAll('.team-card').forEach(card => {
                        const alt = (card.querySelector('img[alt]')?.alt || '').toLowerCase();
                        const show = alt.includes(qq);
                        card.classList.toggle('hidden', !show);
                        if (show) any = true;
                    });
                    if (any) {
                        if (teamSec) teamSec.classList.remove('hidden');
                        if (playerSec) playerSec.classList.add('hidden');
                    }
                    return any;
                }

                // Build player cards purely from search across all roles/teams
                function showSearchedPlayers(query){
                    const src = (typeof players !== 'undefined') ? players : (Array.isArray(window.players) ? window.players : []);
                    if (!Array.isArray(src)) return;
                    const q = (query || '').toLowerCase();
                    const matches = src.filter(p => {
                        const n1 = (p.nickname||'').toLowerCase();
                        const n2 = (p.name||'').toLowerCase();
                        const t = (p.team||'').toLowerCase();
                        const extra = Array.isArray(p.searchKeywords || p.keywords) ? (p.searchKeywords || p.keywords).join(' ').toLowerCase() : '';
                        return n1.includes(q) || n2.includes(q) || t.includes(q) || extra.includes(q);
                    });
                    const playerSec = document.getElementById('player-section');
                    const teamSec = document.getElementById('team-section');
                    const grid = document.getElementById('player-grid');
                    if (!grid) return;
                    grid.innerHTML = '';
                    matches.forEach(p=>{
                        const card = document.createElement('div');
                        card.className = 'player-card aspect-square';
                        const img = document.createElement('img');
                        img.className = 'avatar';
                        img.alt = p.nickname || p.name || 'player';
                        img.src = p.image || '../photos/assets/8.png';
                        const name = document.createElement('div');
                        name.className = 'nickname';
                        name.textContent = p.nickname || p.name || 'Player';
                        const teamLogo = document.createElement('img');
                        teamLogo.className = 'team-mini';
                        teamLogo.alt = p.team || 'team';
                        teamLogo.src = teamAsset(p.team);
                        card.appendChild(img);
                        card.appendChild(name);
                        card.appendChild(teamLogo);
                        makePlayerCardInteractive(card, p);
                        grid.appendChild(card);
                    });
                    if (playerSec) playerSec.classList.remove('hidden');
                    if (teamSec) teamSec.classList.add('hidden');
                }

                function makeChip(p){
                    const chip = document.createElement('div');
                    chip.className = 'player-chip';
                    chip.dataset.playerId = p.id || '';
                    chip.dataset.nickname = p.nickname || p.name || '';
                    chip.dataset.name = p.name || '';
                    chip.dataset.team = p.team || '';
                    chip.dataset.image = p.image || '';
                    const img = document.createElement('img');
                    img.alt = p.nickname || p.name || 'player';
                    if (p.image) { img.src = p.image; } else { img.src = '../photos/assets/8.png'; }
                    const name = document.createElement('div');
                    name.className = 'name';
                    name.textContent = p.nickname || p.name || 'Player';
                    chip.appendChild(img);
                    chip.appendChild(name);
                    chip.setAttribute('role', 'button');
                    chip.tabIndex = 0;
                    const handleChip = (evt) => {
                        evt?.preventDefault?.();
                        evt?.stopPropagation?.();
                        openPlayerPopup(p);
                    };
                    chip.addEventListener('click', handleChip);
                    chip.addEventListener('keypress', (evt) => {
                        if (evt.key === 'Enter' || evt.key === ' ') {
                            handleChip(evt);
                        }
                    });
                    return chip;
                }

                function attachTeamCardInteractions(){
                    const cards = Array.from(document.querySelectorAll('.team-card'));
                    cards.forEach(card => {
                        card.style.position = 'relative';
                        const handleEnter = () => {
                            cards.forEach(c=>{ if(c!==card) c.classList.remove('active'); });
                            const img = card.querySelector('img[alt]');
                            const key = altToTeam[img?.alt?.trim()] || img?.alt?.trim() || '';
                            const role = (window.currentRole || 'ALL');
                            const list = getTeamPlayers(key, role);
                            renderPanel(card, list);
                            card.classList.add('active');
                        };
                        const handleLeave = () => {
                            card.classList.remove('active');
                        };
                        card.addEventListener('mouseenter', handleEnter);
                        card.addEventListener('mouseleave', handleLeave);
                        // Accessibility: focus/blur support
                        card.addEventListener('focusin', handleEnter);
                        card.addEventListener('focusout', handleLeave);
                    });
                }

                attachTeamCardInteractions();

                document.addEventListener('teamgrid:updated', () => {
                    attachTeamCardInteractions();
                });

                // Delegated safety net: ensure chips always open the popup
                ['click','mousedown','touchstart'].forEach(evtName => {
                    document.addEventListener(evtName, (evt) => {
                        const chip = evt.target.closest('.player-chip');
                        if (!chip) return;
                        evt.preventDefault();
                        evt.stopPropagation();
                        const pid = parseInt(chip.dataset.playerId || '', 10);
                        let found = null;
                        if (!isNaN(pid) && Array.isArray(window.players)) {
                            found = window.players.find(p => p.id === pid);
                        }
                        if (!found) {
                            found = {
                                id: pid || null,
                                nickname: chip.dataset.nickname,
                                name: chip.dataset.name,
                                team: chip.dataset.team,
                                image: chip.dataset.image
                            };
                        }
                        openPlayerPopup(found);
                    }, true);
                });

                // Update UI when role chip changes
                document.addEventListener('rolechange', (e)=>{
                    const role = (window.currentRole || 'ALL');
                    if (role === 'ALL') {
                        showTeamGrid();
                    } else {
                        showPlayerGrid(role);
                    }
                    // Also refresh any active team hover panel if needed
                    const active = document.querySelector('.team-card.active');
                    if (active && role === 'ALL') {
                        const img = active.querySelector('img[alt]');
                        const key = altToTeam[img?.alt?.trim()] || img?.alt?.trim() || '';
                        const list = getTeamPlayers(key, role);
                        renderPanel(active, list);
                    }
                });

                document.addEventListener('seasonchange', ()=>{
                    const role = (window.currentRole || 'ALL');
                    if (role === 'ALL') {
                        showTeamGrid();
                    } else {
                        showPlayerGrid(role);
                    }
                    if (role === 'ALL') {
                        const active = document.querySelector('.team-card.active');
                        if (active) {
                            const img = active.querySelector('img[alt]');
                            const key = altToTeam[img?.alt?.trim()] || img?.alt?.trim() || '';
                            const list = getTeamPlayers(key, role);
                            renderPanel(active, list);
                        }
                    }
                });

                // Initial mode sync
                if ((window.currentRole || 'ALL') !== 'ALL') {
                    showPlayerGrid(window.currentRole);
                }

                // Search handling
                const search = document.getElementById('search-input');
                if (search) {
                    const handle = () => {
                        const q = (search.value || '').trim();
                        if (q.length === 0) {
                            // revert to role mode
                            const role = (window.currentRole || 'ALL');
                            if (role === 'ALL') showTeamGrid(); else showPlayerGrid(role);
                            return;
                        }
                        // Try team filter first; if nothing matches, show players
                        if (!filterTeamGridByQuery(q)) {
                            showSearchedPlayers(q);
                        }
                    };
                    search.addEventListener('input', handle);
                }
            })();






