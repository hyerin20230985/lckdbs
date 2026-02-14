/**
 * 활약지표 상세 정보 컨트롤러
 * 팀 기여도와 라인 이해도 카드 클릭 시 상세 수식 표시
 */
class PerformanceDetailsController {
    constructor() {
        this.teamContributionCard = null;
        this.laneUnderstandingCard = null;
        this.teamDetailsPanel = null;
        this.laneDetailsPanel = null;
        this.init();
    }

    /**
     * 초기화
     */
    init() {
        this.bindElements();
        this.bindEvents();
    }

    /**
     * DOM 요소들을 바인딩
     */
    bindElements() {
        // 카드 요소들
        this.teamContributionCard = document.getElementById('team-contribution-card');
        this.laneUnderstandingCard = document.getElementById('lane-understanding-card');
        
        // 상세 패널들
        this.teamDetailsPanel = document.getElementById('team-contribution-details');
        this.laneDetailsPanel = document.getElementById('lane-understanding-details');
        
        // 닫기 버튼들
        this.closeTeamBtn = document.getElementById('close-team-details');
        this.closeLaneBtn = document.getElementById('close-lane-details');
    }

    /**
     * 이벤트 리스너 바인딩
     */
    bindEvents() {
        // 팀 기여도 카드 클릭
        if (this.teamContributionCard) {
            this.teamContributionCard.addEventListener('click', () => {
                this.toggleTeamDetails();
            });
        }

        // 라인 이해도 카드 클릭
        if (this.laneUnderstandingCard) {
            this.laneUnderstandingCard.addEventListener('click', () => {
                this.toggleLaneDetails();
            });
        }

        // 닫기 버튼들
        if (this.closeTeamBtn) {
            this.closeTeamBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.hideTeamDetails();
            });
        }

        if (this.closeLaneBtn) {
            this.closeLaneBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.hideLaneDetails();
            });
        }

        // ESC 키로 패널 닫기
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideAllDetails();
            }
        });
    }

    /**
     * 팀 기여도 상세 정보 토글
     */
    toggleTeamDetails() {
        if (!this.teamDetailsPanel) return;

        const isHidden = this.teamDetailsPanel.classList.contains('hidden');
        
        // 다른 패널 먼저 숨기기
        this.hideLaneDetails();
        
        if (isHidden) {
            this.showTeamDetails();
        } else {
            this.hideTeamDetails();
        }
    }

    /**
     * 라인 이해도 상세 정보 토글
     */
    toggleLaneDetails() {
        if (!this.laneDetailsPanel) return;

        const isHidden = this.laneDetailsPanel.classList.contains('hidden');
        
        // 다른 패널 먼저 숨기기
        this.hideTeamDetails();
        
        if (isHidden) {
            this.showLaneDetails();
        } else {
            this.hideLaneDetails();
        }
    }

    /**
     * 팀 기여도 상세 정보 표시
     */
    showTeamDetails() {
        if (!this.teamDetailsPanel) return;
        
        this.teamDetailsPanel.classList.remove('hidden');
        
        // 애니메이션 효과
        this.teamDetailsPanel.style.opacity = '0';
        this.teamDetailsPanel.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            this.teamDetailsPanel.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            this.teamDetailsPanel.style.opacity = '1';
            this.teamDetailsPanel.style.transform = 'translateY(0)';
        }, 10);

        // 카드 시각적 피드백
        if (this.teamContributionCard) {
            this.teamContributionCard.classList.add('ring-2', 'ring-purple-400');
        }

        // 스크롤 이동
        setTimeout(() => {
            this.teamDetailsPanel.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest' 
            });
        }, 100);
    }

    /**
     * 라인 이해도 상세 정보 표시
     */
    showLaneDetails() {
        if (!this.laneDetailsPanel) return;
        
        // 라인별 제목 업데이트
        this.updateLaneTitle();
        
        this.laneDetailsPanel.classList.remove('hidden');
        
        // 애니메이션 효과
        this.laneDetailsPanel.style.opacity = '0';
        this.laneDetailsPanel.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            this.laneDetailsPanel.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            this.laneDetailsPanel.style.opacity = '1';
            this.laneDetailsPanel.style.transform = 'translateY(0)';
        }, 10);

        // 카드 시각적 피드백
        if (this.laneUnderstandingCard) {
            this.laneUnderstandingCard.classList.add('ring-2', 'ring-blue-400');
        }

        // 스크롤 이동
        setTimeout(() => {
            this.laneDetailsPanel.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest' 
            });
        }, 100);
    }

    /**
     * 팀 기여도 상세 정보 숨기기
     */
    hideTeamDetails() {
        if (!this.teamDetailsPanel) return;
        
        this.teamDetailsPanel.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        this.teamDetailsPanel.style.opacity = '0';
        this.teamDetailsPanel.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            this.teamDetailsPanel.classList.add('hidden');
            this.teamDetailsPanel.style.transition = '';
        }, 300);

        // 카드 시각적 피드백 제거
        if (this.teamContributionCard) {
            this.teamContributionCard.classList.remove('ring-2', 'ring-purple-400');
        }
    }

    /**
     * 라인 이해도 상세 정보 숨기기
     */
    hideLaneDetails() {
        if (!this.laneDetailsPanel) return;
        
        this.laneDetailsPanel.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        this.laneDetailsPanel.style.opacity = '0';
        this.laneDetailsPanel.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            this.laneDetailsPanel.classList.add('hidden');
            this.laneDetailsPanel.style.transition = '';
        }, 300);

        // 카드 시각적 피드백 제거
        if (this.laneUnderstandingCard) {
            this.laneUnderstandingCard.classList.remove('ring-2', 'ring-blue-400');
        }
    }

    /**
     * 모든 상세 정보 숨기기
     */
    hideAllDetails() {
        this.hideTeamDetails();
        this.hideLaneDetails();
    }

    /**
     * 라인별 제목 업데이트
     */
    updateLaneTitle() {
        if (!this.laneUnderstandingCard || !this.laneDetailsPanel) return;

        const lane = this.laneUnderstandingCard.getAttribute('data-lane') || 'mid';
        const laneNames = {
            'top': '탑라인',
            'jungle': '정글',
            'mid': '미드라인',
            'adc': '봇라인',
            'support': '서포터'
        };

        const titleElement = this.laneDetailsPanel.querySelector('h4');
        if (titleElement) {
            const laneName = laneNames[lane] || '미드라인';
            titleElement.innerHTML = `
                <i class="fa-solid fa-calculator text-blue-400 mr-2"></i>
                ${laneName} 이해도 계산 수식
            `;
        }

        // 공식 제목도 업데이트
        const formulaTitleElement = this.laneDetailsPanel.querySelector('h5');
        if (formulaTitleElement) {
            const laneName = laneNames[lane] || '미드라인';
            formulaTitleElement.textContent = `${laneName} 공식`;
        }
    }

    /**
     * 라인 변경 (외부에서 호출 가능)
     */
    updateLane(newLane) {
        if (this.laneUnderstandingCard) {
            this.laneUnderstandingCard.setAttribute('data-lane', newLane);
            this.laneDetailsPanel.setAttribute('data-lane', newLane);
            
            // 패널이 열려있다면 제목 업데이트
            if (!this.laneDetailsPanel.classList.contains('hidden')) {
                this.updateLaneTitle();
            }
        }
    }
}

// DOM이 로드되면 초기화
document.addEventListener('DOMContentLoaded', function() {
    // 활약지표 탭이 있는 경우에만 초기화
    if (document.getElementById('performance-content')) {
        window.performanceDetailsController = new PerformanceDetailsController();
    }
});
