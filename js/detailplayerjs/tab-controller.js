// tab-controller.js - 탭 전환 전용 컨트롤러
class TabController {
    constructor() {
        this.activeTab = 'stats'; // 기본 활성 탭
        this.tabButtons = null;
        this.tabPanes = null;
        this.initialized = false;
    }

    // 탭 컨트롤러 초기화
    init() {
        if (this.initialized) return;

        this.tabButtons = document.querySelectorAll('.tab-btn');
        this.tabPanes = document.querySelectorAll('.tab-pane');

        if (this.tabButtons.length === 0 || this.tabPanes.length === 0) {
            console.warn('탭 요소를 찾을 수 없습니다.');
            return;
        }

        this.bindEvents();
        this.setInitialState();
        this.initialized = true;

        console.log('탭 컨트롤러가 초기화되었습니다.');
    }

    // 이벤트 바인딩
    bindEvents() {
        this.tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const targetTab = button.getAttribute('data-tab');
                this.switchTab(targetTab);
            });

            // 키보드 접근성 추가
            button.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const targetTab = button.getAttribute('data-tab');
                    this.switchTab(targetTab);
                }
            });
        });
    }

    // 초기 상태 설정
    setInitialState() {
        // URL 파라미터에서 탭 정보 확인
        const urlParams = new URLSearchParams(window.location.search);
        const urlTab = urlParams.get('tab');
        
        if (urlTab && this.isValidTab(urlTab)) {
            this.activeTab = urlTab;
        }

        this.updateTabDisplay();
    }

    // 유효한 탭인지 확인
    isValidTab(tabName) {
        return document.getElementById(`${tabName}-content`) !== null;
    }

    // 탭 전환 메인 함수
    switchTab(targetTab) {
        if (!targetTab || targetTab === this.activeTab) return;
        
        if (!this.isValidTab(targetTab)) {
            console.warn(`유효하지 않은 탭: ${targetTab}`);
            return;
        }

        // 이전 탭 비활성화 애니메이션
        this.deactivateCurrentTab(() => {
            this.activeTab = targetTab;
            this.updateTabDisplay();
            this.activateNewTab();
            this.updateURL();
        });
    }

    // 현재 탭 비활성화
    deactivateCurrentTab(callback) {
        const currentPane = document.getElementById(`${this.activeTab}-content`);
        
        if (currentPane && currentPane.classList.contains('active')) {
            currentPane.style.opacity = '0';
            currentPane.style.transform = 'translateY(-10px)';
            
            setTimeout(() => {
                currentPane.classList.remove('active');
                if (callback) callback();
            }, 200);
        } else {
            if (callback) callback();
        }
    }

    // 새 탭 활성화
    activateNewTab() {
        const newPane = document.getElementById(`${this.activeTab}-content`);
        
        if (newPane) {
            newPane.style.opacity = '0';
            newPane.style.transform = 'translateY(20px)';
            newPane.classList.add('active');
            
            // 강제 리플로우
            newPane.offsetHeight;
            
            setTimeout(() => {
                newPane.style.opacity = '1';
                newPane.style.transform = 'translateY(0)';
            }, 50);
        }
    }

    // 탭 버튼과 패널 상태 업데이트
    updateTabDisplay() {
        // 모든 탭 버튼 비활성화
        this.tabButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-selected', 'false');
        });

        // 모든 탭 패널 숨김
        this.tabPanes.forEach(pane => {
            if (pane.classList.contains('active')) {
                pane.classList.remove('active');
            }
        });

        // 활성 탭 버튼 설정
        const activeButton = document.querySelector(`[data-tab="${this.activeTab}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
            activeButton.setAttribute('aria-selected', 'true');
        }

        // 활성 탭 패널 표시
        const activePane = document.getElementById(`${this.activeTab}-content`);
        if (activePane) {
            activePane.classList.add('active');
        }
    }

    // URL 업데이트 (브라우저 히스토리에 추가)
    updateURL() {
        const url = new URL(window.location);
        url.searchParams.set('tab', this.activeTab);
        window.history.pushState({ tab: this.activeTab }, '', url);
    }

    // 프로그래매틱 탭 전환 (외부에서 호출 가능)
    goToTab(tabName) {
        if (this.isValidTab(tabName)) {
            this.switchTab(tabName);
            return true;
        }
        return false;
    }

    // 현재 활성 탭 반환
    getCurrentTab() {
        return this.activeTab;
    }

    // 사용 가능한 모든 탭 목록 반환
    getAvailableTabs() {
        return Array.from(this.tabButtons).map(btn => btn.getAttribute('data-tab'));
    }

    // 탭 컨트롤러 재초기화 (동적 콘텐츠 로딩 후 사용)
    reinitialize() {
        this.initialized = false;
        this.init();
    }

    // 탭 전환 이벤트 리스너 추가
    onTabChange(callback) {
        if (typeof callback === 'function') {
            document.addEventListener('tabChanged', (e) => {
                callback(e.detail.newTab, e.detail.oldTab);
            });
        }
    }

    // 커스텀 이벤트 발생
    dispatchTabChangeEvent(newTab, oldTab) {
        const event = new CustomEvent('tabChanged', {
            detail: { newTab, oldTab }
        });
        document.dispatchEvent(event);
    }
}

// 전역 탭 컨트롤러 인스턴스
let tabController = null;

// DOM 로딩 완료 후 자동 초기화
document.addEventListener('DOMContentLoaded', function() {
    tabController = new TabController();
    tabController.init();

    // 브라우저 뒤로가기/앞으로가기 처리
    window.addEventListener('popstate', function(e) {
        if (e.state && e.state.tab) {
            tabController.goToTab(e.state.tab);
        }
    });
});

// 전역 접근을 위한 함수들
window.TabController = TabController;
window.getTabController = () => tabController;
