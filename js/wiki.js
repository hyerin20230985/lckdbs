document.addEventListener('DOMContentLoaded', async () => {

    // ============================================================
    // 1. 변수 및 DOM 요소
    // ============================================================
    const listContainer = document.getElementById('strategy-list');
    const searchInput = document.getElementById('search-input');
    const emptyState = document.getElementById('empty-state');
    const detailView = document.getElementById('strategy-detail');
    const contentArea = document.getElementById('content-area');

    const dTitle = document.getElementById('detail-title');
    const dCategory = document.getElementById('detail-category');
    const dDifficulty = document.getElementById('detail-difficulty');
    const dSummary = document.getElementById('detail-summary');
    const dDesc = document.getElementById('detail-description');

    const dMapContainer = document.getElementById('detail-image-container');
    const dStepsContainer = document.getElementById('detail-steps').closest('section');
    const dCounterContainer = document.getElementById('detail-counter').closest('section');
    const dSteps = document.getElementById('detail-steps');
    const dCounter = document.getElementById('detail-counter');

    let allData = [];

    // ============================================================
    // 2. 데이터 로드
    // ============================================================
    try {
        const res = await fetch('../js/strategies.json');
        if (!res.ok) throw new Error('Network response was not ok');
        allData = await res.json();
        renderSidebar(allData);
    } catch (e) {
        console.error("Load Failed:", e);
        listContainer.innerHTML = `<div class="text-red-400 text-center p-4 text-base font-medium">데이터 로드 실패</div>`;
    }

    // ============================================================
    // 3. 검색 기능
    // ============================================================
    searchInput.addEventListener('input', (e) => {
        const keyword = e.target.value.toLowerCase();
        if (keyword === "") {
            renderSidebar(allData);
            return;
        }
        const filteredData = allData.map(section => {
            const filteredItems = section.items.filter(item =>
                item.title.toLowerCase().includes(keyword) ||
                item.summary.toLowerCase().includes(keyword) ||
                item.category.toLowerCase().includes(keyword)
            );
            return { ...section, items: filteredItems };
        }).filter(section => section.items.length > 0);
        renderSidebar(filteredData, true);
    });

    // ============================================================
    // 4. 사이드바 렌더링
    // ============================================================
    function renderSidebar(data, expandAll = false) {
        listContainer.innerHTML = '';
        if (data.length === 0) {
            listContainer.innerHTML = `<div class="text-gray-500 text-center text-base mt-6">검색 결과가 없습니다.</div>`;
            return;
        }

        data.forEach((section, index) => {
            const sectionDiv = document.createElement('div');
            sectionDiv.className = "mb-2";

            const urlParams = new URLSearchParams(window.location.search);
            const targetCat = urlParams.get('section');
            
            let isExpanded = expandAll || index === 0;
            if (!expandAll && targetCat !== null) {
                isExpanded = (index === parseInt(targetCat));
            }
            
            const rotateClass = isExpanded ? 'rotate-180 text-purple-400' : 'text-gray-500';
            const bgClass = isExpanded ? 'bg-white/5' : 'hover:bg-white/5';
            const titleColor = isExpanded ? 'text-purple-300' : 'text-gray-300 hover:text-purple-300';

            const btnHeader = document.createElement('button');
            btnHeader.className = `w-full flex items-center justify-between p-4 text-[15px] font-extrabold rounded-xl transition-all uppercase tracking-widest ${titleColor} ${bgClass} group`;
            btnHeader.innerHTML = `
                <span class="flex items-center gap-2 drop-shadow-sm">${section.sectionTitle}</span>
                <svg class="w-5 h-5 transform transition-all duration-300 ${rotateClass} group-hover:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path></svg>
            `;

            const contentWrapper = document.createElement('div');
            contentWrapper.className = `accordion-content ${isExpanded ? 'open' : ''}`;
            const contentInner = document.createElement('div');
            contentInner.className = "accordion-inner pt-2 pb-5 space-y-4";

            btnHeader.onclick = () => {
                const isOpen = contentWrapper.classList.contains('open');
                const arrow = btnHeader.querySelector('svg');

                if (isOpen) {
                    contentWrapper.classList.remove('open');
                    btnHeader.classList.remove('bg-white/5');
                    btnHeader.classList.replace('text-purple-300', 'text-gray-300');
                    arrow.classList.remove('rotate-180', 'text-purple-400');
                    arrow.classList.add('text-gray-500');
                } else {
                    contentWrapper.classList.add('open');
                    btnHeader.classList.add('bg-white/5');
                    btnHeader.classList.replace('text-gray-300', 'text-purple-300');
                    arrow.classList.add('rotate-180', 'text-purple-400');
                    arrow.classList.remove('text-gray-500');
                }
            };

            const groupedItems = section.items.reduce((acc, curr) => {
                (acc[curr.category] = acc[curr.category] || []).push(curr);
                return acc;
            }, {});

            for (const [category, items] of Object.entries(groupedItems)) {
                const catWrapper = document.createElement('div');
                catWrapper.className = "pl-4 relative";

                const line = document.createElement('div');
                line.className = "absolute left-4 top-0 bottom-0 w-[2px] bg-purple-900/40 rounded-full";
                catWrapper.appendChild(line);

                const catHeader = document.createElement('h4');
                catHeader.className = "text-xs font-bold text-gray-500 mb-3 pl-5 uppercase tracking-widest relative z-10 flex items-center gap-2";
                catHeader.innerHTML = `<span class="w-2 h-2 rounded-full bg-gray-600"></span> ${category}`;
                catWrapper.appendChild(catHeader);

                items.forEach(item => {
                    const itemBtn = document.createElement('button');
                    itemBtn.className = "w-full text-left py-2.5 px-5 ml-2 rounded-lg text-[15px] text-gray-400 hover:text-purple-200 hover:bg-purple-500/10 active:scale-[0.98] transition-all truncate border-l-2 border-transparent hover:border-purple-400 relative z-10 font-medium";
                    itemBtn.textContent = item.title;
                    itemBtn.onclick = () => showDetail(item);
                    catWrapper.appendChild(itemBtn);
                });
                contentInner.appendChild(catWrapper);
            }

            contentWrapper.appendChild(contentInner);
            sectionDiv.appendChild(btnHeader);
            sectionDiv.appendChild(contentWrapper);
            listContainer.appendChild(sectionDiv);
            
            // If this is the targeted section from URL, scroll it into view slightly
            if (isExpanded && targetCat !== null && !expandAll) {
                setTimeout(() => {
                    sectionDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 300);
            }
        });
    }

    // ============================================================
    // 5. 상세 내용 표시 (제목 폰트 대폭 확대)
    // ============================================================
    function showDetail(data) {
        emptyState.classList.add('hidden');

        detailView.classList.remove('animate-fade-in-up');
        void detailView.offsetWidth;
        detailView.classList.remove('hidden');
        detailView.classList.add('animate-fade-in-up');
        contentArea.scrollTop = 0;

        dTitle.textContent = data.title;
        dCategory.textContent = data.category;
        dSummary.textContent = data.summary;

        // 본문 텍스트 
        dDesc.innerHTML = data.description.map(text => `<p>${text}</p>`).join('');
        // 요약 컨테이너는 기본 접혀있게
        const descContainer = document.getElementById('detail-description');
        descContainer.classList.remove('active');

        // 배지 스타일
        dDifficulty.textContent = data.difficulty;
        dDifficulty.className = "text-sm font-black tracking-widest uppercase px-4 py-1.5 rounded-full shadow-sm ";
        const isChatUI = ['Info', 'Normal', 'Critical', 'Major'].includes(data.difficulty);

        if (['Hard', 'Very Hard', 'Critical'].includes(data.difficulty)) {
            dDifficulty.classList.add('text-red-300', 'bg-red-900/40', 'border', 'border-red-500/30');
        } else if (['Easy', 'Info'].includes(data.difficulty)) {
            dDifficulty.classList.add('text-emerald-300', 'bg-emerald-900/40', 'border', 'border-emerald-500/30');
        } else {
            dDifficulty.classList.add('text-blue-300', 'bg-blue-900/40', 'border', 'border-blue-500/30');
        }

        // 이미지 / 맵
        dMapContainer.innerHTML = '';
        if (data.image) {
            dMapContainer.classList.remove('hidden');
            dMapContainer.style.cursor = "default";
            dMapContainer.onclick = null;
            dMapContainer.innerHTML = `
                <div class="relative w-full max-w-3xl mx-auto aspect-video bg-[#0B0D14] rounded-3xl overflow-hidden border border-gray-700/50 shadow-[0_10px_40px_rgba(0,0,0,0.6)] group">
                    <img src="${data.image}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" alt="${data.title}">
                </div>
            `;
        } else if (data.mapData) {
            dMapContainer.classList.remove('hidden');
            renderStrategyMap(data.mapData);
        } else {
            dMapContainer.classList.add('hidden');
        }

        // ★ 채팅 로그 UI / 단계 UI (제목 크기 2배 이상 상향)
        const stepsSection = dStepsContainer;
        const stepsTitle = document.getElementById('steps-title');

        if (data.steps && data.steps.length > 0) {
            stepsSection.classList.remove('hidden');

            if (isChatUI) {
                // 제목 크기: text-xl md:text-2xl, 아이콘 크기: text-3xl
                stepsTitle.innerHTML = `<span class="text-blue-400 mr-3 text-3xl opacity-90 drop-shadow-md">💬</span> 요약`;
                stepsTitle.className = "flex items-center text-xl md:text-2xl font-black text-blue-400 tracking-widest uppercase mb-6";

                dSteps.innerHTML = `
                    <div class="bg-[#0B0D14] p-8 rounded-3xl border border-gray-700/50 shadow-inner font-sans text-base space-y-5 relative overflow-hidden">
                        <div class="absolute top-0 right-0 p-5 opacity-5 pointer-events-none text-8xl">💭</div>
                        ${data.steps.map((text, idx) => {
                    const sepIdx = text.indexOf(':');
                    let speaker = "SYSTEM", content = text;
                    if (sepIdx !== -1) {
                        speaker = text.substring(0, sepIdx).trim();
                        content = text.substring(sepIdx + 1).trim();
                    }

                    let sColor = "text-gray-500", sBadge = "•";
                    if (speaker.match(/해설|캐스터|클템|전용준|강퀴/)) { sColor = "text-yellow-400"; sBadge = "🎙️"; }
                    else if (speaker.match(/채팅|유저|팬/)) { sColor = "text-blue-400"; sBadge = "💬"; }
                    else if (speaker.match(/상황|결과|폭로/)) { sColor = "text-red-400 font-bold"; sBadge = "🚨"; }
                    else if (speaker.match(/선수|오더|미드|탑|정글|원딜|서폿/)) { sColor = "text-emerald-400"; sBadge = "🎮"; }

                    const delay = idx * 0.15;

                    if (speaker === "SYSTEM") {
                        return `<div class="chat-msg-anim pl-4 py-2 border-l-4 border-gray-600 text-gray-400 italic text-sm" style="animation-delay: ${delay}s">${content}</div>`;
                    }

                    return `
                                <div class="chat-msg-anim flex items-start gap-4 hover:bg-white/5 p-3 rounded-xl transition-colors" style="animation-delay: ${delay}s">
                                    <div class="flex-shrink-0 w-8 text-center opacity-80 text-xl pt-0.5 filter drop-shadow-md">${sBadge}</div>
                                    <div class="flex flex-col">
                                        <span class="${sColor} text-xs font-black uppercase tracking-widest mb-1">${speaker}</span>
                                        <span class="text-gray-200 text-[17px] leading-relaxed break-words">${content}</span>
                                    </div>
                                </div>
                            `;
                }).join('')}
                    </div>
                `;
            } else {
                // 제목 크기: text-xl md:text-2xl, 아이콘 크기: text-3xl
                stepsTitle.innerHTML = `<span class="text-indigo-400 mr-3 text-3xl opacity-90 drop-shadow-md">⚡</span> Execution Steps`;
                stepsTitle.className = "flex items-center text-xl md:text-2xl font-black text-indigo-400 tracking-widest uppercase mb-6";

                dSteps.innerHTML = data.steps.map((step, idx) => `
                    <div class="flex gap-5 items-start bg-[#161822] p-5 rounded-2xl border border-gray-700/50 hover:border-indigo-500/50 hover:bg-indigo-900/20 transition-all group">
                        <span class="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-sm font-black text-white mt-0.5 shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-transform">${idx + 1}</span>
                        <span class="text-gray-200 leading-relaxed text-[17px] pt-1 transition-colors">${step}</span>
                    </div>
                `).join('');
            }
        } else {
            stepsSection.classList.add('hidden');
        }

        // ★ TMI / 카운터 박스 (제목 폰트 사이즈 대폭 확대)
        const counterSection = dCounterContainer;
        const counterTitle = document.getElementById('counter-title');

        if (data.counter && data.counter.trim() !== "") {
            counterSection.classList.remove('hidden');
            if (isChatUI) {
                // 제목 크기: text-xl md:text-2xl, 아이콘 크기: text-3xl
                counterTitle.innerHTML = `<span class="text-yellow-400 mr-3 text-3xl opacity-90 drop-shadow-md">💡</span> Trivia & Origin`;
                counterTitle.className = "flex items-center text-xl md:text-2xl font-black text-yellow-400 tracking-widest uppercase mb-6";

                dCounter.innerHTML = `
                    <div class="flex items-start gap-5">
                        <div class="text-3xl pt-1 select-none opacity-90 drop-shadow-md">🧐</div>
                        <div class="text-gray-200 leading-relaxed text-[17px] pt-1">
                            ${data.counter}
                        </div>
                    </div>
                `;
                dCounter.parentElement.className = "bg-[#161822] border border-gray-700/50 border-l-4 border-l-yellow-500 p-6 rounded-2xl shadow-lg";
            } else {
                // 제목 크기: text-xl md:text-2xl, 아이콘 크기: text-3xl
                counterTitle.innerHTML = `<span class="text-red-400 mr-3 text-3xl opacity-90 drop-shadow-md">🛡️</span> Counter Play`;
                counterTitle.className = "flex items-center text-xl md:text-2xl font-black text-red-400 tracking-widest uppercase mb-6";

                dCounter.innerHTML = `
                    <div class="flex items-start gap-5">
                        <div class="text-3xl pt-1 select-none opacity-80">⚠️</div>
                        <div class="text-gray-200 leading-relaxed text-[17px] pt-1">
                            ${data.counter}
                        </div>
                    </div>
                `;
                dCounter.parentElement.className = "bg-[#161822] border border-gray-700/50 border-l-4 border-l-red-500 p-6 rounded-2xl shadow-lg";
            }
        } else {
            counterSection.classList.add('hidden');
        }

        // 유튜브 링크 버튼
        const existingBtn = document.getElementById('youtube-btn');
        if (existingBtn) existingBtn.remove();

        if (data.youtube) {
            const btn = document.createElement('a');
            btn.id = 'youtube-btn';
            btn.href = data.youtube;
            btn.target = '_blank';
            btn.className = "inline-flex items-center gap-3 mt-8 px-6 py-3.5 bg-[#161822] border border-gray-700 hover:border-red-500 hover:bg-gray-800/80 text-gray-200 text-base font-bold rounded-xl transition-all shadow-md transform hover:-translate-y-1 group";
            btn.innerHTML = `<svg class="w-6 h-6 text-red-500 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg> 관련 영상 시청하기`;
            dDesc.parentElement.appendChild(btn);
        }

        // 참고 자료 링크 버튼
        const existingRefBtn = document.getElementById('reference-btn');
        if (existingRefBtn) existingRefBtn.remove();

        if (data.reference) {
            const refBtn = document.createElement('a');
            refBtn.id = 'reference-btn';
            refBtn.href = data.reference.url;
            refBtn.target = '_blank';
            refBtn.className = "inline-flex items-center gap-3 mt-8 px-6 py-3.5 bg-[#161822] border border-gray-700 hover:border-purple-500 hover:bg-gray-800/80 text-gray-200 text-base font-bold rounded-xl transition-all shadow-md transform hover:-translate-y-1 group";
            refBtn.innerHTML = `<svg class="w-6 h-6 text-purple-400 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg> ${data.reference.title}`;
            dDesc.closest('section').after(refBtn);
        }
    }

    // ============================================================
    // 6. 미니맵 렌더링 함수 (글자 크기 축소 버그 수정 반영)
    // ============================================================
    function renderStrategyMap(mapData) {
        if (!mapData) return;
        dMapContainer.style.cursor = "crosshair";
        dMapContainer.onclick = (e) => {
            const img = dMapContainer.querySelector('img');
            if (!img) return;
            const rect = img.getBoundingClientRect();
            const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
            const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
            console.log(`📍 Click: { "x": ${x}, "y": ${y} }`);
        };
        const zoomLevel = mapData.zoom ? mapData.zoom.scale : 1;
        const originX = mapData.zoom ? mapData.zoom.x : 50;
        const originY = mapData.zoom ? mapData.zoom.y : 50;

        dMapContainer.innerHTML = `
            <div class="relative w-full max-w-lg mx-auto aspect-square bg-[#0B0D14] rounded-[2rem] overflow-hidden border border-purple-500/20 shadow-[0_0_40px_rgba(168,85,247,0.15)] group select-none">
                <div id="map-zoom-target" class="w-full h-full relative transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
                     style="transform-origin: ${originX}% ${originY}%; transform: scale(${zoomLevel});">
                    <img src="../photos/assets/images/map.png" class="absolute inset-0 w-full h-full object-cover opacity-60 grayscale-[50%] sepia-[20%] group-hover:grayscale-0 group-hover:sepia-0 transition-all duration-700">
                    <svg class="absolute inset-0 w-full h-full pointer-events-none z-10" id="map-svg-layer"></svg>
                    <div class="absolute inset-0 w-full h-full z-20 font-sans" id="map-point-layer"></div>
                </div>
                ${zoomLevel > 1 ? '<div class="absolute top-5 right-5 bg-black/60 backdrop-blur text-purple-300 text-xs uppercase tracking-widest px-4 py-2 rounded-full font-bold border border-purple-500/30 shadow-lg flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse"></span>ZOOM VIEW</div>' : ''}
            </div>
        `;
        const svgLayer = dMapContainer.querySelector('#map-svg-layer');
        const pointLayer = dMapContainer.querySelector('#map-point-layer');

        if (mapData.arrows) {
            mapData.arrows.forEach(arrow => {
                const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                line.setAttribute("x1", arrow.start[0] + "%");
                line.setAttribute("y1", arrow.start[1] + "%");
                line.setAttribute("x2", arrow.end[0] + "%");
                line.setAttribute("y2", arrow.end[1] + "%");
                let strokeColor = '#94a3b8';
                if (arrow.color === 'red') strokeColor = '#f43f5e';
                if (arrow.color === 'blue') strokeColor = '#60a5fa';
                if (arrow.color === 'yellow') strokeColor = '#c084fc';
                line.setAttribute("stroke", strokeColor);
                line.setAttribute("stroke-width", "2.5");
                line.setAttribute("stroke-linecap", "round");
                line.style.filter = `drop-shadow(0 0 4px ${strokeColor})`;

                if (arrow.animation) line.classList.add(arrow.animation);
                else if (arrow.dashed !== false) line.setAttribute("stroke-dasharray", "5,5");
                if (arrow.delay) line.style.animationDelay = arrow.delay + 'ms';
                svgLayer.appendChild(line);
            });
        }

        if (mapData.points) {
            mapData.points.forEach(point => {
                const dot = document.createElement('div');
                const scaleAdjust = zoomLevel > 1 ? (1 / zoomLevel) * 1.5 : 1;
                let baseClass = 'rounded-full shadow-lg transform -translate-x-1/2 -translate-y-1/2 absolute border border-gray-900 z-30 transition-transform';
                if (point.type === 'enemy') baseClass += ' bg-rose-500 shadow-rose-500/50';
                else if (point.type === 'ally') baseClass += ' bg-blue-500 shadow-blue-500/50';
                else if (point.type === 'ward') baseClass += ' bg-purple-400 shadow-purple-500/50';
                else baseClass += ' bg-gray-400';
                if (point.animation) baseClass += ' pulse-anim';

                dot.className = baseClass;
                dot.style.left = point.x + "%";
                dot.style.top = point.y + "%";
                dot.style.width = (3 * scaleAdjust) + "%";
                dot.style.height = (3 * scaleAdjust) + "%";

                if (point.label) {
                    const label = document.createElement('div');
                    label.textContent = point.label;

                    label.className = `absolute text-[7.5px] font-black text-white bg-black/80 px-2 py-0.5 rounded whitespace-nowrap z-40 pointer-events-none backdrop-blur-md border border-white/20 tracking-wider`;

                    const invScale = 1 / zoomLevel;
                    label.style.transform = `translate(-50%, ${12 * invScale}px) scale(${invScale * 1.1})`;
                    label.style.transformOrigin = "top center";

                    label.style.left = point.x + "%";
                    label.style.top = point.y + "%";
                    pointLayer.appendChild(label);
                }
                pointLayer.appendChild(dot);
            });
        }
    }
});