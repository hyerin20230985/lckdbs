// Season selector for player-new.html
// This script builds the window.players array from team.js data
document.addEventListener('DOMContentLoaded', () => {
    const seasonSelect = document.getElementById('season-select');
    
    if (!seasonSelect || !window.lckTeams) {
        console.error('Season select or team data not found');
        return;
    }

    // Build window.players array from selected season
    function buildPlayersArray(year) {
        const allPlayers = [];
        const teams = window.lckTeams[year];
        
        if (teams && Array.isArray(teams)) {
            teams.forEach(team => {
                if (team.players && Array.isArray(team.players)) {
                    team.players.forEach(player => {
                        allPlayers.push({
                            ...player,
                            team: team.name,
                            role: player.position, // playerbuild.js uses 'role' field
                            nickname: player.name, // playerbuild.js uses 'nickname' field
                            searchKeywords: player.searchKeywords || []
                        });
                    });
                }
            });
        }
        
        window.players = allPlayers;
        console.log(`Loaded ${allPlayers.length} players for ${year} LCK`);
        
        // Dispatch event to notify other scripts that season has changed
        document.dispatchEvent(new CustomEvent('seasonchange', { detail: { year } }));
    }

    // Season select change event
    seasonSelect.addEventListener('change', function() {
        const year = this.value;
        buildPlayersArray(year);
    });

    // Initial load - 2026 LCK (matches HTML default selection)
    buildPlayersArray('2026');
});
