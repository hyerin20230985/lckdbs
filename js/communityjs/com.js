document.addEventListener("DOMContentLoaded", () => {
    const postContainer = document.getElementById("postContainer");
    const searchForm = document.getElementById("searchForm");
    const searchInput = document.getElementById("searchInput");
    const searchType = document.getElementById("searchType");
    const pagination = document.getElementById("pagination");
    const categoryLinks = document.querySelectorAll(".cate-area a");
    const searchButton = document.getElementById("searchButton");
    const goPageInput = document.getElementById("goPageInput");
    const goPageButton = document.getElementById("goPageButton");
    const totalPagesSpan = document.querySelector(".total-pages");
    const prevPageButton = document.querySelector(".go-prev");
    const nextPageButton = document.querySelector(".go-next");

    const POSTS_PER_PAGE = 10;
    const POPULAR_POSTS_KEY_PREFIX = "popular_posts_for_";
    const LAST_POPULAR_UPDATE_DATE_KEY = "last_popular_update_date";
    const MOCK_POSTS_STORAGE_KEY = 'mockPosts'; // Local Storage Key for consistency

    let currentPage = 1;
    let currentCategory = "전체";
    let filteredPosts = [];
    let allPosts = [];

    const today = new Date().toISOString().split("T")[0];
    const nowTime = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    });

    const initialMockPosts = [{
            id: 1,
            title: "KT VS DK | 퍼펙트 데려가는 Siwoo",
            category: "KT",
            time: "15:19",
            author: "KCCanna",
            vote: 25,
            commentCount: 18,
            date: "2025-06-16",
            thumbnail: "https://via.placeholder.com/70x50/4E046D/FFFFFF?Text=KT",
            images: ["https://via.placeholder.com/300x200/4E046D/FFFFFF?Text=KT_Image1", "https://via.placeholder.com/300x200/800080/FFFFFF?Text=KT_Image2"],
            content: "KT와 DK의 경기는 정말 치열했습니다. Siwoo 선수의 플레이가 돋보였죠.",
            password: "test",
            comments: [] // Ensure comments array exists
        },
        {
            id: 2,
            title: "피어엑스 첫 승 기념 영상 떴는데 개추 좀 ㅠㅠ",
            category: "BNK",
            time: "15:04",
            author: "듀로",
            vote: 69,
            commentCount: 10,
            date: "2025-06-16",
            thumbnail: "https://via.placeholder.com/70x50/008000/FFFFFF?Text=BNK",
            images: ["https://via.placeholder.com/300x200/008000/FFFFFF?Text=BNK_Image1"],
            content: "드디어 피어엑스가 첫 승을 거뒀습니다! 감동이네요.",
            password: "test",
            comments: []
        },
        {
            id: 3,
            title: "내멋대로 쓰는 4월 7일 T1 프리뷰",
            category: "T1",
            time: "14:31",
            author: "steam888",
            vote: 20,
            commentCount: 8,
            date: "2025-06-16",
            thumbnail: "https://via.placeholder.com/70x50/FF0000/FFFFFF?Text=T1",
            images: [],
            content: "T1의 4월 7일 경기 프리뷰입니다. 기대되네요.",
            password: "test",
            comments: []
        },
        {
            id: 4,
            title: "대상혁은 신임 ㅇㅇ 반박시 니 말 다 틀림 어쩌라고 Tlqkf",
            category: "T1",
            time: "15:31",
            author: "MuMoon0519",
            vote: 123,
            commentCount: 26,
            date: today,
            thumbnail: "https://via.placeholder.com/70x50/FF0000/FFFFFF?Text=T1",
            images: ["default_image.png"],
            content: "페이커는 신입니다. 반박 안 받습니다.",
            password: "test",
            comments: []
        },
        {
            id: 5,
            title: "쵸비 누가 좋아함? 그게 나임",
            category: "GEN.G",
            time: "20:12",
            author: "Chovy88848",
            vote: 34,
            commentCount: 46,
            date: today,
            thumbnail: "https://via.placeholder.com/70x50/FFD700/000000?Text=GEN.G",
            images: ["https://via.placeholder.com/300x200/FFD700/000000?Text=GEN.G_Image1", "https://via.placeholder.com/300x200/000000/FFD700?Text=GEN.G_Image2", "image3.jpg"],
            content: "쵸비 선수는 정말 대단합니다. 그의 팬심을 주체할 수 없네요.",
            password: "test",
            comments: []
        },
        {
            id: 6,
            title: "진지하게 나도 프로에서 먹힐꺼 같음",
            category: "자유",
            time: "15:15",
            author: "jinhyeok01",
            vote: 69,
            commentCount: 74,
            date: today,
            thumbnail: "https://via.placeholder.com/70x50/808080/FFFFFF?Text=자유",
            images: ["image4.png"],
            content: "제가 생각해도 저는 프로게이머 재능이 있는 것 같습니다.",
            password: "test",
            comments: []
        },
        {
            id: 7,
            title: "구ㅈ마ㅈ 왜 씀? 스매쉬로 하지?",
            category: "T1",
            time: "12:00",
            author: "T1Win1557",
            vote: 100,
            commentCount: 55,
            date: today,
            thumbnail: "https://via.placeholder.com/70x50/FF0000/FFFFFF?Text=T1",
            images: [],
            content: "구마유시 선수 왜 자꾸 쓰는 거죠? 스매쉬가 더 나은데.",
            password: "test",
            comments: []
        },
        {
            id: 8,
            title: "우리 팀 언제 이기노",
            category: "DRX",
            time: "19:17",
            author: "조선제일검",
            vote: 55,
            commentCount: 74,
            date: today,
            thumbnail: "https://via.placeholder.com/70x50/800080/FFFFFF?Text=DRX",
            images: ["default_image.png"],
            content: "DRX는 언제쯤 이길 수 있을까요... 정말 힘드네요.",
            password: "test",
            comments: []
        },
        {
            id: 9,
            title: "진지하게 피드백 해봄 다소 길지만 양해 부탁",
            category: "자유",
            time: "23:59",
            author: "suckyeoul",
            vote: 42,
            commentCount: 60,
            date: today,
            thumbnail: "https://via.placeholder.com/70x50/808080/FFFFFF?Text=자유",
            images: ["image5.jpg", "image6.png"],
            content: "이번 경기에 대한 진지한 피드백입니다. 길지만 읽어주세요.",
            password: "test",
            comments: []
        },
        {
            id: 10,
            title: "나랑 듀오할 사람 현 플레",
            category: "자유",
            time: "16:47",
            author: "jinhyeok01",
            vote: 56,
            commentCount: 43,
            date: today,
            thumbnail: "https://via.placeholder.com/70x50/808080/FFFFFF?Text=자유",
            images: ["image7.jpeg"],
            content: "플래티넘 티어 듀오 구합니다. 편하게 연락 주세요.",
            password: "test",
            comments: []
        },
        {
            id: 11,
            title: "제우스 템퍼링 사실 조마쉬가 주도했다함",
            category: "HLE",
            time: "23:28",
            author: "Jomash",
            vote: 1557,
            commentCount: 1557,
            date: today,
            thumbnail: "https://via.placeholder.com/70x50/FFA500/FFFFFF?Text=HLE",
            images: ["https://via.placeholder.com/300x200/FFA500/FFFFFF?Text=HLE_Image1"],
            content: "제우스 선수 템퍼링 루머에 대한 진실입니다.",
            password: "test",
            comments: []
        },
        {
            id: 12,
            title: "모건 존잘 사진 찍어옴",
            category: "BRO",
            time: "11:11",
            author: "Morganlovegay33",
            vote: 70,
            commentCount: 69,
            date: today,
            thumbnail: null,
            images: [],
            content: "모건 선수 실물 영접 후기입니다. 정말 잘생겼네요!",
            password: "test",
            comments: []
        },
        {
            id: 13,
            title: "쇼메이커 폼 개 떨어졌으면 개추",
            category: "DK",
            time: "01:29",
            author: "Sojumaker",
            vote: 55,
            commentCount: 43,
            date: today,
            thumbnail: "https://via.placeholder.com/70x50/0000FF/FFFFFF?Text=DK",
            images: ["default_image.png"],
            content: "쇼메이이커 선수 폼이 많이 떨어진 것 같습니다. 공감하면 개추.",
            password: "test",
            comments: []
        },
    ];

    function getPostsFromLocalStorage() {
        try {
            const storedPosts = localStorage.getItem(MOCK_POSTS_STORAGE_KEY);
            return storedPosts ? JSON.parse(storedPosts) : [];
        } catch (e) {
            console.error("Error parsing posts from localStorage:", e);
            return [];
        }
    }

    function savePostsToLocalStorage(posts) {
        try {
            localStorage.setItem(MOCK_POSTS_STORAGE_KEY, JSON.stringify(posts));
        } catch (e) {
            console.error("Error saving posts to localStorage:", e);
        }
    }

    const loadInitialPosts = () => {
        allPosts = getPostsFromLocalStorage();
        if (allPosts.length === 0) {
            allPosts = [...initialMockPosts];
            savePostsToLocalStorage(allPosts);
        }
    };

    function updatePopularPosts() {
        const lastUpdateDate = localStorage.getItem(LAST_POPULAR_UPDATE_DATE_KEY);

        if (lastUpdateDate !== today) {
            console.log("Starting new popular posts update.");

            const todayPosts = allPosts.filter((p) => p.date === today);
            const sortedPosts = todayPosts.sort((a, b) => b.vote - a.vote);

            const uniqueMap = new Map();
            sortedPosts.forEach(post => {
                if (post.title && !uniqueMap.has(post.title)) {
                    uniqueMap.set(post.title, post);
                }
            });
            const uniqueSorted = Array.from(uniqueMap.values());

            const top3PopularPosts = uniqueSorted.slice(0, 3);
            console.log("Today's top 3 popular posts:", top3PopularPosts);

            localStorage.setItem(`${POPULAR_POSTS_KEY_PREFIX}${today}`, JSON.stringify(top3PopularPosts));
            localStorage.setItem(LAST_POPULAR_UPDATE_DATE_KEY, today);
            console.log("Popular posts updated and date recorded.");
        } else {
            console.log("Popular posts already updated for today.");
        }
    }

    function getPopularPostsForToday() {
        const key = `${POPULAR_POSTS_KEY_PREFIX}${today}`;
        const storedPopular = localStorage.getItem(key);
        return storedPopular ? JSON.parse(storedPopular) : [];
    }

    function highlightCategory(category) {
        categoryLinks.forEach((el) => {
            el.classList.remove("active");
            if (el.dataset.category === category) {
                el.classList.add("active");
            }
        });
    }

    function loadPosts(category = "전체", page = 1) {
        currentCategory = category;
        currentPage = page;

        let postsToFilter = allPosts;

        if (category === "인기") {
            filteredPosts = getPopularPostsForToday();
        } else if (category === "전체") {
            filteredPosts = [...postsToFilter];
        } else {
            filteredPosts = postsToFilter.filter((post) => post.category === category);
        }

        if (category !== "인기") {
            filteredPosts.sort((a, b) => b.vote - a.vote);
        }

        renderPosts();
        renderPagination();
        highlightCategory(category);
    }

    function renderPosts() {
        if (!postContainer) {
            console.error("Post container element not found. Cannot render posts.");
            return;
        }
        postContainer.innerHTML = "";

        const start = (currentPage - 1) * POSTS_PER_PAGE;
        const end = start + POSTS_PER_PAGE;
        const postsToShow = filteredPosts.slice(start, end);

        if (postsToShow.length === 0) {
            postContainer.innerHTML = "<p class='no-posts-message'>게시물이 없습니다.</p>";
            return;
        }

        postsToShow.forEach((post) => {
            // Robust post data validation
            if (!post || typeof post.id === 'undefined' || !post.title || !post.category ||
                typeof post.time === 'undefined' || typeof post.author === 'undefined' ||
                typeof post.commentCount === 'undefined' || typeof post.vote === 'undefined' ||
                typeof post.date === 'undefined' || typeof post.content === 'undefined' ||
                typeof post.password === 'undefined' || !Array.isArray(post.images) ||
                typeof post.comments === 'undefined' || !Array.isArray(post.comments)) {
                console.warn("Invalid or incomplete post data, skipping rendering:", post);
                return;
            }

            let thumbnailSrc = "image/doc.jpg";
            const hasImages = Array.isArray(post.images) && post.images.length > 0;

            if (hasImages && post.images[0] && post.images[0] !== "default_image.png") {
                thumbnailSrc = post.images[0];
            } else if (post.thumbnail) {
                thumbnailSrc = post.thumbnail;
            }

            const article = document.createElement("article");
            article.className = "post";
            article.setAttribute('data-post-id', post.id);

            // Directly link to post.html without selection logic on click
            article.innerHTML = `
                <div class="thumb">
                    <img src="${thumbnailSrc}" alt="${post.title}" onerror="this.src='image/doc.jpg';">
                </div>
                <div class="content">
                    <div class="vote">추천 ${post.vote}</div>
                    <h3><a href="post.html?id=${post.id}">${post.title}</a> <span class="comment_count">[${post.commentCount}]</span></h3>
                    <div class="meta">
                        <a class="category-tag" href="#" data-category="${post.category}">${post.category}</a>
                        <span class="time">${post.time}</span>
                        <span class="author">${post.author}</span>
                    </div>
                </div>
            `;
            postContainer.appendChild(article);
        });
    }

    function renderPagination() {
        const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

        if (totalPagesSpan) totalPagesSpan.textContent = `/ ${totalPages} 페이지`;
        if (goPageInput) goPageInput.value = currentPage;

        if (prevPageButton) prevPageButton.disabled = currentPage === 1;
        if (nextPageButton) nextPageButton.disabled = currentPage === totalPages || totalPages === 0;

        let html = ``;
        const maxPagesToShow = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

        if (endPage - startPage + 1 < maxPagesToShow) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            html += `<a href="#" class="page-link${i === currentPage ? " current" : ""}" data-page="${i}">${i}</a> `;
        }
        if (pagination) pagination.innerHTML = html;
    }

    categoryLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const category = e.target.dataset.category;
            loadPosts(category);
        });
    });

    if (searchForm) {
        searchForm.addEventListener("submit", (e) => {
            e.preventDefault();
            performSearch();
        });
    }
    if (searchButton) {
        searchButton.addEventListener("click", (e) => {
            e.preventDefault();
            performSearch();
        });
    }

    function performSearch() {
        const keyword = searchInput?.value?.trim().toLowerCase() ?? '';
        const type = searchType?.value ?? 'title_content';

        filteredPosts = allPosts.filter((post) => {
            const title = post.title?.toLowerCase() ?? '';
            const content = post.content?.toLowerCase() ?? '';
            const author = post.author?.toLowerCase() ?? '';
            const comments = post.comments || [];

            switch (type) {
                case "title_content":
                    return title.includes(keyword) || content.includes(keyword);
                case "title":
                    return title.includes(keyword);
                case "content":
                    return content.includes(keyword);
                case "nick_name":
                    return author.includes(keyword);
                case "comment":
                    return comments.some(c => c.text?.toLowerCase().includes(keyword));
                default:
                    return false;
            }
        });
        currentPage = 1;
        renderPosts();
        renderPagination();
    }

    if (goPageButton) {
        goPageButton.addEventListener("click", () => {
            const page = parseInt(goPageInput?.value);
            const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
            if (!isNaN(page) && page >= 1 && page <= totalPages) {
                loadPosts(currentCategory, page);
            } else {
                alert(`유효한 페이지 번호를 입력하세요 (1 ~ ${totalPages}).`);
                if (goPageInput) goPageInput.value = currentPage;
            }
        });
    }

    if (prevPageButton) {
        prevPageButton.addEventListener("click", () => {
            if (currentPage > 1) {
                loadPosts(currentCategory, currentPage - 1);
            }
        });
    }

    if (nextPageButton) {
        nextPageButton.addEventListener("click", () => {
            const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
            if (currentPage < totalPages) {
                loadPosts(currentCategory, currentPage + 1);
            }
        });
    }

    if (pagination) {
        pagination.addEventListener('click', (e) => {
            const target = e.target;
            if (target.classList.contains('page-link')) {
                e.preventDefault();
                const page = parseInt(target.dataset.page);
                if (!isNaN(page)) {
                    loadPosts(currentCategory, page);
                }
            }
        });
    }

    // `password-modal-com` 관련 모든 로직 제거
    // (com.html에서 이미 제거되었으므로 해당 요소가 없을 것임)
    const passwordModalCom = document.getElementById('password-modal-com');
    if (passwordModalCom) {
        passwordModalCom.remove();
    }

    // 게시물 선택(`selected` 클래스 토글) 기능 완전히 제거
    // postContainer.addEventListener('click', ...); 로직 삭제

    loadInitialPosts();
    updatePopularPosts(); // Ensure popular posts are updated on load
    loadPosts();
});