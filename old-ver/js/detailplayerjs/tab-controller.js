/**
 * 탭 컨트롤러 - 선수 상세 페이지의 탭 전환을 담당
 * 
 * 주요 기능:
 * 1. 탭 버튼 클릭 시 해당 콘텐츠 표시
 * 2. URL 파라미터로 초기 탭 설정 가능
 * 3. 브라우저 뒤로가기/앞으로가기 지원
 * 
 * 사용법:
 * - HTML에서 data-tab 속성으로 탭 버튼과 콘텐츠 연결
 * - 탭 버튼: <button data-tab="stats">통계</button>
 * - 탭 콘텐츠: <div id="stats-content">...</div>
 */

class TabController {
    constructor() {
        this.currentTab = 'stats'; // 기본 활성 탭
        this.isInitialized = false;
    }

    /**
     * 탭 컨트롤러 초기화
     * DOM에서 탭 요소들을 찾고 이벤트를 바인딩
     */
    init() {
        if (this.isInitialized) return;

        // 탭 요소들 찾기
        const tabButtons = document.querySelectorAll('[data-tab]');
        const tabContents = document.querySelectorAll('[id$="-content"]');

        if (tabButtons.length === 0) {
            console.warn('탭 버튼을 찾을 수 없습니다.');
            return;
        }

        // 탭 버튼에 클릭 이벤트 추가
        tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const targetTab = button.getAttribute('data-tab');
                this.switchToTab(targetTab);
            });
        });

        // URL에서 초기 탭 설정
        this.setInitialTab();
        
        // 브라우저 뒤로가기/앞으로가기 처리
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.tab) {
                this.switchToTab(e.state.tab, false); // URL 업데이트 없이
            }
        });

        this.isInitialized = true;
        console.log('탭 컨트롤러 초기화 완료');
    }

    /**
     * URL 파라미터에서 초기 탭 설정
     * ?tab=career 같은 형태로 초기 탭 지정 가능
     */
    setInitialTab() {
        const urlParams = new URLSearchParams(window.location.search);
        const urlTab = urlParams.get('tab');
        
        if (urlTab && this.isValidTab(urlTab)) {
            this.currentTab = urlTab;
        }
        
        this.updateDisplay();
    }

    /**
     * 유효한 탭인지 확인
     * 해당 탭의 콘텐츠 요소가 존재하는지 체크
     */
    isValidTab(tabName) {
        return document.getElementById(`${tabName}-content`) !== null;
    }

    /**
     * 탭 전환 메인 함수
     * @param {string} targetTab - 전환할 탭 이름
     * @param {boolean} updateUrl - URL 업데이트 여부 (기본값: true)
     */
    switchToTab(targetTab, updateUrl = true) {
        // 유효성 검사
        if (!targetTab || targetTab === this.currentTab) return;
        
        if (!this.isValidTab(targetTab)) {
            console.warn(`존재하지 않는 탭: ${targetTab}`);
            return;
        }

        // 탭 전환
        this.currentTab = targetTab;
        this.updateDisplay();
        
        // URL 업데이트 (뒤로가기 지원)
        if (updateUrl) {
            this.updateURL();
        }
    }

    /**
     * 탭 버튼과 콘텐츠의 표시 상태 업데이트
     */
    updateDisplay() {
        // 모든 탭 버튼에서 active 클래스 제거
        document.querySelectorAll('[data-tab]').forEach(button => {
            button.classList.remove('active');
        });

        // 모든 탭 콘텐츠 숨김
        document.querySelectorAll('[id$="-content"]').forEach(content => {
            content.classList.remove('active');
        });

        // 현재 탭 버튼 활성화
        const activeButton = document.querySelector(`[data-tab="${this.currentTab}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
        }

        // 현재 탭 콘텐츠 표시
        const activeContent = document.getElementById(`${this.currentTab}-content`);
        if (activeContent) {
            activeContent.classList.add('active');
        }
    }

    /**
     * 브라우저 URL 업데이트
     * 뒤로가기/앞으로가기 지원을 위해 히스토리에 추가
     */
    updateURL() {
        const url = new URL(window.location);
        url.searchParams.set('tab', this.currentTab);
        window.history.pushState({ tab: this.currentTab }, '', url);
    }

    /**
     * 외부에서 탭 전환할 때 사용
     * @param {string} tabName - 전환할 탭 이름
     * @returns {boolean} - 전환 성공 여부
     */
    goToTab(tabName) {
        if (this.isValidTab(tabName)) {
            this.switchToTab(tabName);
            return true;
        }
        return false;
    }

    /**
     * 현재 활성 탭 반환
     * @returns {string} - 현재 탭 이름
     */
    getCurrentTab() {
        return this.currentTab;
    }
}

// 전역 탭 컨트롤러 인스턴스
let tabController = null;

// DOM 로딩 완료 후 자동 초기화
document.addEventListener('DOMContentLoaded', function() {
    tabController = new TabController();
    tabController.init();
});

// 외부에서 접근 가능하도록 전역 함수 제공
window.getTabController = () => tabController;