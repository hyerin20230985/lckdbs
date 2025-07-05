// /js/champion-scripts.js

// 모든 챔피언 데이터를 배열로 정의합니다.
// 여기에 각 챔피언의 'roles' 정보를 추가해야 합니다!
const allChampions = [
    // 예시: 챔피언 이름과 이미지 URL, 그리고 담당 'roles' 배열을 추가합니다.
    // 한 챔피언이 여러 역할을 할 수 있다면 roles 배열에 모두 넣어주세요.
    { name: "가렌", imageUrl: "./photos/champions/50.png", roles: ["top"] },
    { name: "갈리오", imageUrl: "./photos/champions/57.png", roles: ["mid", "support"] },
    { name: "갱플랭크", imageUrl: "./photos/champions/30.png", roles: ["top", ] },
    { name: "그라가스", imageUrl: "./photos/champions/44.png", roles: ["jungle", "top", ] },
    { name: "그레이브즈", imageUrl: "./photos/champions/85.png", roles: ["jungle", ] },
    { name: "그웬", imageUrl: "./photos/champions/155.png", roles: ["top"] },
    { name: "나르", imageUrl: "./photos/champions/120.png", roles: ["top"] },
    { name: "나미", imageUrl: "./photos/champions/108.png", roles: ["support"] },
    { name: "나서스", imageUrl: "./photos/champions/38.png", roles: ["top"] },
    { name: "나피리", imageUrl: "./photos/champions/164.png", roles: ["mid", "jungle"] },
    { name: "노틸러스", imageUrl: "./photos/champions/93.png", roles: ["support", ] },
    { name: "녹턴", imageUrl: "./photos/champions/72.png", roles: ["jungle"] },
    { name: "누누와 윌럼프", imageUrl: "./photos/champions/1.png", roles: ["jungle"] },
    { name: "니달리", imageUrl: "./photos/champions/42.png", roles: ["jungle"] },
    { name: "니코", imageUrl: "./photos/champions/142.png", roles: ["mid", "support",] },
    { name: "닐라", imageUrl: "./photos/champions/161.png", roles: ["adc"] },
    { name: "다리우스", imageUrl: "./photos/champions/98.png", roles: ["top"] },
    { name: "다이애나", imageUrl: "./photos/champions/102.png", roles: ["mid", "jungle"] },
    { name: "드레이븐", imageUrl: "./photos/champions/99.png", roles: ["adc"] },
    { name: "라이즈", imageUrl: "./photos/champions/2.png", roles: ["mid", ] },
    { name: "라칸", imageUrl: "./photos/champions/136.png", roles: ["support"] },
    { name: "람머스", imageUrl: "./photos/champions/26.png", roles: ["jungle"] },
    { name: "럭스", imageUrl: "./photos/champions/62.png", roles: ["mid", "support"] },
    { name: "럼블", imageUrl: "./photos/champions/75.png", roles: ["top", ] },
    { name: "레나타 글라스크", imageUrl: "./photos/champions/159.png", roles: ["support"] },
    { name: "레넥톤", imageUrl: "./photos/champions/68.png", roles: ["top"] },
    { name: "레오나", imageUrl: "./photos/champions/79.png", roles: ["support"] },
    { name: "렉사이", imageUrl: "./photos/champions/123.png", roles: ["jungle"] },
    { name: "렐", imageUrl: "./photos/champions/153.png", roles: ["support", ] },
    { name: "렝가", imageUrl: "./photos/champions/103.png", roles: ["jungle",] },
    { name: "루시안", imageUrl: "./photos/champions/115.png", roles: ["adc",] },
    { name: "룰루", imageUrl: "./photos/champions/95.png", roles: ["support"] },
    { name: "르블랑", imageUrl: "./photos/champions/63.png", roles: ["mid"] },
    { name: "리 신", imageUrl: "./photos/champions/73.png", roles: ["jungle"] },
    { name: "리븐", imageUrl: "./photos/champions/83.png", roles: ["top"] },
    { name: "리산드라", imageUrl: "./photos/champions/113.png", roles: ["mid"] },
    { name: "릴리아", imageUrl: "./photos/champions/149.png", roles: ["jungle"] },
    { name: "마스터 이", imageUrl: "./photos/champions/3.png", roles: ["jungle"] },
    { name: "마오카이", imageUrl: "./photos/champions/70.png", roles: ["support",] },
    { name: "말자하", imageUrl: "./photos/champions/52.png", roles: ["mid"] },
    { name: "말파이트", imageUrl: "./photos/champions/32.png", roles: ["top",] },
    { name: "멜", imageUrl: "./photos/champions/170.png", roles: ["mid"] }, 
    { name: "모데카이저", imageUrl: "./photos/champions/46.png", roles: ["top",] },
    { name: "모르가나", imageUrl: "./photos/champions/4.png", roles: ["support",] },
    { name: "문도 박사", imageUrl: "./photos/champions/33.png", roles: ["top",] },
    { name: "미스 포츈", imageUrl: "./photos/champions/59.png", roles: ["adc"] },
    { name: "밀리오", imageUrl: "./photos/champions/163.png", roles: ["support"] },
    { name: "바드", imageUrl: "./photos/champions/124.png", roles: ["support"] },
    { name: "바루스", imageUrl: "./photos/champions/97.png", roles: ["adc",] },
    { name: "바이", imageUrl: "./photos/champions/109.png", roles: ["jungle"] },
    { name: "베이가", imageUrl: "./photos/champions/28.png", roles: ["mid"] },
    { name: "베인", imageUrl: "./photos/champions/76.png", roles: ["adc",] },
    { name: "벡스", imageUrl: "./photos/champions/157.png", roles: ["mid"] },
    { name: "벨베스", imageUrl: "./photos/champions/160.png", roles: ["jungle"] },
    { name: "벨코즈", imageUrl: "./photos/champions/118.png", roles: ["support"] },
    { name: "볼리베어", imageUrl: "./photos/champions/88.png", roles: ["top", "jungle"] },
    { name: "브라움", imageUrl: "./photos/champions/119.png", roles: ["support"] },
    { name: "브라이어", imageUrl: "./photos/champions/165.png", roles: ["jungle"] },
    { name: "브랜드", imageUrl: "./photos/champions/74.png", roles: ["support"] },
    { name: "블라디미르", imageUrl: "./photos/champions/56.png", roles: ["mid", "top"] },
    { name: "블리츠크랭크", imageUrl: "./photos/champions/34.png", roles: ["support"] },
    { name: "비에고", imageUrl: "./photos/champions/154.png", roles: ["jungle"] },
    { name: "빅토르", imageUrl: "./photos/champions/90.png", roles: ["mid"] },
    { name: "뽀삐", imageUrl: "./photos/champions/43.png", roles: ["support"]},
    { name: "사미라", imageUrl: "./photos/champions/151.png", roles: ["adc"] },
    { name: "사이온", imageUrl: "./photos/champions/5.png", roles: ["top"] },
    { name: "사일러스", imageUrl: "./photos/champions/143.png", roles: ["mid"] },
    { name: "샤코", imageUrl: "./photos/champions/39.png", roles: ["jungle", "support"] },
    { name: "세나", imageUrl: "./photos/champions/146.png", roles: ["support", "adc"] },
    { name: "세라핀", imageUrl: "./photos/champions/152.png", roles: ["support"] },
    { name: "세주아니", imageUrl: "./photos/champions/91.png", roles: ["jungle"] },
    { name: "세트", imageUrl: "./photos/champions/148.png", roles: ["top"] },
    { name: "소나", imageUrl: "./photos/champions/60.png", roles: ["support"] },
    { name: "소라카", imageUrl: "./photos/champions/6.png", roles: ["support"] },
    { name: "쉔", imageUrl: "./photos/champions/48.png", roles: ["top"] },
    { name: "쉬바나", imageUrl: "./photos/champions/86.png", roles: ["jungle"] },
    { name: "스몰더", imageUrl: "./photos/champions/167.png", roles: ["adc"] },
    { name: "스웨인", imageUrl: "./photos/champions/61.png", roles: ["support"] },
    { name: "스카너", imageUrl: "./photos/champions/81.png", roles: ["jungle"] },
    { name: "시비르", imageUrl: "./photos/champions/7.png", roles: ["adc"] },
    { name: "신 짜오", imageUrl: "./photos/champions/55.png", roles: ["jungle"] },
    { name: "신드라", imageUrl: "./photos/champions/104.png", roles: ["mid"] },
    { name: "신지드", imageUrl: "./photos/champions/18.png", roles: ["top"] },
    { name: "쓰레쉬", imageUrl: "./photos/champions/110.png", roles: ["support"] },
    { name: "아리", imageUrl: "./photos/champions/89.png", roles: ["mid"] },
    { name: "아무무", imageUrl: "./photos/champions/24.png", roles: ["jungle"] },
    { name: "아우렐리온 솔", imageUrl: "./photos/champions/130.png", roles: ["mid"] },
    { name: "아이번", imageUrl: "./photos/champions/133.png", roles: ["jungle"] },
    { name: "아지르", imageUrl: "./photos/champions/121.png", roles: ["mid"] },
    { name: "아칼리", imageUrl: "./photos/champions/51.png", roles: ["mid"] },
    { name: "아크샨", imageUrl: "./photos/champions/156.png", roles: ["mid"] },
    { name: "아트록스", imageUrl: "./photos/champions/114.png", roles: ["top"] },
    { name: "아펠리오스", imageUrl: "./photos/champions/147.png", roles: ["adc"] },
    { name: "알리스타", imageUrl: "./photos/champions/8.png", roles: ["support"] },
    { name: "암베사", imageUrl: "./photos/champions/169.png", roles: ["jungle"] }, // 예시
    { name: "애니", imageUrl: "./photos/champions/9.png", roles: ["mid"] },
    { name: "애니비아", imageUrl: "./photos/champions/27.png", roles: ["mid"] },
    { name: "애쉬", imageUrl: "./photos/champions/10.png", roles: ["adc"] },
    { name: "야스오", imageUrl: "./photos/champions/117.png", roles: ["mid", "top"] },
    { name: "에코", imageUrl: "./photos/champions/125.png", roles: ["jungle", "mid"] },
    { name: "엘리스", imageUrl: "./photos/champions/106.png", roles: ["jungle"] },
    { name: "오공", imageUrl: "./photos/champions/80.png", roles: ["jungle"] },
    { name: "오로라", imageUrl: "./photos/champions/168.png", roles: ["mid"] }, // 예시
    { name: "오른", imageUrl: "./photos/champions/138.png", roles: ["top"] },
    { name: "오리아나", imageUrl: "./photos/champions/77.png", roles: ["mid"] },
    { name: "올라프", imageUrl: "./photos/champions/53.png", roles: ["top"] },
    { name: "요네", imageUrl: "./photos/champions/150.png", roles: ["mid", "top"] },
    { name: "요릭", imageUrl: "./photos/champions/78.png", roles: ["top"] },
    { name: "우디르", imageUrl: "./photos/champions/41.png", roles: ["jungle", "top"] },
    { name: "우르곳", imageUrl: "./photos/champions/58.png", roles: ["top"] },
    { name: "워윅", imageUrl: "./photos/champions/11.png", roles: ["jungle"] },
    { name: "유미", imageUrl: "./photos/champions/144.png", roles: ["support"] },
    { name: "이렐리아", imageUrl: "./photos/champions/64.png", roles: ["top", "mid"] },
    { name: "이블린", imageUrl: "./photos/champions/20.png", roles: ["jungle"] },
    { name: "이즈리얼", imageUrl: "./photos/champions/47.png", roles: ["adc"] },
    { name: "일라오이", imageUrl: "./photos/champions/128.png", roles: ["top"] },
    { name: "자르반 4세", imageUrl: "./photos/champions/71.png", roles: ["jungle"] },
    { name: "자야", imageUrl: "./photos/champions/135.png", roles: ["adc"] },
    { name: "자이라", imageUrl: "./photos/champions/101.png", roles: ["support"] },
    { name: "자크", imageUrl: "./photos/champions/112.png", roles: ["jungle"] },
    { name: "잔나", imageUrl: "./photos/champions/35.png", roles: ["support"] },
    { name: "잭스", imageUrl: "./photos/champions/12.png", roles: ["top"] },
    { name: "제드", imageUrl: "./photos/champions/107.png", roles: ["mid"] },
    { name: "제라스", imageUrl: "./photos/champions/84.png", roles: ["mid", "support"] },
    { name: "제리", imageUrl: "./photos/champions/158.png", roles: ["adc"] },
    { name: "제이스", imageUrl: "./photos/champions/100.png", roles: ["top"] },
    { name: "조이", imageUrl: "./photos/champions/139.png", roles: ["mid"] },
    { name: "직스", imageUrl: "./photos/champions/92.png", roles: ["adc"] },
    { name: "진", imageUrl: "./photos/champions/129.png", roles: ["adc"] },
    { name: "질리언", imageUrl: "./photos/champions/19.png", roles: ["support"] },
    { name: "징크스", imageUrl: "./photos/champions/116.png", roles: ["adc"] },
    { name: "초가스", imageUrl: "./photos/champions/25.png", roles: ["top"] },
    { name: "카르마", imageUrl: "./photos/champions/69.png", roles: ["support"] },
    { name: "카밀", imageUrl: "./photos/champions/134.png", roles: ["top"] },
    { name: "카사딘", imageUrl: "./photos/champions/29.png", roles: ["mid"] },
    { name: "카서스", imageUrl: "./photos/champions/23.png", roles: ["jungle"] },
    { name: "카시오페아", imageUrl: "./photos/champions/66.png", roles: ["mid"] },
    { name: "카이사", imageUrl: "./photos/champions/140.png", roles: ["adc"] },
    { name: "카직스", imageUrl: "./photos/champions/105.png", roles: ["jungle"] },
    { name: "카타리나", imageUrl: "./photos/champions/36.png", roles: ["mid"] },
    { name: "칼리스타", imageUrl: "./photos/champions/122.png", roles: ["adc"] },
    { name: "케넨", imageUrl: "./photos/champions/49.png", roles: ["top"] },
    { name: "케이틀린", imageUrl: "./photos/champions/67.png", roles: ["adc"] },
    { name: "케인", imageUrl: "./photos/champions/137.png", roles: ["jungle"] },
    { name: "케일", imageUrl: "./photos/champions/13.png", roles: ["top"] },
    { name: "코그모", imageUrl: "./photos/champions/54.png", roles: ["adc"] },
    { name: "코르키", imageUrl: "./photos/champions/37.png", roles: ["adc"] },
    { name: "퀸", imageUrl: "./photos/champions/111.png", roles: ["top"] },
    { name: "크산테", imageUrl: "./photos/champions/162.png", roles: ["top"] },
    { name: "키아나", imageUrl: "./photos/champions/145.png", roles: ["mid"] },
    { name: "킨드레드", imageUrl: "./photos/champions/127.png", roles: ["jungle"] },
    { name: "타릭", imageUrl: "./photos/champions/31.png", roles: ["support"] },
    { name: "탈론", imageUrl: "./photos/champions/82.png", roles: ["mid"] },
    { name: "탈리야", imageUrl: "./photos/champions/131.png", roles: ["mid"] },
    { name: "탐 켄치", imageUrl: "./photos/champions/126.png", roles: ["support"] },
    { name: "트런들", imageUrl: "./photos/champions/65.png", roles: ["top", "jungle"] },
    { name: "트리스타나", imageUrl: "./photos/champions/14.png", roles: ["adc"] },
    { name: "트린다미어", imageUrl: "./photos/champions/21.png", roles: ["top"] },
    { name: "트위스티드 페이트", imageUrl: "./photos/champions/15.png", roles: ["mid"] },
    { name: "트위치", imageUrl: "./photos/champions/22.png", roles: ["adc"] },
    { name: "티모", imageUrl: "./photos/champions/16.png", roles: ["top"] },
    { name: "파이크", imageUrl: "./photos/champions/141.png", roles: ["support"] },
    { name: "판테온", imageUrl: "./photos/champions/45.png", roles: ["top", "jungle","support"] },
    { name: "피들스틱", imageUrl: "./photos/champions/17.png", roles: ["jungle"] },
    { name: "피오라", imageUrl: "./photos/champions/94.png", roles: ["top"] },
    { name: "피즈", imageUrl: "./photos/champions/87.png", roles: ["mid"] },
    { name: "하이머딩거", imageUrl: "./photos/champions/40.png", roles: ["top"] },
    { name: "헤카림", imageUrl: "./photos/champions/96.png", roles: ["jungle"] },
    { name: "흐웨이", imageUrl: "./photos/champions/166.png", roles: ["mid"] },
];

let currentSelectedRole = 'all'; // 현재 선택된 역할 필터 ('all'은 모든 라인 챔피언 표시)

function renderChampions(filteredChampions) {

    filteredChampions.forEach(champion => {
        const li = document.createElement('li');
        li.classList.add('champ-item');

        const img = document.createElement('img');
        img.classList.add('champImage');
        img.src = champion.imageUrl;
        img.alt = champion.name;

        const nameSpan = document.createElement('span');
        nameSpan.classList.add('champName');
        nameSpan.textContent = champion.name;

        li.appendChild(img);
        li.appendChild(nameSpan);

        champList.appendChild(li);
    });
}

/**
 * 역할 필터링 함수
 * @param {string} role - 선택된 역할 (예: 'top', 'jungle', 'mid', 'adc', 'support', 'all')
 * @param {HTMLElement} clickedElement - 클릭된 <li> 요소
 */
function selectedRole(role, clickedElement) {
    // 모든 역할 버튼에서 'selected' 클래스 제거
    const roleButtons = document.querySelectorAll('.role-list li');
    roleButtons.forEach(button => {
        button.classList.remove('selected');
    });

    // 만약 현재 선택된 역할과 클릭된 역할이 같다면, 필터를 'all'로 토글하고 selected 클래스 제거
    if (currentSelectedRole === role) {
        currentSelectedRole = 'all'; // 필터 해제
        // clickedElement에는 selected 클래스를 다시 추가하지 않음 (제거된 상태 유지)
    } else {
        // 다르다면, 클릭된 역할로 설정하고 selected 클래스 추가
        currentSelectedRole = role;
        if (clickedElement) {
            clickedElement.classList.add('selected');
        }
    }
}
/**
 * 초성 필터링 함수
 * @param {string} choseong - 선택된 초성 (예: 'ㄱ', 'ㄴ', 'all')
 * @param {HTMLElement} clickedElement - 클릭된 <li> 요소
 */
function selectedChoseong(choseong, clickedElement) {
    // 모든 초성 버튼에서 'selected' 클래스 제거
    const choseongButtons = document.querySelectorAll('.ganada li');
    choseongButtons.forEach(button => {
        button.classList.remove('selected');
    });

    // 클릭된 초성 버튼에 'selected' 클래스 추가
    if (clickedElement) {
        clickedElement.classList.add('selected');
    }

    currentSelectedChoseong = choseong; // 선택된 초성 업데이트
    filterAndRenderChampions(); // 필터링 후 렌더링
}

// 필터링 로직을 수행하고 챔피언을 렌더링하는 통합 함수
function filterAndRenderChampions() {
    let filtered = allChampions;

    // 1. 역할 필터 적용
    if (currentSelectedRole !== 'all') {
        filtered = filtered.filter(champion => champion.roles.includes(currentSelectedRole));
    }

    // 2. 초성 필터 적용 (역할로 필터링된 결과에 다시 초성 필터 적용)
    if (currentSelectedChoseong !== 'all') {
        filtered = filtered.filter(champion => getChoseong(champion.name.charAt(0)) === currentSelectedChoseong);
    }

    renderChampions(filtered);
}
// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    // 1. 초기 역할 선택 버튼에 'selected' 클래스 추가 로직을 제거하거나 변경합니다.
    // 현재는 이 코드가 '탑' 버튼을 기본으로 선택합니다.
    // const initialRoleButton = document.querySelector('.role-list li[onclick*="\'top\'"]');
    // if (initialRoleButton) {
    //     initialRoleButton.classList.add('selected');
    //     currentSelectedRole = 'top'; // 초기 역할 설정
    // } else {
    //     // 기본 선택된 역할이 없으면 'all'로 설정 (예: 탑 버튼이 없거나 다른 기본 동작을 원할 경우)
    //     currentSelectedRole = 'all';
    // }

    // --- 수정된 부분 시작 ---
    // 페이지 로드 시 아무 라인도 선택되지 않은 상태로 시작하려면,
    // currentSelectedRole의 초기값을 'all'로 유지하고,
    // 어떤 역할 버튼에도 'selected' 클래스를 추가하지 않도록 합니다.
    currentSelectedRole = 'all'; // 모든 라인 챔피언을 표시하도록 초기 설정
    // --- 수정된 부분 끝 ---


    // 2. 초기 초성 선택 버튼에 'selected' 클래스 추가 ('ALL'을 기본으로)
    const initialChoseongButton = document.querySelector('.ganada li[onclick*="\'all\'"]');
    if (initialChoseongButton) {
        initialChoseongButton.classList.add('selected');
        currentSelectedChoseong = 'all'; // 초기 초성 설정
    }

    // 3. 필터링된 챔피언 목록 초기 렌더링
    filterAndRenderChampions();
});