(function () {
    function resolveAssetPath(path) {
        if (!path) return '../photos/assets/8.png';
        if (path.startsWith('http')) return path;
        if (path.startsWith('../') || path.startsWith('./')) return path;
        if (path.startsWith('/')) return `..${path}`;
        return `../${path.replace(/^\.?\//, '')}`;
    }

    function normalizeTeamKey(name) {
        return (name || '')
            .toUpperCase()
            .replace(/\s+/g, '')
            .replace(/\./g, '');
    }

    function mapRole(position) {
        const key = (position || '').toUpperCase();
        if (key === 'JUG' || key === 'JUNGLE') return 'JUNGLE';
        if (key === 'BOT' || key === 'ADC') return 'ADC';
        if (key === 'SUP' || key === 'SUPPORT') return 'SUP';
        if (key === 'MID') return 'MID';
        return 'TOP';
    }

    function flattenPlayers(year, teamsByYear) {
        const list = teamsByYear[year];
        if (!Array.isArray(list)) return [];
        let counter = 1;
        const players = [];
        list.forEach((team) => {
            (team.players || []).forEach((player) => {
                const extraKeywords = Array.isArray(player.searchKeywords)
                    ? player.searchKeywords
                    : Array.isArray(player.keywords)
                        ? player.keywords
                        : [];
                const baseKeywords = [team.name, player.nameKr, player.name].filter(Boolean);
                players.push({
                    id: Number(`${year}${counter}`),
                    role: mapRole(player.position),
                    nickname: player.name,
                    name: player.nameKr || player.name,
                    image: resolveAssetPath(player.image),
                    team: team.name,
                    keywords: baseKeywords.concat(extraKeywords),
                    searchKeywords: extraKeywords,
                });
                counter += 1;
            });
        });
        return players;
    }

    function buildTeamGrid(year, teamsByYear, grid) {
        const list = teamsByYear[year];
        grid.innerHTML = '';
        if (!Array.isArray(list) || list.length === 0) {
            const empty = document.createElement('div');
            empty.className = 'col-span-full text-center text-white/70 py-10';
            empty.textContent = '데이터가 없습니다.';
            grid.appendChild(empty);
            return;
        }
        list.forEach((team) => {
            const card = document.createElement('div');
            card.className =
                'team-card aspect-square rounded-2xl bg-purple-500/10 border border-purple-800/20 hover:border-purple-800/50 transition flex items-center justify-center overflow-hidden';
            const img = document.createElement('img');
            img.className = 'team-logo w-[72%] h-[72%] object-contain select-none pointer-events-none';
            img.alt = team.name;
            img.src = resolveAssetPath(team.logo);
            card.appendChild(img);
            grid.appendChild(card);
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        const select = document.getElementById('season-select');
        const teamGrid = document.getElementById('team-grid');
        if (!select || !teamGrid) return;

        const teamsByYear = window.lckTeams || {};
        if (!Object.keys(teamsByYear).length) return;

        function applySeason(year) {
            if (!year) return;
            buildTeamGrid(year, teamsByYear, teamGrid);
            window.players = flattenPlayers(year, teamsByYear);
            window.currentSeasonYear = year;
            document.dispatchEvent(new CustomEvent('teamgrid:updated', { detail: { year } }));
            document.dispatchEvent(new CustomEvent('seasonchange', { detail: { year } }));
        }

        select.addEventListener('change', () => applySeason(select.value));
        applySeason(select.value || Object.keys(teamsByYear).sort((a, b) => b - a)[0]);
    });
})();
