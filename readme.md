# LCKDBS - League of Legends Champions Korea Database System

![LCK](https://img.shields.io/badge/LCK-Database-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)

**LCKDBS**는 한국 리그 오브 레전드 챔피언스 코리아(LCK)의 팀, 선수, 경기 데이터를 제공하는 종합 데이터베이스 웹 애플리케이션입니다.

## 📋 목차

- [주요 기능](#-주요-기능)
- [프로젝트 구조](#-프로젝트-구조)
- [기술 스택](#-기술-스택)
- [페이지 구성](#-페이지-구성)
- [데이터베이스](#-데이터베이스)
- [설치 및 실행](#-설치-및-실행)
- [기여하기](#-기여하기)

## ✨ 주요 기능

### 🏠 홈페이지
- **실시간 경기 정보**: LIVE 매치 상태 표시 및 경기 일정 확인
- **팀 순위**: 현재 시즌 팀 랭킹 및 승률 통계
- **OP 챔피언**: 메타 챔피언 통계 및 픽률 정보
- **토크 웨이브**: 최신 LCK 뉴스 및 커뮤니티 소식

### 👥 팀 & 선수 정보
- **역대 팀 데이터**: 2012년부터 2026년까지의 모든 LCK 팀 정보
- **선수 데이터베이스**: 팀별, 포지션별 선수 검색 및 필터링
- **선수 상세 정보**: 
  - 시즌별 스탯 레이더 차트
  - 포지션별 능력치 (공격, 수비, 라인전, 운영, 시야, 성장)
  - 선수 프로필 및 이미지
- **인터랙티브 UI**: 
  - 팀 카드 호버 시 선수 목록 표시
  - 선수 검색 (닉네임, 본명, 팀명, 키워드)
  - 포지션 필터 (TOP, JUNGLE, MID, ADC, SUPPORT)

### 📊 파워 랭킹
- **선수 순위**: 포지션별 선수 파워 랭킹
- **상세 스탯**: 선수별 능력치 비교 및 분석
- **반응형 디자인**: 모바일 및 데스크톱 최적화

### 💬 커뮤니티
- **게시판 시스템**: 
  - 카테고리별 게시물 관리 (자유게시판, 질문, 공지사항 등)
  - Quill.js 기반 리치 텍스트 에디터
  - 이미지 및 비디오 첨부 (최대 10MB)
- **댓글 시스템**: 게시물별 댓글 작성 및 관리
- **게시물 관리**: 
  - 작성자 인증 기반 수정/삭제
  - 비밀번호 보호
  - LocalStorage 기반 데이터 저장

### 📈 통계 페이지
- **경기 통계**: 팀별, 선수별 상세 통계
- **시각화**: 차트 및 그래프를 통한 데이터 시각화

## 📁 프로젝트 구조

```
lckdbs/
├── index.html              # 메인 홈페이지
├── style.css              # 메인 스타일시트
├── readme.md              # 프로젝트 문서
│
├── html/                  # HTML 페이지
│   ├── player-new.html    # 팀/선수 정보 페이지
│   ├── com.html          # 커뮤니티 게시판
│   ├── ranking.html      # 파워 랭킹
│   ├── mainstat.html     # 통계 페이지
│   ├── post.html         # 게시물 상세
│   ├── write.html        # 게시물 작성
│   └── match.html        # 경기 정보
│
├── css/                   # 스타일시트
│   ├── nav.css           # 네비게이션 바
│   ├── home.css          # 홈페이지 스타일
│   ├── player-new.css    # 선수 페이지 스타일
│   ├── com.css           # 커뮤니티 스타일
│   ├── post.css          # 게시물 스타일
│   ├── write.css         # 작성 페이지 스타일
│   ├── mainstat.css      # 통계 페이지 스타일
│   ├── match-history.css # 경기 기록 스타일
│   └── detailplayer.css  # 선수 상세 스타일
│
├── js/                    # JavaScript 모듈
│   ├── team.js           # 팀 데이터 (2012-2026)
│   ├── home.js           # 홈페이지 로직
│   ├── com.js            # 커뮤니티 기능
│   ├── mainstat.js       # 통계 페이지 로직
│   ├── power_rankings.js # 파워 랭킹 로직
│   ├── main.js           # 공통 유틸리티
│   │
│   ├── playerjs/         # 선수 관련 모듈
│   │   ├── player-data.js    # 선수 데이터 초기화
│   │   └── player-season.js  # 시즌별 선수 데이터
│   │
│   └── teamplayerjs/     # 팀/선수 UI 모듈
│       ├── playerbuild.js    # 선수 카드 빌더
│       └── playernav.js      # 네비게이션 로직
│
├── json/                  # JSON 데이터 파일
│   └── [데이터 파일들]
│
├── photos/                # 이미지 리소스
│   ├── assets/           # 팀 로고
│   ├── players/          # 선수 사진
│   ├── playerspng/       # 선수 PNG 이미지
│   ├── playersjpg/       # 선수 JPG 이미지
│   ├── champions/        # 챔피언 이미지
│   └── icons/            # UI 아이콘
│
├── playerdetail-html/     # 선수 상세 페이지 (60개)
│   └── [선수별 HTML 파일들]
│
└── old-ver/              # 레거시 버전 (참고용)
    └── [구버전 파일들]
```

## 🛠 기술 스택

### Frontend
- **HTML5**: 시맨틱 마크업
- **CSS3**: 
  - Vanilla CSS (커스텀 스타일)
  - Tailwind CSS (일부 페이지)
  - 반응형 디자인
  - 글래스모피즘 효과
- **JavaScript (ES6+)**:
  - 모듈화된 아키텍처
  - 이벤트 기반 프로그래밍
  - LocalStorage API
  - Fetch API

### 라이브러리
- **Quill.js**: 리치 텍스트 에디터 (커뮤니티)
- **Tailwind CSS**: 유틸리티 CSS 프레임워크

### 데이터 관리
- **LocalStorage**: 커뮤니티 게시물 및 댓글 저장
- **JavaScript 객체**: 팀/선수 데이터 (2012-2026)

## 📄 페이지 구성

### 1. 홈페이지 (`index.html`)
- 히어로 섹션: 실시간 경기 정보
- 경기 일정: 어제/오늘/내일 탭
- 팀 순위: 상위 4팀 표시
- OP 챔피언: 메타 챔피언 통계
- 토크 웨이브: 최신 뉴스

### 2. 팀/선수 페이지 (`html/player-new.html`)
- 시즌 선택 드롭다운 (2020-2025)
- 선수 검색 기능
- 포지션 필터 칩 (ALL, TOP, JUNGLE, MID, ADC, SUPPORT)
- 팀 카드 그리드 (10개 팀)
- 선수 상세 팝업:
  - 프로필 이미지
  - 시즌별 스탯 탭 (2024, 2023)
  - 레이더 차트 (6개 지표)
  - 선수 상세 페이지 링크

### 3. 커뮤니티 (`html/com.html`)
- 게시물 목록
- 카테고리 필터
- 게시물 작성/수정/삭제
- 댓글 시스템
- 파일 첨부 (이미지/비디오)

### 4. 파워 랭킹 (`html/ranking.html`)
- 포지션별 선수 랭킹
- 상세 스탯 표시
- 반응형 그리드 레이아웃

### 5. 통계 페이지 (`html/mainstat.html`)
- 팀/선수 통계
- 차트 및 그래프

## 🗄 데이터베이스

### 팀 데이터 (`js/team.js`)
- **기간**: 2012년 ~ 2026년
- **포함 정보**:
  - 팀명, 로고 경로
  - 시즌별 로스터
  - 선수 정보 (닉네임, 본명, 포지션, 이미지, 검색 키워드)

### 선수 데이터
- **총 선수 수**: 수백 명 (역대 LCK 선수)
- **선수 정보**:
  - 닉네임, 본명 (한글)
  - 포지션 (TOP, JUG, MID, BOT, SUP)
  - 팀 소속
  - 프로필 이미지
  - 검색 키워드
  - 시즌별 스탯 (공격, 수비, 라인전, 운영, 시야, 성장)

### 커뮤니티 데이터
- **저장 방식**: LocalStorage
- **데이터 구조**:
  - 게시물: ID, 카테고리, 작성자, 제목, 내용, 첨부파일, 비밀번호, 작성일, 조회수
  - 댓글: ID, 게시물 ID, 작성자, 내용, 비밀번호, 작성일

## 🚀 설치 및 실행

### 요구사항
- 웹 브라우저 (Chrome, Firefox, Safari, Edge 등)
- 로컬 웹 서버 (선택사항)

### 실행 방법

#### 1. 직접 실행
```bash
# 프로젝트 클론
git clone [repository-url]
cd lckdbs

# index.html 파일을 브라우저로 열기
```

#### 2. 로컬 서버 사용 (권장)
```bash
# Python 3 사용
python -m http.server 8000

# Node.js 사용
npx http-server

# 브라우저에서 접속
http://localhost:8000
```

### 주의사항
- 일부 기능은 로컬 서버 환경에서만 정상 작동합니다 (CORS 정책)
- 커뮤니티 데이터는 LocalStorage에 저장되므로 브라우저 캐시 삭제 시 데이터가 손실됩니다

## 🎨 주요 기능 상세

### 선수 검색 시스템
- **검색 대상**: 닉네임, 본명, 팀명, 커스텀 키워드
- **필터링**: 포지션별, 시즌별
- **실시간 검색**: 입력 시 즉시 결과 표시

### 레이더 차트
- **6개 지표**: 공격, 수비, 라인전, 운영, 시야, 성장
- **시즌별 비교**: 2023, 2024 시즌 데이터
- **SVG 기반**: 확대/축소 시에도 선명한 표시

### 커뮤니티 에디터
- **Quill.js**: 
  - 텍스트 서식 (굵게, 기울임, 밑줄)
  - 헤더, 리스트
  - 링크 삽입
  - 이미지/비디오 임베드
- **파일 첨부**: 
  - 이미지 (JPG, PNG, GIF)
  - 비디오 (MP4, WebM)
  - 최대 10MB

## 📱 반응형 디자인

- **모바일**: 320px ~ 767px
- **태블릿**: 768px ~ 1023px
- **데스크톱**: 1024px 이상

## 🤝 기여하기

프로젝트에 기여하고 싶으시다면:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 라이선스

이 프로젝트는 개인 프로젝트입니다.

## 👨‍💻 개발자

- **프로젝트 관리자**: [Your Name]
- **개발 기간**: 2024 ~ 현재

## 📧 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 등록해주세요.

---

**LCKDBS** - League of Legends Champions Korea Database System
