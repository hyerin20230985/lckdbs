// player.js
document.addEventListener('DOMContentLoaded', function() {
   const urlParams = new URLSearchParams(window.location.search);
   const playerId = urlParams.get('id') || '3001'; // 기본값으로 Faker의 ID 사용

   let statsChart = null;
   let currentPage = 1;

   // 선수 기본 정보 로드
   async function loadPlayerDetails() {
       try {
           const response = await fetch(`/player-details/${playerId}`);
           const data = await response.json();

           // 브레드크럼 업데이트
           document.querySelector('.breadcrumb').innerHTML = `
               <span>선수</span>
               <span>/</span>
               <span>${data.역할군}</span>
               <span>/</span>
               <span>${data.선수이름}</span>
           `;

           // 프로필 정보 업데이트
           document.querySelector('.info-details').innerHTML = `
               <p>역할군: ${data.역할군}</p>
               <p>소속팀: <a href="team.html">${data.소속팀}</a></p>
               <p>생년월일: ${data.생년월일}</p>
               <p>데뷔년도: ${data.데뷔년도}</p>
           `;
       } catch (error) {
           console.error('선수 정보 로딩 오류:', error);
       }
   }

   // 선수 매치 기록 및 통산 승률 로드
   async function loadMatchRecords() {
       try {
           const response = await fetch(`/match-records/${playerId}`);
           const data = await response.json();
           
           // 통산 승률 테이블 업데이트
           const totalGames = data.경기기록.length;
           const wins = data.경기기록.filter(match => match.승리여부 === 'WIN').length;
           
           // KDA 평균 계산
           const avgKDA = data.경기기록.reduce((sum, match) => sum + match.KDA, 0) / totalGames;
           
           // 승률 계산 (백분율)
           const winRate = ((wins / totalGames) * 100).toFixed(1);

           document.getElementById('player-stats').innerHTML = `
               <tr>
                   <td>${totalGames}</td>
                   <td>${wins}</td>
                   <td>${totalGames - wins}</td>
                   <td>${avgKDA.toFixed(2)}</td>
                   <td>${winRate}%</td>
               </tr>
           `;
       } catch (error) {
           console.error('매치 기록 로딩 오류:', error);
       }
   }

   // 선수 스탯 로드 및 차트 생성
   async function loadPlayerStats() {
       try {
           const response = await fetch(`/player-stats/${playerId}`);
           const data = await response.json();

           const ctx = document.getElementById('stats-chart').getContext('2d');
           
           if (statsChart) {
               statsChart.destroy();
           }

           statsChart = new Chart(ctx, {
               type: 'radar',
               data: {
                   labels: ['KDA', '킬', '데스', '어시스트', 'DPM', 'KP', 'CSM', 'GPM'],
                   datasets: [{
                       label: '선수 스탯',
                       data: [
                           data.평균_KDA,
                           data.평균_킬,
                           data.평균_데스,
                           data.평균_어시스트,
                           data.평균_DPM,
                           data.평균_KP,
                           data.평균_CSM,
                           data.평균_GPM
                       ],
                       backgroundColor: 'rgba(54, 162, 235, 0.2)',
                       borderColor: 'rgb(54, 162, 235)',
                       pointBackgroundColor: 'rgb(54, 162, 235)'
                   }]
               },
               options: {
                   scales: {
                       r: {
                           beginAtZero: true,
                           max: 12,
                           ticks: {
                               stepSize: 2
                           }
                       }
                   }
               }
           });

           // 선수평점 업데이트
           document.getElementById('player-rating').textContent = `선수평점: ${data.평균_KDA.toFixed(1)}`;
       } catch (error) {
           console.error('스탯 로딩 오류:', error);
       }
   }

   // 선수평 로드
   async function loadPlayerReviews() {
       try {
           const response = await fetch(`/player-reviews/${playerId}`);
           const reviews = await response.json();

           const reviewsList = document.getElementById('reviews-list');
           reviewsList.innerHTML = '';

           reviews.forEach(review => {
               const reviewElement = document.createElement('div');
               reviewElement.className = 'review-item';
               reviewElement.innerHTML = `
                   <div class="reviewer-name">${review.닉네임}</div>
                   <div class="review-content">${review.선수평}</div>
               `;
               reviewsList.appendChild(reviewElement);
           });

           // 페이지 정보 업데이트
           document.getElementById('page-info').textContent = `${currentPage} / 100`;
       } catch (error) {
           console.error('선수평 로딩 오류:', error);
       }
   }

   // 선수평 등록 폼 제어
   const reviewForm = document.getElementById('review-form');
   reviewForm.addEventListener('submit', async (e) => {
       e.preventDefault();

       try {
           const formData = new FormData(reviewForm);
           const reviewData = {
               닉네임: formData.get('nickname'),
               비밀번호: formData.get('password'),
               선수평: formData.get('review')
           };

           const response = await fetch(`/player-reviews/${playerId}`, {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json',
               },
               body: JSON.stringify(reviewData)
           });

           if (response.ok) {
               alert('선수평이 등록되었습니다.');
               reviewForm.reset();
               loadPlayerReviews(); // 선수평 목록 새로고침
           } else {
               const error = await response.json();
               alert(error.message || '선수평 등록에 실패했습니다.');
           }
       } catch (error) {
           console.error('선수평 등록 오류:', error);
           alert('선수평 등록 중 오류가 발생했습니다.');
       }
   });

   // 페이지네이션 이벤트 핸들러
   document.querySelectorAll('.pagination button').forEach(button => {
       button.addEventListener('click', (e) => {
           const action = e.target.textContent;
           if (action === '＜' && currentPage > 1) {
               currentPage--;
           } else if (action === '＞') {
               currentPage++;
           } else if (action === '≪') {
               currentPage = 1;
           } else if (action === '≫') {
               currentPage = 100;
           }
           loadPlayerReviews();
       });
   });

   // 초기 데이터 로드
   loadPlayerDetails();
   loadMatchRecords();
   loadPlayerStats();
   loadPlayerReviews();
});