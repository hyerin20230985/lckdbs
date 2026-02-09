// rating.js

document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    // 페이지 로딩 시 선수 통계 탭 내용만 보이도록 설정
    const playerContent = document.getElementById('player');
    if (playerContent) {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        const playerTabButton = document.querySelector('[data-tab="player"]');
        if (playerTabButton) {
            playerTabButton.classList.add('active');
        }

        tabContents.forEach(content => content.classList.remove('active'));
        playerContent.classList.add('active');
    }

    const statItems = document.querySelectorAll('.stat-item.clickable');
    statItems.forEach(item => {
        item.addEventListener('click', function() {
            const detailContent = this.querySelector('.detail-content');
            if (detailContent) {
                detailContent.classList.toggle('hidden');
            }
        });
    });

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            tabContents.forEach(content => content.classList.remove('active'));
            const targetTabId = button.getAttribute('data-tab');
            const targetTabContent = document.getElementById(targetTabId);
            if (targetTabContent) {
                targetTabContent.classList.add('active');
            }
        });
    });
});

function selectedRole(role, element) {
    const playersByRole = {
        top: {
            name: "제우스",
            team: "HLE",
            photo: "../photos/players/Zeus.jpg",
            position: "TOP",
            kda: "5.8",
            kills: "5.8",
            deaths: "1.2",
            assists: "7.2",
            dpm: "620",
            teamDamage: "28%",
            goldDamage: "1.45",
            csm: "9.8",
            goldDiff15: "+320",
            csDiff15: "+7.5",
            championStats: [{
                rank: 1,
                championName: "크산테",
                championImg: "../photos/champions/162.png",
                playRate: "20.1%",
                wins: 15,
                losses: 5,
                winRate: "75%",
                kda: "3.71",
                kills: "4.3",
                deaths: "2.1",
                assists: "3.5",
                goldDamage: "0.28",
                damagePerMin: "643",
                goldPerMin: "432",
                csm: "9.0",
                dpm: "2.5",
                pgr: "0.33",
            }, {
                rank: 2,
                championName: "나르",
                championImg: "../photos/champions/120.png",
                playRate: "18.5%",
                wins: 12,
                losses: 6,
                winRate: "66.7%",
                kda: "3.12",
                kills: "3.5",
                deaths: "2.5",
                assists: "4.0",
                goldDamage: "0.25",
                damagePerMin: "580",
                goldPerMin: "420",
                csm: "8.5",
                dpm: "2.0",
                pgr: "0.28",
            }, {
                rank: 3,
                championName: "잭스",
                championImg: "../photos/champions/12.png",
                playRate: "15.0%",
                wins: 10,
                losses: 5,
                winRate: "66.7%",
                kda: "2.95",
                kills: "3.0",
                deaths: "2.0",
                assists: "3.0",
                goldDamage: "0.22",
                damagePerMin: "550",
                goldPerMin: "410",
                csm: "8.0",
                dpm: "1.8",
                pgr: "0.25",
            }],
        },
        jungle: {
            name: "피넛",
            team: "GEN.G",
            photo: "../photos/players/Peanut.jpg",
            position: "JUNGLE",
            kda: "4.5",
            kills: "4.0",
            deaths: "1.5",
            assists: "4.5",
            dpm: "550",
            teamDamage: "22%",
            goldDamage: "1.30",
            csm: "7.5",
            goldDiff15: "+250",
            csDiff15: "+5.0",
            championStats: [{
                rank: 1,
                championName: "바이",
                championImg: "../photos/champions/109.png",
                playRate: "25.0%",
                wins: 18,
                losses: 7,
                winRate: "72%",
                kda: "4.15",
                kills: "4.5",
                deaths: "2.0",
                assists: "5.0",
                goldDamage: "0.30",
                damagePerMin: "680",
                goldPerMin: "450",
                csm: "8.5",
                dpm: "3.0",
                pgr: "0.35",
            }, {
                rank: 2,
                championName: "리신",
                championImg: "../photos/champions/73.png",
                playRate: "22.0%",
                wins: 15,
                losses: 8,
                winRate: "65.2%",
                kda: "3.80",
                kills: "4.0",
                deaths: "2.5",
                assists: "4.5",
                goldDamage: "0.28",
                damagePerMin: "620",
                goldPerMin: "430",
                csm: "8.0",
                dpm: "2.8",
                pgr: "0.30",
            }, {
                rank: 3,
                championName: "자크",
                championImg: "../photos/champions/112.png",
                playRate: "19.0%",
                wins: 13,
                losses: 6,
                winRate: "68.4%",
                kda: "4.50",
                kills: "3.0",
                deaths: "1.5",
                assists: "5.5",
                goldDamage: "0.25",
                damagePerMin: "590",
                goldPerMin: "420",
                csm: "7.5",
                dpm: "2.2",
                pgr: "0.27",
            }],
        },
        mid: {
            name: "페이커",
            team: "T1",
            photo: "../photos/players/Faker.jpg",
            position: "MID",
            kda: "6.0",
            kills: "5.8",
            deaths: "1.2",
            assists: "7.2",
            dpm: "620",
            teamDamage: "28%",
            goldDamage: "1.45",
            csm: "9.8",
            goldDiff15: "+320",
            csDiff15: "+7.5",
            championStats: [{
                rank: 1,
                championName: "아지르",
                championImg: "../photos/champions/121.png",
                playRate: "28.5%",
                wins: 20,
                losses: 5,
                winRate: "80%",
                kda: "6.2",
                kills: "5.0",
                deaths: "1.5",
                assists: "4.5",
                goldDamage: "0.35",
                damagePerMin: "750",
                goldPerMin: "480",
                csm: "9.5",
                dpm: "4.0",
                pgr: "0.40",
            }, {
                rank: 2,
                championName: "오리아나",
                championImg: "../photos/champions/77.png",
                playRate: "25.0%",
                wins: 18,
                losses: 7,
                winRate: "72%",
                kda: "5.8",
                kills: "4.5",
                deaths: "2.0",
                assists: "5.0",
                goldDamage: "0.32",
                damagePerMin: "720",
                goldPerMin: "460",
                csm: "9.0",
                dpm: "3.5",
                pgr: "0.38",
            }, {
                rank: 3,
                championName: "트리스타나",
                championImg: "../photos/champions/14.png",
                playRate: "15.0%",
                wins: 10,
                losses: 5,
                winRate: "66.7%",
                kda: "5.1",
                kills: "6.0",
                deaths: "2.5",
                assists: "3.5",
                goldDamage: "0.38",
                damagePerMin: "800",
                goldPerMin: "500",
                csm: "9.8",
                dpm: "4.5",
                pgr: "0.42",
            }],
        },
        adc: {
            name: "룰러",
            team: "JDG",
            photo: "../photos/players/Ruler.jpg",
            position: "ADC",
            kda: "7.5",
            kills: "7.0",
            deaths: "1.5",
            assists: "6.5",
            dpm: "880",
            teamDamage: "35%",
            goldDamage: "1.80",
            csm: "10.2",
            goldDiff15: "+450",
            csDiff15: "+8.0",
            championStats: [{
                rank: 1,
                championName: "제리",
                championImg: "../photos/champions/158.png",
                playRate: "22.5%",
                wins: 18,
                losses: 5,
                winRate: "78.3%",
                kda: "8.5",
                kills: "7.0",
                deaths: "1.5",
                assists: "6.0",
                goldDamage: "0.40",
                damagePerMin: "950",
                goldPerMin: "550",
                csm: "10.5",
                dpm: "5.0",
                pgr: "0.45",
            }, {
                rank: 2,
                championName: "케이틀린",
                championImg: "../photos/champions/67.png",
                playRate: "20.0%",
                wins: 15,
                losses: 5,
                winRate: "75%",
                kda: "7.2",
                kills: "6.5",
                deaths: "1.8",
                assists: "5.5",
                goldDamage: "0.38",
                damagePerMin: "900",
                goldPerMin: "520",
                csm: "10.0",
                dpm: "4.8",
                pgr: "0.42",
            }, {
                rank: 3,
                championName: "징크스",
                championImg: "../photos/champions/116.png",
                playRate: "18.0%",
                wins: 12,
                losses: 6,
                winRate: "66.7%",
                kda: "6.8",
                kills: "6.0",
                deaths: "2.0",
                assists: "5.0",
                goldDamage: "0.35",
                damagePerMin: "850",
                goldPerMin: "500",
                csm: "9.8",
                dpm: "4.5",
                pgr: "0.40",
            }],
        },
        support: {
            name: "케리아",
            team: "T1",
            photo: "../photos/players/Keria.jpg",
            position: "SUPPORT",
            kda: "8.2",
            kills: "1.0",
            deaths: "1.0",
            assists: "12.0",
            dpm: "350",
            teamDamage: "12%",
            goldDamage: "0.50",
            csm: "1.5",
            goldDiff15: "+50",
            csDiff15: "+0.5",
            championStats: [{
                rank: 1,
                championName: "바드",
                championImg: "../photos/champions/124.png",
                playRate: "25.0%",
                wins: 15,
                losses: 5,
                winRate: "75%",
                kda: "9.0",
                kills: "1.0",
                deaths: "1.0",
                assists: "12.0",
                goldDamage: "0.15",
                damagePerMin: "350",
                goldPerMin: "320",
                csm: "1.5",
                dpm: "1.0",
                pgr: "0.15",
            }, {
                rank: 2,
                championName: "레나타 글라스크",
                championImg: "../photos/champions/159.png",
                playRate: "20.0%",
                wins: 12,
                losses: 5,
                winRate: "70.6%",
                kda: "8.5",
                kills: "0.8",
                deaths: "1.2",
                assists: "11.5",
                goldDamage: "0.14",
                damagePerMin: "320",
                goldPerMin: "300",
                csm: "1.2",
                dpm: "0.9",
                pgr: "0.14",
            }, {
                rank: 3,
                championName: "쓰레쉬",
                championImg: "../photos/champions/110.png",
                playRate: "18.0%",
                wins: 10,
                losses: 6,
                winRate: "62.5%",
                kda: "7.5",
                kills: "1.0",
                deaths: "1.5",
                assists: "10.0",
                goldDamage: "0.12",
                damagePerMin: "300",
                goldPerMin: "290",
                csm: "1.0",
                dpm: "0.8",
                pgr: "0.12",
            }],
        },
    };
const playerProfileHeader = document.querySelector('.player-profile-header');
const playerCareerSection = document.querySelector('.player-career-section');
const championStatsContainer = document.querySelector('.champion-stats-container');

if (playerProfileHeader) playerProfileHeader.style.display = 'flex';
if (playerCareerSection) playerCareerSection.style.display = 'block';
if (championStatsContainer) championStatsContainer.style.display = 'block';

const roleItems = document.querySelectorAll('.role-item');
roleItems.forEach(item => item.classList.remove('selected'));
if (element) {
    element.classList.add('selected');
}

const playerData = playersByRole[role];

if (playerData) {
    const playerNameEl = document.querySelector('.player-name');
    const playerTeamEl = document.querySelector('.player-team');
    const playerPhotoEl = document.querySelector('.player-photo');

    if (playerNameEl) playerNameEl.textContent = playerData.name;
    if (playerTeamEl) playerTeamEl.textContent = playerData.team;
    if (playerPhotoEl) playerPhotoEl.src = playerData.photo;

    // === 기존 주요 스탯 ===
    const kdaStatValue = document.querySelector('.player-stats-summary .stat-item:nth-child(1) .stat-value');
    const dpmStatValue = document.querySelector('.player-stats-summary .stat-item:nth-child(2) .stat-value');
    const csmStatValue = document.querySelector('.player-stats-summary .stat-item:nth-child(3) .stat-value');

    if (kdaStatValue) kdaStatValue.textContent = playerData.kda;
    if (dpmStatValue) dpmStatValue.textContent = playerData.dpm;
    if (csmStatValue) csmStatValue.textContent = playerData.csm;

    const kdaDetail = document.querySelector('.stat-item:nth-child(1) .detail-content');
    if (kdaDetail) {
        kdaDetail.querySelector('.detail-sub-item:nth-child(1) p').textContent = playerData.kills;
        kdaDetail.querySelector('.detail-sub-item:nth-child(2) p').textContent = playerData.deaths;
        kdaDetail.querySelector('.detail-sub-item:nth-child(3) p').textContent = playerData.assists;
    }

    const dpmDetail = document.querySelector('.stat-item:nth-child(2) .detail-content');
    if (dpmDetail) {
        dpmDetail.querySelector('.detail-sub-item:nth-child(1) p').textContent = playerData.teamDamage;
        dpmDetail.querySelector('.detail-sub-item:nth-child(2) p').textContent = playerData.goldDamage;
    }

    const csmDetail = document.querySelector('.stat-item:nth-child(3) .detail-content');
    if (csmDetail) {
        csmDetail.querySelector('.detail-sub-item:nth-child(1) p').textContent = playerData.goldDiff15;
        csmDetail.querySelector('.detail-sub-item:nth-child(2) p').textContent = playerData.csDiff15;
    }

    // === 새로 추가된 스탯 ===
    const teamDamageValue = document.querySelector('.team-damage');
    const goldDamageValue = document.querySelector('.gold-damage');
    const goldDiff15Value = document.querySelector('.gold-diff15');
    const csDiff15Value = document.querySelector('.cs-diff15');

    if (teamDamageValue) teamDamageValue.textContent = playerData.teamDamage;
    if (goldDamageValue) goldDamageValue.textContent = playerData.goldDamage;
    if (goldDiff15Value) goldDiff15Value.textContent = playerData.goldDiff15;
    if (csDiff15Value) csDiff15Value.textContent = playerData.csDiff15;

    // detail-content 내부 값도 갱신
    const teamDamageDetail = document.querySelector('.team-damage-detail');
    const goldDamageDetail = document.querySelector('.gold-damage-detail');
    const goldDiff15Detail = document.querySelector('.gold-diff15-detail');
    const csDiff15Detail = document.querySelector('.cs-diff15-detail');

    if (teamDamageDetail) teamDamageDetail.textContent = playerData.teamDamage;
    if (goldDamageDetail) goldDamageDetail.textContent = playerData.goldDamage;
    if (goldDiff15Detail) goldDiff15Detail.textContent = playerData.goldDiff15;
    if (csDiff15Detail) csDiff15Detail.textContent = playerData.csDiff15;


    // === 챔피언 스탯 테이블 ===
    const championStatsTableBody = document.querySelector('.champion-stats-table tbody');
    if (championStatsTableBody && playerData.championStats) {
        championStatsTableBody.innerHTML = '';
        playerData.championStats.forEach(item => {
            const row = `
                <tr>
                    <td>${item.rank}</td>
                    <td class="champion-cell">
                        <img src="${item.championImg}" alt="${item.championName}" class="champion-icon">
                        <span class="champion-name">${item.championName}</span>
                    </td>
                    <td>${item.playRate}</td>
                    <td>${item.wins}</td>
                    <td>${item.losses}</td>
                    <td>${item.winRate}</td>
                    <td>${item.kda}</td>
                    <td>${item.kills}</td>
                    <td>${item.deaths}</td>
                    <td>${item.assists}</td>
                    <td>${item.goldDamage}</td>
                    <td>${item.damagePerMin}</td>
                    <td>${item.goldPerMin}</td>
                    <td>${item.csm}</td>
                    <td>${item.dpm}</td>
                    <td>${item.pgr}</td>
                </tr>
            `;
            championStatsTableBody.innerHTML += row;
        });
    }
}
}