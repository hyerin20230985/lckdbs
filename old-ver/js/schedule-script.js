// schedule-script.js
const IMG_BASE_URL = 'https://d30q0nmfm6z0r7.cloudfront.net/photos/';

const schedules = {
    '퍼스트 스탠드 토너먼트': [
        { date: '2025-03-10', time: '17:00', round: '1라운드', team1: 'Team Liquid', team1Player: `${IMG_BASE_URL}playerjpg/Umti.jpg`, team1Logo: `${IMG_BASE_URL}assets/team liquid.png`, team2: 'Karmine Corp', team2Logo: `${IMG_BASE_URL}assets/karmine corp.png`, team2Player: `${IMG_BASE_URL}playerjpg/canna.jpg`, score: '2 : 1', link: 'https://game.naver.com/esports/League_of_Legends/videos/1044679' },
        { date: '2025-03-10', time: '20:00', round: '1라운드', team1: '한화생명 E스포츠', team1Player: `${IMG_BASE_URL}playerspng/Zeus.png`, team1Logo: `${IMG_BASE_URL}assets/HLE.svg`, team2: 'TOP E-sports', team2Logo: `${IMG_BASE_URL}assets/top esports.png`, team2Player: `${IMG_BASE_URL}playerjpg/369.jpg`, score: '2 : 0', link: 'https://game.naver.com/esports/League_of_Legends/videos/1044684' },
    ],
    'LCK': [
        { date: '2025-04-15', time: '18:00', round: '정규 시즌', team1: 'T1', team1Player: `${IMG_BASE_URL}playerpng/Faker.png`, team1Logo: `${IMG_BASE_URL}assets/T1.png`, team2: 'Gen.G', team2Logo: `${IMG_BASE_URL}assets/GEN.G.svg`, team2Player: `${IMG_BASE_URL}playerpng/chovy.png`, score: '3 : 1', link: 'https://game.naver.com/esports/League_of_Legends/videos/1044690' },
        { date: '2025-05-11', time: '17:00', round: '정규 시즌', team1: 'DRX', team1Player: `${IMG_BASE_URL}playerpng/Deft.png`, team1Logo: `${IMG_BASE_URL}assets/drx.svg`, team2: 'KDF', team2Logo: `${IMG_BASE_URL}assets/kdf.png`, team2Player: `${IMG_BASE_URL}playerpng/Bdd.png`, score: '2 : 0', link: 'https://game.naver.com/esports/League_of_Legends/videos/xxxxxxx' },
        { date: '2025-05-11', time: '20:00', round: '정규 시즌', team1: 'T1', team1Player: `${IMG_BASE_URL}playerpng/Faker.png`, team1Logo: `${IMG_BASE_URL}assets/T1.png`, team2: 'HLE', team2Logo: `${IMG_BASE_URL}assets/HLE.png`, team2Player: `${IMG_BASE_URL}playerpng/chovy.png`, score: '1 : 2', link: 'https://game.naver.com/esports/League_of_Legends/videos/yyyyyyy' },
    ],
    'MSI': [
        { date: '2025-05-05', time: '19:00', round: '그룹 스테이지', team1: 'DWG KIA', team1Player: `${IMG_BASE_URL}playerpng/ShowMaker.png`, team1Logo: `${IMG_BASE_URL}assets/dk.png`, team2: 'T1', team2Logo: `${IMG_BASE_URL}assets/T1.png`, team2Player: `${IMG_BASE_URL}playerpng/Faker.png`, score: '3 : 2', link: 'https://game.naver.com/esports/League_of_Legends/videos/1044695' },
    ],
    '롤드컵': [
        { date: '2025-10-10', time: '17:00', round: '8강', team1: 'T1', team1Player: `${IMG_BASE_URL}playerpng/Faker.png`, team1Logo: `${IMG_BASE_URL}assets/T1.png`, team2: 'DWG KIA', team2Logo: `${IMG_BASE_URL}assets/2022 DK.svg`, team2Player: `${IMG_BASE_URL}playerpng/ShowMaker.png`, score: '3 : 1', link: 'https://game.naver.com/esports/League_of_Legends/videos/1044700' },
    ],
};
$(function() {
    let statPageIdCounter = 0;
    let currentTournament = null;

    const today = new Date();
    const todayString = [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, '0'),
        String(today.getDate()).padStart(2, '0')
    ].join('-');

    // Flatpickr 초기화 코드 (onReady 콜백에 위치 조정 추가)
    const fp = flatpickr("#dateSelect", {
        dateFormat: "Y-m-d", 
        locale: "ko",       
        defaultDate: todayString, 
        appendTo: document.querySelector(".calendar-container"), // 달력을 .calendar-container 내부에 렌더링
        onReady: function(selectedDates, dateStr, instance) {
            instance.calendarContainer.style.position = 'absolute';
            instance.calendarContainer.style.top = 'calc(100% + 5px)'; 
            instance.calendarContainer.style.left = '0'; 
            instance.calendarContainer.style.zIndex = '9999'; 
        },
        onChange: function(selectedDates, dateStr, instance) {
            updateSchedule(dateStr, currentTournament);
        }
    });

    $(".calendar_icon").on("click", function() {
        if (fp) {
            fp.open();
        }
    });

    $(".tournament_logo").on("click", function() {
        const $clickedLogo = $(this);
        const $clickedWrapper = $clickedLogo.parent('.logo-item-wrapper');

        $(".logo-item-wrapper").removeClass("selected");
        $clickedWrapper.addClass("selected");

        currentTournament = $clickedLogo.data("tournament");

        const selectedDate = $("#dateSelect").val();
        updateSchedule(selectedDate, currentTournament);
    });

    $(".team_select_button").on("click", function(event) {
        event.stopPropagation();
        $(this).siblings(".team_list").toggle();
    });

    $(".team_list ul li").on("click", function() {
        const teamName = $(this).text().trim();
        const $img = $(this).find('img');
        const src = $img.attr('src');
        const alt = $img.attr('alt');

        let teamWinRate = {
            'T1': '123W 63L 승률 60%',
            'Gen.G': '100W 50L 승률 66%',
            'DK': '90W 70L 승률 56%',
            'HLE': '85W 75L 승률 53%',
            'KT': '70W 80L 승률 47%',
            'DRX': '65W 85L 승률 43%',
            'KDF': '50W 90L 승률 36%',
            'BNK': '45W 95L 승률 32%',
            'NS': '40W 100L 승률 28%',
            'OK': '30W 110L 승률 21%',
        }[teamName] || `[${teamName.replace(/로고/g, '').trim()}] 임의 승률: ??%`;

        $("#teamStatsDisplay").text(teamWinRate);

        const $button = $(".team_select_button").empty();
        if (src) $button.append(`<img src="${src}" alt="${alt}" class="team_logo">`);
        $button.append(teamName);

        $(".team_list").hide();
    });

    $(document).on("click", function(e) {
        if (!$(e.target).closest(".team_select_container, .team_select_dropdown").length) {
            $(".team_list").hide();
        }
    });

    window.updateSchedule = function(selectedDate, tournament) {
        const scheduleTableBody = document.getElementById('scheduleTableBody');
        scheduleTableBody.innerHTML = '';

        const dateToUse = selectedDate || $("#dateSelect").val() || todayString;

        if (!tournament) {
            scheduleTableBody.innerHTML = `<tr><td colspan="7" style="text-align:center;">
                먼저 <span style="font-weight: bold; color: #3498db;">대회 로고</span>를 선택해주세요.
                <br>현재 날짜: ${dateToUse}
            </td></tr>`;
            return;
        }

        const selectedDateString = dateToUse;

        const now = new Date();
        const dailySchedules = schedules[tournament].filter(s => s.date === selectedDateString);

        if (dailySchedules.length === 0) {
            scheduleTableBody.innerHTML = `<tr><td colspan="7" style="text-align:center;">선택하신 날짜 (${selectedDateString})에 ${tournament} 일정이 없습니다.</td></tr>`;
            return;
        }

        dailySchedules.forEach(schedule => {
            const matchDateTime = new Date(`${schedule.date}T${schedule.time}:00`);
            const isEnded = now > matchDateTime;
            const statPageId = `statPage-${statPageIdCounter++}`;

            const row = document.createElement('tr');
            row.dataset.statPageId = statPageId;
            row.dataset.tournament = tournament;
            row.dataset.date = schedule.date;
            row.dataset.matchTime = schedule.time;

            row.innerHTML = `
                <td>${schedule.time} ${isEnded ? '<span class="status">종료</span>' : ''}</td>
                <td>${schedule.round}</td>
                <td class="team-cell">
                    ${schedule.team1Logo ? `<img src="${schedule.team1Logo}" alt="${schedule.team1} 로고" class="team_logo">` : ''}
                    <span class="team_name">${schedule.team1}</span>
                    ${schedule.team1Player ? `<img src="${schedule.team1Player}" alt="${schedule.team1} 선수" class="player_photo">` : ''}
                </td>
                <td>vs</td>
                <td class="team-cell">
                    ${schedule.team2Player ? `<img src="${schedule.team2Player}" alt="${schedule.team2} 선수" class="player_photo">` : ''}
                    <span class="team_name">${schedule.team2}</span>
                    ${schedule.team2Logo ? `<img src="${schedule.team2Logo}" alt="${schedule.team2} 로고" class="team_logo">` : ''}
                </td>
                <td>${schedule.score}</td>
                <td>${schedule.link ? `<a href="${schedule.link}" class="more_info" target="_blank">다시보기</a>` : ''}</td>
            `;
            scheduleTableBody.appendChild(row);

            const statRow = document.createElement('tr');
            statRow.classList.add('stat-row');
            statRow.id = statPageId;
            // ⭐ display: none; 대신 CSS 클래스로 제어하도록 변경 ⭐
            // statRow.style.display = 'none'; 
            statRow.innerHTML = `<td colspan="7"><div class="stat-container"></div></td>`;
            scheduleTableBody.appendChild(statRow);
        });
    };

    // ⭐ main_container 요소 캐싱 ⭐
    const $mainContainer = $('.main_container'); // jQuery 객체로 캐싱

    $('#scheduleTableBody').on('click', 'tr', function(event) {
        if ($(event.target).is('a.more_info')) {
            return;
        }

        const $clickedRow = $(this);
        const statPageContainerId = $clickedRow.data('statPageId');
        if (!statPageContainerId) return;

        const $statRow = $('#' + statPageContainerId);
        const $statContainer = $statRow.find('.stat-container');
        const isVisible = $statRow.hasClass('show');

        // 현재 열려있는 모든 스탯 페이지 닫기
        // ⭐ 닫히기 전에 main_container 높이 고정 ⭐
        const $currentlyOpenStatRow = $('.stat-row.show');
        if ($currentlyOpenStatRow.length && $currentlyOpenStatRow[0].id !== statPageContainerId) {
            $mainContainer.css('height', $mainContainer.outerHeight()); // 높이 고정
            $currentlyOpenStatRow.removeClass('show');
            // transitionend를 기다리거나, setTimeout을 사용하여 애니메이션 완료 후 높이 해제
            $currentlyOpenStatRow.one('transitionend', function() {
                $mainContainer.css('height', ''); // 높이 고정 해제
            });
            // jQuery의 .hide() 대신 CSS 클래스 제어로 대체
            // $currentlyOpenStatRow.hide(); 
        } else if ($currentlyOpenStatRow.length && $currentlyOpenStatRow[0].id === statPageContainerId && isVisible) {
            // 이미 열려있는 스탯 페이지를 다시 클릭하여 닫을 때
            $mainContainer.css('height', $mainContainer.outerHeight()); // 높이 고정
            $statRow.removeClass('show');
            $statRow.one('transitionend', function() {
                 $mainContainer.css('height', ''); // 높이 고정 해제
            });
            return; // 닫기만 하고 새로 열 필요 없음
        }


        // 스탯 페이지 열기
        if (!isVisible) {
            // ⭐ 열기 전에 main_container 높이 고정 ⭐
            $mainContainer.css('height', $mainContainer.outerHeight());

            $statRow.addClass('show'); // CSS transition 발동
            
            // transition이 완료된 후에 main_container 높이 고정 해제
            $statRow.one('transitionend', function() {
                $mainContainer.css('height', '');
            });

            // AJAX로 stat.html 불러오기
            if ($statContainer.html().trim() === '') {
                const tournament = $clickedRow.data('tournament');
                const date = $clickedRow.data('date');
                const matchTime = $clickedRow.data('matchTime');

                $.ajax({
                    url: `stat.html?tournament=${tournament}&date=${date}&matchTime=${matchTime}`,
                    dataType: 'html',
                    success: function(data) {
                        $statContainer.html(data);
                    },
                    error: function(xhr, status, error) {
                        console.error("Error loading stat.html:", status, error);
                        $statContainer.html('<div style="color:red;">통계 정보를 불러올 수 없습니다.</div>');
                    }
                });
            }
        }
    });

    // 페이지 로드 시 초기 스케줄 정보 표시
    updateSchedule(todayString, null);
});