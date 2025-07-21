// /js/champion2-scripts.js

// 모든 챔피언 데이터를 배열로 정의합니다.
// 여기에 각 챔피언의 'roles' 정보를 추가해야 합니다!
const allChampions = [
    // 예시: 챔피언 이름과 이미지 URL, 담당 'roles' 배열, 그리고 'description'을 추가합니다.
    // 한 챔피언이 여러 역할을 할 수 있다면 roles 배열에 모두 넣어주세요.
    { name: "가렌", imageUrl: "./photos/champions/50.png", roles: ["top"], description: "데마시아의 힘! 끈질긴 탱커형 챔피언입니다." },
    { name: "갈리오", imageUrl: "./photos/champions/57.png", roles: ["mid", "support"], description: "데마시아의 거상, 마법 저항에 특화된 수호자입니다." },
    { name: "갱플랭크", imageUrl: "./photos/champions/30.png", roles: ["top"], description: "불한당 선장, 화약통으로 전장을 지배합니다." },
    { name: "그라가스", imageUrl: "./photos/champions/44.png", roles: ["jungle", "top"], description: "술통을 굴리며 싸우는 주정뱅이 거인입니다." },
    { name: "그레이브즈", imageUrl: "./photos/champions/85.png", roles: ["jungle"], description: "쌍총을 든 무법자, 근접 AD 캐리입니다." },
    { name: "그웬", imageUrl: "./photos/champions/155.png", roles: ["top"], description: "신성한 재봉사, 영혼을 꿰매는 망가진 인형입니다." },
    { name: "나르", imageUrl: "./photos/champions/120.png", roles: ["top"], description: "잃어버린 고리, 작고 귀여운 요들 야수입니다." },
    { name: "나미", imageUrl: "./photos/champions/108.png", roles: ["support"], description: "파도 소환사, 물의 힘으로 아군을 돕습니다." },
    { name: "나서스", imageUrl: "./photos/champions/38.png", roles: ["top"], description: "사막의 관리자, 영원히 스택을 쌓는 전사입니다." },
    { name: "나피리", imageUrl: "./photos/champions/164.png", roles: ["mid", "jungle"], description: "천의 칼날, 무리 지어 사냥하는 다르킨입니다." },
    { name: "노틸러스", imageUrl: "./photos/champions/93.png", roles: ["support"], description: "심해의 타이탄, 거대한 닻을 휘두르는 탱커입니다." },
    { name: "녹턴", imageUrl: "./photos/champions/72.png", roles: ["jungle"], description: "영원한 악몽, 그림자 속에서 적을 기습합니다." },
    { name: "누누와 윌럼프", imageUrl: "./photos/champions/1.png", roles: ["jungle"], description: "소년과 설인, 따뜻한 마음을 가진 정글러입니다." },
    { name: "니달리", imageUrl: "./photos/champions/42.png", roles: ["jungle"], description: "야성의 사냥꾼, 창과 덫으로 적을 유린합니다." },
    { name: "니코", imageUrl: "./photos/champions/142.png", roles: ["mid", "support"], description: "변신하는 말괄량이, 상상력으로 적을 속입니다." },
    { name: "닐라", imageUrl: "./photos/champions/161.png", roles: ["adc"], description: "환희의 정수, 적의 공격을 회피하는 근접 AD 캐리입니다." },
    { name: "다리우스", imageUrl: "./photos/champions/98.png", roles: ["top"], description: "녹서스의 실력자, 피의 분노로 적을 학살합니다." },
    { name: "다이애나", imageUrl: "./photos/champions/102.png", roles: ["mid", "jungle"], description: "차가운 달의 분노, 돌진하여 적을 처치합니다." },
    { name: "드레이븐", imageUrl: "./photos/champions/99.png", roles: ["adc"], description: "화려한 처형자, 회전 도끼로 적을 압도합니다." },
    { name: "라이즈", imageUrl: "./photos/champions/2.png", roles: ["mid"], description: "룬 마법사, 강력한 주문으로 전장을 휩씁니다." },
    { name: "라칸", imageUrl: "./photos/champions/136.png", roles: ["support"], description: "매혹적인 연인, 아군을 보호하고 적을 유혹합니다." },
    { name: "람머스", imageUrl: "./photos/champions/26.png", roles: ["jungle"], description: "가시 박힌 고슴도치, 방어력으로 적을 압도합니다." },
    { name: "럭스", imageUrl: "./photos/champions/62.png", roles: ["mid", "support"], description: "광명의 소녀, 마법 구슬로 적을 속박합니다." },
    { name: "럼블", imageUrl: "./photos/champions/75.png", roles: ["top"], description: "기계화 악동, 화염방사기로 적을 불태웁니다." },
    { name: "레나타 글라스크", imageUrl: "./photos/champions/159.png", roles: ["support"], description: "화학 공학 여백작, 연기 폭탄으로 아군을 강화합니다." },
    { name: "레넥톤", imageUrl: "./photos/champions/68.png", roles: ["top"], description: "사막의 도살자, 분노의 힘으로 적을 제압합니다." },
    { name: "레오나", imageUrl: "./photos/champions/79.png", roles: ["support"], description: "여명의 방패, 강력한 군중 제어기로 아군을 보호합니다." },
    { name: "렉사이", imageUrl: "./photos/champions/123.png", roles: ["jungle"], description: "공허의 여왕, 땅굴로 전장을 오가는 맹수입니다." },
    { name: "렐", imageUrl: "./photos/champions/153.png", roles: ["support"], description: "기병대원, 말 위에서 강력한 방어력을 선보입니다." },
    { name: "렝가", imageUrl: "./photos/champions/103.png", roles: ["jungle"], description: "사냥의 추적자, 부쉬를 이용해 적을 기습합니다." },
    { name: "루시안", imageUrl: "./photos/champions/115.png", roles: ["adc"], description: "정화의 사도, 쌍권총으로 그림자를 몰아냅니다." },
    { name: "룰루", imageUrl: "./photos/champions/95.png", roles: ["support"], description: "요정 마법사, 아군을 강화하고 적을 방해합니다." },
    { name: "르블랑", imageUrl: "./photos/champions/63.png", roles: ["mid"], description: "환술사, 현란한 기술로 적을 혼란에 빠뜨립니다." },
    { name: "리 신", imageUrl: "./photos/champions/73.png", roles: ["jungle"], description: "눈먼 수도승, 빠르고 민첩한 움직임으로 적을 압도합니다." },
    { name: "리븐", imageUrl: "./photos/champions/83.png", roles: ["top"], description: "추방자, 검술의 달인으로 적을 베어버립니다." },
    { name: "리산드라", imageUrl: "./photos/champions/113.png", roles: ["mid"], description: "얼음 마녀, 얼음 마법으로 적을 속박합니다." },
    { name: "릴리아", imageUrl: "./photos/champions/149.png", roles: ["jungle"], description: "수줍은 꽃, 꿈의 마법으로 적을 잠재웁니다." },
    { name: "마스터 이", imageUrl: "./photos/champions/3.png", roles: ["jungle"], description: "우주류 검사, 광속 공격으로 적을 순삭합니다." },
    { name: "마오카이", imageUrl: "./photos/champions/70.png", roles: ["support"], description: "뒤틀린 나무 정령, 자연의 힘으로 적을 속박합니다." },
    { name: "말자하", imageUrl: "./photos/champions/52.png", roles: ["mid"], description: "공허의 선지자, 공허 생물을 소환하여 적을 괴롭힙니다." },
    { name: "말파이트", imageUrl: "./photos/champions/32.png", roles: ["top"], description: "파편의 파편, 거대한 몸으로 적을 찍어누릅니다." },
    { name: "멜", imageUrl: "./photos/champions/170.png", roles: ["mid"], description: "강력한 마법으로 적을 섬멸하는 챔피언입니다." }, 
    { name: "모데카이저", imageUrl: "./photos/champions/46.png", roles: ["top"], description: "철갑 거인, 죽음의 세계로 적을 끌고 갑니다." },
    { name: "모르가나", imageUrl: "./photos/champions/4.png", roles: ["support"], description: "타락한 천사, 어둠의 속박으로 적을 묶어둡니다." },
    { name: "문도 박사", imageUrl: "./photos/champions/33.png", roles: ["top"], description: "자운의 광인, 고통을 즐기는 탱커입니다." },
    { name: "미스 포츈", imageUrl: "./photos/champions/59.png", roles: ["adc"], description: "현상금 사냥꾼, 총알 세례로 적을 쓸어버립니다." },
    { name: "밀리오", imageUrl: "./photos/champions/163.png", roles: ["support"], description: "다정다감한 불꽃, 아군을 치유하고 강화합니다." },
    { name: "바드", imageUrl: "./photos/champions/124.png", roles: ["support"], description: "방랑하는 관리자, 신비한 종을 모으는 서포터입니다." },
    { name: "바루스", imageUrl: "./photos/champions/97.png", roles: ["adc"], description: "응징의 화살, 저주받은 활로 적을 관통합니다." },
    { name: "바이", imageUrl: "./photos/champions/109.png", roles: ["jungle"], description: "필트오버의 집행자, 거대한 건틀릿으로 적을 강타합니다." },
    { name: "베이가", imageUrl: "./photos/champions/28.png", roles: ["mid"], description: "악의의 작은 요들, 무한한 마력을 쌓아갑니다." },
    { name: "베인", imageUrl: "./photos/champions/76.png", roles: ["adc"], description: "어둠 사냥꾼, 은화살로 적을 처단합니다." },
    { name: "벡스", imageUrl: "./photos/champions/157.png", roles: ["mid"], description: "우울한 요들, 어둠의 그림자를 조종합니다." },
    { name: "벨베스", imageUrl: "./photos/champions/160.png", roles: ["jungle"], description: "공허의 여제, 군림하는 공허의 생명체입니다." },
    { name: "벨코즈", imageUrl: "./photos/champions/118.png", roles: ["support"], description: "공허의 눈, 분석 광선으로 적을 분해합니다." },
    { name: "볼리베어", imageUrl: "./photos/champions/88.png", roles: ["top", "jungle"], description: "천둥의 포효, 거대한 몸집으로 적을 덮칩니다." },
    { name: "브라움", imageUrl: "./photos/champions/119.png", roles: ["support"], description: "프렐요드의 심장, 방패로 아군을 보호합니다." },
    { name: "브라이어", imageUrl: "./photos/champions/165.png", roles: ["jungle"], description: "억제된 갈증, 피에 굶주린 광란의 흡혈귀입니다." },
    { name: "브랜드", imageUrl: "./photos/champions/74.png", roles: ["support"], description: "타오르는 복수, 화염으로 적을 불태웁니다." },
    { name: "블라디미르", imageUrl: "./photos/champions/56.png", roles: ["mid", "top"], description: "진홍빛 사신, 피를 이용하여 적을 제압합니다." },
    { name: "블리츠크랭크", imageUrl: "./photos/champions/34.png", roles: ["support"], description: "증기 골렘, 로켓 손으로 적을 끌어옵니다." },
    { name: "비에고", imageUrl: "./photos/champions/154.png", roles: ["jungle"], description: "몰락한 왕, 빼앗은 영혼으로 적을 지배합니다." },
    { name: "빅토르", imageUrl: "./photos/champions/90.png", roles: ["mid"], description: "기계화의 전령, 진화하는 마법사입니다." },
    { name: "뽀삐", imageUrl: "./photos/champions/43.png", roles: ["support"], description: "망치의 수호자, 강력한 망치로 적을 날려버립니다." },
    { name: "사미라", imageUrl: "./photos/champions/151.png", roles: ["adc"], description: "사막의 장미, 화려한 콤보로 적을 압도합니다." },
    { name: "사이온", imageUrl: "./photos/champions/5.png", roles: ["top"], description: "언데드 거인, 죽어서도 싸우는 불굴의 전사입니다." },
    { name: "사일러스", imageUrl: "./photos/champions/143.png", roles: ["mid"], description: "사슬의 해방자, 적의 궁극기를 훔쳐 사용합니다." },
    { name: "샤코", imageUrl: "./photos/champions/39.png", roles: ["jungle", "support"], description: "악마 어릿광대, 기만적인 그림자 전술로 적을 괴롭힙니다." },
    { name: "세나", imageUrl: "./photos/champions/146.png", roles: ["support", "adc"], description: "구원하는 빛, 그림자를 이용해 아군을 보호합니다." },
    { name: "세라핀", imageUrl: "./photos/champions/152.png", roles: ["support"], description: "별의 노래, 아름다운 음악으로 아군을 치유합니다." },
    { name: "세주아니", imageUrl: "./photos/champions/91.png", roles: ["jungle"], description: "프렐요드의 분노, 얼음 멧돼지를 타고 전장을 누빕니다." },
    { name: "세트", imageUrl: "./photos/champions/148.png", roles: ["top"], description: "두목, 맨손 격투의 달인으로 적을 제압합니다." },
    { name: "소나", imageUrl: "./photos/champions/60.png", roles: ["support"], description: "현의 명인, 음악으로 아군을 돕습니다." },
    { name: "소라카", imageUrl: "./photos/champions/6.png", roles: ["support"], description: "별의 아이, 아군을 치유하는 자비로운 서포터입니다." },
    { name: "쉔", imageUrl: "./photos/champions/48.png", roles: ["top"], description: "황혼의 눈, 아군을 보호하는 그림자 닌자입니다." },
    { name: "쉬바나", imageUrl: "./photos/champions/86.png", roles: ["jungle"], description: "하프 드래곤, 용으로 변신하여 적을 불태웁니다." },
    { name: "스몰더", imageUrl: "./photos/champions/167.png", roles: ["adc"], description: "불타는 새끼용, 화염을 뿜어 적을 압도합니다." },
    { name: "스웨인", imageUrl: "./photos/champions/61.png", roles: ["support"], description: "녹서스의 대장군, 악마의 힘으로 적을 제압합니다." },
    { name: "스카너", imageUrl: "./photos/champions/81.png", roles: ["jungle"], description: "수정 선봉장, 수정 독침으로 적을 꿰뚫습니다." },
    { name: "시비르", imageUrl: "./photos/champions/7.png", roles: ["adc"], description: "전장의 여왕, 부메랑으로 적을 공격합니다." },
    { name: "신 짜오", imageUrl: "./photos/champions/55.png", roles: ["jungle"], description: "데마시아의 군사, 삼중 공격으로 적을 제압합니다." },
    { name: "신드라", imageUrl: "./photos/champions/104.png", roles: ["mid"], description: "어둠의 여제, 마법 구슬로 적을 학살합니다." },
    { name: "신지드", imageUrl: "./photos/champions/18.png", roles: ["top"], description: "독성 연금술사, 독성 가스로 적을 괴롭힙니다." },
    { name: "쓰레쉬", imageUrl: "./photos/champions/110.png", roles: ["support"], description: "지옥의 간수, 사슬로 적을 끌어오고 영혼을 수확합니다." },
    { name: "아리", imageUrl: "./photos/champions/89.png", roles: ["mid"], description: "구미호, 매혹적인 주문으로 적을 유혹합니다." },
    { name: "아무무", imageUrl: "./photos/champions/24.png", roles: ["jungle"], description: "슬픈 미라, 붕대로 적을 속박하고 눈물을 흘립니다." },
    { name: "아우렐리온 솔", imageUrl: "./photos/champions/130.png", roles: ["mid"], description: "별의 창조자, 별들을 조종하여 우주적 파괴를 일으킵니다." },
    { name: "아이번", imageUrl: "./photos/champions/133.png", roles: ["jungle"], description: "숲의 친구, 숲의 생명들을 소환하여 아군을 돕습니다." },
    { name: "아지르", imageUrl: "./photos/champions/121.png", roles: ["mid"], description: "사막의 황제, 모래 병사를 소환하여 전장을 지휘합니다." },
    { name: "아칼리", imageUrl: "./photos/champions/51.png", roles: ["mid"], description: "방랑하는 암살자, 그림자 속에서 적을 처치합니다." },
    { name: "아크샨", imageUrl: "./photos/champions/156.png", roles: ["mid"], description: "경계의 감시자, 갈고리로 전장을 휘젓고 동료를 부활시킵니다." },
    { name: "아트록스", imageUrl: "./photos/champions/114.png", roles: ["top"], description: "다르킨 검, 거대한 검을 휘두르며 적을 흡혈합니다." },
    { name: "아펠리오스", imageUrl: "./photos/champions/147.png", roles: ["adc"], description: "신념의 무기, 5가지 무기를 사용하여 다양한 공격을 펼칩니다." },
    { name: "알리스타", imageUrl: "./photos/champions/8.png", roles: ["support"], description: "미노타우로스, 강력한 뿔로 적을 들이받고 아군을 보호합니다." },
    { name: "암베사", imageUrl: "./photos/champions/169.png", roles: ["jungle"], description: "암베사 부족의 야성적인 전사, 정글을 지배합니다." }, // 예시 설명 추가
    { name: "애니", imageUrl: "./photos/champions/9.png", roles: ["mid"], description: "어둠의 아이, 불꽃을 다루는 어린 마법사입니다." },
    { name: "애니비아", imageUrl: "./photos/champions/27.png", roles: ["mid"], description: "얼음 불사조, 얼음 폭풍으로 적을 얼려버립니다." },
    { name: "애쉬", imageUrl: "./photos/champions/10.png", roles: ["adc"], description: "서리 궁수, 얼음 화살로 적을 둔화시킵니다." },
    { name: "야스오", imageUrl: "./photos/champions/117.png", roles: ["mid", "top"], description: "용서받지 못한 자, 바람을 다루는 검사입니다." },
    { name: "에코", imageUrl: "./photos/champions/125.png", roles: ["jungle", "mid"], description: "시간을 가르는 소년, 시간을 되돌려 적을 속입니다." },
    { name: "엘리스", imageUrl: "./photos/champions/106.png", roles: ["jungle"], description: "거미 여왕, 인간과 거미 형태로 변신합니다." },
    { name: "오공", imageUrl: "./photos/champions/80.png", roles: ["jungle"], description: "원숭이 왕, 분신술과 회전격으로 적을 혼란에 빠뜨립니다." },
    { name: "오로라", imageUrl: "./photos/champions/168.png", roles: ["mid"], description: "신비로운 오로라의 힘으로 적을 제압합니다." }, // 예시 설명 추가
    { name: "오른", imageUrl: "./photos/champions/138.png", roles: ["top"], description: "화산의 신, 장비를 업그레이드하고 불꽃으로 공격합니다." },
    { name: "오리아나", imageUrl: "./photos/champions/77.png", roles: ["mid"], description: "시계태엽 소녀, 구슬을 조종하여 전장을 지배합니다." },
    { name: "올라프", imageUrl: "./photos/champions/53.png", roles: ["top"], description: "광전사, 도끼를 휘두르며 적에게 돌진합니다." },
    { name: "요네", imageUrl: "./photos/champions/150.png", roles: ["mid", "top"], description: "영혼의 속박자, 두 개의 검을 사용하는 전사입니다." },
    { name: "요릭", imageUrl: "./photos/champions/78.png", roles: ["top"], description: "영혼의 길잡이, 망령과 안개 마녀를 소환합니다." },
    { name: "우디르", imageUrl: "./photos/champions/41.png", roles: ["jungle", "top"], description: "정령 주술사, 네 가지 정령 형태로 변신합니다." },
    { name: "우르곳", imageUrl: "./photos/champions/58.png", roles: ["top"], description: "집행자, 거대한 기계 다리로 적을 분쇄합니다." },
    { name: "워윅", imageUrl: "./photos/champions/11.png", roles: ["jungle"], description: "자운의 고삐 풀린 분노, 피 냄새를 맡고 적에게 돌진합니다." },
    { name: "유미", imageUrl: "./photos/champions/144.png", roles: ["support"], description: "마법 고양이, 아군에게 붙어 지원합니다." },
    { name: "이렐리아", imageUrl: "./photos/champions/64.png", roles: ["top", "mid"], description: "칼날 무용수, 칼날을 휘두르며 적에게 돌진합니다." },
    { name: "이블린", imageUrl: "./photos/champions/20.png", roles: ["jungle"], description: "고통스런 포옹, 그림자 속에서 적을 기습합니다." },
    { name: "이즈리얼", imageUrl: "./photos/champions/47.png", roles: ["adc"], description: "무모한 탐험가, 마법 화살로 적을 공격합니다." },
    { name: "일라오이", imageUrl: "./photos/champions/128.png", roles: ["top"], description: "크라켄의 여사제, 촉수를 소환하여 적을 제압합니다." },
    { name: "자르반 4세", imageUrl: "./photos/champions/71.png", roles: ["jungle"], description: "데마시아의 본보기, 창과 깃발로 전장을 지휘합니다." },
    { name: "자야", imageUrl: "./photos/champions/135.png", roles: ["adc"], description: "저항의 칼날, 날카로운 깃털로 적을 꿰뚫습니다." },
    { name: "자이라", imageUrl: "./photos/champions/101.png", roles: ["support"], description: "가시 덩굴의 복수, 식물들을 소환하여 적을 괴롭힙니다." },
    { name: "자크", imageUrl: "./photos/champions/112.png", roles: ["jungle"], description: "비밀 병기, 몸을 늘려 적에게 돌진합니다." },
    { name: "잔나", imageUrl: "./photos/champions/35.png", roles: ["support"], description: "폭풍의 눈, 바람을 조종하여 아군을 보호합니다." },
    { name: "잭스", imageUrl: "./photos/champions/12.png", roles: ["top"], description: "무기의 달인, 모든 무기를 능숙하게 다룹니다." },
    { name: "제드", imageUrl: "./photos/champions/107.png", roles: ["mid"], description: "그림자의 주인, 그림자 분신으로 적을 속입니다." },
    { name: "제라스", imageUrl: "./photos/champions/84.png", roles: ["mid", "support"], description: "승천한 마법사, 강력한 원거리 마법 공격을 합니다." },
    { name: "제리", imageUrl: "./photos/champions/158.png", roles: ["adc"], description: "자운의 불꽃, 전기를 다루는 빠른 원거리 딜러입니다." },
    { name: "제이스", imageUrl: "./photos/champions/100.png", roles: ["top"], description: "진보의 수호자, 해머와 캐논을 오가며 싸웁니다." },
    { name: "조이", imageUrl: "./photos/champions/139.png", roles: ["mid"], description: "황혼의 장난꾸러기, 별빛 마법으로 적을 괴롭힙니다." },
    { name: "직스", imageUrl: "./photos/champions/92.png", roles: ["adc"], description: "마법 폭탄 전문가, 폭탄으로 건물을 파괴합니다." },
    { name: "진", imageUrl: "./photos/champions/129.png", roles: ["adc"], description: "잔혹극의 거장, 네 발의 총알로 완벽한 죽음을 선사합니다." },
    { name: "질리언", imageUrl: "./photos/champions/19.png", roles: ["support"], description: "시간의 수호자, 시간을 조종하여 아군을 돕습니다." },
    { name: "징크스", imageUrl: "./photos/champions/116.png", roles: ["adc"], description: "난폭한 말괄량이, 다양한 무기로 난장판을 만듭니다." },
    { name: "초가스", imageUrl: "./photos/champions/25.png", roles: ["top"], description: "공허의 공포, 적을 잡아먹고 몸집을 키웁니다." },
    { name: "카르마", imageUrl: "./photos/champions/69.png", roles: ["support"], description: "계몽의 영혼, 정신의 힘으로 아군을 강화합니다." },
    { name: "카밀", imageUrl: "./photos/champions/134.png", roles: ["top"], description: "강철 그림자, 갈고리로 벽을 타고 다니는 암살자입니다." },
    { name: "카사딘", imageUrl: "./photos/champions/29.png", roles: ["mid"], description: "공허의 방랑자, 마법 피해를 흡수하고 적을 추격합니다." },
    { name: "카서스", imageUrl: "./photos/champions/23.png", roles: ["jungle"], description: "죽음의 노래, 죽음의 주문으로 전장을 휩쓸고 영혼을 거둡니다." },
    { name: "카시오페아", imageUrl: "./photos/champions/66.png", roles: ["mid"], description: "독사의 포옹, 독으로 적을 고통스럽게 만듭니다." },
    { name: "카이사", imageUrl: "./photos/champions/140.png", roles: ["adc"], description: "공허의 딸, 공허의 능력을 이용하여 적을 공격합니다." },
    { name: "카직스", imageUrl: "./photos/champions/105.png", roles: ["jungle"], description: "공허의 약탈자, 고립된 적을 사냥합니다." },
    { name: "카타리나", imageUrl: "./photos/champions/36.png", roles: ["mid"], description: "사악한 칼날, 단검을 던지며 전장을 휩쓸고 적을 처치합니다." },
    { name: "칼리스타", imageUrl: "./photos/champions/122.png", roles: ["adc"], description: "복수의 화신, 계약을 맺은 아군과 함께 적을 처단합니다." },
    { name: "케넨", imageUrl: "./photos/champions/49.png", roles: ["top"], description: "폭풍의 심장, 번개를 다루는 닌자입니다." },
    { name: "케이틀린", imageUrl: "./photos/champions/67.png", roles: ["adc"], description: "필트오버의 보안관, 장거리 저격으로 적을 제압합니다." },
    { name: "케인", imageUrl: "./photos/champions/137.png", roles: ["jungle"], description: "그림자 암살자, 다르킨 낫을 다루는 자입니다." },
    { name: "케일", imageUrl: "./photos/champions/13.png", roles: ["top"], description: "정의의 날개, 성장하면서 강력한 화염 공격을 합니다." },
    { name: "코그모", imageUrl: "./photos/champions/54.png", roles: ["adc"], description: "공허의 입, 산성 침을 뱉어 적을 녹입니다." },
    { name: "코르키", imageUrl: "./photos/champions/37.png", roles: ["adc"], description: "대담한 폭격수, 비행기를 타고 폭탄을 투하합니다." },
    { name: "퀸", imageUrl: "./photos/champions/111.png", roles: ["top"], description: "데마시아의 날개, 발러와 함께 적을 추격합니다." },
    { name: "크산테", imageUrl: "./photos/champions/162.png", roles: ["top"], description: "나주마의 자부심, 거대한 무기로 적을 막아냅니다." },
    { name: "키아나", imageUrl: "./photos/champions/145.png", roles: ["mid"], description: "원소의 여왕, 자연의 원소를 다루어 적을 제압합니다." },
    { name: "킨드레드", imageUrl: "./photos/champions/127.png", roles: ["jungle"], description: "영원한 사냥꾼, 양과 늑대가 함께 사냥합니다." },
    { name: "타릭", imageUrl: "./photos/champions/31.png", roles: ["support"], description: "발로란의 방패, 아군을 치유하고 보호합니다." },
    { name: "탈론", imageUrl: "./photos/champions/82.png", roles: ["mid"], description: "검의 그림자, 벽을 넘어 적을 암살합니다." },
    { name: "탈리야", imageUrl: "./photos/champions/131.png", roles: ["mid"], description: "바위술사, 대지를 조종하여 적을 공격합니다." },
    { name: "탐 켄치", imageUrl: "./photos/champions/126.png", roles: ["support"], description: "강의 폭군, 아군을 삼키거나 적을 집어삼킵니다." },
    { name: "트런들", imageUrl: "./photos/champions/65.png", roles: ["top", "jungle"], description: "트롤 왕, 얼음 기둥을 세우고 적의 힘을 빼앗습니다." },
    { name: "트리스타나", imageUrl: "./photos/champions/14.png", roles: ["adc"], description: "요들 사수, 대포로 적을 날려버립니다." },
    { name: "트린다미어", imageUrl: "./photos/champions/21.png", roles: ["top"], description: "야만전사 왕, 죽지 않는 불사신 검객입니다." },
    { name: "트위스티드 페이트", imageUrl: "./photos/champions/15.png", roles: ["mid"], description: "카드 점술사, 운명의 카드를 던져 적을 혼란에 빠뜨립니다." },
    { name: "트위치", imageUrl: "./photos/champions/22.png", roles: ["adc"], description: "역병 쥐, 은신하여 적을 기습하고 독을 뿌립니다." },
    { name: "티모", imageUrl: "./photos/champions/16.png", roles: ["top"], description: "날쌘 정찰병, 독침과 버섯으로 적을 괴롭힙니다." },
    { name: "파이크", imageUrl: "./photos/champions/141.png", roles: ["support"], description: "피의 항해자, 그림자 속에서 적을 처형합니다." },
    { name: "판테온", imageUrl: "./photos/champions/45.png", roles: ["top", "jungle","support"], description: "불굴의 창, 강력한 방패와 창으로 적을 제압합니다." },
    { name: "피들스틱", imageUrl: "./photos/champions/17.png", roles: ["jungle"], description: "고대 공포, 공포를 심어 적을 공격합니다." },
    { name: "피오라", imageUrl: "./photos/champions/94.png", roles: ["top"], description: "결투의 대가, 약점을 찔러 적을 처치합니다." },
    { name: "피즈", imageUrl: "./photos/champions/87.png", roles: ["mid"], description: "말썽쟁이, 삼지창을 들고 전장을 누빕니다." },
    { name: "하이머딩거", imageUrl: "./photos/champions/40.png", roles: ["top"], description: "미친 과학자, 포탑을 설치하여 전장을 장악합니다." },
    { name: "헤카림", imageUrl: "./photos/champions/96.png", roles: ["jungle"], description: "전장의 공포, 그림자 기병으로 적을 짓밟습니다." },
    { name: "흐웨이", imageUrl: "./photos/champions/166.png", roles: ["mid"], description: "색채의 주인, 예술적인 그림으로 적을 현혹합니다." },
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

        // 챔피언 상세 페이지로 이동하는 링크 추가
        li.onclick = () => {
            // URL 파라미터로 챔피언 이름, 이미지 URL, 설명을 인코딩하여 전달
            const championNameEncoded = encodeURIComponent(champion.name);
            const championImageEncoded = encodeURIComponent(champion.imageUrl);
            const championDescriptionEncoded = encodeURIComponent(champion.description || `${champion.name} 챔피언에 대한 간략한 정보입니다.`);
            window.location.href = `champion-detail.html?champion=${championNameEncoded}&image=${championImageEncoded}&description=${championDescriptionEncoded}`;
        };

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
    // 페이지 로드 시 아무 라인도 선택되지 않은 상태로 시작하려면,
    // currentSelectedRole의 초기값을 'all'로 유지하고,
    // 어떤 역할 버튼에도 'selected' 클래스를 추가하지 않도록 합니다.
    currentSelectedRole = 'all'; // 모든 라인 챔피언을 표시하도록 초기 설정

    // 2. 초기 초성 선택 버튼에 'selected' 클래스 추가 ('ALL'을 기본으로)
    const initialChoseongButton = document.querySelector('.ganada li[onclick*="\'all\'"]');
    if (initialChoseongButton) {
        initialChoseongButton.classList.add('selected');
        currentSelectedChoseong = 'all'; // 초기 초성 설정
    }

    // 3. 필터링된 챔피언 목록 초기 렌더링
    filterAndRenderChampions();
});