// /js/champion-scripts.js

// 모든 챔피언 데이터를 배열로 정의합니다.
// 여기에 각 챔피언의 'roles' 정보를 추가해야 합니다!
const allChampions = [
    // 예시: 챔피언 이름과 이미지 URL, 그리고 담당 'roles' 배열을 추가합니다.
    // 한 챔피언이 여러 역할을 할 수 있다면 roles 배열에 모두 넣어주세요.
    // **챔피언 설명(description) 속성을 추가했습니다.**
    { name: "가렌", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/50.png", roles: ["top"], description: "데마시아의 힘, 가렌입니다." },
    { name: "갈리오", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/57.png", roles: ["mid", "support"], description: "듀란드의 거상, 갈리오입니다." },
    { name: "갱플랭크", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/30.png", roles: ["top"], description: "염통 없는 바다뱀, 갱플랭크입니다." },
    { name: "그라가스", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/44.png", roles: ["jungle", "top"], description: "술통 파괴자, 그라가스입니다." },
    { name: "그레이브즈", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/85.png", roles: ["jungle"], description: "무법자, 그레이브즈입니다." },
    { name: "그웬", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/155.png", roles: ["top"], description: "가위의 정령, 그웬입니다." },
    { name: "나르", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/120.png", roles: ["top"], description: "잃어버린 고리, 나르입니다." },
    { name: "나미", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/108.png", roles: ["support"], description: "파도 소환사, 나미입니다." },
    { name: "나서스", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/38.png", roles: ["top"], description: "사막의 관리자, 나서스입니다." },
    { name: "나피리", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/164.png", roles: ["mid", "jungle"], description: "수많은 이의 단검, 나피리입니다." },
    { name: "노틸러스", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/93.png", roles: ["support"], description: "심해의 타이탄, 노틸러스입니다." },
    { name: "녹턴", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/72.png", roles: ["jungle"], description: "영원한 악몽, 녹턴입니다." },
    { name: "누누와 윌럼프", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/1.png", roles: ["jungle"], description: "소년과 설인, 누누와 윌럼프입니다." },
    { name: "니달리", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/42.png", roles: ["jungle"], description: "야성의 사냥꾼, 니달리입니다." },
    { name: "니코", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/142.png", roles: ["mid", "support"], description: "말썽쟁이 카멜레온, 니코입니다." },
    { name: "닐라", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/161.png", roles: ["adc"], description: "환희의 단편, 닐라입니다." },
    { name: "다리우스", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/98.png", roles: ["top"], description: "녹서스의 실력자, 다리우스입니다." },
    { name: "다이애나", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/102.png", roles: ["mid", "jungle"], description: "초승달의 전사, 다이애나입니다." },
    { name: "드레이븐", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/99.png", roles: ["adc"], description: "기교의 처형자, 드레이븐입니다." },
    { name: "라이즈", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/2.png", roles: ["mid"], description: "룬 마법사, 라이즈입니다." },
    { name: "라칸", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/136.png", roles: ["support"], description: "매혹하는 자, 라칸입니다." },
    { name: "람머스", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/26.png", roles: ["jungle"], description: "갑옷 두른 고슴도치, 람머스입니다." },
    { name: "럭스", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/62.png", roles: ["mid", "support"], description: "광명의 소녀, 럭스입니다." },
    { name: "럼블", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/75.png", roles: ["top"], description: "기계화 악동, 럼블입니다." },
    { name: "레나타 글라스크", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/159.png", roles: ["support"], description: "화공 남작 부인, 레나타 글라스크입니다." },
    { name: "레넥톤", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/68.png", roles: ["top"], description: "사막의 도살자, 레넥톤입니다." },
    { name: "레오나", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/79.png", roles: ["support"], description: "여명의 빛, 레오나입니다." },
    { name: "렉사이", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/123.png", roles: ["jungle"], description: "공허의 여왕, 렉사이입니다." },
    { name: "렐", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/153.png", roles: ["support"], description: "강철의 그림자, 렐입니다." },
    { name: "렝가", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/103.png", roles: ["jungle"], description: "추적하는 사자, 렝가입니다." },
    { name: "루시안", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/115.png", roles: ["adc"], description: "정화의 사도, 루시안입니다." },
    { name: "룰루", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/95.png", roles: ["support"], description: "요정 마법사, 룰루입니다." },
    { name: "르블랑", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/63.png", roles: ["mid"], description: "환술사, 르블랑입니다." },
    { name: "리 신", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/73.png", roles: ["jungle"], description: "눈먼 수도승, 리 신입니다." },
    { name: "리븐", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/83.png", roles: ["top"], description: "추방자, 리븐입니다." },
    { name: "리산드라", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/113.png", roles: ["mid"], description: "얼음 마녀, 리산드라입니다." },
    { name: "릴리아", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/149.png", roles: ["jungle"], description: "수줍은 꽃, 릴리아입니다." },
    { name: "마스터 이", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/3.png", roles: ["jungle"], description: "우주류 검사, 마스터 이입니다." },
    { name: "마오카이", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/70.png", roles: ["support"], description: "뒤틀린 나무 정령, 마오카이입니다." },
    { name: "말자하", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/52.png", roles: ["mid"], description: "공허의 선지자, 말자하입니다." },
    { name: "말파이트", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/32.png", roles: ["top"], description: "거석의 파편, 말파이트입니다." },
    { name: "멜", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/170.png", roles: ["mid"], description: "필트오버의 대사, 멜입니다." },
    { name: "모데카이저", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/46.png", roles: ["top"], description: "철갑 거인, 모데카이저입니다." },
    { name: "모르가나", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/4.png", roles: ["support"], description: "타락한 천사, 모르가나입니다." },
    { name: "문도 박사", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/33.png", roles: ["top"], description: "자운의 광인, 문도 박사입니다." },
    { name: "미스 포츈", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/59.png", roles: ["adc"], description: "현상금 사냥꾼, 미스 포츈입니다." },
    { name: "밀리오", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/163.png", roles: ["support"], description: "온기의 불꽃, 밀리오입니다." },
    { name: "바드", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/124.png", roles: ["support"], description: "영겁의 수호자, 바드입니다." },
    { name: "바루스", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/97.png", roles: ["adc"], description: "복수의 화살, 바루스입니다." },
    { name: "바이", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/109.png", roles: ["jungle"], description: "필트오버의 집행자, 바이입니다." },
    { name: "베이가", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/28.png", roles: ["mid"], description: "사악한 작은 마법사, 베이가입니다." },
    { name: "베인", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/76.png", roles: ["adc"], description: "어둠 사냥꾼, 베인입니다." },
    { name: "벡스", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/157.png", roles: ["mid"], description: "우울한 요들, 벡스입니다." },
    { name: "벨베스", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/160.png", roles: ["jungle"], description: "공허 여제, 벨베스입니다." },
    { name: "벨코즈", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/118.png", roles: ["support"], description: "공허의 눈, 벨코즈입니다." },
    { name: "볼리베어", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/88.png", roles: ["top", "jungle"], description: "천둥의 포효, 볼리베어입니다." },
    { name: "브라움", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/119.png", roles: ["support"], description: "프렐요드의 심장, 브라움입니다." },
    { name: "브라이어", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/165.png", roles: ["jungle"], description: "속박에서 벗어난 식욕, 브라이어입니다." },
    { name: "브랜드", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/74.png", roles: ["support"], description: "복수의 화염, 브랜드입니다." },
    { name: "블라디미르", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/56.png", roles: ["mid", "top"], description: "진홍빛 사신, 블라디미르입니다." },
    { name: "블리츠크랭크", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/34.png", roles: ["support"], description: "증기 자동장치, 블리츠크랭크입니다." },
    { name: "비에고", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/154.png", roles: ["jungle"], description: "몰락한 왕, 비에고입니다." },
    { name: "빅토르", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/90.png", roles: ["mid"], description: "기계화의 전령관, 빅토르입니다." },
    { name: "뽀삐", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/43.png", roles: ["support"], description: "망치의 수호자, 뽀삐입니다." },
    { name: "사미라", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/151.png", roles: ["adc"], description: "사막의 장미, 사미라입니다." },
    { name: "사이온", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/5.png", roles: ["top"], description: "언데드 거인, 사이온입니다." },
    { name: "사일러스", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/143.png", roles: ["mid"], description: "속박을 끊는 자, 사일러스입니다." },
    { name: "샤코", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/39.png", roles: ["jungle", "support"], description: "악마 어릿광대, 샤코입니다." },
    { name: "세나", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/146.png", roles: ["support", "adc"], description: "구원자, 세나입니다." },
    { name: "세라핀", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/152.png", roles: ["support"], description: "별의 공연, 세라핀입니다." },
    { name: "세주아니", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/91.png", roles: ["jungle"], description: "혹한의 분노, 세주아니입니다." },
    { name: "세트", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/148.png", roles: ["top"], description: "아이오니아의 우두머리, 세트입니다." },
    { name: "소나", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/60.png", roles: ["support"], description: "현의 명인, 소나입니다." },
    { name: "소라카", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/6.png", roles: ["support"], description: "별의 아이, 소라카입니다." },
    { name: "쉔", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/48.png", roles: ["top"], description: "황혼의 눈, 쉔입니다." },
    { name: "쉬바나", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/86.png", roles: ["jungle"], description: "하프 드래곤, 쉬바나입니다." },
    { name: "스몰더", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/167.png", roles: ["adc"], description: "불꽃의 사육사, 스몰더입니다." },
    { name: "스웨인", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/61.png", roles: ["support"], description: "녹서스의 대장군, 스웨인입니다." },
    { name: "스카너", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/81.png", roles: ["jungle"], description: "수정 선봉장, 스카너입니다." },
    { name: "시비르", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/7.png", roles: ["adc"], description: "전장의 여제, 시비르입니다." },
    { name: "신 짜오", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/55.png", roles: ["jungle"], description: "데마시아의 군사, 신 짜오입니다." },
    { name: "신드라", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/104.png", roles: ["mid"], description: "어둠의 여제, 신드라입니다." },
    { name: "신지드", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/18.png", roles: ["top"], description: "광기의 화학자, 신지드입니다." },
    { name: "쓰레쉬", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/110.png", roles: ["support"], description: "지옥의 간수, 쓰레쉬입니다." },
    { name: "아리", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/89.png", roles: ["mid"], description: "구미호, 아리입니다." },
    { name: "아무무", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/24.png", roles: ["jungle"], description: "슬픈 미라, 아무무입니다." },
    { name: "아우렐리온 솔", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/130.png", roles: ["mid"], description: "별의 창조자, 아우렐리온 솔입니다." },
    { name: "아이번", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/133.png", roles: ["jungle"], description: "숲의 아버지, 아이번입니다." },
    { name: "아지르", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/121.png", roles: ["mid"], description: "사막의 황제, 아지르입니다." },
    { name: "아칼리", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/51.png", roles: ["mid"], description: "그림자 암살자, 아칼리입니다." },
    { name: "아크샨", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/156.png", roles: ["mid"], description: "악당을 쫓는 심판자, 아크샨입니다." },
    { name: "아트록스", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/114.png", roles: ["top"], description: "다르킨의 검, 아트록스입니다." },
    { name: "아펠리오스", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/147.png", roles: ["adc"], description: "신념의 무기, 아펠리오스입니다." },
    { name: "알리스타", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/8.png", roles: ["support"], description: "미노타우로스, 알리스타입니다." },
    { name: "암베사", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/169.png", roles: ["jungle"], description: "룬테라의 수호자, 암베사입니다." },
    { name: "애니", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/9.png", roles: ["mid"], description: "어둠의 아이, 애니입니다." },
    { name: "애니비아", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/27.png", roles: ["mid"], description: "얼음 불사조, 애니비아입니다." },
    { name: "애쉬", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/10.png", roles: ["adc"], description: "얼음 궁수, 애쉬입니다." },
    { name: "야스오", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/117.png", roles: ["mid", "top"], description: "용서받지 못한 자, 야스오입니다." },
    { name: "에코", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/125.png", roles: ["jungle", "mid"], description: "시간을 되돌리는 소년, 에코입니다." },
    { name: "엘리스", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/106.png", roles: ["jungle"], description: "거미 여왕, 엘리스입니다." },
    { name: "오공", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/80.png", roles: ["jungle"], description: "원숭이 왕, 오공입니다." },
    { name: "오로라", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/168.png", roles: ["mid"], description: "신비한 여우, 오로라입니다." },
    { name: "오른", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/138.png", roles: ["top"], description: "산불의 대장장이, 오른입니다." },
    { name: "오리아나", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/77.png", roles: ["mid"], description: "시계태엽 소녀, 오리아나입니다." },
    { name: "올라프", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/53.png", roles: ["top"], description: "광전사, 올라프입니다." },
    { name: "요네", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/150.png", roles: ["mid", "top"], description: "영혼을 찢는 자, 요네입니다." },
    { name: "요릭", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/78.png", roles: ["top"], description: "영혼의 방랑자, 요릭입니다." },
    { name: "우디르", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/41.png", roles: ["jungle", "top"], description: "정령 주술사, 우디르입니다." },
    { name: "우르곳", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/58.png", roles: ["top"], description: "불굴의 살인자, 우르곳입니다." },
    { name: "워윅", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/11.png", roles: ["jungle"], description: "자운의 늑대, 워윅입니다." },
    { name: "유미", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/144.png", roles: ["support"], description: "마법 고양이, 유미입니다." },
    { name: "이렐리아", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/64.png", roles: ["top", "mid"], description: "칼날 무희, 이렐리아입니다." },
    { name: "이블린", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/20.png", roles: ["jungle"], description: "고통스런 포옹, 이블린입니다." },
    { name: "이즈리얼", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/47.png", roles: ["adc"], description: "방랑 탐험가, 이즈리얼입니다." },
    { name: "일라오이", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/128.png", roles: ["top"], description: "크라켄의 여사제, 일라오이입니다." },
    { name: "자르반 4세", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/71.png", roles: ["jungle"], description: "데마시아의 모범, 자르반 4세입니다." },
    { name: "자야", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/135.png", roles: ["adc"], description: "저항의 칼날, 자야입니다." },
    { name: "자이라", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/101.png", roles: ["support"], description: "가시 덩굴의 복수, 자이라입니다." },
    { name: "자크", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/112.png", roles: ["jungle"], description: "자운의 무기, 자크입니다." },
    { name: "잔나", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/35.png", roles: ["support"], description: "폭풍의 눈, 잔나입니다." },
    { name: "잭스", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/12.png", roles: ["top"], description: "무기의 달인, 잭스입니다." },
    { name: "제드", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/107.png", roles: ["mid"], description: "그림자의 주인, 제드입니다." },
    { name: "제라스", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/84.png", roles: ["mid", "support"], description: "초월한 마법사, 제라스입니다." },
    { name: "제리", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/158.png", roles: ["adc"], description: "자운의 불꽃, 제리입니다." },
    { name: "제이스", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/100.png", roles: ["top"], description: "미래의 수호자, 제이스입니다." },
    { name: "조이", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/139.png", roles: ["mid"], description: "황혼의 별똥별, 조이입니다." },
    { name: "직스", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/92.png", roles: ["adc"], description: "마법 폭탄 전문가, 직스입니다." },
    { name: "진", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/129.png", roles: ["adc"], description: "잔혹극의 거장, 진입니다." },
    { name: "질리언", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/19.png", roles: ["support"], description: "시간의 수호자, 질리언입니다." },
    { name: "징크스", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/116.png", roles: ["adc"], description: "말썽쟁이 총잡이, 징크스입니다." },
    { name: "초가스", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/25.png", roles: ["top"], description: "공허의 공포, 초가스입니다." },
    { name: "카르마", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/69.png", roles: ["support"], description: "영혼의 꽃, 카르마입니다." },
    { name: "카밀", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/134.png", roles: ["top"], description: "강철 그림자, 카밀입니다." },
    { name: "카사딘", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/29.png", roles: ["mid"], description: "공허의 방랑자, 카사딘입니다." },
    { name: "카서스", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/23.png", roles: ["jungle"], description: "죽음의 노래, 카서스입니다." },
    { name: "카시오페아", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/66.png", roles: ["mid"], description: "독사의 포옹, 카시오페아입니다." },
    { name: "카이사", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/140.png", roles: ["adc"], description: "공허의 딸, 카이사입니다." },
    { name: "카직스", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/105.png", roles: ["jungle"], description: "공허의 약탈자, 카직스입니다." },
    { name: "카타리나", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/36.png", roles: ["mid"], description: "사악한 칼날, 카타리나입니다." },
    { name: "칼리스타", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/122.png", roles: ["adc"], description: "복수의 화신, 칼리스타입니다." },
    { name: "케넨", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/49.png", roles: ["top"], description: "폭풍의 심장, 케넨입니다." },
    { name: "케이틀린", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/67.png", roles: ["adc"], description: "필트오버의 보안관, 케이틀린입니다." },
    { name: "케인", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/137.png", roles: ["jungle"], description: "그림자 암살자, 케인입니다." },
    { name: "케일", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/13.png", roles: ["top"], description: "정의의 날개, 케일입니다." },
    { name: "코그모", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/54.png", roles: ["adc"], description: "심연의 아귀, 코그모입니다." },
    { name: "코르키", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/37.png", roles: ["adc"], description: "대담한 폭격수, 코르키입니다." },
    { name: "퀸", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/111.png", roles: ["top"], description: "데마시아의 날개, 퀸입니다." },
    { name: "크산테", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/162.png", roles: ["top"], description: "나주마의 자부심, 크산테입니다." },
    { name: "키아나", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/145.png", roles: ["mid"], description: "원소의 여왕, 키아나입니다." },
    { name: "킨드레드", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/127.png", roles: ["jungle"], description: "영원한 사냥꾼, 킨드레드입니다." },
    { name: "타릭", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/31.png", roles: ["support"], description: "발로란의 방패, 타릭입니다." },
    { name: "탈론", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/82.png", roles: ["mid"], description: "검의 그림자, 탈론입니다." },
    { name: "탈리야", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/131.png", roles: ["mid"], description: "바위술사, 탈리야입니다." },
    { name: "탐 켄치", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/126.png", roles: ["support"], description: "강의 폭군, 탐 켄치입니다." },
    { name: "트런들", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/65.png", roles: ["top", "jungle"], description: "트롤 왕, 트런들입니다." },
    { name: "트리스타나", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/14.png", roles: ["adc"], description: "요들 특공대원, 트리스타나입니다." },
    { name: "트린다미어", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/21.png", roles: ["top"], description: "야만전사 왕, 트린다미어입니다." },
    { name: "트위스티드 페이트", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/15.png", roles: ["mid"], description: "카드 점술사, 트위스티드 페이트입니다." },
    { name: "트위치", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/22.png", roles: ["adc"], description: "역병 쥐, 트위치입니다." },
    { name: "티모", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/16.png", roles: ["top"], description: "날쌘 정찰병, 티모입니다." },
    { name: "파이크", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/141.png", roles: ["support"], description: "피의 항해자, 파이크입니다." },
    { name: "판테온", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/45.png", roles: ["top", "jungle", "support"], description: "부서지지 않는 창, 판테온입니다." },
    { name: "피들스틱", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/17.png", roles: ["jungle"], description: "고대 공포, 피들스틱입니다." },
    { name: "피오라", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/94.png", roles: ["top"], description: "결투의 대가, 피오라입니다." },
    { name: "피즈", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/87.png", roles: ["mid"], description: "파도 소환사, 피즈입니다." },
    { name: "하이머딩거", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/40.png", roles: ["top"], description: "존경받는 발명가, 하이머딩거입니다." },
    { name: "헤카림", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/96.png", roles: ["jungle"], description: "전쟁의 전조, 헤카림입니다." },
    { name: "흐웨이", imageUrl: "https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/166.png", roles: ["mid"], description: "비극의 화가, 흐웨이입니다." },
];

// 한글 초성 추출 함수
function getChoseong(name) {
    const f = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
    const ga = 44032; // '가'의 유니코드
    const uni = name.charCodeAt(0);
    // 한글 범위 내에 있고, 첫 글자가 초성으로 변환 가능한 경우에만 처리
    if (uni >= ga && uni <= 55203) { // 힣의 유니코드
        const choseongIndex = Math.floor((uni - ga) / 588);
        return f[choseongIndex];
    }
    return ''; // 한글이 아니거나 변환 불가능한 경우 빈 문자열 반환
}

let currentSelectedChoseong = 'all'; // 현재 선택된 초성 필터
let currentSelectedRole = 'all'; // 현재 선택된 역할 필터 ('all'은 모든 라인 챔피언 표시)

function renderChampions(filteredChampions) {
    const champList = document.getElementById('champList');
    champList.innerHTML = ''; // 기존 목록을 초기화합니다.

    if (filteredChampions.length === 0) {
        const noChampLi = document.createElement('li');
        noChampLi.textContent = "해당하는 챔피언이 없습니다.";
        noChampLi.style.textAlign = 'center';
        noChampLi.style.color = '#777';
        noChampLi.style.padding = '20px';
        champList.appendChild(noChampLi);
        return;
    }

    filteredChampions.forEach(champion => {
        const li = document.createElement('li');
        li.classList.add('champ-item');

        // 상세 페이지로 이동할 <a> 태그를 생성합니다.
        // URL 파라미터로 챔피언 이름, 이미지 URL, 설명을 전달합니다.
        const link = document.createElement('a');
        link.href = `champion2.html?champion=${encodeURIComponent(champion.name)}&image=${encodeURIComponent(champion.imageUrl)}&description=${encodeURIComponent(champion.description)}`;

        const img = document.createElement('img');
        img.classList.add('champImage');
        img.src = champion.imageUrl;
        img.alt = champion.name;

        const nameSpan = document.createElement('span');
        nameSpan.classList.add('champName');
        nameSpan.textContent = champion.name;

        link.appendChild(img);
        link.appendChild(nameSpan);
        li.appendChild(link); // <a> 태그를 <li>에 추가합니다.

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

    filterAndRenderChampions(); // 필터링 후 렌더링
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
    // 페이지 로드 시 아무 라인도 선택되지 않은 상태로 시작하도록 currentSelectedRole을 'all'로 설정
    currentSelectedRole = 'all';

    // 초기 초성 선택 버튼에 'selected' 클래스 추가 ('ALL'을 기본으로)
    const initialChoseongButton = document.querySelector('.ganada li[onclick*="\'all\'"]');
    if (initialChoseongButton) {
        initialChoseongButton.classList.add('selected');
        currentSelectedChoseong = 'all'; // 초기 초성 설정
    }

    // 필터링된 챔피언 목록 초기 렌더링
    filterAndRenderChampions();
});
