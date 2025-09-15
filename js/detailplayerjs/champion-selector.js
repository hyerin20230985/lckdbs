/**
 * 모스트 챔피언 선택 컨트롤러
 * 챔피언 선택 버튼 클릭 시 챔피언 목록 표시 및 선택 기능
 */
class ChampionSelectorController {
    constructor() {
        this.selectorBtn = null;
        this.selectionPanel = null;
        this.championGrid = null;
        this.mostChampionsContainer = null;
        this.closePanelBtn = null;
        
        // 챔피언 데이터 (mockdata - 실제로는 API에서 가져올 예정)
        this.championData = [
            { id: 89, name: '아리', image: 'https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/89.png' },
            { id: 14, name: '트리스타나', image: 'https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/14.png' },
            { id: 37, name: '코르키', image: 'https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/37.png' },
            { id: 121, name: '아지르', image: 'https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/121.png' },
            { id: 51, name: '아칼리', image: 'https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/51.png' },
            { id: 156, name: '아크샨', image: 'https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/156.png' },
            { id: 169, name: '알리스타', image: 'https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/169.png' },
            { id: 24, name: '아무무', image: 'https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/24.png' },
            { id: 27, name: '애니비아', image: 'https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/27.png' },
            { id: 9, name: '애니', image: 'https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/9.png' },
            { id: 10, name: '애쉬', image: 'https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/10.png' },
            { id: 130, name: '아우렐리온 솔', image: 'https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/130.png' }
        ];
        
        this.currentMostChampions = [
            { id: 121, name: '아지르', rank: 2 },
            { id: 14, name: '트리스타나', rank: 1 },
            { id: 37, name: '코르키', rank: 3 }
        ];
        
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
        this.selectorBtn = document.getElementById('champion-selector-btn');
        this.selectionPanel = document.getElementById('champion-selection-panel');
        this.championGrid = document.getElementById('champion-grid');
        this.mostChampionsContainer = document.getElementById('most-champions-container');
        this.closePanelBtn = document.getElementById('close-champion-panel');
    }

    /**
     * 이벤트 리스너 바인딩
     */
    bindEvents() {
        // 챔피언 선택 버튼 클릭
        if (this.selectorBtn) {
            this.selectorBtn.addEventListener('click', () => {
                this.toggleChampionPanel();
            });
        }

        // 패널 닫기 버튼
        if (this.closePanelBtn) {
            this.closePanelBtn.addEventListener('click', () => {
                this.hideChampionPanel();
            });
        }

        // ESC 키로 패널 닫기
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !this.selectionPanel.classList.contains('hidden')) {
                this.hideChampionPanel();
            }
        });
    }

    /**
     * 챔피언 선택 패널 토글
     */
    toggleChampionPanel() {
        if (!this.selectionPanel) return;

        const isHidden = this.selectionPanel.classList.contains('hidden');
        
        if (isHidden) {
            this.showChampionPanel();
        } else {
            this.hideChampionPanel();
        }
    }

    /**
     * 챔피언 선택 패널 표시
     */
    showChampionPanel() {
        if (!this.selectionPanel || !this.championGrid) return;
        
        // 챔피언 그리드 생성
        this.generateChampionGrid();
        
        // 패널 표시
        this.selectionPanel.classList.remove('hidden');
        
        // 애니메이션 효과
        this.selectionPanel.style.opacity = '0';
        this.selectionPanel.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            this.selectionPanel.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            this.selectionPanel.style.opacity = '1';
            this.selectionPanel.style.transform = 'translateY(0)';
        }, 10);

        // 버튼 상태 변경
        this.updateButtonState(true);

        // 스크롤 이동
        setTimeout(() => {
            this.selectionPanel.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest' 
            });
        }, 100);
    }

    /**
     * 챔피언 선택 패널 숨기기
     */
    hideChampionPanel() {
        if (!this.selectionPanel) return;
        
        this.selectionPanel.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        this.selectionPanel.style.opacity = '0';
        this.selectionPanel.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            this.selectionPanel.classList.add('hidden');
            this.selectionPanel.style.transition = '';
        }, 300);

        // 버튼 상태 변경
        this.updateButtonState(false);
    }

    /**
     * 챔피언 그리드 생성
     */
    generateChampionGrid() {
        if (!this.championGrid) return;

        this.championGrid.innerHTML = '';

        this.championData.forEach(champion => {
            const championElement = this.createChampionElement(champion);
            this.championGrid.appendChild(championElement);
        });
    }

    /**
     * 개별 챔피언 요소 생성
     */
    createChampionElement(champion) {
        const championDiv = document.createElement('div');
        championDiv.className = 'champion-item group cursor-pointer relative';
        championDiv.setAttribute('data-champion-id', champion.id);
        championDiv.setAttribute('data-champion-name', champion.name);

        // 현재 모스트 챔피언인지 확인
        const isCurrentMost = this.currentMostChampions.some(most => most.id === champion.id);
        
        championDiv.innerHTML = `
            <div class="bg-gradient-to-br from-[#171727] to-[#1a1a2e] p-3 rounded-lg border border-[#3a3a4f] group-hover:border-[#f7cf2d] transition-all duration-300 group-hover:scale-105">
                <img src="${champion.image}" alt="${champion.name}" class="w-12 h-12 object-cover rounded-lg mb-2 mx-auto" />
                <p class="text-center text-[#b0b7d6] text-xs font-medium group-hover:text-[#f7cf2d] transition-colors">${champion.name}</p>
            </div>
            ${isCurrentMost ? '<div class="absolute -top-1 -right-1"><i class="fa-solid fa-star text-[#f7cf2d] text-xs"></i></div>' : ''}
        `;

        // 클릭 이벤트 추가
        championDiv.addEventListener('click', () => {
            this.selectChampion(champion);
        });

        return championDiv;
    }

    /**
     * 챔피언 선택 처리
     */
    selectChampion(selectedChampion) {
        console.log('선택된 챔피언:', selectedChampion);
        
        // 현재 중앙(1등) 챔피언과 교체
        this.swapChampionToCenter(selectedChampion);
        
        // 패널 닫기
        this.hideChampionPanel();
        
        // 성공 피드백
        this.showSelectionFeedback(selectedChampion.name);
    }

    /**
     * 선택된 챔피언을 중앙으로 이동
     */
    swapChampionToCenter(selectedChampion) {
        if (!this.mostChampionsContainer) return;

        // 현재 모스트 챔피언들 찾기
        const championElements = this.mostChampionsContainer.querySelectorAll('[data-champion-id]');
        let centerElement = null;
        
        // 중앙(1등) 챔피언 찾기 (border-2 border-[#f7cf2d] 클래스가 있는 요소)
        championElements.forEach(element => {
            const cardDiv = element.querySelector('div');
            if (cardDiv && cardDiv.classList.contains('border-2')) {
                centerElement = element;
            }
        });

        if (centerElement) {
            // 애니메이션 효과
            centerElement.style.transform = 'scale(0.8)';
            centerElement.style.opacity = '0.5';
            
            setTimeout(() => {
                // 챔피언 정보 업데이트
                this.updateChampionElement(centerElement, selectedChampion);
                
                // 애니메이션 복구
                centerElement.style.transform = 'scale(1)';
                centerElement.style.opacity = '1';
            }, 200);
        }

        // currentMostChampions 업데이트
        const centerIndex = this.currentMostChampions.findIndex(champ => champ.rank === 1);
        if (centerIndex !== -1) {
            this.currentMostChampions[centerIndex] = {
                id: selectedChampion.id,
                name: selectedChampion.name,
                rank: 1
            };
        }
    }

    /**
     * 챔피언 요소 업데이트
     */
    updateChampionElement(element, champion) {
        element.setAttribute('data-champion-id', champion.id);
        element.setAttribute('data-champion-name', champion.name);
        
        const img = element.querySelector('img');
        const name = element.querySelector('p');
        
        if (img) {
            img.src = `${champion.image}`;
            img.alt = champion.name;
        }
        
        if (name) {
            name.textContent = champion.name;
        }
    }

    /**
     * 선택 피드백 표시
     */
    showSelectionFeedback(championName) {
        // 임시 알림 요소 생성
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-gradient-to-r from-[#f7cf2d] to-[#e6b800] text-[#1a1a2e] px-4 py-2 rounded-lg shadow-lg z-50 font-semibold';
        notification.innerHTML = `
            <i class="fa-solid fa-check mr-2"></i>
            ${championName} 선택됨!
        `;
        
        document.body.appendChild(notification);
        
        // 애니메이션
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        
        setTimeout(() => {
            notification.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
            notification.style.transform = 'translateX(0)';
            notification.style.opacity = '1';
        }, 10);
        
        // 3초 후 제거
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            notification.style.opacity = '0';
            
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    /**
     * 버튼 상태 업데이트
     */
    updateButtonState(isOpen) {
        if (!this.selectorBtn) return;
        
        const icon = this.selectorBtn.querySelector('i');
        const text = this.selectorBtn.querySelector('span');
        
        if (isOpen) {
            if (icon) icon.className = 'fa-solid fa-times text-lg';
            if (text) text.textContent = '닫기';
            this.selectorBtn.classList.add('bg-red-500', 'hover:bg-red-600');
            this.selectorBtn.classList.remove('bg-gradient-to-br', 'from-[#f7cf2d]', 'to-[#e6b800]', 'hover:from-[#e6b800]', 'hover:to-[#d4a700]');
        } else {
            if (icon) icon.className = 'fa-solid fa-list text-lg';
            if (text) text.textContent = '챔피언 선택';
            this.selectorBtn.classList.remove('bg-red-500', 'hover:bg-red-600');
            this.selectorBtn.classList.add('bg-gradient-to-br', 'from-[#f7cf2d]', 'to-[#e6b800]', 'hover:from-[#e6b800]', 'hover:to-[#d4a700]');
        }
    }

    /**
     * 외부에서 챔피언 데이터 업데이트 (API 연동용)
     */
    updateChampionData(newChampionData) {
        this.championData = newChampionData;
        if (!this.selectionPanel.classList.contains('hidden')) {
            this.generateChampionGrid();
        }
    }
}

// DOM이 로드되면 초기화
document.addEventListener('DOMContentLoaded', function() {
    // 모스트 챔피언 섹션이 있는 경우에만 초기화
    if (document.getElementById('champion-selector-btn')) {
        window.championSelectorController = new ChampionSelectorController();
    }
});
