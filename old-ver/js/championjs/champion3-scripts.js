// Helper function to format champion names for URLs
function formatNameForUrl(nameEn) {
    // Remove spaces and replace special characters/formatting if necessary
    return nameEn.replace(/\s+/g, '');
}

// Base URL for images
const BASE_IMAGE_URL = '/photos/champions/';
const BASE_ICON_URL = 'https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/'; 
const BASE_ITEM_URL = 'https://d30q0nmfm6z0r7.cloudfront.net/photos/items/'; 

// 아이템 영문 ID -> 한국어 이름 매핑 (툴팁용)
const ITEM_MAPPING = {
    // 신화/전설급 아이템
    'Goredrinker': '선혈포식자', 'DivineSunderer': '신성한 파괴자', 'LiandrysAnguish': '리안드리의 고통',
    'Galeforce': '돌풍', 'Stridebreaker': '발걸음 분쇄기', 'LudenSorrow': '루덴의 폭풍',
    'Eclipse': '월식', 'UmbralGlaive': '밤의 수확자', 'KrakenSlayer': '크라켄 학살자',
    'Duskblade': '자객의 발톱', 'NightHarvester': '밤의 수확자', 'Everfrost': '영겁의 지팡이',
    'ImmortalShieldbow': '불멸의 철갑궁', 'ShurelyasBattlesong': '슈렐리아의 군가', 'MoonstoneRenewer': '월석 재생기',
    'ImperialMandate': '제국의 명령', 'Rageblade': '구인수의 격노검', 'FrostfireGauntlet': '얼어붙은 건틀릿',
    'TurboChemtank': '터보 화공 탱크', 'ProwlersClaw': '돌풍', 'Rocketbelt': '마법공학 로켓 벨트',
    
    // 기타 아이템
    'Sterak': '스테락의 도전', 'Deathsdance': '죽음의 무도', 'Guardianangel': '수호 천사',
    'BlackCleaver': '칠흑의 양날 도끼', 'SpiritVisage': '정령의 형상', 'Thornmail': '가시 갑옷',
    'MawOfMalmortius': '맬모셔스의 아귀', 'DeadMansPlate': '망자의 갑옷', 'ForceOfNature': '대자연의 힘',
    'Shadowflame': '그림자 불꽃', 'RabadonsDeathcap': '라바돈의 죽음모자', 'VoidStaff': '공허의 지팡이',
    'RapidFirecannon': '고속 연사포', 'TitanicHydra': '거대한 히드라', 'BladeOfTheRuinedKing': '몰락한 왕의 검',
    'EssenceReaver': '정수 약탈자', 'Muramana': '무라마나', 'SeryldasGrudge': '세릴다의 원한',
    'EdgeOfNight': '밤의 끝자락', 'TrinityForce': '삼위일체', 'RavenousHydra': '굶주린 히드라',
    'ZhonyasHourglass': '존야의 모래시계', 'BansheesVeil': '밴시의 장막', 'YoumuusGhostblade': '요오무의 유령검',
    'Collector': '수확의 낫', 'NavoriQuickblades': '나보리 명멸검', 'Bloodthirster': '피바라기',
    'LordDominiksRegards': '도미닉 경의 인사', 'ZekesConvergence': '지크의 융합', 'KnightsVow': '기사의 맹세',
    'Redemption': '구원', 'SunfireAegis': '태양불꽃 방패', 'AbyssalMask': '심연의 가면',
    'HorizonFocus': '밤의 수확자', 'ArchangelsStaff': '대천사의 포옹', 'LichBane': '리치베인',
    'CosmicDrive': '우주 추진력', 'NashorsTooth': '내셔의 이빨', 'PhantomDancer': '유령 무희',
    'RunaansHurricane': '루난의 허리케인', 'RylaisCrystalScepter': '라일라이의 수정홀', 'FrozenHeart': '얼어붙은 심장',
    'GargoyleStoneplate': '가고일 돌갑옷', 'MikaelsBlessing': '미카엘의 축복', 'ArdentCenser': '불타는 향로',
    'Manamune': '마나무네', 'Bork': '몰락한 왕의 검', 'WitsEnd': '마법사의 최후', 'MortalReminder': '필멸자의 운명',
    'Zhonya': '존야의 모래시계',
    
    // 신발
    'PlatedSteelcaps': '판금 장화', 'MercuryTreads': '헤르메스의 발걸음', 'IonianBootsOfLucidity': '명석함의 아이오니아 장화',
    'SorcerersShoes': '마법사의 신발', 'MobilityBoots': '기동력의 장화', 'BerserkersGreaves': '광전사의 군화',
    'BootsOfSwiftness': '신속의 장화',
    
    // 장신구
    '꿰뚫어 보는 망원 와드': '와드 토템', '투명 와드': '예언자의 렌즈', '예언자의 렌즈': '탐지 와드',
    
    // 기타
    'empty': '빈 슬롯',
};

// Mock Data: 챔피언 데이터 (아이템 이름은 한국어로 되어 있습니다.)
const champions = [
    // Tier 1 (총 34개)
    { id: 1, nameKr: '아트록스', nameEn: 'Aatrox', role: 'TOP', roleKr: '다리 파괴자', player: 'TheShy', kda: '7/2/9', imageUrl: BASE_IMAGE_URL + 'Aatrox.png', iconUrl: BASE_ICON_URL + 'Aatrox.png', tier: 1, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'TheShy', kda: '7/2/9', win: true, match: '2025 LPL Summer vs WBG', items: ['선혈포식자', '스테락의 도전', '죽음의 무도', '수호 천사', '맬모셔스의 아귀', '판금 장화'], trinket: '투명 와드'}, {itemsURL: BASE_ITEM_URL, player: 'Kiin', kda: '5/3/8', win: true, match: '2025 LCK Spring vs GEN', items: ['신성한 파괴자', '칠흑의 양날 도끼', '정령의 형상', '가시 갑옷', '스테락의 도전', '헤르메스의 발걸음'], trinket: '꿰뚫어 보는 망원 와드'}] },
    { id: 2, nameKr: '아리', nameEn: 'Ahri', role: 'MID', roleKr: '구미호', player: 'Faker', kda: '5/2/11', imageUrl: BASE_IMAGE_URL + 'Ahri.png', iconUrl: BASE_ICON_URL + 'Ahri.png', tier: 1, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Faker', kda: '5/2/11', win: true, match: '2025 Worlds vs GEN', items: ['루덴의 폭풍', '존야의 모래시계', '라바돈의 죽음모자', '공허의 지팡이', '그림자 불꽃', '마법사의 신발'], trinket: '투명 와드'}] },
    { id: 3, nameKr: '아칼리', nameEn: 'Akali', role: 'MID', roleKr: '고독한 암살자', player: 'Chovy', kda: '10/2/5', imageUrl: BASE_IMAGE_URL + 'Akali.png', iconUrl: BASE_ICON_URL + 'Akali.png', tier: 1, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Chovy', kda: '10/2/5', win: true, match: '2025 LCK Summer vs GEN', items: ['마법공학 로켓 벨트', '존야의 모래시계', '그림자 불꽃', '공허의 지팡이', '라바돈의 죽음모자', '마법사의 신발'], trinket: '예언자의 렌즈'}] },
    { id: 4, nameKr: '아크샨', nameEn: 'Akshan', role: 'ADC', roleKr: '정의의 사도', player: 'Gumayusi', kda: '10/2/6', imageUrl: BASE_IMAGE_URL + 'Akshan.png', iconUrl: BASE_ICON_URL + 'Akshan.png', tier: 1, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Gumayusi', kda: '10/2/6', win: true, match: '2025 LCK Summer vs T1', items: ['크라켄 학살자', '나보리 명멸검', '피바라기', '수호 천사', '무한의 대검', '광전사의 군화'], trinket: '꿰뚫어 보는 망원 와드'}] },
    { id: 5, nameKr: '알리스타', nameEn: 'Alistar', role: 'SUPPORT', roleKr: '미노타우로스', player: 'Life', kda: '1/3/18', imageUrl: BASE_IMAGE_URL + 'Alistar.png', iconUrl: BASE_ICON_URL + 'Alistar.png', tier: 1, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Life', kda: '1/3/18', win: false, match: '2025 LCK Summer vs BRO', items: ['강철의 솔라리 펜던트', '기사의 맹세', '지크의 융합', '구원', '가시 갑옷', '기동력의 장화'], trinket: '꿰뚫어 보는 망원 와드'}] },
    { id: 6, nameKr: '아무무', nameEn: 'Amumu', role: 'JUNGLE', roleKr: '슬픈 미라', player: 'Oner', kda: '1/3/15', imageUrl: BASE_IMAGE_URL + 'Amumu.png', iconUrl: BASE_ICON_URL + 'Amumu.png', tier: 1, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Oner', kda: '1/3/15', win: true, match: '2025 LCK Summer vs DK', items: ['터보 화공 탱크', '가시 갑옷', '심연의 가면', '대자연의 힘', '정령의 형상', '명석함의 아이오니아 장화'], trinket: '투명 와드'}] },
    { id: 7, nameKr: '애니비아', nameEn: 'Anivia', role: 'MID', roleKr: '프렐요드의 불사조', player: 'ShowMaker', kda: '4/4/12', imageUrl: BASE_IMAGE_URL + 'Anivia.png', iconUrl: BASE_ICON_URL + 'Anivia.png', tier: 1, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'ShowMaker', kda: '4/4/12', win: false, match: '2025 LCK Summer vs DK', items: ['리안드리의 고통', '대천사의 포옹', '라일라이의 수정홀', '존야의 모래시계', '공허의 지팡이', '마법사의 신발'], trinket: '꿰뚫어 보는 망원 와드'}] },
    { id: 8, nameKr: '애니', nameEn: 'Annie', role: 'MID', roleKr: '어둠의 아이', player: 'Bdd', kda: '5/2/8', imageUrl: BASE_IMAGE_URL + 'Annie.png', iconUrl: BASE_ICON_URL + 'Annie.png', tier: 1, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Bdd', kda: '5/2/8', win: true, match: '2025 LCK Summer vs KT', items: ['루덴의 폭풍', '존야의 모래시계', '라바돈의 죽음모자', '공허의 지팡이', '그림자 불꽃', '마법사의 신발'], trinket: '예언자의 렌즈'}] },
    { id: 9, nameKr: '아펠리오스', nameEn: 'Aphelios', role: 'ADC', roleKr: '신념의 무기', player: 'Gumayusi', kda: '11/2/7', imageUrl: BASE_IMAGE_URL + 'Aphelios.png', iconUrl: BASE_ICON_URL + 'Aphelios.png', tier: 1, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Gumayusi', kda: '11/2/7', win: true, match: '2025 LCK Summer vs T1', items: ['불멸의 철갑궁', '무한의 대검', '피바라기', '도미닉 경의 인사', '수호 천사', '광전사의 군화'], trinket: '예언자의 렌즈'}] },
    { id: 10, nameKr: '애쉬', nameEn: 'Ashe', role: 'ADC', roleKr: '프렐요드의 궁수', player: 'Deft', kda: '12/1/8', imageUrl: BASE_IMAGE_URL + 'Ashe.png', iconUrl: BASE_ICON_URL + 'Ashe.png', tier: 1, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Deft', kda: '12/1/8', win: true, match: '2025 LCK Summer vs DRX', items: ['제국의 명령', '무라마나', '몰락한 왕의 검', '구원', '세릴다의 원한', '명석함의 아이오니아 장화'], trinket: '꿰뚫어 보는 망원 와드'}] },
    { id: 11, nameKr: '아우렐리온 솔', nameEn: 'AurelionSol', role: 'MID', roleKr: '별의 창조자', player: 'Bdd', kda: '7/1/10', imageUrl: BASE_IMAGE_URL + 'Aurelion Sol.png', iconUrl: BASE_ICON_URL + 'AurelionSol.png', tier: 1, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Bdd', kda: '7/1/10', win: true, match: '2025 LCK Summer vs KT', items: ['영겁의 지팡이', '대천사의 포옹', '라바돈의 죽음모자', '공허의 지팡이', '그림자 불꽃', '마법사의 신발'], trinket: '예언자의 렌즈'}] },
    { id: 12, nameKr: '오로라', nameEn: 'Aurora', role: 'TOP', roleKr: '여명의 파편', player: 'TheShy', kda: '5/1/8', imageUrl: BASE_IMAGE_URL + 'Aurora.png', iconUrl: BASE_ICON_URL + 'Aurora.png', tier: 1, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'TheShy', kda: '5/1/8', win: true, match: '2025 LPL Summer vs WBG', items: ['신성한 파괴자', '삼위일체', '굶주린 히드라', '스테락의 도전', '죽음의 무도', '판금 장화'], trinket: '꿰뚫어 보는 망원 와드'}] },
    { id: 13, nameKr: '아지르', nameEn: 'Azir', role: 'MID', roleKr: '사막의 황제', player: 'Faker', kda: '5/2/11', imageUrl: BASE_IMAGE_URL + 'Azir.png', iconUrl: BASE_ICON_URL + 'Azir.png', tier: 1, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Faker', kda: '5/2/11', win: true, match: '2025 LCK Summer vs HLE', items: ['루덴의 폭풍', '존야의 모래시계', '라바돈의 죽음모자', '내셔의 이빨', '공허의 지팡이', '마법사의 신발'], trinket: '예언자의 렌즈'}] },
    { id: 14, nameKr: '바드', nameEn: 'Bard', role: 'SUPPORT', roleKr: '떠도는 관리자', player: 'Keria', kda: '0/1/22', imageUrl: BASE_IMAGE_URL + 'Bard.png', iconUrl: BASE_ICON_URL + 'Bard.png', tier: 1, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Keria', kda: '0/1/22', win: true, match: '2025 LCK Spring vs T1', items: ['슈렐리아의 군가', '지크의 융합', '구원', '고속 연사포', '미카엘의 축복', '기동력의 장화'], trinket: '투명 와드'}] },
    { id: 15, nameKr: '벨베스', nameEn: 'BelVeth', role: 'JUNGLE', roleKr: '공허의 여제', player: 'Canyon', kda: '10/1/5', imageUrl: BASE_IMAGE_URL + 'BelVeth.png', iconUrl: BASE_ICON_URL + 'BelVeth.png', tier: 1, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Canyon', kda: '10/1/5', win: true, match: '2025 LCK Summer vs GEN', items: ['크라켄 학살자', '마법사의 최후', '몰락한 왕의 검', '수호 천사', '피바라기', '광전사의 군화'], trinket: '예언자의 렌즈'}] },
    { id: 16, nameKr: '벡스', nameEn: 'Vex', role: 'MID', roleKr: '우울한 요들', player: 'ShowMaker', kda: '7/2/10', imageUrl: BASE_IMAGE_URL + 'Vex.png', iconUrl: BASE_ICON_URL + 'Vex.png', tier: 1, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'ShowMaker', kda: '7/2/10', win: true, match: '2025 LCK Summer vs DK', items: ['루덴의 폭풍', '존야의 모래시계', '라바돈의 죽음모자', '공허의 지팡이', '그림자 불꽃', '마법사의 신발'], trinket: '투명 와드'}] },
    { id: 17, nameKr: '블리츠크랭크', nameEn: 'Blitzcrank', role: 'SUPPORT', roleKr: '증기 로봇', player: 'Lehends', kda: '0/2/20', imageUrl: BASE_IMAGE_URL + 'Blitzcrank.png', iconUrl: BASE_ICON_URL + 'Blitzcrank.png', tier: 1, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Lehends', kda: '0/2/20', win: true, match: '2025 LCK Spring vs NS', items: ['강철의 솔라리 펜던트', '지크의 융합', '가시 갑옷', '구원', '기사의 맹세', '기동력의 장화'], trinket: '투명 와드'}] },
    { id: 18, nameKr: '브라움', nameEn: 'Braum', role: 'SUPPORT', roleKr: '프렐요드의 심장', player: 'Effort', kda: '0/4/21', imageUrl: BASE_IMAGE_URL + 'Braum.png', iconUrl: BASE_ICON_URL + 'Braum.png', tier: 1, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Effort', kda: '0/4/21', win: false, match: '2025 LCK Summer vs NS', items: ['강철의 솔라리 펜던트', '기사의 맹세', '지크의 융합', '구원', '가시 갑옷', '기동력의 장화'], trinket: '꿰뚫어 보는 망원 와드'}] },
    { id: 19, nameKr: '브라이어', nameEn: 'Briar', role: 'JUNGLE', roleKr: '해방된 배고픔', player: 'Peanut', kda: '9/2/5', imageUrl: BASE_IMAGE_URL + 'Briar.png', iconUrl: BASE_ICON_URL + 'Briar.png', tier: 1, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Peanut', kda: '9/2/5', win: true, match: '2025 LCK Spring vs HLE', items: ['선혈포식자', '스테락의 도전', '죽음의 무도', '수호 천사', '칠흑의 양날 도끼', '판금 장화'], trinket: '투명 와드'}, {itemsURL: BASE_ITEM_URL, player: 'Clid', kda: '7/1/8', win: true, match: '2025 LCK Summer vs GEN', items: ['신성한 파괴자', '칠흑의 양날 도끼', '정령의 형상', '가시 갑옷', '거대한 히드라', '헤르메스의 발걸음'], trinket: '꿰뚫어 보는 망원 와드'}] },
    { id: 20, nameKr: '브랜드', nameEn: 'Brand', role: 'SUPPORT', roleKr: '복수의 화염', player: 'Effort', kda: '3/4/12', imageUrl: BASE_IMAGE_URL + 'Brand.png', iconUrl: BASE_ICON_URL + 'Brand.png', tier: 1, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Effort', kda: '3/4/12', win: false, match: '2025 LCK Summer vs NS', items: ['리안드리의 고통', '존야의 모래시계', '라일라이의 수정홀', '공허의 지팡이', '밴시의 장막', '마법사의 신발'], trinket: '투명 와드'}] },
    { id: 21, nameKr: '케이틀린', nameEn: 'Caitlyn', role: 'ADC', roleKr: '필트오버 보안관', player: 'Teddy', kda: '6/2/5', imageUrl: BASE_IMAGE_URL + 'Caitlyn.png', iconUrl: BASE_ICON_URL + 'Caitlyn.png', tier: 1, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Teddy', kda: '6/2/5', win: true, match: '2025 LCK Spring vs T1', items: ['돌풍', '고속 연사포', '무한의 대검', '도미닉 경의 인사', '피바라기', '광전사의 군화'], trinket: '예언자의 렌즈'}] },
    { id: 22, nameKr: '카밀', nameEn: 'Camille', role: 'TOP', roleKr: '강철의 그림자', player: 'TheShy', kda: '4/1/7', imageUrl: BASE_IMAGE_URL + 'Camille.png', iconUrl: BASE_ICON_URL + 'Camille.png', tier: 1, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'TheShy', kda: '4/1/7', win: true, match: '2025 LPL Summer vs FPX', items: ['신성한 파괴자', '삼위일체', '굶주린 히드라', '스테락의 도전', '죽음의 무도', '판금 장화'], trinket: '꿰뚫어 보는 망원 와드'}] },
    { id: 23, nameKr: '카시오페아', nameEn: 'Cassiopeia', role: 'MID', roleKr: '뱀의 포옹', player: 'Bdd', kda: '8/1/7', imageUrl: BASE_IMAGE_URL + 'Cassiopeia.png', iconUrl: BASE_ICON_URL + 'Cassiopeia.png', tier: 1, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Bdd', kda: '8/1/7', win: true, match: '2025 LCK Summer vs KT', items: ['리안드리의 고통', '라일라이의 수정홀', '존야의 모래시계', '공허의 지팡이', '라바돈의 죽음모자', '마법사의 신발'], trinket: '예언자의 렌즈'}] },
    { id: 24, nameKr: '초가스', nameEn: 'Chogath', role: 'TOP', roleKr: '공허의 공포', player: 'Rascal', kda: '1/3/8', imageUrl: BASE_IMAGE_URL + 'ChoGath.png', iconUrl: BASE_ICON_URL + 'ChoGath.png', tier: 1, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Rascal', kda: '1/3/8', win: false, match: '2025 LCK Summer vs HLE', items: ['영겁의 지팡이', '강철의 솔라리 펜던트', '가고일 돌갑옷', '정령의 형상', '가시 갑옷', '헤르메스의 발걸음'], trinket: '투명 와드'}] },
    { id: 25, nameKr: '코르키', nameEn: 'Corki', role: 'MID', roleKr: '대담한 폭격수', player: 'Faker', kda: '8/3/6', imageUrl: BASE_IMAGE_URL + 'Corki.png', iconUrl: BASE_ICON_URL + 'Corki.png', tier: 1, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Faker', kda: '8/3/6', win: true, match: '2025 LCK Spring vs T1', items: ['정수 약탈자', '무한의 대검', '도미닉 경의 인사', '피바라기', '수호 천사', '광전사의 군화'], trinket: '예언자의 렌즈'}] },
    { id: 26, nameKr: '다리우스', nameEn: 'Darius', role: 'TOP', roleKr: '녹서스의 실력자', player: 'Kiin', kda: '5/4/5', imageUrl: BASE_IMAGE_URL + 'Darius.png', iconUrl: BASE_ICON_URL + 'Darius.png', tier: 1, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Kiin', kda: '5/4/5', win: true, match: '2025 LCK Summer vs GEN', items: ['발걸음 분쇄기', '스테락의 도전', '망자의 갑옷', '정령의 형상', '칠흑의 양날 도끼', '판금 장화'], trinket: '꿰뚫어 보는 망원 와드'}] },
    { id: 27, nameKr: '다이애나', nameEn: 'Diana', role: 'JUNGLE', roleKr: '달의 분노', player: 'Canyon', kda: '7/2/9', match: '204 LCK Summer vs DK', imageUrl: BASE_IMAGE_URL + 'Diana.png', iconUrl: BASE_ICON_URL + 'Diana.png', tier: 1, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Canyon', kda: '7/2/9', win: true, match: '204 LCK Summer vs GEN', items: ['밤의 수확자', '존야의 모래시계', '라바돈의 죽음모자', '공허의 지팡이', '그림자 불꽃', '마법사의 신발'], trinket: '투명 와드'}] },
    { id: 28, nameKr: '드레이븐', nameEn: 'Draven', role: 'ADC', roleKr: '화려한 처형자', player: 'Ruler', kda: '12/1/7', match: '204 LPL Spring vs TES', imageUrl: BASE_IMAGE_URL + 'Draven.png', iconUrl: BASE_ICON_URL + 'Draven.png', tier: 1, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Ruler', kda: '12/1/7', win: true, match: '2024 LPL Spring vs TES', items: ['크라켄 학살자', '무한의 대검', '피바라기', '도미닉 경의 인사', '고속 연사포', '광전사의 군화'], trinket: '예언자의 렌즈'}] },
    { id: 29, nameKr: '문도 박사', nameEn: 'DrMundo', role: 'TOP', roleKr: '자운의 광인', player: 'Zeus', kda: '1/4/9', imageUrl: BASE_IMAGE_URL + 'DrMundo.png', iconUrl: BASE_ICON_URL + 'Dr.Mundo.png', tier: 1, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Zeus', kda: '1/4/9', win: false, match: '204 LCK Summer vs T1', items: ['터보 화공 탱크', '가시 갑옷', '심연의 가면', '대자연의 힘', '정령의 형상', '판금 장화'], trinket: '투명 와드'}] },
    { id: 30, nameKr: '에코', nameEn: 'Ekko', role: 'JUNGLE', roleKr: '시간을 달리는 소년', player: 'Oner', kda: '8/2/10', match: '204 LCK Summer vs DK', imageUrl: BASE_IMAGE_URL + 'Ekko.png', iconUrl: BASE_ICON_URL + 'Ekko.png', tier: 1, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Oner', kda: '8/2/10', win: true, match: '204 LCK Summer vs DK', items: ['밤의 수확자', '존야의 모래시계', '라바돈의 죽음모자', '공허의 지팡이', '그림자 불꽃', '마법사의 신발'], trinket: '투명 와드'}] },
    { id: 31, nameKr: '엘리스', nameEn: 'Elise', role: 'JUNGLE', roleKr: '거미 여왕', player: 'Peanut', kda: '4/1/10', match: '204 LCK Summer vs BRO', imageUrl: BASE_IMAGE_URL + 'Elise.png', iconUrl: BASE_ICON_URL + 'Elise.png', tier: 1, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Peanut', kda: '4/1/10', win: true, match: '204 LCK Summer vs BRO', items: ['밤의 수확자', '존야의 모래시계', '밴시의 장막', '공허의 지팡이', '라바돈의 죽음모자', '마법사의 신발'], trinket: '투명 와드'}] },
    { id: 32, nameKr: '이블린', nameEn: 'Evelynn', role: 'JUNGLE', roleKr: '고통의 포옹', player: 'Tarzan', kda: '10/2/5', match: '204 LPL Summer vs TES', imageUrl: BASE_IMAGE_URL + 'Evelynn.png', iconUrl: BASE_ICON_URL + 'Evelynn.png', tier: 1, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Tarzan', kda: '10/2/5', win: true, match: '204 LPL Summer vs TES', items: ['밤의 수확자', '존야의 모래시계', '라바돈의 죽음모자', '공허의 지팡이', '그림자 불꽃', '마법사의 신발'], trinket: '투명 와드'}] },
    { id: 33, nameKr: '이즈리얼', nameEn: 'Ezreal', role: 'ADC', roleKr: '마법공학 탐험가', player: 'Ruler', kda: '9/0/5', match: '204 LPL Spring vs TES', imageUrl: BASE_IMAGE_URL + 'Ezreal.png', iconUrl: BASE_ICON_URL + 'Ezreal.png', tier: 1, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Ruler', kda: '9/0/5', win: true, match: '2024 LPL Spring vs TES', items: ['정수 약탈자', '무라마나', '신성한 파괴자', '세릴다의 원한', '피바라기', '명석함의 아이오니아 장화'], trinket: '예언자의 렌즈'}] },
    { id: 34, nameKr: '피들스틱', nameEn: 'Fiddlesticks', role: 'JUNGLE', roleKr: '고대의 공포', player: 'Clid', kda: '3/3/15', match: '204 LCK Spring vs GenG', imageUrl: BASE_IMAGE_URL + 'Fiddlesticks.png', iconUrl: BASE_ICON_URL + 'Fiddlesticks.png', tier: 1, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Clid', kda: '3/3/15', win: true, match: '2024 LCK Spring vs GenG', items: ['리안드리의 고통', '존야의 모래시계', '라일라이의 수정홀', '공허의 지팡이', '밴시의 장막', '마법사의 신발'], trinket: '꿰뚫어 보는 망원 와드'}] },

    // Tier 2 (총 34개)
    { id: 35, nameKr: '피오라', nameEn: 'Fiora', role: 'TOP', roleKr: '결투가', player: 'Zeus', kda: '5/1/5', imageUrl: BASE_IMAGE_URL + 'Fiora.png', iconUrl: BASE_ICON_URL + 'Fiora.png', tier: 2, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Zeus', kda: '5/1/5', win: true, match: '204 LCK Summer vs T1', items: ['신성한 파괴자', '굶주린 히드라', '스테락의 도전', '죽음의 무도', '맬모셔스의 아귀', '판금 장화'], trinket: '꿰뚫어 보는 망원 와드'}] },
    { id: 36, nameKr: '피즈', nameEn: 'Fizz', role: 'MID', roleKr: '파도타기', player: 'Faker', kda: '10/2/5', imageUrl: BASE_IMAGE_URL + 'Fizz.png', iconUrl: BASE_ICON_URL + 'Fizz.png', tier: 2, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Faker', kda: '10/2/5', win: true, match: '204 LCK Summer vs HLE', items: ['밤의 수확자', '리치베인', '존야의 모래시계', '그림자 불꽃', '공허의 지팡이', '마법사의 신발'], trinket: '꿰뚫어 보는 망원 와드'}] },
    { id: 37, nameKr: '갈리오', nameEn: 'Galio', role: 'MID', roleKr: '데마시아의 수호자', player: 'Bdd', kda: '1/3/15', imageUrl: BASE_IMAGE_URL + 'Galio.png', iconUrl: BASE_ICON_URL + 'Galio.png', tier: 2, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Bdd', kda: '1/3/15', win: false, match: '204 LCK Summer vs KT', items: ['영겁의 지팡이', '존야의 모래시계', '우주 추진력', '대자연의 힘', '정령의 형상', '헤르메스의 발걸음'], trinket: '꿰뚫어 보는 망원 와드'}] },
    { id: 38, nameKr: '갱플랭크', nameEn: 'Gangplank', role: 'TOP', roleKr: '바다의 무법자', player: 'Kiin', kda: '4/2/6', imageUrl: BASE_IMAGE_URL + 'Gangplank.png', iconUrl: BASE_ICON_URL + 'Gangplank.png', tier: 2, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Kiin', kda: '4/2/6', win: true, match: '204 LCK Summer vs GEN', items: ['정수 약탈자', '나보리 명멸검', '무한의 대검', '도미닉 경의 인사', '수호 천사', '명석함의 아이오니아 장화'], trinket: '꿰뚫어 보는 망원 와드'}] },
    { id: 39, nameKr: '가렌', nameEn: 'Garen', role: 'TOP', roleKr: '데마시아의 힘', player: '기인', kda: '2/4/3', imageUrl: BASE_IMAGE_URL + 'Garen.png', iconUrl: BASE_ICON_URL + 'Garen.png', tier: 2, matchHistory: [{itemsURL: BASE_ITEM_URL, player: '기인', kda: '2/4/3', win: true, match: '204 LCK Summer vs HLE', items: ['발걸음 분쇄기', '맬모셔스의 아귀', '망자의 갑옷', '대자연의 힘', '거대한 히드라', '헤르메스의 발걸음'], trinket: '꿰뚫어 보는 망원 와드'}] },
    { id: 40, nameKr: '나르', nameEn: 'Gnar', role: 'TOP', roleKr: '사슬에 묶인 야수', player: 'Rich', kda: '3/3/5', imageUrl: BASE_IMAGE_URL + 'Gnar.png', iconUrl: BASE_ICON_URL + 'Gnar.png', tier: 2, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Rich', kda: '3/3/5', win: false, match: '204 LCK Summer vs KDF', items: ['삼위일체', '칠흑의 양날 도끼', '스테락의 도전', '대자연의 힘', '정령의 형상', '명석함의 아이오니아 장화'], trinket: '투명 와드'}] },
    { id: 41, nameKr: '그라가스', nameEn: 'Gragas', role: 'TOP', roleKr: '술고래', player: 'TheShy', kda: '4/4/6', imageUrl: BASE_IMAGE_URL + 'Gragas.png', iconUrl: BASE_ICON_URL + 'Gragas.png', tier: 2, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'TheShy', kda: '4/4/6', win: false, match: '204 LPL Summer vs WBG', items: ['신성한 파괴자', '칠흑의 양날 도끼', '스테락의 도전', '정령의 형상', '가시 갑옷', '판금 장화'], trinket: '투명 와드'}] },
    { id: 42, nameKr: '그레이브즈', nameEn: 'Graves', role: 'JUNGLE', roleKr: '무법자', player: 'Tarzan', kda: '4/3/8', match: '204 LPL Summer vs TES', imageUrl: BASE_IMAGE_URL + 'Graves.png', iconUrl: BASE_ICON_URL + 'Graves.png', tier: 2, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Tarzan', kda: '4/3/8', win: true, match: '204 LPL Summer vs TES', items: ['월식', '수확의 낫', '피바라기', '세릴다의 원한', '칠흑의 양날 도끼', '명석함의 아이오니아 장화'], trinket: '투명 와드'}] },
    { id: 43, nameKr: '그웬', nameEn: 'Gwen', role: 'TOP', roleKr: '신성한 재봉사', player: 'Kiin', kda: '6/2/5', imageUrl: BASE_IMAGE_URL + 'Gwen.png', iconUrl: BASE_ICON_URL + 'Gwen.png', tier: 2, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Kiin', kda: '6/2/5', win: true, match: '204 LCK Summer vs GEN', items: ['마법공학 로켓 벨트', '존야의 모래시계', '내셔의 이빨', '라바돈의 죽음모자', '공허의 지팡이', '마법사의 신발'], trinket: '꿰뚫어 보는 망원 와드'}] },
    { id: 44, nameKr: '헤카림', nameEn: 'Hecarim', role: 'JUNGLE', roleKr: '전쟁의 전조', player: 'Clid', kda: '6/2/9', match: '204 LCK Spring vs GenG', imageUrl: BASE_IMAGE_URL + 'Hecarim.png', iconUrl: BASE_ICON_URL + 'Hecarim.png', tier: 2, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Clid', kda: '6/2/9', win: true, match: '2024 LCK Spring vs GenG', items: ['돌풍', '정수 약탈자', '세릴다의 원한', '밤의 끝자락', '수호 천사', '명석함의 아이오니아 장화'], trinket: '투명 와드'}] },
    { id: 45, nameKr: '하이머딩거', nameEn: 'Heimerdinger', role: 'MID', roleKr: '존경받는 발명가', player: 'Bdd', kda: '5/3/12', imageUrl: BASE_IMAGE_URL + 'Heimerdinger.png', iconUrl: BASE_ICON_URL + 'Heimerdinger.png', tier: 2, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Bdd', kda: '5/3/12', win: true, match: '204 LCK Summer vs KT', items: ['리안드리의 고통', '존야의 모래시계', '라일라이의 수정홀', '공허의 지팡이', '밴시의 장막', '마법사의 신발'], trinket: '예언자의 렌즈'}] },
    { id: 46, nameKr: '일라오이', nameEn: 'Illaoi', role: 'TOP', roleKr: '크라켄의 여사제', player: 'Rascal', kda: '4/3/6', imageUrl: BASE_IMAGE_URL + 'Illaoi.png', iconUrl: BASE_ICON_URL + 'Illaoi.png', tier: 2, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Rascal', kda: '4/3/6', win: false, match: '204 LCK Summer vs HLE', items: ['신성한 파괴자', '스테락의 도전', '죽음의 무도', '칠흑의 양날 도끼', '정령의 형상', '판금 장화'], trinket: '투명 와드'}] },
    { id: 47, nameKr: '아이번', nameEn: 'Ivern', role: 'JUNGLE', roleKr: '자연의 친구', player: 'Peanut', kda: '1/1/18', match: '204 LCK Summer vs BRO', imageUrl: BASE_IMAGE_URL + 'Ivern.png', iconUrl: BASE_ICON_URL + 'Ivern.png', tier: 2, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Peanut', kda: '1/1/18', win: true, match: '204 LCK Summer vs BRO', items: ['월석 재생기', '흐르는 물의 지팡이', '구원', '불타는 향로', '미카엘의 축복', '명석함의 아이오니아 장화'], trinket: '꿰뚫어 보는 망원 와드'}] },
    { id: 48, nameKr: '잔나', nameEn: 'Janna', role: 'SUPPORT', roleKr: '폭풍의 화신', player: 'Lehends', kda: '0/1/25', imageUrl: BASE_IMAGE_URL + 'Janna.png', iconUrl: BASE_ICON_URL + 'Janna.png', tier: 2, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Lehends', kda: '0/1/25', win: true, match: '204 LCK Spring vs NS', items: ['슈렐리아의 군가', '불타는 향로', '구원', '미카엘의 축복', '지크의 융합', '명석함의 아이오니아 장화'], trinket: '투명 와드'}] },
    { id: 49, nameKr: '잭스', nameEn: 'Jax', role: 'TOP', roleKr: '무기의 달인', player: 'Rascal', kda: '5/3/7', imageUrl: BASE_IMAGE_URL + 'Jax.png', iconUrl: BASE_ICON_URL + 'Jax.png', tier: 2, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Rascal', kda: '5/3/7', win: true, match: '204 LCK Summer vs HLE', items: ['신성한 파괴자', '몰락한 왕의 검', '스테락의 도전', '거대한 히드라', '정령의 형상', '판금 장화'], trinket: '꿰뚫어 보는 망원 와드'}] },
    { id: 50, nameKr: '제이스', nameEn: 'Jayce', role: 'MID', roleKr: '미래의 수호자', player: 'Nuguri', kda: '9/1/5', match: '204 LPL Summer vs WBG', imageUrl: BASE_IMAGE_URL + 'Jayce.png', iconUrl: BASE_ICON_URL + 'Jayce.png', tier: 2, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Nuguri', kda: '9/1/5', win: true, match: '204 LPL Summer vs WBG', items: ['월식', '무라마나', '세릴다의 원한', '밤의 끝자락', '요오무의 유령검', '명석함의 아이오니아 장화'], trinket: '예언자의 렌즈'}] },
    { id: 51, nameKr: '진', nameEn: 'Jhin', role: 'ADC', roleKr: '잔혹극', player: 'Ruler', kda: '10/2/6', match: '204 LPL Spring vs TES', imageUrl: BASE_IMAGE_URL + 'Jhin.png', iconUrl: BASE_ICON_URL + 'Jhin.png', tier: 2, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Ruler', kda: '10/2/6', win: true, match: '2024 LPL Spring vs TES', items: ['돌풍', '고속 연사포', '무한의 대검', '도미닉 경의 인사', '피바라기', '광전사의 군화'], trinket: '예언자의 렌즈'}] },
    { id: 52, nameKr: '징크스', nameEn: 'Jinx', role: 'ADC', roleKr: '난폭한 말괄량이', player: 'Gumayusi', kda: '12/1/8', imageUrl: BASE_IMAGE_URL + 'Jinx.png', iconUrl: BASE_ICON_URL + 'Jinx.png', tier: 2, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Gumayusi', kda: '12/1/8', win: true, match: '204 LCK Summer vs T1', items: ['크라켄 학살자', '고속 연사포', '무한의 대검', '피바라기', '수호 천사', '광전사의 군화'], trinket: '예언자의 렌즈'}] },
    { id: 53, nameKr: '카이사', nameEn: 'Kaisa', role: 'ADC', roleKr: '공허의 딸', player: 'Gumayusi', kda: '13/1/5', imageUrl: BASE_IMAGE_URL + 'KaiSa.png', iconUrl: BASE_ICON_URL + 'KaiSa.png', tier: 2, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Gumayusi', kda: '13/1/5', win: true, match: '204 LCK Summer vs T1', items: ['크라켄 학살자', '구인수의 격노검', '마법사의 최후', '몰락한 왕의 검', '내셔의 이빨', '광전사의 군화'], trinket: '꿰뚫어 보는 망원 와드'}] },
    { id: 54, nameKr: '칼리스타', nameEn: 'Kalista', role: 'ADC', roleKr: '복수의 화신', player: 'Deft', kda: '9/1/7', match: '204 LCK Summer vs DRX', imageUrl: BASE_IMAGE_URL + 'Kalista.png', iconUrl: BASE_ICON_URL + 'Kalista.png', tier: 2, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Deft', kda: '9/1/7', win: true, match: '204 LCK Summer vs DRX', items: ['크라켄 학살자', '구인수의 격노검', '몰락한 왕의 검', '마법사의 최후', '고속 연사포', '광전사의 군화'], trinket: '꿰뚫어 보는 망원 와드'}] },
    { id: 55, nameKr: '카르마', nameEn: 'Karma', role: 'SUPPORT', roleKr: '깨달은 자', player: 'Keria', kda: '0/1/25', imageUrl: BASE_IMAGE_URL + 'Karma.png', iconUrl: BASE_ICON_URL + 'Karma.png', tier: 2, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Keria', kda: '0/1/25', win: true, match: '204 LCK Spring vs T1', items: ['월석 재생기', '흐르는 물의 지팡이', '구원', '불타는 향로', '미카엘의 축복', '명석함의 아이오니아 장화'], trinket: '투명 와드'}] },
    { id: 56, nameKr: '카서스', nameEn: 'Karthus', role: 'JUNGLE', roleKr: '죽음의 성가', player: 'Canyon', kda: '8/2/6', match: '204 LCK Summer vs DK', imageUrl: BASE_IMAGE_URL + 'Karthus.png', iconUrl: BASE_ICON_URL + 'Karthus.png', tier: 2, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Canyon', kda: '8/2/6', win: true, match: '204 LCK Summer vs DK', items: ['리안드리의 고통', '존야의 모래시계', '라바돈의 죽음모자', '공허의 지팡이', '그림자 불꽃', '마법사의 신발'], trinket: '투명 와드'}] },
    { id: 57, nameKr: '카사딘', nameEn: 'Kassadin', role: 'MID', roleKr: '공허의 방랑자', player: 'Faker', kda: '7/1/4', match: '204 LCK Summer vs T1', imageUrl: BASE_IMAGE_URL + 'Kassadin.png', iconUrl: BASE_ICON_URL + 'Kassadin.png', tier: 2, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Faker', kda: '7/1/4', win: true, match: '204 LCK Summer vs T1', items: ['영겁의 지팡이', '대천사의 포옹', '존야의 모래시계', '공허의 지팡이', '라바돈의 죽음모자', '마법사의 신발'], trinket: '투명 와드'}] },
    { id: 58, nameKr: '카타리나', nameEn: 'Katarina', role: 'MID', roleKr: '사악한 칼날', player: 'Chovy', kda: '12/3/5', imageUrl: BASE_IMAGE_URL + 'Katarina.png', iconUrl: BASE_ICON_URL + 'Katarina.png', tier: 2, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Chovy', kda: '12/3/5', win: true, match: '204 LCK Summer vs GEN', items: ['마법공학 로켓 벨트', '존야의 모래시계', '그림자 불꽃', '공허의 지팡이', '라바돈의 죽음모자', '마법사의 신발'], trinket: '예언자의 렌즈'}] },
    { id: 59, nameKr: '케인', nameEn: 'Kayn', role: 'JUNGLE', roleKr: '그림자 사신', player: 'Peanut', kda: '8/1/6', match: '204 LCK Summer vs BRO', imageUrl: BASE_IMAGE_URL + 'Kayn.png', iconUrl: BASE_ICON_URL + 'Kayn.png', tier: 2, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Peanut', kda: '8/1/6', win: true, match: '204 LCK Summer vs BRO', items: ['돌풍', '세릴다의 원한', '밤의 끝자락', '수확의 낫', '피바라기', '명석함의 아이오니아 장화'], trinket: '투명 와드'}] },
    { id: 60, nameKr: '케일', nameEn: 'Kayle', role: 'TOP', roleKr: '정의의 심판자', player: 'Zeus', kda: '4/2/8', imageUrl: BASE_IMAGE_URL + 'Kayle.png', iconUrl: BASE_ICON_URL + 'Kayle.png', tier: 2, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Zeus', kda: '4/2/8', win: true, match: '204 LCK Summer vs T1', items: ['크라켄 학살자', '구인수의 격노검', '마법사의 최후', '몰락한 왕의 검', '내셔의 이빨', '광전사의 군화'], trinket: '꿰뚫어 보는 망원 와드'}] },
    { id: 61, nameKr: '케넨', nameEn: 'Kennen', role: 'TOP', roleKr: '폭풍의 심장', player: 'TheShy', kda: '3/3/10', imageUrl: BASE_IMAGE_URL + 'Kennen.png', iconUrl: BASE_ICON_URL + 'Kennen.png', tier: 2, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'TheShy', kda: '3/3/10', win: true, match: '204 LPL Summer vs WBG', items: ['마법공학 로켓 벨트', '존야의 모래시계', '라바돈의 죽음모자', '공허의 지팡이', '그림자 불꽃', '마법사의 신발'], trinket: '투명 와드'}] },
    { id: 62, nameKr: '킨드레드', nameEn: 'Kindred', role: 'JUNGLE', roleKr: '영겁의 사냥꾼', player: 'Peanut', kda: '7/0/9', match: '204 LCK Spring vs HLE', imageUrl: BASE_IMAGE_URL + 'Kindred.png', iconUrl: BASE_ICON_URL + 'Kindred.png', tier: 2, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Peanut', kda: '7/0/9', win: true, match: '2024 LCK Spring vs HLE', items: ['크라켄 학살자', '마법사의 최후', '몰락한 왕의 검', '수호 천사', '피바라기', '광전사의 군화'], trinket: '투명 와드'}] },
    { id: 63, nameKr: '클레드', nameEn: 'Kled', role: 'TOP', roleKr: '도마뱀 기병', player: 'Kiin', kda: '3/3/5', imageUrl: BASE_IMAGE_URL + 'Kled.png', iconUrl: BASE_ICON_URL + 'Kled.png', tier: 2, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Kiin', kda: '3/3/5', win: true, match: '204 LCK Summer vs GEN', items: ['선혈포식자', '칠흑의 양날 도끼', '스테락의 도전', '죽음의 무도', '수호 천사', '판금 장화'], trinket: '꿰뚫어 보는 망원 와드'}] },
    { id: 64, nameKr: '코그모', nameEn: 'KogMaw', role: 'ADC', roleKr: '공허의 침략자', player: 'Gumayusi', kda: '10/2/8', imageUrl: BASE_IMAGE_URL + 'KogMaw.png', iconUrl: BASE_ICON_URL + 'KogMaw.png', tier: 2, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Gumayusi', kda: '10/2/8', win: true, match: '204 LCK Summer vs T1', items: ['크라켄 학살자', '구인수의 격노검', '마법사의 최후', '몰락한 왕의 검', '내셔의 이빨', '광전사의 군화'], trinket: '예언자의 렌즈'}] },
    { id: 65, nameKr: '크산테', nameEn: 'KSante', role: 'TOP', roleKr: '나즈마', player: 'Doran', kda: '3/3/12', imageUrl: BASE_IMAGE_URL + 'KSante.png', iconUrl: BASE_ICON_URL + 'KSante.png', tier: 2, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Doran', kda: '3/3/12', win: true, match: '204 LCK Summer vs DK', items: ['터보 화공 탱크', '가시 갑옷', '심연의 가면', '대자연의 힘', '정령의 형상', '판금 장화'], trinket: '투명 와드'}] },
    { id: 66, nameKr: '르블랑', nameEn: 'Leblanc', role: 'MID', roleKr: '사기꾼', player: 'Chovy', kda: '9/1/6', imageUrl: BASE_IMAGE_URL + 'LeBlanc.png', iconUrl: BASE_ICON_URL + 'LeBlanc.png', tier: 2, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Chovy', kda: '9/1/6', win: true, match: '204 LCK Summer vs GEN', items: ['밤의 수확자', '존야의 모래시계', '라바돈의 죽음모자', '공허의 지팡이', '그림자 불꽃', '마법사의 신발'], trinket: '투명 와드'}] },
    { id: 67, nameKr: '리 신', nameEn: 'LeeSin', role: 'JUNGLE', roleKr: '눈 먼 수도승', player: 'Oner', kda: '5/1/12', match: '204 LCK Summer vs DK', imageUrl: BASE_IMAGE_URL + 'LeeSin.png', iconUrl: BASE_ICON_URL + 'LeeSin.png', tier: 2, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Oner', kda: '5/1/12', win: true, match: '204 LCK Summer vs DK', items: ['선혈포식자', '스테락의 도전', '죽음의 무도', '수호 천사', '칠흑의 양날 도끼', '판금 장화'], trinket: '투명 와드'}, {itemsURL: BASE_ITEM_URL, player: 'Canyon', kda: '4/2/10', win: true, match: '204 LCK Summer vs T1', items: ['신성한 파괴자', '칠흑의 양날 도끼', '정령의 형상', '가시 갑옷', '거대한 히드라', '헤르메스의 발걸음'], trinket: '꿰뚫어 보는 망원 와드'}] },
    { id: 68, nameKr: '레오나', nameEn: 'Leona', role: 'SUPPORT', roleKr: '여명', player: 'Effort', kda: '1/4/19', match: '204 LCK Spring vs NS', imageUrl: BASE_IMAGE_URL + 'Leona.png', iconUrl: BASE_ICON_URL + 'Leona.png', tier: 2, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Effort', kda: '1/4/19', win: false, match: '2024 LCK Spring vs NS', items: ['강철의 솔라리 펜던트', '기사의 맹세', '가시 갑옷', '지크의 융합', '심연의 가면', '기동력의 장화'], trinket: '꿰뚫어 보는 망원 와드'}] },

    // Tier 3 (총 34개)
    { id: 69, nameKr: '리산드라', nameEn: 'Lissandra', role: 'MID', roleKr: '얼음 마녀', player: 'ShowMaker', kda: '4/3/10', match: '204 LCK Summer vs DRX', imageUrl: BASE_IMAGE_URL + 'Lissandra.png', iconUrl: BASE_ICON_URL + 'Lissandra.png', tier: 3, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'ShowMaker', kda: '4/3/10', win: false, match: '204 LCK Summer vs DRX', items: ['영겁의 지팡이', '존야의 모래시계', '라바돈의 죽음모자', '리치베인', '공허의 지팡이', '마법사의 신발'], trinket: '꿰뚫어 보는 망원 와드'}] },
    { id: 70, nameKr: '릴리아', nameEn: 'Lillia', role: 'JUNGLE', roleKr: '수줍은 꽃', player: 'Peanut', kda: '6/2/12', match: '204 LCK Summer vs BRO', imageUrl: BASE_IMAGE_URL + 'Lillia.png', iconUrl: BASE_ICON_URL + 'Lillia.png', tier: 3, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Peanut', kda: '6/2/12', win: true, match: '204 LCK Summer vs BRO', items: ['리안드리의 고통', '존야의 모래시계', '라바돈의 죽음모자', '공허의 지팡이', '우주 추진력', '마법사의 신발'], trinket: '투명 와드'}] },
    { id: 71, nameKr: '루시안', nameEn: 'Lucian', role: 'ADC', roleKr: '정화의 사도', player: 'Deft', kda: '8/0/10', match: '204 LCK Spring vs DRX', imageUrl: BASE_IMAGE_URL + 'Lucian.png', iconUrl: BASE_ICON_URL + 'Lucian.png', tier: 3, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Deft', kda: '8/0/10', win: true, match: '2024 LCK Spring vs DRX', items: ['크라켄 학살자', '나보리 명멸검', '피바라기', '수호 천사', '무한의 대검', '광전사의 군화'], trinket: '꿰뚫어 보는 망원 와드'}] },
    { id: 72, nameKr: '럭스', nameEn: 'Lux', role: 'SUPPORT', roleKr: '광휘의 마법사', player: 'Effort', kda: '0/2/20', match: '204 LCK Spring vs NS', imageUrl: BASE_IMAGE_URL + 'Lux.png', iconUrl: BASE_ICON_URL + 'Lux.png', tier: 3, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Effort', kda: '0/2/20', win: false, match: '2024 LCK Spring vs NS', items: ['제국의 명령', '흐르는 물의 지팡이', '구원', '존야의 모래시계', '불타는 향로', '명석함의 아이오니아 장화'], trinket: '투명 와드'}] },
    { id: 73, nameKr: '룰루', nameEn: 'Lulu', role: 'SUPPORT', roleKr: '요정 마법사', player: 'Keria', kda: '0/1/22', imageUrl: BASE_IMAGE_URL + 'Lulu.png', iconUrl: BASE_ICON_URL + 'Lulu.png', tier: 3, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Keria', kda: '0/1/22', win: true, match: '204 LCK Spring vs T1', items: ['월석 재생기', '흐르는 물의 지팡이', '구원', '불타는 향로', '미카엘의 축복', '명석함의 아이오니아 장화'], trinket: '꿰뚫어 보는 망원 와드'}] },
    { id: 74, nameKr: '마스터 이', nameEn: 'MasterYi', role: 'JUNGLE', roleKr: '우주의 검', player: 'Clid', kda: '10/2/3', match: '204 LCK Spring vs NS', imageUrl: BASE_IMAGE_URL + 'MasterYi.png', iconUrl: BASE_ICON_URL + 'MasterYi.png', tier: 3, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Clid', kda: '10/2/3', win: true, match: '2024 LCK Spring vs NS', items: ['크라켄 학살자', '마법사의 최후', '몰락한 왕의 검', '죽음의 무도', '수호 천사', '광전사의 군화'], trinket: '투명 와드'}] },
    { id: 75, nameKr: '말자하', nameEn: 'Malzahar', role: 'MID', roleKr: '공허의 선지자', player: 'Bdd', kda: '4/1/10', imageUrl: BASE_IMAGE_URL + 'Malzahar.png', iconUrl: BASE_ICON_URL + 'Malzahar.png', tier: 3, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Bdd', kda: '4/1/10', win: true, match: '204 LCK Summer vs KT', items: ['리안드리의 고통', '존야의 모래시계', '라바돈의 죽음모자', '공허의 지팡이', '그림자 불꽃', '마법사의 신발'], trinket: '꿰뚫어 보는 망원 와드'}] },
    { id: 76, nameKr: '말파이트', nameEn: 'Malphite', role: 'TOP', roleKr: '파편의 주인', player: 'Zeus', kda: '0/3/15', imageUrl: BASE_IMAGE_URL + 'Malphite.png', iconUrl: BASE_ICON_URL + 'Malphite.png', tier: 3, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Zeus', kda: '0/3/15', win: false, match: '204 LCK Summer vs T1', items: ['얼어붙은 건틀릿', '가시 갑옷', '심연의 가면', '태양불꽃 방패', '가고일 돌갑옷', '판금 장화'], trinket: '투명 와드'}] },
    { id: 77, nameKr: '마오카이', nameEn: 'Maokai', role: 'SUPPORT', roleKr: '뒤틀린 나무 정령', player: 'Effort', kda: '0/3/18', match: '204 LCK Summer vs NS', imageUrl: BASE_IMAGE_URL + 'Maokai.png', iconUrl: BASE_ICON_URL + 'Maokai.png', tier: 3, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Effort', kda: '0/3/18', win: false, match: '204 LCK Summer vs NS', items: ['강철의 솔라리 펜던트', '지크의 융합', '가시 갑옷', '구원', '기사의 맹세', '기동력의 장화'], trinket: '꿰뚫어 보는 망원 와드'}] },
    { id: 78, nameKr: '미스 포츈', nameEn: 'MissFortune', role: 'ADC', roleKr: '현상금 사냥꾼', player: 'Viper', kda: '8/0/6', match: '204 LPL Summer vs EDG', imageUrl: BASE_IMAGE_URL + 'MissFortune.png', iconUrl: BASE_ICON_URL + 'MissFortune.png', tier: 3, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Viper', kda: '8/0/6', win: true, match: '204 LPL Summer vs EDG', items: ['월식', '수확의 낫', '세릴다의 원한', '도미닉 경의 인사', '피바라기', '광전사의 군화'], trinket: '꿰뚫어 보는 망원 와드'}] },
    { id: 79, nameKr: '모데카이저', nameEn: 'Mordekaiser', role: 'TOP', roleKr: '강철의 망령', player: 'TheShy', kda: '6/2/8', imageUrl: BASE_IMAGE_URL + 'Mordekaiser.png', iconUrl: BASE_ICON_URL + 'Mordekaiser.png', tier: 3, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'TheShy', kda: '6/2/8', win: true, match: '204 LPL Summer vs WBG', items: ['리안드리의 고통', '존야의 모래시계', '라일라이의 수정홀', '정령의 형상', '공허의 지팡이', '헤르메스의 발걸음'], trinket: '투명 와드'}] },
    { id: 80, nameKr: '모르가나', nameEn: 'Morgana', role: 'SUPPORT', roleKr: '타락한 천사', player: 'Keria', kda: '1/2/18', match: '204 LCK Summer vs T1', imageUrl: BASE_IMAGE_URL + 'Morgana.png', iconUrl: BASE_ICON_URL + 'Morgana.png', tier: 3, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Keria', kda: '1/2/18', win: true, match: '204 LCK Summer vs T1', items: ['제국의 명령', '존야의 모래시계', '구원', '흐르는 물의 지팡이', '밴시의 장막', '명석함의 아이오니아 장화'], trinket: '투명 와드'}] },
    { id: 81, nameKr: '나미', nameEn: 'Nami', role: 'SUPPORT', roleKr: '파도 소환사', player: 'Lehends', kda: '0/2/20', match: '204 LCK Spring vs NS', imageUrl: BASE_IMAGE_URL + 'Nami.png', iconUrl: BASE_ICON_URL + 'Nami.png', tier: 3, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Lehends', kda: '0/2/20', win: true, match: '2024 LCK Spring vs NS', items: ['월석 재생기', '흐르는 물의 지팡이', '구원', '불타는 향로', '미카엘의 축복', '명석함의 아이오니아 장화'], trinket: '꿰뚫어 보는 망원 와드'}] },
    { id: 82, nameKr: '나서스', nameEn: 'Nasus', role: 'TOP', roleKr: '사막의 관리자', player: 'Rascal', kda: '3/4/7', match: '204 LCK Summer vs HLE', imageUrl: BASE_IMAGE_URL + 'Nasus.png', iconUrl: BASE_ICON_URL + 'Nasus.png', tier: 3, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Rascal', kda: '3/4/7', win: false, match: '204 LCK Summer vs HLE', items: ['신성한 파괴자', '얼어붙은 심장', '정령의 형상', '가고일 돌갑옷', '가시 갑옷', '헤르메스의 발걸음'], trinket: '투명 와드'}] },
    { id: 83, nameKr: '나피리', nameEn: 'Naafiri', role: 'JUNGLE', roleKr: '수천의 이빨', player: 'Canyon', kda: '9/1/6', match: '204 LCK Summer vs GEN', imageUrl: BASE_IMAGE_URL + 'Naafiri.png', iconUrl: BASE_ICON_URL + 'Naafiri.png', tier: 3, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Canyon', kda: '9/1/6', win: true, match: '204 LCK Summer vs GEN', items: ['월식', '요오무의 유령검', '밤의 끝자락', '세릴다의 원한', '수확의 낫', '명석함의 아이오니아 장화'], trinket: '예언자의 렌즈'}] },
    { id: 84, nameKr: '노틸러스', nameEn: 'Nautilus', role: 'SUPPORT', roleKr: '심해의 타이탄', player: 'Effort', kda: '0/5/17', match: '204 LCK Summer vs NS', imageUrl: BASE_IMAGE_URL + 'Nautilus.png', iconUrl: BASE_ICON_URL + 'Nautilus.png', tier: 3, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Effort', kda: '0/5/17', win: false, match: '204 LCK Summer vs NS', items: ['강철의 솔라리 펜던트', '지크의 융합', '기사의 맹세', '구원', '가시 갑옷', '기동력의 장화'], trinket: '꿰뚫어 보는 망원 와드'}] },
    { id: 85, nameKr: '니달리', nameEn: 'Nidalee', role: 'JUNGLE', roleKr: '야성의 사냥꾼', player: 'Peanut', kda: '9/2/7', match: '204 LCK Summer vs GEN', imageUrl: BASE_IMAGE_URL + 'Nidalee.png', iconUrl: BASE_ICON_URL + 'Nidalee.png', tier: 3, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Peanut', kda: '9/2/7', win: true, match: '204 LCK Summer vs GEN', items: ['밤의 수확자', '존야의 모래시계', '라바돈의 죽음모자', '공허의 지팡이', '그림자 불꽃', '마법사의 신발'], trinket: '투명 와드'}] },
    { id: 86, nameKr: '닐라', nameEn: 'Nilah', role: 'ADC', roleKr: '기쁨의 화신', player: 'Gumayusi', kda: '14/1/6', imageUrl: BASE_IMAGE_URL + 'Nilah.png', iconUrl: BASE_ICON_URL + 'Nilah.png', tier: 3, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Gumayusi', kda: '14/1/6', win: true, match: '204 LCK Summer vs T1', items: ['불멸의 철갑궁', '무한의 대검', '피바라기', '도미닉 경의 인사', '고속 연사포', '광전사의 군화'], trinket: '예언자의 렌즈'}] },
    { id: 87, nameKr: '니코', nameEn: 'Neeko', role: 'MID', roleKr: '알쏭달쏭 카멜레온', player: 'Bdd', kda: '6/2/11', imageUrl: BASE_IMAGE_URL + 'Neeko.png', iconUrl: BASE_ICON_URL + 'Neeko.png', tier: 3, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Bdd', kda: '6/2/11', win: true, match: '204 LCK Summer vs KT', items: ['루덴의 폭풍', '존야의 모래시계', '라바돈의 죽음모자', '공허의 지팡이', '그림자 불꽃', '마법사의 신발'], trinket: '예언자의 렌즈'}] },
    { id: 88, nameKr: '녹턴', nameEn: 'Nocturne', role: 'JUNGLE', roleKr: '영원한 악몽', player: 'Clid', kda: '5/2/10', match: '204 LCK Summer vs HLE', imageUrl: BASE_IMAGE_URL + 'Nocturne.png', iconUrl: BASE_ICON_URL + 'Nocturne.png', tier: 3, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Clid', kda: '5/2/10', win: true, match: '2024 LCK Summer vs HLE', items: ['발걸음 분쇄기', '스테락의 도전', '죽음의 무도', '수호 천사', '칠흑의 양날 도끼', '판금 장화'], trinket: '꿰뚫어 보는 망원 와드'}] },
    { id: 89, nameKr: '누누와 윌럼프', nameEn: 'Nunu', role: 'JUNGLE', roleKr: '소년과 설인', player: 'Oner', kda: '1/3/15', match: '204 LCK Summer vs DK', imageUrl: BASE_IMAGE_URL + 'Nunu.png', iconUrl: BASE_ICON_URL + 'Nunu&Willump.png', tier: 3, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Oner', kda: '1/3/15', win: true, match: '204 LCK Summer vs DK', items: ['터보 화공 탱크', '가시 갑옷', '심연의 가면', '대자연의 힘', '정령의 형상', '명석함의 아이오니아 장화'], trinket: '투명 와드'}] },
    { id: 90, nameKr: '올라프', nameEn: 'Olaf', role: 'TOP', roleKr: '광전사', player: 'TheShy', kda: '7/3/6', imageUrl: BASE_IMAGE_URL + 'Olaf.png', iconUrl: BASE_ICON_URL + 'Olaf.png', tier: 3, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'TheShy', kda: '7/3/6', win: true, match: '204 LPL Summer vs WBG', items: ['선혈포식자', '스테락의 도전', '죽음의 무도', '수호 천사', '맬모셔스의 아귀', '판금 장화'], trinket: '투명 와드'}] },
    { id: 91, nameKr: '오리아나', nameEn: 'Orianna', role: 'MID', roleKr: '시계태엽 소녀', player: 'ShowMaker', kda: '4/2/10', match: '204 LCK Summer vs KT', imageUrl: BASE_IMAGE_URL + 'Orianna.png', iconUrl: BASE_ICON_URL + 'Orianna.png', tier: 3, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'ShowMaker', kda: '4/2/10', win: true, match: '204 LCK Summer vs KT', items: ['루덴의 폭풍', '존야의 모래시계', '그림자 불꽃', '공허의 지팡이', '라바돈의 죽음모자', '마법사의 신발'], trinket: '꿰뚫어 보는 망원 와드'}] },
    { id: 92, nameKr: '오른', nameEn: 'Ornn', role: 'TOP', roleKr: '화염 대장장이', player: 'Zeus', kda: '0/3/14', match: '204 LCK Summer vs T1', imageUrl: BASE_IMAGE_URL + 'Ornn.png', iconUrl: BASE_ICON_URL + 'Ornn.png', tier: 3, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Zeus', kda: '0/3/14', win: true, match: '204 LCK Summer vs T1', items: ['태양불꽃 방패', '가시 갑옷', '얼어붙은 건틀릿', '심연의 가면', '가고일 돌갑옷', '판금 장화'], trinket: '꿰뚫어 보는 망원 와드'}] },
    { id: 93, nameKr: '판테온', nameEn: 'Pantheon', role: 'TOP', roleKr: '부서지지 않는 창', player: 'Kiin', kda: '6/3/7', imageUrl: BASE_IMAGE_URL + 'Pantheon.png', iconUrl: BASE_ICON_URL + 'Pantheon.png', tier: 3, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Kiin', kda: '6/3/7', win: true, match: '204 LCK Summer vs GEN', items: ['신성한 파괴자', '칠흑의 양날 도끼', '스테락의 도전', '죽음의 무도', '수호 천사', '명석함의 아이오니아 장화'], trinket: '투명 와드'}] },
    { id: 94, nameKr: '파이크', nameEn: 'Pyke', role: 'SUPPORT', roleKr: '떼 놓은 그림자', player: 'Keria', kda: '5/2/12', match: '204 LCK Summer vs T1', imageUrl: BASE_IMAGE_URL + 'Pyke.png', iconUrl: BASE_ICON_URL + 'Pyke.png', tier: 3, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Keria', kda: '5/2/12', win: true, match: '204 LCK Summer vs T1', items: ['돌풍', '요오무의 유령검', '밤의 수확자', '밤의 끝자락', '세릴다의 원한', '기동력의 장화'], trinket: '투명 와드'}] },
    { id: 95, nameKr: '퀸', nameEn: 'Quinn', role: 'TOP', roleKr: '데마시아의 날개', player: 'Huni', kda: '6/2/4', match: '204 LCS vs EG', imageUrl: BASE_IMAGE_URL + 'Quinn.png', iconUrl: BASE_ICON_URL + 'Quinn.png', tier: 3, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Huni', kda: '6/2/4', win: true, match: '204 LCS vs EG', items: ['돌풍', '고속 연사포', '무한의 대검', '도미닉 경의 인사', '피바라기', '광전사의 군화'], trinket: '예언자의 렌즈'}] },
    { id: 96, nameKr: '라칸', nameEn: 'Rakan', role: 'SUPPORT', roleKr: '매혹하는 자', player: 'Effort', kda: '0/2/19', match: '204 LCK Spring vs NS', imageUrl: BASE_IMAGE_URL + 'Rakan.png', iconUrl: BASE_ICON_URL + 'Rakan.png', tier: 3, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Effort', kda: '0/2/19', win: false, match: '2024 LCK Spring vs NS', items: ['슈렐리아의 군가', '흐르는 물의 지팡이', '구원', '불타는 향로', '미카엘의 축복', '명석함의 아이오니아 장화'], trinket: '꿰뚫어 보는 망원 와드'}] },
    { id: 97, nameKr: '람머스', nameEn: 'Rammus', role: 'JUNGLE', roleKr: '갑옷 두른 고슴도치', player: 'Canyon', kda: '2/1/15', match: '204 LCK Summer vs DK', imageUrl: BASE_IMAGE_URL + 'Rammus.png', iconUrl: BASE_ICON_URL + 'Rammus.png', tier: 3, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Canyon', kda: '2/1/15', win: true, match: '204 LCK Summer vs DK', items: ['터보 화공 탱크', '가시 갑옷', '심연의 가면', '대자연의 힘', '정령의 형상', '판금 장화'], trinket: '투명 와드'}] },
    { id: 98, nameKr: '렉사이', nameEn: 'RekSai', role: 'JUNGLE', roleKr: '공허의 굶주림', player: 'Oner', kda: '6/2/8', match: '204 LCK Summer vs DK', imageUrl: BASE_IMAGE_URL + 'RekSai.png', iconUrl: BASE_ICON_URL + 'RekSai.png', tier: 3, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Oner', kda: '6/2/8', win: true, match: '204 LCK Summer vs DK', items: ['선혈포식자', '스테락의 도전', '칠흑의 양날 도끼', '죽음의 무도', '거대한 히드라', '판금 장화'], trinket: '꿰뚫어 보는 망원 와드'}] },
    { id: 99, nameKr: '렐', nameEn: 'Rell', role: 'SUPPORT', roleKr: '강철의 여제', player: 'CoreJJ', kda: '0/4/18', match: '204 LCS vs TL', imageUrl: BASE_IMAGE_URL + 'Rell.png', iconUrl: BASE_ICON_URL + 'Rell.png', tier: 3, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'CoreJJ', kda: '0/4/18', win: false, match: '204 LCS vs TL', items: ['슈렐리아의 군가', '지크의 융합', '기사의 맹세', '구원', '가시 갑옷', '기동력의 장화'], trinket: '투명 와드'}] },
    { id: 100, nameKr: '레나타 글라스크', nameEn: 'RenataGlasc', role: 'SUPPORT', roleKr: '화공 남작', player: 'Keria', kda: '1/3/17', match: '204 LCK Summer vs T1', imageUrl: BASE_IMAGE_URL + 'RenataGlasc.png', iconUrl: BASE_ICON_URL + 'RenataGlasc.png', tier: 3, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Keria', kda: '1/3/17', win: true, match: '204 LCK Summer vs T1', items: ['제국의 명령', '흐르는 물의 지팡이', '구원', '존야의 모래시계', '불타는 향로', '명석함의 아이오니아 장화'], trinket: '꿰뚫어 보는 망원 와드'}] },
    { id: 101, nameKr: '레넥톤', nameEn: 'Renekton', role: 'TOP', roleKr: '사막의 도살자', player: 'TheShy', kda: '5/2/6', imageUrl: BASE_IMAGE_URL + 'Renekton.png', iconUrl: BASE_ICON_URL + 'Renekton.png', tier: 3, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'TheShy', kda: '5/2/6', win: true, match: '204 LPL Summer vs WBG', items: ['신성한 파괴자', '칠흑의 양날 도끼', '스테락의 도전', '죽음의 무도', '거대한 히드라', '판금 장화'], trinket: '투명 와드'}] },
    { id: 102, nameKr: '렝가', nameEn: 'Rengar', role: 'JUNGLE', roleKr: '사냥의 시작', player: 'Clid', kda: '11/1/4', match: '204 LCK Spring vs GenG', imageUrl: BASE_IMAGE_URL + 'Rengar.png', iconUrl: BASE_ICON_URL + 'Rengar.png', tier: 3, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Clid', kda: '11/1/4', win: true, match: '2024 LCK Spring vs GenG', items: ['월식', '요오무의 유령검', '밤의 끝자락', '세릴다의 원한', '수확의 낫', '명석함의 아이오니아 장화'], trinket: '예언자의 렌즈'}] },

    // Tier 4 (총 34개)
    { id: 103, nameKr: '리븐', nameEn: 'Riven', role: 'TOP', roleKr: '망명자', player: 'Kiin', kda: '5/2/4', imageUrl: BASE_IMAGE_URL + 'Riven.png', iconUrl: BASE_ICON_URL + 'Riven.png', tier: 4, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Kiin', kda: '5/2/4', win: true, match: '204 LPL Summer vs WBG', items: ['월식', '세릴다의 원한', '밤의 끝자락', '굶주린 히드라', '죽음의 무도', '명석함의 아이오니아 장화'], trinket: '투명 와드'}] },
    { id: 104, nameKr: '럼블', nameEn: 'Rumble', role: 'TOP', roleKr: '기계 악동', player: 'Rascal', kda: '4/3/6', imageUrl: BASE_IMAGE_URL + 'Rumble.png', iconUrl: BASE_ICON_URL + 'Rumble.png', tier: 4, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Rascal', kda: '4/3/6', win: false, match: '204 LCK Summer vs HLE', items: ['리안드리의 고통', '존야의 모래시계', '라일라이의 수정홀', '공허의 지팡이', '라바돈의 죽음모자', '마법사의 신발'], trinket: '투명 와드'}] },
    { id: 105, nameKr: '라이즈', nameEn: 'Ryze', role: 'MID', roleKr: '룬 마법사', player: 'Faker', kda: '7/2/10', imageUrl: BASE_IMAGE_URL + 'Ryze.png', iconUrl: BASE_ICON_URL + 'Ryze.png', tier: 4, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Faker', kda: '7/2/10', win: true, match: '204 LCK Summer vs T1', items: ['영겁의 지팡이', '대천사의 포옹', '존야의 모래시계', '공허의 지팡이', '라바돈의 죽음모자', '마법사의 신발'], trinket: '예언자의 렌즈'}] },
    { id: 106, nameKr: '사미라', nameEn: 'Samira', role: 'ADC', roleKr: '사막의 장미', player: 'Ruler', kda: '15/0/7', match: '204 LPL Spring vs TES', imageUrl: BASE_IMAGE_URL + 'Samira.png', iconUrl: BASE_ICON_URL + 'Samira.png', tier: 4, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Ruler', kda: '15/0/7', win: true, match: '2024 LPL Spring vs TES', items: ['불멸의 철갑궁', '무한의 대검', '피바라기', '도미닉 경의 인사', '수호 천사', '광전사의 군화'], trinket: '꿰뚫어 보는 망원 와드'}] },
    { id: 107, nameKr: '사이온', nameEn: 'Sion', role: 'TOP', roleKr: '언데드 거인', player: 'Zeus', kda: '1/5/9', match: '204 LCK Summer vs T1', imageUrl: BASE_IMAGE_URL + 'Sion.png', iconUrl: BASE_ICON_URL + 'Sion.png', tier: 4, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Zeus', kda: '1/5/9', win: false, match: '204 LCK Summer vs T1', items: ['태양불꽃 방패', '가시 갑옷', '심연의 가면', '대자연의 힘', '가고일 돌갑옷', '판금 장화'], trinket: '꿰뚫어 보는 망원 와드'}] },
    { id: 108, nameKr: '샤코', nameEn: 'Shaco', role: 'JUNGLE', roleKr: '악마 어릿광대', player: 'Tarzan', kda: '7/3/6', match: '204 LPL Summer vs TES', imageUrl: BASE_IMAGE_URL + 'Shaco.png', iconUrl: BASE_ICON_URL + 'Shaco.png', tier: 4, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Tarzan', kda: '7/3/6', win: true, match: '204 LPL Summer vs TES', items: ['월식', '요오무의 유령검', '밤의 끝자락', '세릴다의 원한', '수확의 낫', '기동력의 장화'], trinket: '예언자의 렌즈'}] },
    { id: 109, nameKr: '쉔', nameEn: 'Shen', role: 'TOP', roleKr: '황혼의 눈', player: 'Kiin', kda: '0/2/15', imageUrl: BASE_IMAGE_URL + 'Shen.png', iconUrl: BASE_ICON_URL + 'Shen.png', tier: 4, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Kiin', kda: '0/2/15', win: true, match: '204 LCK Summer vs GEN', items: ['태양불꽃 방패', '가시 갑옷', '심연의 가면', '망자의 갑옷', '정령의 형상', '판금 장화'], trinket: '투명 와드'}] },
    { id: 110, nameKr: '쉬바나', nameEn: 'Shyvana', role: 'JUNGLE', roleKr: '하프 드래곤', player: 'Oner', kda: '6/2/8', match: '204 LCK Summer vs DK', imageUrl: BASE_IMAGE_URL + 'Shyvana.png', iconUrl: BASE_ICON_URL + 'Shyvana.png', tier: 4, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Oner', kda: '6/2/8', win: true, match: '204 LCK Summer vs DK', items: ['얼어붙은 건틀릿', '밴시의 장막', '거대한 히드라', '가시 갑옷', '정령의 형상', '판금 장화'], trinket: '꿰뚫어 보는 망원 와드'}] },
    { id: 111, nameKr: '신지드', nameEn: 'Singed', role: 'TOP', roleKr: '광기의 화학자', player: 'Rascal', kda: '1/4/10', match: '204 LCK Summer vs HLE', imageUrl: BASE_IMAGE_URL + 'Singed.png', iconUrl: BASE_ICON_URL + 'Singed.png', tier: 4, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Rascal', kda: '1/4/10', win: false, match: '204 LCK Summer vs HLE', items: ['리안드리의 고통', '라일라이의 수정홀', '밴시의 장막', '대자연의 힘', '얼어붙은 심장', '헤르메스의 발걸음'], trinket: '투명 와드'}] },
    { id: 112, nameKr: '스카너', nameEn: 'Skarner', role: 'TOP', roleKr: '수정 선봉장', player: 'TheShy', kda: '3/3/9', imageUrl: BASE_IMAGE_URL + 'Skarner.png', iconUrl: BASE_ICON_URL + 'Skarner.png', tier: 4, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'TheShy', kda: '3/3/9', win: true, match: '204 LPL Summer vs WBG', items: ['터보 화공 탱크', '가시 갑옷', '심연의 가면', '대자연의 힘', '정령의 형상', '판금 장화'], trinket: '투명 와드'}] },
    { id: 113, nameKr: '스몰더', nameEn: 'Smolder', role: 'ADC', roleKr: '불타는 아이', player: 'Gumayusi', kda: '11/1/9', imageUrl: BASE_IMAGE_URL + 'Smolder.png', iconUrl: BASE_ICON_URL + 'Smolder.png', tier: 4, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Gumayusi', kda: '11/1/9', win: true, match: '204 LCK Summer vs T1', items: ['크라켄 학살자', '구인수의 격노검', '라바돈의 죽음모자', '마법사의 최후', '공허의 지팡이', '광전사의 군화'], trinket: '예언자의 렌즈'}] },
    { id: 114, nameKr: '소나', nameEn: 'Sona', role: 'SUPPORT', roleKr: '현의 명인', player: 'Keria', kda: '0/1/25', imageUrl: BASE_IMAGE_URL + 'Sona.png', iconUrl: BASE_ICON_URL + 'Sona.png', tier: 4, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Keria', kda: '0/1/25', win: true, match: '204 LCK Spring vs T1', items: ['월석 재생기', '흐르는 물의 지팡이', '구원', '불타는 향로', '미카엘의 축복', '명석함의 아이오니아 장화'], trinket: '꿰뚫어 보는 망원 와드'}] },
    { id: 115, nameKr: '소라카', nameEn: 'Soraka', role: 'SUPPORT', roleKr: '별의 아이', player: 'Keria', kda: '0/1/22', imageUrl: BASE_IMAGE_URL + 'Soraka.png', iconUrl: BASE_ICON_URL + 'Soraka.png', tier: 4, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Keria', kda: '0/1/22', win: true, match: '204 LCK Spring vs T1', items: ['월석 재생기', '구원', '미카엘의 축복', '불타는 향로', '슈렐리아의 군가', '기동력의 장화'], trinket: '투명 와드'}] },
    { id: 116, nameKr: '스웨인', nameEn: 'Swain', role: 'SUPPORT', roleKr: '녹서스의 대장군', player: 'Effort', kda: '2/3/15', match: '204 LCK Spring vs NS', imageUrl: BASE_IMAGE_URL + 'Swain.png', iconUrl: BASE_ICON_URL + 'Swain.png', tier: 4, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Effort', kda: '2/3/15', win: false, match: '2024 LCK Spring vs NS', items: ['리안드리의 고통', '존야의 모래시계', '라일라이의 수정홀', '악마의 포옹', '밴시의 장막', '마법사의 신발'], trinket: '투명 와드'}] },
    { id: 117, nameKr: '신드라', nameEn: 'Syndra', role: 'MID', roleKr: '어둠의 여제', player: 'Chovy', kda: '6/1/8', match: '204 LCK Summer vs GEN', imageUrl: BASE_IMAGE_URL + 'Syndra.png', iconUrl: BASE_ICON_URL + 'Syndra.png', tier: 4, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Chovy', kda: '6/1/8', win: true, match: '204 LCK Summer vs GEN', items: ['루덴의 폭풍', '그림자 불꽃', '라바돈의 죽음모자', '공허의 지팡이', '존야의 모래시계', '마법사의 신발'], trinket: '투명 와드'}] },
    { id: 118, nameKr: '신 짜오', nameEn: 'XinZhao', role: 'JUNGLE', roleKr: '데마시아의 호위', player: 'Clid', kda: '6/1/9', match: '204 LCK Summer vs GEN', imageUrl: BASE_IMAGE_URL + 'XinZhao.png', iconUrl: BASE_ICON_URL + 'XinZhao.png', tier: 4, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Clid', kda: '6/1/9', win: true, match: '204 LCK Summer vs GEN', items: ['신성한 파괴자', '칠흑의 양날 도끼', '스테락의 도전', '가시 갑옷', '수호 천사', '판금 장화'], trinket: '투명 와드'}] },
    { id: 119, nameKr: '탈리야', nameEn: 'Taliyah', role: 'MID', roleKr: '바위술사', player: 'Bdd', kda: '7/1/9', match: '204 LCK Summer vs KT', imageUrl: BASE_IMAGE_URL + 'Taliyah.png', iconUrl: BASE_ICON_URL + 'Taliyah.png', tier: 4, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Bdd', kda: '7/1/9', win: true, match: '204 LCK Summer vs KT', items: ['루덴의 폭풍', '존야의 모래시계', '우주 추진력', '공허의 지팡이', '라바돈의 죽음모자', '마법사의 신발'], trinket: '예언자의 렌즈'}] },
    { id: 120, nameKr: '탈론', nameEn: 'Talon', role: 'MID', roleKr: '검의 그림자', player: 'Chovy', kda: '9/2/4', match: '204 LCK Summer vs GEN', imageUrl: BASE_IMAGE_URL + 'Talon.png', iconUrl: BASE_ICON_URL + 'Talon.png', tier: 4, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Chovy', kda: '9/2/4', win: true, match: '204 LCK Summer vs GEN', items: ['돌풍', '세릴다의 원한', '요오무의 유령검', '밤의 끝자락', '수확의 낫', '기동력의 장화'], trinket: '예언자의 렌즈'}] },
    { id: 121, nameKr: '탐 켄치', nameEn: 'TahmKench', role: 'TOP', roleKr: '강의 폭군', player: 'Khan', kda: '0/2/10', match: '204 LCK Summer vs DK', imageUrl: BASE_IMAGE_URL + 'TahmKench.png', iconUrl: BASE_ICON_URL + 'TahmKench.png', tier: 4, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Khan', kda: '0/2/10', win: true, match: '204 LCK Summer vs DK', items: ['태양불꽃 방패', '정령의 형상', '대자연의 힘', '가시 갑옷', '얼어붙은 심장', '헤르메스의 발걸음'], trinket: '투명 와드'}] },
    { id: 122, nameKr: '타릭', nameEn: 'Taric', role: 'SUPPORT', roleKr: '발로란의 방패', player: 'Keria', kda: '0/1/25', match: '204 LCK Spring vs KT', imageUrl: BASE_IMAGE_URL + 'Taric.png', iconUrl: BASE_ICON_URL + 'Taric.png', tier: 4, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Keria', kda: '0/1/25', win: true, match: '2024 LCK Spring vs KT', items: ['강철의 솔라리 펜던트', '기사의 맹세', '미카엘의 축복', '구원', '지크의 융합', '기동력의 장화'], trinket: '투명 와드'}] },
    { id: 123, nameKr: '티모', nameEn: 'Teemo', role: 'TOP', roleKr: '날쌘 정찰병', player: 'TheShy', kda: '5/4/3', imageUrl: BASE_IMAGE_URL + 'Teemo.png', iconUrl: BASE_ICON_URL + 'Teemo.png', tier: 4, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'TheShy', kda: '5/4/3', win: false, match: '204 LPL Summer vs WBG', items: ['리안드리의 고통', '라일라이의 수정홀', '내셔의 이빨', '존야의 모래시계', '공허의 지팡이', '마법사의 신발'], trinket: '꿰뚫어 보는 망원 와드'}] },
    { id: 124, nameKr: '쓰레쉬', nameEn: 'Thresh', role: 'SUPPORT', roleKr: '지옥의 간수', player: 'Keria', kda: '2/3/15', match: '204 LCK Summer vs KT', imageUrl: BASE_IMAGE_URL + 'Thresh.png', iconUrl: BASE_ICON_URL + 'Thresh.png', tier: 4, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Keria', kda: '2/3/15', win: true, match: '204 LCK Summer vs KT', items: ['강철의 솔라리 펜던트', '지크의 융합', '기사의 맹세', '구원', '가시 갑옷', '기동력의 장화'], trinket: '투명 와드'}] },
    { id: 125, nameKr: '트리스타나', nameEn: 'Tristana', role: 'ADC', roleKr: '요들 사수', player: 'Ruler', kda: '10/1/5', match: '204 LPL Spring vs TES', imageUrl: BASE_IMAGE_URL + 'Tristana.png', iconUrl: BASE_ICON_URL + 'Tristana.png', tier: 4, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Ruler', kda: '10/1/5', win: true, match: '204 LPL Spring vs TES', items: ['돌풍', '나보리 명멸검', '무한의 대검', '도미닉 경의 인사', '고속 연사포', '광전사의 군화'], trinket: '예언자의 렌즈'}] },
    { id: 126, nameKr: '트런들', nameEn: 'Trundle', role: 'JUNGLE', roleKr: '트롤 왕', player: 'Oner', kda: '4/2/11', match: '204 LCK Summer vs DK', imageUrl: BASE_IMAGE_URL + 'Trundle.png', iconUrl: BASE_ICON_URL + 'Trundle.png', tier: 4, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Oner', kda: '4/2/11', win: true, match: '204 LCK Summer vs DK', items: ['신성한 파괴자', '거대한 히드라', '정령의 형상', '가시 갑옷', '스테락의 도전', '판금 장화'], trinket: '꿰뚫어 보는 망원 와드'}] },
    { id: 127, nameKr: '트린다미어', nameEn: 'Tryndamere', role: 'TOP', roleKr: '야만전사 왕', player: 'Kiin', kda: '6/2/5', imageUrl: BASE_IMAGE_URL + 'Tryndamere.png', iconUrl: BASE_ICON_URL + 'Tryndamere.png', tier: 4, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Kiin', kda: '6/2/5', win: true, match: '204 LCK Summer vs GEN', items: ['크라켄 학살자', '무한의 대검', '피바라기', '도미닉 경의 인사', '고속 연사포', '광전사의 군화'], trinket: '투명 와드'}] },
    { id: 128, nameKr: '트위스티드 페이트', nameEn: 'TwistedFate', role: 'MID', roleKr: '운명', player: 'ShowMaker', kda: '1/5/11', match: '204 LCK Summer vs DRX', imageUrl: BASE_IMAGE_URL + 'TwistedFate.png', iconUrl: BASE_ICON_URL + 'TwistedFate.png', tier: 4, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'ShowMaker', kda: '1/5/11', win: false, match: '204 LCK Summer vs DRX', items: ['영겁의 지팡이', '존야의 모래시계', '라바돈의 죽음모자', '리치베인', '공허의 지팡이', '마법사의 신발'], trinket: '꿰뚫어 보는 망원 와드'}] },
    { id: 129, nameKr: '트위치', nameEn: 'Twitch', role: 'ADC', roleKr: '역병 쥐', player: 'Gumayusi', kda: '12/2/7', match: '204 LCK Summer vs T1', imageUrl: BASE_IMAGE_URL + 'Twitch.png', iconUrl: BASE_ICON_URL + 'Twitch.png', tier: 4, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Gumayusi', kda: '12/2/7', win: true, match: '204 LCK Summer vs T1', items: ['크라켄 학살자', '무한의 대검', '루난의 허리케인', '도미닉 경의 인사', '피바라기', '광전사의 군화'], trinket: '예언자의 렌즈'}] },
    { id: 130, nameKr: '우디르', nameEn: 'Udyr', role: 'JUNGLE', roleKr: '정령 주술사', player: 'Clid', kda: '4/2/10', match: '204 LCK Spring vs NS', imageUrl: BASE_IMAGE_URL + 'Udyr.png', iconUrl: BASE_ICON_URL + 'Udyr.png', tier: 4, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Clid', kda: '4/2/10', win: true, match: '2024 LCK Spring vs NS', items: ['터보 화공 탱크', '가시 갑옷', '심연의 가면', '대자연의 힘', '정령의 형상', '명석함의 아이오니아 장화'], trinket: '투명 와드'}] },
    { id: 131, nameKr: '우르곳', nameEn: 'Urgot', role: 'TOP', roleKr: '불멸의 파괴자', player: 'Smeb', kda: '5/3/5', match: '204 LCK Spring vs GEN', imageUrl: BASE_IMAGE_URL + 'Urgot.png', iconUrl: BASE_ICON_URL + 'Urgot.png', tier: 4, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Smeb', kda: '5/3/5', win: false, match: '2024 LCK Spring vs GEN', items: ['선혈포식자', '스테락의 도전', '죽음의 무도', '칠흑의 양날 도끼', '가시 갑옷', '판금 장화'], trinket: '꿰뚫어 보는 망원 와드'}] },
    { id: 132, nameKr: '바루스', nameEn: 'Varus', role: 'ADC', roleKr: '복수의 화살', player: 'Ruler', kda: '7/2/8', match: '204 LCK Summer vs T1', imageUrl: BASE_IMAGE_URL + 'Varus.png', iconUrl: BASE_ICON_URL + 'Varus.png', tier: 4, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Ruler', kda: '7/2/8', win: true, match: '204 LCK Summer vs T1', items: ['불멸의 철갑궁', '구인수의 격노검', '마법사의 최후', '몰락한 왕의 검', '고속 연사포', '광전사의 군화'], trinket: '예언자의 렌즈'}] },
    { id: 133, nameKr: '베이가', nameEn: 'Veigar', role: 'MID', roleKr: '악의 작은 지배자', player: 'ShowMaker', kda: '6/3/10', match: '204 LCK Summer vs DK', imageUrl: BASE_IMAGE_URL + 'Veigar.png', iconUrl: BASE_ICON_URL + 'Veigar.png', tier: 4, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'ShowMaker', kda: '6/3/10', win: true, match: '204 LCK Summer vs DK', items: ['루덴의 폭풍', '존야의 모래시계', '라바돈의 죽음모자', '공허의 지팡이', '그림자 불꽃', '마법사의 신발'], trinket: '투명 와드'}] },
    { id: 134, nameKr: '베인', nameEn: 'Vayne', role: 'ADC', roleKr: '어둠 사냥꾼', player: 'Deft', kda: '11/2/4', match: '204 LCK Summer vs DRX', imageUrl: BASE_IMAGE_URL + 'Vayne.png', iconUrl: BASE_ICON_URL + 'Vayne.png', tier: 4, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Deft', kda: '11/2/4', win: true, match: '204 LCK Summer vs DRX', items: ['크라켄 학살자', '구인수의 격노검', '몰락한 왕의 검', '마법사의 최후', '고속 연사포', '광전사의 군화'], trinket: '꿰뚫어 보는 망원 와드'}] },
    { id: 135, nameKr: '벨코즈', nameEn: 'Velkoz', role: 'SUPPORT', roleKr: '공허의 눈', player: 'Effort', kda: '3/4/12', match: '204 LCK Summer vs NS', imageUrl: BASE_IMAGE_URL + 'VelKoz.png', iconUrl: BASE_ICON_URL + 'VelKoz.png', tier: 4, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Effort', kda: '3/4/12', win: false, match: '204 LCK Summer vs NS', items: ['리안드리의 고통', '존야의 모래시계', '라일라이의 수정홀', '공허의 지팡이', '밴시의 장막', '마법사의 신발'], trinket: '투명 와드'}] },
    { id: 136, nameKr: '바이', nameEn: 'Vi', role: 'JUNGLE', roleKr: '필트오버의 집행자', player: 'Canyon', kda: '5/2/10', match: '204 LCK Summer vs GEN', imageUrl: BASE_IMAGE_URL + 'Vi.png', iconUrl: BASE_ICON_URL + 'Vi.png', tier: 4, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Canyon', kda: '5/2/10', win: true, match: '204 LCK Summer vs GEN', items: ['신성한 파괴자', '칠흑의 양날 도끼', '스테락의 도전', '죽음의 무도', '거대한 히드라', '판금 장화'], trinket: '꿰뚫어 보는 망원 와드'}] },

    // Tier 5 (총 35개)
    { id: 137, nameKr: '비에고', nameEn: 'Viego', role: 'JUNGLE', roleKr: '몰락한 왕', player: 'Clid', kda: '8/1/8', match: '204 LCK Spring vs GenG', imageUrl: BASE_IMAGE_URL + 'Viego.png', iconUrl: BASE_ICON_URL + 'Viego.png', tier: 5, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Clid', kda: '8/1/8', win: true, match: '2024 LCK Spring vs GenG', items: ['신성한 파괴자', '몰락한 왕의 검', '스테락의 도전', '죽음의 무도', '거대한 히드라', '판금 장화'], trinket: '투명 와드'}] },
    { id: 138, nameKr: '빅토르', nameEn: 'Viktor', role: 'MID', roleKr: '기계화 혁명가', player: 'Chovy', kda: '8/1/7', match: '204 LCK Summer vs GEN', imageUrl: BASE_IMAGE_URL + 'Viktor.png', iconUrl: BASE_ICON_URL + 'Viktor.png', tier: 5, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Chovy', kda: '8/1/7', win: true, match: '204 LCK Summer vs GEN', items: ['루덴의 폭풍', '존야의 모래시계', '라바돈의 죽음모자', '공허의 지팡이', '그림자 불꽃', '마법사의 신발'], trinket: '예언자의 렌즈'}] },
    { id: 139, nameKr: '블라디미르', nameEn: 'Vladimir', role: 'MID', roleKr: '진홍빛 사신', player: 'Faker', kda: '6/2/5', match: '204 LCK Summer vs T1', imageUrl: BASE_IMAGE_URL + 'Vladimir.png', iconUrl: BASE_ICON_URL + 'Vladimir.png', tier: 5, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Faker', kda: '6/2/5', win: true, match: '204 LCK Summer vs T1', items: ['마법공학 로켓 벨트', '존야의 모래시계', '라바돈의 죽음모자', '공허의 지팡이', '그림자 불꽃', '마법사의 신발'], trinket: '투명 와드'}] },
    { id: 140, nameKr: '볼리베어', nameEn: 'Volibear', role: 'TOP', roleKr: '무자비한 폭풍', player: 'Zeus', kda: '3/3/10', imageUrl: BASE_IMAGE_URL + 'Volibear.png', iconUrl: BASE_ICON_URL + 'Volibear.png', tier: 5, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Zeus', kda: '3/3/10', win: true, match: '204 LCK Summer vs T1', items: ['터보 화공 탱크', '가시 갑옷', '심연의 가면', '대자연의 힘', '정령의 형상', '판금 장화'], trinket: '꿰뚫어 보는 망원 와드'}] },
    { id: 141, nameKr: '워윅', nameEn: 'Warwick', role: 'JUNGLE', roleKr: '자운의 늑대', player: 'Tarzan', kda: '7/1/8', match: '204 LPL Summer vs TES', imageUrl: BASE_IMAGE_URL + 'Warwick.png', iconUrl: BASE_ICON_URL + 'Warwick.png', tier: 5, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Tarzan', kda: '7/1/8', win: true, match: '204 LPL Summer vs TES', items: ['선혈포식자', '스테락의 도전', '죽음의 무도', '칠흑의 양날 도끼', '거대한 히드라', '판금 장화'], trinket: '투명 와드'}] },
    { id: 142, nameKr: '오공', nameEn: 'Wukong', role: 'TOP', roleKr: '원숭이 왕', player: 'TheShy', kda: '5/2/7', imageUrl: BASE_IMAGE_URL + 'Wukong.png', iconUrl: BASE_ICON_URL + 'Wukong.png', tier: 5, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'TheShy', kda: '5/2/7', win: true, match: '204 LPL Summer vs WBG', items: ['신성한 파괴자', '칠흑의 양날 도끼', '스테락의 도전', '죽음의 무도', '수호 천사', '판금 장화'], trinket: '꿰뚫어 보는 망원 와드'}] },
    { id: 143, nameKr: '자야', nameEn: 'Xayah', role: 'ADC', roleKr: '저항의 날개', player: 'Gumayusi', kda: '12/2/6', match: '204 LCK Summer vs T1', imageUrl: BASE_IMAGE_URL + 'Xayah.png', iconUrl: BASE_ICON_URL + 'Xayah.png', tier: 5, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Gumayusi', kda: '12/2/6', win: true, match: '204 LCK Summer vs T1', items: ['크라켄 학살자', '무한의 대검', '피바라기', '도미닉 경의 인사', '고속 연사포', '광전사의 군화'], trinket: '예언자의 렌즈'}] },
    { id: 144, nameKr: '제라스', nameEn: 'Xerath', role: 'MID', roleKr: '초월한 마법사', player: 'ShowMaker', kda: '8/2/11', match: '204 LCK Summer vs DK', imageUrl: BASE_IMAGE_URL + 'Xerath.png', iconUrl: BASE_ICON_URL + 'Xerath.png', tier: 5, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'ShowMaker', kda: '8/2/11', win: true, match: '204 LCK Summer vs DK', items: ['루덴의 폭풍', '존야의 모래시계', '라바돈의 죽음모자', '공허의 지팡이', '그림자 불꽃', '마법사의 신발'], trinket: '투명 와드'}] },
    { id: 145, nameKr: '야스오', nameEn: 'Yasuo', role: 'MID', roleKr: '용서받지 못한 자', player: 'Chovy', kda: '10/3/5', match: '204 LCK Summer vs GEN', imageUrl: BASE_IMAGE_URL + 'Yasuo.png', iconUrl: BASE_ICON_URL + 'Yasuo.png', tier: 5, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Chovy', kda: '10/3/5', win: true, match: '204 LCK Summer vs GEN', items: ['크라켄 학살자', '무한의 대검', '피바라기', '도미닉 경의 인사', '마법사의 최후', '광전사의 군화'], trinket: '예언자의 렌즈'}] },
    { id: 146, nameKr: '요네', nameEn: 'Yone', role: 'MID', roleKr: '잊힌 자', player: 'Faker', kda: '9/2/6', match: '204 LCK Summer vs T1', imageUrl: BASE_IMAGE_URL + 'Yone.png', iconUrl: BASE_ICON_URL + 'Yone.png', tier: 5, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Faker', kda: '9/2/6', win: true, match: '204 LCK Summer vs T1', items: ['크라켄 학살자', '무한의 대검', '피바라기', '도미닉 경의 인사', '마법사의 최후', '광전사의 군화'], trinket: '예언자의 렌즈'}] },
    { id: 147, nameKr: '요릭', nameEn: 'Yorick', role: 'TOP', roleKr: '영혼의 셰퍼드', player: 'Smeb', kda: '3/3/7', match: '204 LCK Spring vs GEN', imageUrl: BASE_IMAGE_URL + 'Yorick.png', iconUrl: BASE_ICON_URL + 'Yorick.png', tier: 5, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Smeb', kda: '3/3/7', win: true, match: '2024 LCK Spring vs GEN', items: ['신성한 파괴자', '거대한 히드라', '스테락의 도전', '정령의 형상', '가시 갑옷', '판금 장화'], trinket: '꿰뚫어 보는 망원 와드'}] },
    { id: 148, nameKr: '유미', nameEn: 'Yuumi', role: 'SUPPORT', roleKr: '마법 고양이', player: 'Keria', kda: '0/0/30', match: '204 LCK Spring vs T1', imageUrl: BASE_IMAGE_URL + 'Yummi.png', iconUrl: BASE_ICON_URL + 'Yummi.png', tier: 5, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Keria', kda: '0/0/30', win: true, match: '2024 LCK Spring vs T1', items: ['월석 재생기', '흐르는 물의 지팡이', '구원', '불타는 향로', '미카엘의 축복', '명석함의 아이오니아 장화'], trinket: '꿰뚫어 보는 망원 와드'}] },
    { id: 149, nameKr: '유나라', nameEn: 'Yunara', role: 'ADC', roleKr: '영혼 세계의 수호자', player: 'Deft', kda: '9/1/6', match: '204 LCK Summer vs DRX', imageUrl: BASE_IMAGE_URL + 'Yunara.png', iconUrl: BASE_ICON_URL + 'Yunara.png', tier: 5, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Deft', kda: '9/1/6', win: true, match: '204 LCK Summer vs DRX', items: ['크라켄 학살자', '나보리 명멸검', '피바라기', '도미닉 경의 인사', '무한의 대검', '광전사의 군화'], trinket: '예언자의 렌즈'}] },
    { id: 150, nameKr: '자크', nameEn: 'Zac', role: 'JUNGLE', roleKr: '비밀 병기', player: 'Pyosik', kda: '2/4/12', match: '204 LCK Summer vs FOX', imageUrl: BASE_IMAGE_URL + 'Zac.png', iconUrl: BASE_ICON_URL + 'Zac.png', tier: 5, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Pyosik', kda: '2/4/12', win: false, match: '204 LCK Summer vs FOX', items: ['터보 화공 탱크', '가시 갑옷', '심연의 가면', '대자연의 힘', '정령의 형상', '명석함의 아이오니아 장화'], trinket: '투명 와드'}] }, 
    { id: 151, nameKr: '제드', nameEn: 'Zed', role: 'MID', roleKr: '그림자의 주인', player: 'Nuguri', kda: '12/1/6', match: '204 LCK Summer vs T1', imageUrl: BASE_IMAGE_URL + 'Zed.png', iconUrl: BASE_ICON_URL + 'Zed.png', tier: 5, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Nuguri', kda: '12/1/6', win: true, match: '204 LCK Summer vs T1', items: ['월식', '세릴다의 원한', '요오무의 유령검', '밤의 끝자락', '수호 천사', '명석함의 아이오니아 장화'], trinket: '예언자의 렌즈'}] },
    { id: 152, nameKr: '제리', nameEn: 'Zeri', role: 'ADC', roleKr: '불꽃', player: 'Prince', kda: '10/3/7', match: '204 LCK Summer vs KDF', imageUrl: BASE_IMAGE_URL + 'Zeri.png', iconUrl: BASE_ICON_URL + 'Zeri.png', tier: 5, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Prince', kda: '10/3/7', win: true, match: '204 LCK Summer vs KDF', items: ['크라켄 학살자', '유령 무희', '무한의 대검', '도미닉 경의 인사', '피바라기', '광전사의 군화'], trinket: '예언자의 렌즈'}] },
    { id: 153, nameKr: '직스', nameEn: 'Ziggs', role: 'MID', roleKr: '전문가 폭파', player: 'Kuzan', kda: '7/3/10', match: '204 LCK Summer vs DRX', imageUrl: BASE_IMAGE_URL + 'Ziggs.png', iconUrl: BASE_ICON_URL + 'Ziggs.png', tier: 5, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Kuzan', kda: '7/3/10', win: true, match: '2024 LCK Summer vs DRX', items: ['루덴의 폭풍', '대천사의 포옹', '밤의 수확자', '공허의 지팡이', '라바돈의 죽음모자', '마법사의 신발'], trinket: '꿰뚫어 보는 망원 와드'}] },
    { id: 154, nameKr: '질리언', nameEn: 'Zilean', role: 'SUPPORT', roleKr: '시간의 수호자', player: 'Life', kda: '0/3/20', match: '204 LCK Summer vs BRO', imageUrl: BASE_IMAGE_URL + 'Zilean.png', iconUrl: BASE_ICON_URL + 'Zilean.png', tier: 5, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Life', kda: '0/3/20', win: false, match: '204 LCK Summer vs BRO', items: ['슈렐리아의 군가', '존야의 모래시계', '구원', '흐르는 물의 지팡이', '미카엘의 축복', '명석함의 아이오니아 장화'], trinket: '투명 와드'}] },
    { id: 155, nameKr: '조이', nameEn: 'Zoe', role: 'MID', roleKr: '황혼의 별', player: 'Dove', kda: '5/4/6', match: '204 LCK Summer vs DRX', imageUrl: BASE_IMAGE_URL + 'Zoe.png', iconUrl: BASE_ICON_URL + 'Zoe.png', tier: 5, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Dove', kda: '5/4/6', win: true, match: '204 LCK Summer vs DRX', items: ['루덴의 폭풍', '그림자 불꽃', '밤의 수확자', '공허의 지팡이', '존야의 모래시계', '마법사의 신발'], trinket: '예언자의 렌즈'}] },
    { id: 156, nameKr: '자이라', nameEn: 'Zyra', role: 'SUPPORT', roleKr: '가시의 화신', player: 'Keria', kda: '1/3/17', match: '204 LCK Summer vs KT', imageUrl: BASE_IMAGE_URL + 'Zyra.png', iconUrl: BASE_ICON_URL + 'Zyra.png', tier: 5, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Keria', kda: '1/3/17', win: true, match: '204 LCK Summer vs KT', items: ['리안드리의 고통', '라일라이의 수정홀', '밴시의 장막', '존야의 모래시계', '공허의 지팡이', '마법사의 신발'], trinket: '투명 와드'}] },
    
    // Tier 5 추가 챔피언 (160 ~ 171)
    { id: 157, nameKr: '판테온', nameEn: 'Pantheon', role: 'TOP', roleKr: '부서지지 않는 창', player: 'Kiin', kda: '6/3/7', imageUrl: BASE_IMAGE_URL + 'Pantheon.png', iconUrl: BASE_ICON_URL + 'Pantheon.png', tier: 5, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Kiin', kda: '6/3/7', win: true, match: '204 LCK Summer vs GEN', items: ['신성한 파괴자', '칠흑의 양날 도끼', '스테락의 도전', '죽음의 무도', '수호 천사', '명석함의 아이오니아 장화'], trinket: '투명 와드'}] },
    { id: 158, nameKr: '세라핀', nameEn: 'Seraphine', role: 'SUPPORT', roleKr: '꿈꾸는 아이돌', player: 'Lehends', kda: '0/2/22', imageUrl: BASE_IMAGE_URL + 'Seraphine.png', iconUrl: BASE_ICON_URL + 'Seraphine.png', tier: 5, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Lehends', kda: '0/2/22', win: true, match: '204 LCK Spring vs NS', items: ['월석 재생기', '흐르는 물의 지팡이', '구원', '불타는 향로', '미카엘의 축복', '명석함의 아이오니아 장화'], trinket: '꿰뚫어 보는 망원 와드'}] },
    { id: 159, nameKr: '스몰더', nameEn: 'Smolder', role: 'ADC', roleKr: '불타는 아이', player: 'Gumayusi', kda: '11/1/9', imageUrl: BASE_IMAGE_URL + 'Smolder.png', iconUrl: BASE_ICON_URL + 'Smolder.png', tier: 5, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Gumayusi', kda: '11/1/9', win: true, match: '204 LCK Summer vs T1', items: ['크라켄 학살자', '구인수의 격노검', '라바돈의 죽음모자', '마법사의 최후', '공허의 지팡이', '광전사의 군화'], trinket: '예언자의 렌즈'}] },
    { id: 160, nameKr: '흐웨이', nameEn: 'Hwei', role: 'MID', roleKr: '비전 마술사', player: 'ShowMaker', kda: '8/2/10', match: '204 LCK Summer vs DK', imageUrl: BASE_IMAGE_URL + 'Hwei.png', iconUrl: BASE_ICON_URL + 'Hwei.png', tier: 5, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'ShowMaker', kda: '8/2/10', win: true, match: '204 LCK Summer vs DK', items: ['루덴의 폭풍', '존야의 모래시계', '라바돈의 죽음모자', '공허의 지팡이', '그림자 불꽃', '마법사의 신발'], trinket: '투명 와드'}] },
    { id: 161, nameKr: '밀리오', nameEn: 'Milio', role: 'SUPPORT', roleKr: '친절한 불꽃', player: 'Milio', kda: '0/1/25', imageUrl: BASE_IMAGE_URL + 'Milio.png', iconUrl: BASE_ICON_URL + 'Milio.png', tier: 5, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Milio', kda: '0/1/25', win: true, match: '204 LCK Spring vs NS', items: ['월석 재생기', '흐르는 물의 지팡이', '구원', '불타는 향로', '미카엘의 축복', '명석함의 아이오니아 장화'], trinket: '꿰뚫어 보는 망원 와드'}] },
    { id: 162, nameKr: '바루스', nameEn: 'Varus', role: 'ADC', roleKr: '복수의 화살', player: 'Ruler', kda: '7/2/8', match: '204 LCK Summer vs T1', imageUrl: BASE_IMAGE_URL + 'Varus.png', iconUrl: BASE_ICON_URL + 'Varus.png', tier: 5, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Ruler', kda: '7/2/8', win: true, match: '204 LCK Summer vs T1', items: ['불멸의 철갑궁', '구인수의 격노검', '마법사의 최후', '몰락한 왕의 검', '고속 연사포', '광전사의 군화'], trinket: '예언자의 렌즈'}] },
    { id: 163, nameKr: '암베사', nameEn: 'Ambesa', role: 'JUNGLE', roleKr: '맹렬한 포식자', player: 'Canyon', kda: '8/2/7', match: '204 LCK Summer vs GEN', imageUrl: BASE_IMAGE_URL + 'Ambessa.png', iconUrl: BASE_ICON_URL + 'Ambessa.png', tier: 5, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Canyon', kda: '8/2/7', win: true, match: '204 LCK Summer vs GEN', items: ['신성한 파괴자', '칠흑의 양날 도끼', '스테락의 도전', '죽음의 무도', '거대한 히드라', '판금 장화'], trinket: '투명 와드'}] },
    { id: 164, nameKr: '바이', nameEn: 'Vi', role: 'JUNGLE', roleKr: '필트오버의 집행자', player: 'Canyon', kda: '5/2/10', match: '204 LCK Summer vs GEN', imageUrl: BASE_IMAGE_URL + 'Vi.png', iconUrl: BASE_ICON_URL + 'Vi.png', tier: 5, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Canyon', kda: '5/2/10', win: true, match: '204 LCK Summer vs GEN', items: ['신성한 파괴자', '칠흑의 양날 도끼', '스테락의 도전', '죽음의 무도', '거대한 히드라', '판금 장화'], trinket: '꿰뚫어 보는 망원 와드'}] },
    { id: 165, nameKr: '볼리베어', nameEn: 'Volibear', role: 'TOP', roleKr: '무자비한 폭풍', player: 'Zeus', kda: '3/3/10', imageUrl: BASE_IMAGE_URL + 'Volibear.png', iconUrl: BASE_ICON_URL + 'Volibear.png', tier: 5, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Zeus', kda: '3/3/10', win: true, match: '204 LCK Summer vs T1', items: ['터보 화공 탱크', '가시 갑옷', '심연의 가면', '대자연의 힘', '정령의 형상', '판금 장화'], trinket: '꿰뚫어 보는 망원 와드'}] },
    { id: 166, nameKr: '워윅', nameEn: 'Warwick', role: 'JUNGLE', roleKr: '자운의 늑대', player: 'Tarzan', kda: '7/1/8', match: '204 LPL Summer vs TES', imageUrl: BASE_IMAGE_URL + 'Warwick.png', iconUrl: BASE_ICON_URL + 'Warwick.png', tier: 5, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Tarzan', kda: '7/1/8', win: true, match: '204 LPL Summer vs TES', items: ['선혈포식자', '스테락의 도전', '죽음의 무도', '칠흑의 양날 도끼', '거대한 히드라', '판금 장화'], trinket: '투명 와드'}] },
    { id: 167, nameKr: '오공', nameEn: 'Wukong', role: 'TOP', roleKr: '원숭이 왕', player: 'TheShy', kda: '5/2/7', imageUrl: BASE_IMAGE_URL + 'Wukong.png', iconUrl: BASE_ICON_URL + 'Wukong.png', tier: 5, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'TheShy', kda: '5/2/7', win: true, match: '204 LPL Summer vs WBG', items: ['신성한 파괴자', '칠흑의 양날 도끼', '스테락의 도전', '죽음의 무도', '수호 천사', '판금 장화'], trinket: '꿰뚫어 보는 망원 와드'}] },
    { id: 168, nameKr: '자야', nameEn: 'Xayah', role: 'ADC', roleKr: '저항의 날개', player: 'Gumayusi', kda: '12/2/6', match: '204 LCK Summer vs T1', imageUrl: BASE_IMAGE_URL + 'Xayah.png', iconUrl: BASE_ICON_URL + 'Xayah.png', tier: 5, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Gumayusi', kda: '12/2/6', win: true, match: '204 LCK Summer vs T1', items: ['크라켄 학살자', '무한의 대검', '피바라기', '도미닉 경의 인사', '고속 연사포', '광전사의 군화'], trinket: '예언자의 렌즈'}] },
    { id: 169, nameKr: '제라스', nameEn: 'Xerath', role: 'MID', roleKr: '초월한 마법사', player: 'ShowMaker', kda: '8/2/11', match: '204 LCK Summer vs DK', imageUrl: BASE_IMAGE_URL + 'Xerath.png', iconUrl: BASE_ICON_URL + 'Xerath.png', tier: 5, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'ShowMaker', kda: '8/2/11', win: true, match: '204 LCK Summer vs DK', items: ['루덴의 폭풍', '존야의 모래시계', '라바돈의 죽음모자', '공허의 지팡이', '그림자 불꽃', '마법사의 신발'], trinket: '투명 와드'}] },
    { id: 170, nameKr: '야스오', nameEn: 'Yasuo', role: 'MID', roleKr: '용서받지 못한 자', player: 'Chovy', kda: '10/3/5', imageUrl: BASE_IMAGE_URL + 'Yasuo.png', iconUrl: BASE_ICON_URL + 'Yasuo.png', tier: 5, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Chovy', kda: '10/3/5', win: true, match: '204 LCK Summer vs GEN', items: ['크라켄 학살자', '무한의 대검', '피바라기', '도미닉 경의 인사', '마법사의 최후', '광전사의 군화'], trinket: '예언자의 렌즈'}] },
    { id: 171, nameKr: '요네', nameEn: 'Yone', role: 'MID', roleKr: '잊힌 자', player: 'Faker', kda: '9/2/6', match: '204 LCK Summer vs T1', imageUrl: BASE_IMAGE_URL + 'Yone.png', iconUrl: BASE_ICON_URL + 'Yone.png', tier: 5, matchHistory: [{itemsURL: BASE_ITEM_URL, player: 'Faker', kda: '9/2/6', win: true, match: '204 LCK Summer vs T1', items: ['크라켄 학살자', '무한의 대검', '피바라기', '도미닉 경의 인사', '마법사의 최후', '광전사의 군화'], trinket: '예언자의 렌즈'}] }
];

// ** NOTE: const champions = [...] 배열은 이 JS 파일 위에 정의되어 있다고 가정합니다. **

let currentFilterRole = 'ALL';
let currentSearchTerm = '';
let displayMode = 'showcase'; // 'showcase' 또는 'tierlist'

const championDisplay = document.getElementById('championDisplay'); 
const leftContentContainer = document.getElementById('leftContentContainer'); 
const championCardContainer = document.getElementById('championCardContainer');
const tierListContainer = document.getElementById('tierListContainer');
const filterButtons = document.querySelectorAll('.filter-button');
const searchInput = document.getElementById('championSearch');
const championDetailPanel = document.getElementById('championDetailPanel');
const toggleDisplayButton = document.getElementById('toggleDisplayButton');
const leftSidebarInner = document.getElementById('leftSidebarInner');
const detailPanelInner = document.getElementById('detailPanelInner');

// 상세 패널 요소들
const detailContent = document.getElementById('detailContent');
const noDetailSelected = document.getElementById('noDetailSelected');
const detailChampionIcon = document.getElementById('detailChampionIcon');
const detailChampionNameKr = document.getElementById('detailChampionNameKr');
const detailChampionRoleKr = document.getElementById('detailChampionRoleKr');

let hideDetailTimer = null; // 상세 패널 닫기 타이머 제어용
let tierListShowTimer = null; // 티어 리스트 표시 타이머 제어용
// 1. 카드 생성 함수 (Showcase 모드) - hover '올라감' 효과 속도 조절
function createChampionCard(champion) {
    // KDA 텍스트 (e.g., "10/3/5")
    const kdaText = champion.kda || '0/0/0';
    
    // 첫 번째 매치 정보 가져오기
    const firstMatch = champion.matchHistory?.[0] || {};
    const items = firstMatch.items || [];
    const isWin = firstMatch.win;
    
    // --- 아이템 6개 HTML 생성 ---
    let itemHtml = '';
    for (let i = 0; i < 6; i++) { 
        const itemName = items[i] || null; 
        const itemUrl = itemName 
            ? firstMatch.itemsURL + itemName + '.webp' 
            : 'https://placehold.co/16x16/27272A/27272A?text='; 
        const isPlaceholder = !itemName;

        itemHtml += `
            <div class="w-4 h-4 rounded-full overflow-hidden ${isPlaceholder ? 'bg-zinc-800' : ''}" title="${itemName || 'No Item'}">
                <img src="${itemUrl}" 
                     onerror="this.onerror=null;this.src='https://placehold.co/16x16/27272A/27272A?text=';" 
                     alt="Item" class="w-full h-full object-cover"/>
            </div>
        `;
    }
    
    // --- 승/패 뱃지 스타일 ---
    const winLossBadgeClass = isWin 
        ? 'border border-green-500 bg-green-500/20 text-green-300' 
        : 'border border-red-500 bg-red-500/20 text-red-300';

    // --- 메인 카드 HTML 반환 ---
    return `
        <div class="champion-card group relative overflow-hidden rounded-3xl cursor-pointer transition-transform duration-300 hover:-translate-y-4" onclick="showChampionDetail(${champion.id})">
            
            <div class="relative aspect-[4/3] overflow-hidden"> 
                <img src="${champion.imageUrl}" 
                     onerror="this.onerror=null;this.src='https://placehold.co/400x300/1F2937/D1D5DB?text=No+Image';" 
                     alt="${champion.nameKr} 스플래시 아트" 
                     class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" />

                <span class="absolute top-3 left-3 text-xs font-bold px-2 py-0.5 rounded-md text-white bg-black/60 shadow-md z-10">
                    ${champion.role}
                </span>
                
                <div class="absolute bottom-3 left-3 right-3 text-white">
                    <h3 class="text-xl font-bold text-white leading-tight">${champion.nameKr}</h3>
                    <p class="text-xs text-gray-400 mt-0.5">${champion.roleKr}</p>
                </div>
            </div>

            <div class="p-3 bg-indigo-950 text-white"> 
                
                <div class="flex justify-between items-center">
                    <div class="flex items-center space-x-1.5">
                        <div class="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                        <span class="text-sm font-medium text-purple-400">${champion.player}</span>
                    </div>
                    <span class="text-xs font-bold px-3 py-0.5 rounded-full ${winLossBadgeClass}">
                        ${isWin ? 'WIN' : 'LOSS'}
                    </span>
                </div>

                <div class="flex justify-between items-end mt-4">
                    <div class="space-y-1">
                        <span class="font-bold text-white text-sm">${kdaText}</span>
                        <p class="text-xs text-gray-500">${firstMatch.match}</p>
                    </div>
                    <div class="flex space-x-1">
                        ${itemHtml}
                    </div>
                </div>
            </div>
        </div>
    `;
}
// 2. 티어 리스트 렌더링 함수 (유지)
function renderTierList(filteredChampions) {
    tierListContainer.innerHTML = '';
    
    const groupedByTier = filteredChampions.reduce((acc, champ) => {
        const tierKey = champ.tier || 4; 
        if (!acc[tierKey]) {
            acc[tierKey] = [];
        }
        acc[tierKey].push(champ);
        return acc;
    }, {});

    const sortedTiers = Object.keys(groupedByTier).sort((a, b) => parseInt(a) - parseInt(b));

    sortedTiers.forEach(tier => {
        const tierChampions = groupedByTier[tier];
        
        let tierHtml = `
            <div class="mb-8">
                <h2 class="text-2xl font-extrabold text-white mb-4" style="color: var(--primary-purple);">TIER ${tier}</h2>
                <div class="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-10 gap-3">
        `;
        
        tierChampions.forEach(champion => {
            const iconToUse = champion.iconUrl || champion.imageUrl; 
            
            tierHtml += `
                <div class="flex flex-col items-center cursor-pointer group" onclick="showChampionDetail(${champion.id})">
                    <img src="${iconToUse}" onerror="this.onerror=null;this.src='https://placehold.co/60x60/1a1a2e/8B5CF6?text=?';" alt="${champion.nameKr} 아이콘" class="tier-champion-icon group-hover:border-purple-500" />
                    <p class="text-xs mt-1 text-gray-300 group-hover:text-white text-center truncate">${champion.nameKr}</p>
                </div>
            `;
        });
        
        tierHtml += `
                </div>
            </div>
        `;
        tierListContainer.innerHTML += tierHtml;
    });
    
    if (filteredChampions.length === 0) {
        tierListContainer.innerHTML = '<p class="col-span-full text-center py-10 text-gray-400">검색 결과가 없습니다.</p>';
    }
}


// 3. 챔피언 필터링 및 렌더링 함수 (수정)
function filterChampions() {
    currentSearchTerm = searchInput.value.toLowerCase().trim();

    const championsToFilter = champions; 
    
    let filtered = championsToFilter.filter(champion => {
        const roleMatch = currentFilterRole === 'ALL' || champion.role === currentFilterRole;
        const searchMatch = !currentSearchTerm ||
                                  champion.nameKr.toLowerCase().includes(currentSearchTerm) ||
                                  champion.nameEn.toLowerCase().includes(currentSearchTerm) ||
                                  champion.player.toLowerCase().includes(currentSearchTerm);
        return roleMatch && searchMatch;
    });

    // Showcase 카드 렌더링: 유지
    championCardContainer.innerHTML = '';
    filtered.slice(0, 5).forEach(champion => {
        championCardContainer.innerHTML += createChampionCard(champion);
    });
    
    // Tier List 렌더링
    renderTierList(filtered);

    // ********** 티어 목록 표시/숨김 부드럽게 (CSS opacity와 연동) **********
    
    // 이전 타이머가 있다면 취소 (중첩 방지)
    if (tierListShowTimer) {
        clearTimeout(tierListShowTimer);
        tierListShowTimer = null;
    }

    if (displayMode === 'showcase') {
        // '전체 보기'에서 '쇼케이스'로 돌아갈 때: opacity 0으로 전환 후 display: none
        tierListContainer.style.opacity = 0;
        tierListShowTimer = setTimeout(() => {
            tierListContainer.style.display = 'none';
            tierListShowTimer = null;
        }, 400); // CSS transition 시간(0.4s)과 동기화
        
    } else {
        // '쇼케이스'에서 '전체 보기'로 전환할 때 (천천히 나타나는 느낌)
        tierListContainer.style.opacity = 0; 
        tierListContainer.style.display = 'block'; // 공간을 차지하도록 display 설정

        // 짧은 딜레이 후 opacity 전환 시작 (CSS transition 발동)
        tierListShowTimer = setTimeout(() => {
            tierListContainer.style.opacity = 1;
            tierListShowTimer = null;
        }, 10); 
    }
    // *************************************************************

    hideChampionDetail(); // 상세 패널 닫기 (새 필터 적용 시)
}

// 4. 화면 모드 전환 함수 (유지)
function toggleDisplayMode() {
    // hideDetail()은 filterChampions 내부에서 호출되므로, 여기서는 모드만 토글
    
    if (displayMode === 'showcase') {
        displayMode = 'tierlist';
        toggleDisplayButton.textContent = '챔피언 쇼케이스로 돌아가기';
        
    } else {
        displayMode = 'showcase';
        toggleDisplayButton.textContent = '전체 챔피언 보기';
    }
    
    filterChampions(); 
}
// 5. 챔피언 상세 정보 패널 관련 함수 (애니메이션 적용 - 전체 코드)
function showChampionDetail(id) {
    const champion = champions.find(c => c.id === id);
    if (!champion) return;

    // 상세 패널 닫기 타이머가 있다면 취소 (새로운 패널이 열리므로)
    if (hideDetailTimer) {
        clearTimeout(hideDetailTimer);
        hideDetailTimer = null;
    }
    
    const detailContentDiv = document.getElementById('detailContent');
    
    // 챔피언 기본 정보 업데이트
    detailChampionIcon.src = champion.iconUrl; 
    detailChampionNameKr.textContent = champion.nameKr;
    detailChampionRoleKr.textContent = champion.roleKr;

    // ********** 상세 매치 히스토리 렌더링 로직 (복구) **********
    const mockMatches = champion.matchHistory || [];
    let matchHtml = '';

    if (mockMatches.length === 0) {
        matchHtml = `<div class="text-center text-gray-500 pt-4 pb-4">전적이 없습니다.</div>`;
    } else {
        mockMatches.forEach(match => {
            
            // --- 1. KDA 텍스트 (예: "8/8/7") ---
            const kdaParts = match.kda.split('/');
            const kills = kdaParts[0] || '0';
            const deaths = kdaParts[1] || '0';
            const assists = kdaParts[2] || '0';
            const kdaText = `${kills}/${deaths}/${assists}`;

            // --- 2. 아이템 HTML 생성 ---
            let itemGridHtml = '';
            for (let i = 0; i < 6; i++) {
                const itemKrName = match.items[i] || null;
                const itemUrl = itemKrName ? match.itemsURL + itemKrName + '.webp' : 'https://placehold.co/28x28/27272A/27272A?text=';
                itemGridHtml += `
                    <div class="w-7 h-7" title="${itemKrName || 'No Item'}">
                        <img src="${itemUrl}" onerror="this.onerror=null;this.src='https://placehold.co/28x28/27272A/27272A?text=';" alt="Item" class="w-full h-full rounded-md"/>
                    </div>
                `;
            }
            
            const trinketName = match.trinket;
            const trinketUrl = trinketName ? match.itemsURL + trinketName + '.webp' : 'https://placehold.co/28x28/27272A/27272A?text=';
            itemGridHtml += `
                <div class="w-7 h-7" title="${trinketName || 'No Item'}">
                    <img src="${trinketUrl}" onerror="this.onerror=null;this.src='https://placehold.co/28x28/27272A/27272A?text=';" alt="Trinket" class="w-full h-full rounded-md"/>
                </div>
            `;
            
            // --- 3. 승/패 뱃지 스타일 (카드와 동일하게) ---
            const winLossBadgeClass = match.win 
                ? 'border border-green-500 bg-green-500/20 text-green-300'
                : 'border border-red-500 bg-red-500/20 text-red-300';
            const winStatusText = match.win ? '승리' : '패배';

            // --- 4. 최종 matchHtml 조합 (이미지 레이아웃에 맞게) ---
            matchHtml += `
                <div class="py-3 border-b border-indigo-900 last:border-b-0">
                    <div class="flex justify-between items-center mb-1.5">
                        <span class="text-md font-bold text-purple-300">${match.player}</span>
                        <span class="text-xs font-bold px-3 py-0.5 rounded-full ${winLossBadgeClass}">
                            ${winStatusText}
                        </span>
                    </div>
                    <div class="flex justify-between items-center mb-2.5">
                        <span class="font-bold text-white text-sm">${kdaText}</span>
                        <span class="text-xs text-gray-400">${match.match}</span>
                    </div>
                    <div class="flex space-x-1">
                        ${itemGridHtml}
                    </div>
                </div>
            `;
        });
    }

    const matchDetailContainer = detailContentDiv.querySelector('#matchHistoryContainer');
    matchDetailContainer.innerHTML = matchHtml;
    // ********** 렌더링 로직 종료 **********


    // ----------------------------------------------------
    // --- 애니메이션 적용된 패널 열기 로직 ---

    // 1. (추가) 레이아웃 컨테이너에 애니메이션 클래스 적용
    championDisplay.classList.add('transition-all', 'duration-500', 'ease-in-out');
    leftContentContainer.classList.add('transition-all', 'duration-500', 'ease-in-out');

    // 2. 6열 레이아웃으로 변경 (부드럽게 줄어듦)
    championDisplay.classList.remove('lg:grid-cols-5');
    championDisplay.classList.add('lg:grid-cols-6');
    leftContentContainer.classList.add('lg:col-span-5');

    // 3. 상세 패널 표시 (display: block을 먼저 적용)
    championDetailPanel.style.display = 'block';
    detailContent.style.display = 'block';
    noDetailSelected.style.display = 'none';

    // 짧은 딜레이 후 opacity 전환 시작 (부드럽게 등장)
    setTimeout(() => {
        championDetailPanel.classList.add('active');
    }, 10);
    // ----------------------------------------------------
}
function hideChampionDetail() {
    // 중복 타이머 방지 (이미 타이머가 실행 중이라면 이전 타이머를 취소)
    if (hideDetailTimer) {
        clearTimeout(hideDetailTimer);
        hideDetailTimer = null;
        // 타이머가 취소되면 display: none이 되지 않았을 수 있으므로, 여기서 바로 return하지 않습니다.
    }
    
    // 패널이 이미 display: none 상태라면 할 필요가 없음.
    if (championDetailPanel.style.display === 'none') {
        return;
    }
    
    // 1. 상세 패널 숨김 (opacity 전환 시작)
    championDetailPanel.classList.remove('active');

    // CSS의 opacity transition 시간(0.5s)이 지난 후 display: none 적용 및 레이아웃 복귀
    const transitionDuration = 500; // CSS의 transition-duration (0.5s)과 동기화
    
    hideDetailTimer = setTimeout(() => {
        // 2. 5열 레이아웃으로 복귀 (CSS transition으로 부드럽게 돌아옴)
        championDisplay.classList.remove('lg:grid-cols-6');
        championDisplay.classList.add('lg:grid-cols-5');
        leftContentContainer.classList.remove('lg:col-span-5');

        // 3. 요소들을 DOM에서 완전히 숨김
        championDetailPanel.style.display = 'none';
        detailContent.style.display = 'none';
        noDetailSelected.style.display = 'block';
        
        hideDetailTimer = null; // 타이머 완료
    }, transitionDuration); 
}

// 6. 필터 버튼 이벤트 리스너 설정 (유지)
filterButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        filterButtons.forEach(btn => btn.classList.remove('active', 'bg-purple-700', 'text-white'));
        filterButtons.forEach(btn => btn.classList.add('text-gray-300', 'hover:bg-gray-700'));
        
        e.currentTarget.classList.add('active', 'bg-purple-700', 'text-white');
        e.currentTarget.classList.remove('text-gray-300', 'hover:bg-gray-700');

        currentFilterRole = e.currentTarget.getAttribute('data-role');
        filterChampions();
    });
});

// 초기 로드 (유지)
window.onload = () => {
    filterChampions();
};