// 공통 API 호출 함수
async function fetchData(url, options = {}) {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
        return null;
    }
}

// 데이터 로딩 애니메이션 (예: 로딩 중 표시)
function showLoading(targetId) {
    const target = document.getElementById(targetId);
    target.innerHTML = `<div class="loading">Loading...</div>`;
}

// 데이터 로딩 완료 후 콘텐츠 렌더링
function hideLoading(targetId) {
    const target = document.getElementById(targetId);
    target.innerHTML = '';
}

// 에러 메시지 표시
function showError(targetId, message) {
    const target = document.getElementById(targetId);
    target.innerHTML = `<div class="error">${message}</div>`;
}
