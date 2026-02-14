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
            { id: 89, name: '아리', image: 'https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/Ari.png' },
            { id: 14, name: '트리스타나', image: 'https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/Tristana.png' },
            { id: 37, name: '코르키', image: 'https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/Corki.png' },
            { id: 121, name: '아지르', image: 'https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/Azir.png' },
            { id: 51, name: '아칼리', image: 'https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/Akali.png' },
            { id: 156, name: '아크샨', image: 'https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/Akshan.png' },
            { id: 169, name: '알리스타', image: 'https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/Alistar.png' },
            { id: 24, name: '아무무', image: 'https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/Amumu.png' },
            { id: 27, name: '애니비아', image: 'https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/Anivia.png' },
            { id: 9, name: '애니', image: 'https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/Annie.png' },
            { id: 10, name: '애쉬', image: 'https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/Ashe.png' },
            { id: 130, name: '아우렐리온 솔', image: 'https://d30q0nmfm6z0r7.cloudfront.net/photos/champions/AurelionSol.png' }
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
        
        // 선택된 챔피언이 이미 모스트 챔피언 중 하나인지 확인
        const existingChampion = this.currentMostChampions.find(champ => champ.id === selectedChampion.id);
        
        if (existingChampion) {
            // 이미 있는 챔피언을 선택한 경우: 해당 챔피언을 중앙으로 이동
            this.moveExistingChampionToCenter(selectedChampion, existingChampion);
        } else {
            // 새로운 챔피언을 선택한 경우: 중앙 챔피언과 교체
            this.swapChampionToCenter(selectedChampion);
        }
        
        // 패널 닫기
        this.hideChampionPanel();
        
        // 성공 피드백
        this.showSelectionFeedback(selectedChampion.name);
    }

    /**
     * 기존 모스트 챔피언을 중앙으로 이동
     */
    moveExistingChampionToCenter(selectedChampion, existingChampion) {
        if (!this.mostChampionsContainer) return;

        // 현재 중앙에 있는 챔피언과 선택된 챔피언의 위치를 찾기
        const championElements = this.mostChampionsContainer.querySelectorAll('[data-champion-id]');
        let centerElement = null;
        let selectedElement = null;
        
        championElements.forEach(element => {
            const championId = parseInt(element.getAttribute('data-champion-id'));
            const cardDiv = element.querySelector('div');
            
            if (cardDiv && cardDiv.classList.contains('border-2')) {
                // 현재 중앙에 있는 챔피언
                centerElement = element;
            }
            
            if (championId === selectedChampion.id) {
                // 선택된 챔피언
                selectedElement = element;
            }
        });

        // 선택된 챔피언이 이미 중앙에 있는 경우
        if (selectedElement === centerElement) {
            this.addBounceEffect(centerElement);
            return;
        }

        // 위치 교체 애니메이션 실행
        if (centerElement && selectedElement) {
            this.animatePositionSwap(centerElement, selectedElement, existingChampion);
        }
    }

    /**
     * 선택된 챔피언을 중앙으로 이동 (슬라이드 애니메이션)
     */
    swapChampionToCenter(selectedChampion) {
        if (!this.mostChampionsContainer) return;

        // 현재 모스트 챔피언들 찾기
        const championElements = this.mostChampionsContainer.querySelectorAll('[data-champion-id]');
        let centerElement = null;
        let oldCenterChampion = null;
        
        // 중앙(1등) 챔피언 찾기 (border-2 border-[#f7cf2d] 클래스가 있는 요소)
        championElements.forEach(element => {
            const cardDiv = element.querySelector('div');
            if (cardDiv && cardDiv.classList.contains('border-2')) {
                centerElement = element;
                // 기존 중앙 챔피언 정보 저장
                oldCenterChampion = {
                    id: parseInt(element.getAttribute('data-champion-id')),
                    name: element.getAttribute('data-champion-name'),
                    element: element
                };
            }
        });

        if (centerElement && oldCenterChampion) {
            this.animateChampionSwap(centerElement, selectedChampion, oldCenterChampion);
        }
    }

    /**
     * 위치 교체 애니메이션 (기존 챔피언들 간의 위치 변경)
     */
    animatePositionSwap(centerElement, selectedElement, existingChampion) {
        // 두 요소의 현재 위치 정보 저장
        const centerRect = centerElement.getBoundingClientRect();
        const selectedRect = selectedElement.getBoundingClientRect();
        
        // 이동 거리 계산
        const centerToSelectedDistance = selectedRect.left - centerRect.left;
        const selectedToCenterDistance = centerRect.left - selectedRect.left;
        
        // 두 요소의 모든 정보 저장 (DOM 교체를 위해)
        const centerData = this.extractChampionData(centerElement);
        const selectedData = this.extractChampionData(selectedElement);
        
        // 1단계: 두 챔피언 모두 동시에 이동 시작
        centerElement.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        selectedElement.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        centerElement.style.transform = `translateX(${centerToSelectedDistance}px) scale(0.9)`;
        selectedElement.style.transform = `translateX(${selectedToCenterDistance}px) scale(1.05)`;
        
        setTimeout(() => {
            // 2단계: DOM 요소 내용 실제 교체
            this.swapChampionElements(centerElement, selectedElement, centerData, selectedData);
            
            // 3단계: 원래 위치로 복귀 (이제 내용이 바뀌었으므로 올바른 위치에 올바른 챔피언이 있음)
            setTimeout(() => {
                centerElement.style.transform = 'scale(1)';
                selectedElement.style.transform = 'scale(1)';
                
                // 4단계: 완료 후 정리
                setTimeout(() => {
                    centerElement.style.transition = '';
                    selectedElement.style.transition = '';
                    centerElement.style.transform = '';
                    selectedElement.style.transform = '';
                    
                    // 새로운 중앙 챔피언에 바운스 효과 (이제 centerElement에 선택된 챔피언이 있음)
                    this.addBounceEffect(centerElement);
                    
                    // currentMostChampions 업데이트
                    this.updateMostChampionsRanking(existingChampion);
                }, 200);
            }, 100);
        }, 600);
    }

    /**
     * 챔피언 요소에서 데이터 추출
     */
    extractChampionData(element) {
        const img = element.querySelector('img');
        const nameP = element.querySelector('p');
        const cardDiv = element.querySelector('div');
        const rankBadge = element.querySelector('.absolute img');
        
        return {
            id: element.getAttribute('data-champion-id'),
            name: element.getAttribute('data-champion-name'),
            imgSrc: img ? img.src : '',
            imgAlt: img ? img.alt : '',
            nameText: nameP ? nameP.textContent : '',
            isCenter: cardDiv ? cardDiv.classList.contains('border-2') : false,
            rankBadgeSrc: rankBadge ? rankBadge.src : null
        };
    }

    /**
     * 두 챔피언 요소의 내용을 실제로 교체
     */
    swapChampionElements(centerElement, selectedElement, centerData, selectedData) {
        // centerElement를 selectedData로 업데이트 (선택된 챔피언이 중앙으로)
        this.updateElementContent(centerElement, selectedData, true);
        
        // selectedElement를 centerData로 업데이트 (기존 중앙 챔피언이 선택된 위치로)
        this.updateElementContent(selectedElement, centerData, false);
    }

    /**
     * 요소 내용 업데이트
     */
    updateElementContent(element, data, isCenter) {
        // 속성 업데이트
        element.setAttribute('data-champion-id', data.id);
        element.setAttribute('data-champion-name', data.name);
        
        // 이미지 업데이트
        const img = element.querySelector('img');
        if (img) {
            img.src = data.imgSrc;
            img.alt = data.imgAlt;
        }
        
        // 이름 텍스트 업데이트
        const nameP = element.querySelector('p');
        if (nameP) {
            nameP.textContent = data.nameText;
        }
        
        // 스타일 클래스 업데이트
        const cardDiv = element.querySelector('div');
        if (cardDiv && nameP) {
            if (isCenter) {
                // 중앙 스타일 적용
                cardDiv.classList.remove('border', 'border-[#3a3a4f]');
                cardDiv.classList.add('border-2', 'border-[#f7cf2d]', 'shadow-lg');
                nameP.classList.remove('text-[#b0b7d6]', 'font-medium');
                nameP.classList.add('text-[#f7cf2d]', 'font-bold');
            } else {
                // 일반 스타일 적용
                cardDiv.classList.remove('border-2', 'border-[#f7cf2d]', 'shadow-lg');
                cardDiv.classList.add('border', 'border-[#3a3a4f]');
                nameP.classList.remove('text-[#f7cf2d]', 'font-bold');
                nameP.classList.add('text-[#b0b7d6]', 'font-medium');
            }
        }
        
        // 랭킹 배지 업데이트
        this.updateRankingBadge(element, isCenter);
    }

    /**
     * 랭킹 배지 업데이트
     */
    updateRankingBadge(element, isCenter) {
        const existingBadge = element.querySelector('.absolute');
        
        if (existingBadge) {
            existingBadge.remove();
        }
        
        // 새 배지 추가
        const badgeDiv = document.createElement('div');
        badgeDiv.className = 'absolute -top-2 -right-2';
        
        const badgeImg = document.createElement('img');
        badgeImg.className = 'w-10 h-10';
        
        if (isCenter) {
            badgeImg.src = 'https://d30q0nmfm6z0r7.cloudfront.net/photos/assets/firstmost.png';
        } else {
            badgeImg.src = 'https://d30q0nmfm6z0r7.cloudfront.net/photos/assets/secondmost.png';
        }
        
        badgeDiv.appendChild(badgeImg);
        element.appendChild(badgeDiv);
    }

    /**
     * 챔피언 교체 애니메이션 (새로운 챔피언 추가)
     */
    animateChampionSwap(centerElement, newChampion, oldChampion) {
        // 1단계: 기존 중앙 챔피언을 왼쪽으로 슬라이드
        centerElement.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease';
        centerElement.style.transform = 'translateX(-100px) scale(0.8)';
        centerElement.style.opacity = '0.3';
        
        setTimeout(() => {
            // 2단계: 새 챔피언 정보로 업데이트 (오른쪽에서 시작)
            centerElement.style.transition = 'none';
            centerElement.style.transform = 'translateX(100px) scale(0.8)';
            this.updateChampionElement(centerElement, newChampion);
            
            setTimeout(() => {
                // 3단계: 새 챔피언을 중앙으로 슬라이드
                centerElement.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.5s ease';
                centerElement.style.transform = 'translateX(0) scale(1)';
                centerElement.style.opacity = '1';
                
                // 4단계: 완료 후 스타일 정리
                setTimeout(() => {
                    centerElement.style.transition = '';
                    centerElement.style.transform = '';
                    centerElement.style.opacity = '';
                    
                    // 바운스 효과 추가
                    this.addBounceEffect(centerElement);
                }, 500);
            }, 50);
        }, 400);

        // currentMostChampions 업데이트
        const centerIndex = this.currentMostChampions.findIndex(champ => champ.rank === 1);
        if (centerIndex !== -1) {
            this.currentMostChampions[centerIndex] = {
                id: newChampion.id,
                name: newChampion.name,
                rank: 1
            };
        }
    }

    /**
     * 모스트 챔피언 랭킹 업데이트
     */
    updateMostChampionsRanking(newCenterChampion) {
        // 기존 1등을 2등이나 3등으로 변경
        const oldCenterIndex = this.currentMostChampions.findIndex(champ => champ.rank === 1);
        const newCenterIndex = this.currentMostChampions.findIndex(champ => champ.id === newCenterChampion.id);
        
        if (oldCenterIndex !== -1 && newCenterIndex !== -1) {
            // 랭킹 교체
            const oldRank = this.currentMostChampions[newCenterIndex].rank;
            this.currentMostChampions[oldCenterIndex].rank = oldRank;
            this.currentMostChampions[newCenterIndex].rank = 1;
        }
    }

    /**
     * 바운스 효과 추가
     */
    addBounceEffect(element) {
        element.style.animation = 'championBounce 0.6s ease-out';
        
        // 애니메이션 완료 후 제거
        setTimeout(() => {
            element.style.animation = '';
        }, 600);
        
        // CSS 애니메이션이 없다면 동적으로 추가
        if (!document.getElementById('champion-bounce-keyframes')) {
            const style = document.createElement('style');
            style.id = 'champion-bounce-keyframes';
            style.textContent = `
                @keyframes championBounce {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                    100% { transform: scale(1); }
                }
            `;
            document.head.appendChild(style);
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
