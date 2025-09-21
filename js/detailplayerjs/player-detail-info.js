

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
