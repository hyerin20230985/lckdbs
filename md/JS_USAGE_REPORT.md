# JS 파일 사용 현황 보고서

## 1. 사용되지 않는 JS 파일 (Unused JS Files)
이 파일들은 현재 프로젝트의 어떤 HTML 파일에서도 `<script>` 태그로 로드되지 않으며, 다른 JS 파일에서 `import` 되지도 않는 것으로 확인되었습니다.

- **`js/main.js`**: 공통 API 호출 함수 등이 정의되어 있으나 사용되지 않음.
- **`js/signupjs/backup.js`**: 백업용 파일로 추정됨.
- **`js/validate/email.js`**: `signup.js`에서 import 문이 주석 처리되어 있으며, 내부 함수로 대체됨.

> [!WARNING]
> `js/communityjs/post.js`는 `html/post.html`에서 `<script src="../js/communityjs/post.jsf"></script>`라는 오타로 인해 로드되지 않고 있습니다. `post.js`는 사용 의도가 분명하므로 삭제 대상이 아닙니다.

---

## 2. 구버전(`old-ver/html`)과 연결된 JS 파일
이 파일들은 `old-ver/html` 폴더 내의 HTML 파일들에서 사용되고 있습니다. 현재 서비스 중인 페이지(`html/*.html`, `index.html`, `playerdetail-html/*.html`)에서는 사용되지 않는 파일들입니다.

### 2.1 독립적으로 구버전에서만 사용됨 (제거 가능성 높음)

| 파일 경로 | 연결된 구버전 HTML |
|---|---|
<!-- | `js/index.js` | `old-ver/html/index-v1.html` |
| `js/schedule-script.js` | `old-ver/html/schedule2.html` |
| `js/team3.js` | `old-ver/html/team3.html` | -->
<!-- | `js/signupjs/signup.js` | `old-ver/html/signup.html` |
| `js/signupjs/dropdown.js` | `old-ver/html/signup.html` |
| `js/championjs/champion-scripts.js` | `old-ver/html/champion.html` |
| `js/championjs/champion2-scripts.js` | `old-ver/html/champion2.html` | -->
<!-- | `js/teamplayerjs/year-team.js` | `old-ver/html/team.html` |
| `js/playerjs/detailcard.js` | `old-ver/html/player.html` |
| `js/playerjs/sidebar.js` | `old-ver/html/player.html` |
| `js/playerjs/playercard.js` | `old-ver/html/player.html` | -->

### 2.2 참고: 현재 버전에서도 사용 중인 폴더
`js/detailplayerjs/` 폴더 내의 파일들은 `old-ver/html/detailplayer.html`에서도 사용되지만, **현재 `playerdetail-html/` 폴더 내의 선수 상세 페이지들에서도 핵심적으로 사용**되고 있습니다. 따라서 이 파일들은 삭제하면 안 됩니다.

- `js/detailplayerjs/tab-controller.js`
- `js/detailplayerjs/player-detail-info.js`
- `js/detailplayerjs/performance-details.js`
- `js/detailplayerjs/champion-selector.js`
