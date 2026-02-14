document.addEventListener('DOMContentLoaded', async () => {
    // 페이지 요소
    const pages = {
        list: document.getElementById('list-page'),
        write: document.getElementById('write-page'),
        post: document.getElementById('post-page'),
    };

    // 모달 요소
    const manageModal = document.getElementById('manage-modal');
    const alertModal = document.getElementById('alert-modal');
    const closeManageModalBtn = manageModal.querySelector('.close-btn');
    const closeAlertModalBtns = alertModal.querySelectorAll('.close-alert-btn');

    const postAttachmentInput = document.getElementById('post-attachment');
    const attachmentPreviewContainer = document.getElementById('attachment-preview-container');
    let attachmentData = null;

    // --- IndexedDB 설정 ---
    const DB_NAME = 'communityDB';
    const DB_VERSION = 1;
    const STORE_NAME = 'posts';
    let db;

    function initDB() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);
            request.onerror = () => reject('IndexedDB Mở lỗi');
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains(STORE_NAME)) {
                    db.createObjectStore(STORE_NAME, { keyPath: 'id' });
                }
            };
            request.onsuccess = (event) => {
                db = event.target.result;
                resolve(db);
            };
        });
    }

    function saveDataToDB(data) {
        return new Promise((resolve, reject) => {
            if (!db) return reject("DB not initialized");
            const transaction = db.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            
            // 기존 데이터를 모두 지우고 새로 저장
            store.clear().onsuccess = () => {
                let completed = 0;
                if (data.length === 0) {
                   resolve();
                   return;
                }
                data.forEach(item => {
                    const request = store.put(item);
                    request.onsuccess = () => {
                        completed++;
                        if (completed === data.length) {
                            resolve();
                        }
                    };
                });
            };
            transaction.onerror = (event) => reject('데이터 저장 오류: ' + event.target.errorCode);
        });
    }
    
    function loadDataFromDB() {
        return new Promise((resolve, reject) => {
             if (!db) return reject("DB not initialized");
            const transaction = db.transaction([STORE_NAME], 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.getAll();
            request.onerror = (event) => reject('데이터 로드 오류: ' + event.target.errorCode);
            request.onsuccess = (event) => resolve(event.target.result);
        });
    }
    // --- IndexedDB 설정 끝 ---


    // 데이터베이스 역할
    let posts = [];
    let userVotes = JSON.parse(localStorage.getItem('userVotes')) || {}; // 투표는 간단하므로 localStorage 유지
    let state = {
        currentPage: 'list',
        currentCategory: '전체',
        currentPostId: null,
    };

    const categories = ['전체', 'T1', 'GENG', 'HLE', 'DK', 'KT', 'BRO', 'DRX', 'NS', 'LSB', 'DNF'];
    
    const quill = new Quill('#editor-container', {
        modules: { toolbar: [
            [{ 'font': [] }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'align': [] }],
            ['blockquote', 'code-block'],
            ['clean']
        ]},
        theme: 'snow',
        placeholder: '내용을 입력하세요...'
    });

    const migrateData = () => {
        let needsSave = false;
        posts.forEach(post => {
            if (post.attachmentURL && !post.attachment) {
                post.attachment = { url: post.attachmentURL, type: 'image/jpeg' };
                delete post.attachmentURL;
                needsSave = true;
            }
        });
        if (needsSave) savePosts();
    };

    const savePosts = async () => {
        try {
            await saveDataToDB(posts);
        } catch (error) {
            console.error('포스트 저장 실패:', error);
            showAlert('데이터 저장 중 오류가 발생했습니다.');
        }
    };
    const saveUserVotes = () => localStorage.setItem('userVotes', JSON.stringify(userVotes));

    const showAlert = (message) => {
        document.getElementById('alert-message').textContent = message;
        alertModal.classList.remove('hidden');
    };

    const navigateTo = (pageName, postId = null) => {
        Object.values(pages).forEach(page => page.classList.add('hidden'));
        pages[pageName].classList.remove('hidden');
        state.currentPage = pageName;
        state.currentPostId = postId;
        window.scrollTo(0, 0);
    };

    const renderCategories = () => {
        const categoryBar = document.getElementById('category-bar');
        const categorySelect = document.getElementById('post-category');
        categoryBar.innerHTML = '';
        categorySelect.innerHTML = '';

        categories.forEach(cat => {
            if (cat !== '전체') {
                const option = new Option(cat, cat);
                categorySelect.add(option);
            }
            const button = document.createElement('button');
            button.className = 'category-btn';
            button.textContent = cat;
            if (cat === state.currentCategory) button.classList.add('active');
            button.addEventListener('click', () => {
                state.currentCategory = cat;
                renderCategories();
                renderPostList();
            });
            categoryBar.appendChild(button);
        });
    };

    const renderPostList = () => {
        const postListContainer = document.getElementById('post-list-container');
        postListContainer.innerHTML = '';
        const filteredPosts = state.currentCategory === '전체' ? posts : posts.filter(p => p.category === state.currentCategory);

        if (filteredPosts.length === 0) {
            postListContainer.innerHTML = '<p>게시물이 없습니다.</p>';
            return;
        }

        filteredPosts.sort((a, b) => b.id - a.id).forEach(post => {
            const postEl = document.createElement('div');
            postEl.className = 'post-item';
            postEl.dataset.id = post.id;
            
            let attachmentIcon = '';
            if (post.attachment) {
                if (post.attachment.type.startsWith('image/')) attachmentIcon = ' 🖼️';
                else if (post.attachment.type.startsWith('video/')) attachmentIcon = ' 🎞️';
            }

            postEl.innerHTML = `
                <h2>${post.title}${attachmentIcon}</h2>
                <div class="post-meta">
                    <span>작성자: ${post.author}</span>
                    <span class="views">👁️ ${post.views}</span>
                    <span class="upvotes">👍 ${post.upvotes}</span>
                    <span class="downvotes">👎 ${post.downvotes}</span>
                </div>`;
            postEl.addEventListener('click', () => viewPost(post.id));
            postListContainer.appendChild(postEl);
        });
    };

    const renderPostDetail = () => {
        const post = posts.find(p => p.id === state.currentPostId);
        if (!post) { navigateTo('list'); return; }

        const container = document.getElementById('post-detail-container');
        let attachmentHTML = '';
        if (post.attachment) {
            if (post.attachment.type.startsWith('image/')) {
                attachmentHTML = `<div class="post-attachment"><img src="${post.attachment.url}" alt="첨부 파일"></div>`;
            } else if (post.attachment.type.startsWith('video/')) {
                attachmentHTML = `<div class="post-attachment"><video src="${post.attachment.url}" controls></video></div>`;
            }
        }

        const upvoteBtnClass = userVotes[post.id] === 'up' ? 'voted' : '';
        const downvoteBtnClass = userVotes[post.id] === 'down' ? 'voted' : '';

        container.innerHTML = `
            <h1>${post.title}</h1>
            <div class="post-detail-meta">
                <span><strong>카테고리:</strong> ${post.category}</span> | 
                <span><strong>작성자:</strong> ${post.author}</span> | 
                <span><strong>조회수:</strong> ${post.views}</span>
            </div>
            ${attachmentHTML}
            <div class="post-detail-content">${post.content}</div>
            <div class="post-vote">
                <button class="vote-btn ${upvoteBtnClass}" id="upvote-btn">추천 👍 ${post.upvotes}</button>
                <button class="vote-btn ${downvoteBtnClass}" id="downvote-btn">싫어요 👎 ${post.downvotes}</button>
            </div>`;

        document.getElementById('upvote-btn').addEventListener('click', () => handleVote(post.id, 'up'));
        document.getElementById('downvote-btn').addEventListener('click', () => handleVote(post.id, 'down'));
        
        renderComments(post.id);
    };

    const findComment = (commentId, comments) => {
        for (const comment of comments) {
            if (comment.id === commentId) return { comment, parentList: comments };
            if (comment.replies) {
                const found = findComment(commentId, comment.replies);
                if (found) return found;
            }
        }
        return null;
    };
    
    const createCommentElement = (postId, comment) => {
        const commentEl = document.createElement('div');
        commentEl.className = 'comment-item';
        commentEl.dataset.commentId = comment.id;
        commentEl.innerHTML = `
            <div class="comment-content-wrapper">
                <p>${comment.content.replace(/\n/g, '<br>')}</p>
                <div class="comment-meta">
                    <span><strong>${comment.author}</strong></span>
                    <div class="comment-actions">
                        <button class="reply-comment-btn">덧글</button>
                        <button class="edit-comment-btn">수정</button>
                        <button class="delete-comment-btn">삭제</button>
                    </div>
                </div>
            </div>`;
        
        if (comment.replies && comment.replies.length > 0) {
            const replyContainer = document.createElement('div');
            replyContainer.className = 'reply-container';
            comment.replies.forEach(reply => replyContainer.appendChild(createCommentElement(postId, reply)));
            commentEl.appendChild(replyContainer);
        }

        commentEl.querySelector('.reply-comment-btn').addEventListener('click', (e) => showReplyForm(e.target.closest('.comment-item'), postId, comment.id));
        commentEl.querySelector('.edit-comment-btn').addEventListener('click', (e) => showEditForm(e.target.closest('.comment-item'), postId, comment.id));
        commentEl.querySelector('.delete-comment-btn').addEventListener('click', (e) => showDeleteForm(e.target.closest('.comment-item'), postId, comment.id));
        return commentEl;
    };

    const renderComments = (postId) => {
        const post = posts.find(p => p.id === postId);
        const commentList = document.getElementById('comment-list');
        commentList.innerHTML = '';
        if (!post || !post.comments || post.comments.length === 0) {
            commentList.innerHTML = '<p>아직 댓글이 없습니다.</p>'; return;
        }
        post.comments.forEach(comment => commentList.appendChild(createCommentElement(postId, comment)));
    };

    const showReplyForm = (commentEl, postId, parentId) => {
        const existingForm = commentEl.querySelector('.reply-form');
        if (existingForm) { existingForm.remove(); return; }

        const replyForm = document.createElement('form');
        replyForm.className = 'reply-form';
        replyForm.innerHTML = `
            <h4>덧글 작성</h4>
            <div class="comment-input-area">
                <input type="text" class="reply-author" placeholder="작성자" required>
                <input type="password" class="reply-password" placeholder="비밀번호" required>
            </div>
            <textarea class="reply-content" placeholder="덧글을 입력하세요..." required></textarea>
            <div class="page-actions">
                <button type="button" class="cancel-reply-btn">취소</button>
                <button type="submit">작성</button>
            </div>`;
        commentEl.appendChild(replyForm);
        replyForm.querySelector('.cancel-reply-btn').addEventListener('click', () => replyForm.remove());
        replyForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newReply = {
                id: Date.now(),
                author: replyForm.querySelector('.reply-author').value.trim(),
                content: replyForm.querySelector('.reply-content').value.trim(),
                password: replyForm.querySelector('.reply-password').value,
                replies: []
            };
            if (!newReply.author || !newReply.content || !newReply.password) return showAlert('모두 입력해주세요.');
            
            const post = posts.find(p => p.id === postId);
            if (!post) return;
            const parentCommentData = findComment(parentId, post.comments);
            if (parentCommentData) {
                parentCommentData.comment.replies = parentCommentData.comment.replies || [];
                parentCommentData.comment.replies.push(newReply);
                savePosts();
                renderComments(postId);
            }
        });
    };

    const showEditForm = (commentEl, postId, commentId) => {
        const post = posts.find(p => p.id === postId);
        const { comment } = findComment(commentId, post.comments);
        const contentWrapper = commentEl.querySelector('.comment-content-wrapper');
        contentWrapper.innerHTML = `
            <form class="comment-edit-form">
                <textarea class="edit-content" required>${comment.content}</textarea>
                <input type="password" class="edit-password" placeholder="비밀번호" required>
                <div class="edit-actions">
                    <button type="button" class="cancel-edit-btn">취소</button>
                    <button type="submit">수정</button>
                </div>
            </form>`;
        const editForm = contentWrapper.querySelector('.comment-edit-form');
        editForm.querySelector('.cancel-edit-btn').addEventListener('click', () => renderComments(postId));
        editForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (editForm.querySelector('.edit-password').value === comment.password) {
                comment.content = editForm.querySelector('.edit-content').value.trim();
                savePosts();
                renderComments(postId);
            } else {
                showAlert('비밀번호가 일치하지 않습니다.');
            }
        });
    };
    
    const showDeleteForm = (commentEl, postId, commentId) => {
        const post = posts.find(p => p.id === postId);
        const { comment } = findComment(commentId, post.comments);
        const contentWrapper = commentEl.querySelector('.comment-content-wrapper');
        contentWrapper.innerHTML = `
            <form class="comment-delete-form">
                <p>댓글을 삭제하시겠습니까?</p>
                <input type="password" class="delete-password" placeholder="비밀번호" required>
                <div class="delete-actions">
                    <button type="button" class="cancel-delete-btn">취소</button>
                    <button type="submit">삭제</button>
                </div>
            </form>`;
        const deleteForm = contentWrapper.querySelector('.comment-delete-form');
        deleteForm.querySelector('.cancel-delete-btn').addEventListener('click', () => renderComments(postId));
        deleteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (deleteForm.querySelector('.delete-password').value === comment.password) {
                const { parentList } = findComment(commentId, post.comments);
                const index = parentList.findIndex(c => c.id === commentId);
                if (index > -1) {
                    parentList.splice(index, 1);
                    savePosts();
                    renderComments(postId);
                }
            } else {
                showAlert('비밀번호가 일치하지 않습니다.');
            }
        });
    };

    document.getElementById('comment-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const newComment = {
            id: Date.now(),
            author: document.getElementById('comment-author').value.trim(),
            content: document.getElementById('comment-content').value.trim(),
            password: document.getElementById('comment-password').value,
            replies: [],
        };
        if (!newComment.author || !newComment.content || !newComment.password) return showAlert('모두 입력해주세요.');

        const post = posts.find(p => p.id === state.currentPostId);
        if (post) {
            post.comments = post.comments || [];
            post.comments.push(newComment);
            savePosts();
            renderComments(post.id);
            e.target.reset();
        }
    });

    const viewPost = (postId) => {
        const post = posts.find(p => p.id === postId);
        if (post) {
            post.views = (post.views || 0) + 1;
            savePosts();
            navigateTo('post', postId);
            renderPostDetail();
        }
    };
    
    const handleVote = (postId, voteType) => {
        const post = posts.find(p => p.id === parseInt(postId));
        if (!post) return;
        const currentVote = userVotes[postId];
        if (currentVote === voteType) {
            if (voteType === 'up') post.upvotes--; else post.downvotes--;
            delete userVotes[postId];
        } else {
            if (currentVote) { if (currentVote === 'up') post.upvotes--; else post.downvotes--; }
            if (voteType === 'up') post.upvotes++; else post.downvotes++;
            userVotes[postId] = voteType;
        }
        savePosts();
        saveUserVotes();
        renderPostDetail();
        renderPostList(); 
    };

    const openWriteForm = (postToEdit = null) => {
        const form = document.getElementById('write-form');
        form.reset();
        attachmentPreviewContainer.innerHTML = '';
        attachmentData = null;
        quill.root.innerHTML = '';

        const title = document.getElementById('write-page-title');
        const submitBtn = document.getElementById('submit-post-btn');
        
        if (postToEdit) {
            title.textContent = '게시물 수정';
            submitBtn.textContent = '수정완료';
            document.getElementById('post-id-input').value = postToEdit.id;
            document.getElementById('post-category').value = postToEdit.category;
            document.getElementById('post-author').value = postToEdit.author;
            document.getElementById('post-title').value = postToEdit.title;
            quill.root.innerHTML = postToEdit.content;
            document.getElementById('post-author').readOnly = true; 
            
            if (postToEdit.attachment) {
                attachmentData = postToEdit.attachment;
                if (attachmentData.type.startsWith('image/')) {
                    attachmentPreviewContainer.innerHTML = `<img src="${attachmentData.url}" alt="Preview">`;
                } else if (attachmentData.type.startsWith('video/')) {
                    attachmentPreviewContainer.innerHTML = `<video src="${attachmentData.url}" controls></video>`;
                }
            }
        } else {
            title.textContent = '게시물 작성';
            submitBtn.textContent = '등록';
            document.getElementById('post-id-input').value = '';
            document.getElementById('post-author').readOnly = false;
        }
        navigateTo('write');
    };
    
    document.getElementById('write-form').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const id = document.getElementById('post-id-input').value;
        const content = quill.root.innerHTML;
        
        if (quill.getText().trim().length === 0) {
            return showAlert('내용을 입력해주세요.');
        }

        const postData = {
            category: document.getElementById('post-category').value,
            author: document.getElementById('post-author').value.trim(),
            title: document.getElementById('post-title').value.trim(),
            content: content,
            password: document.getElementById('post-password').value,
            attachment: attachmentData,
        };

        if (!postData.author || !postData.title || !postData.password) return showAlert('필수 항목을 모두 입력해주세요.');

        if (id) {
            const postIndex = posts.findIndex(p => p.id === parseInt(id));
            if (postIndex > -1) {
                posts[postIndex] = { ...posts[postIndex], ...postData };
            }
        } else {
            posts.push({
                id: Date.now(), ...postData, views: 0, upvotes: 0, downvotes: 0, comments: [],
            });
        }
        
        savePosts();
        navigateTo('list');
        renderPostList();
    });
    
    document.getElementById('manage-posts-btn').addEventListener('click', () => {
        manageModal.classList.remove('hidden');
        document.getElementById('manage-auth-form').style.display = 'block';
        document.getElementById('user-post-list-container').classList.add('hidden');
        document.getElementById('manage-auth-form').reset();
    });
    closeManageModalBtn.addEventListener('click', () => manageModal.classList.add('hidden'));
    document.getElementById('manage-auth-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const author = document.getElementById('manage-author').value.trim();
        const password = document.getElementById('manage-password').value;
        const userPosts = posts.filter(p => p.author === author && p.password === password);
        if (userPosts.length > 0) {
            document.getElementById('manage-auth-form').style.display = 'none';
            const container = document.getElementById('user-post-list-container');
            container.classList.remove('hidden');
            const listEl = document.getElementById('user-post-list');
            listEl.innerHTML = '';
            userPosts.forEach(post => {
                listEl.innerHTML += `<div class="user-post-item"><input type="checkbox" data-id="${post.id}"><label>${post.title}</label></div>`;
            });
        } else {
            showAlert('작성자명 또는 비밀번호가 일치하지 않거나 작성한 게시물이 없습니다.');
        }
    });
    document.getElementById('delete-selected-btn').addEventListener('click', () => {
        const selectedIds = [...document.querySelectorAll('#user-post-list input:checked')].map(cb => parseInt(cb.dataset.id));
        if (selectedIds.length === 0) return showAlert('삭제할 게시물을 선택하세요.');
        posts = posts.filter(p => !selectedIds.includes(p.id));
        savePosts();
        manageModal.classList.add('hidden');
        renderPostList();
        showAlert('선택한 게시물이 삭제되었습니다.');
    });
    document.getElementById('edit-selected-btn').addEventListener('click', () => {
        const selected = [...document.querySelectorAll('#user-post-list input:checked')];
        if (selected.length !== 1) return showAlert('수정할 게시물 하나만 선택하세요.');
        const postToEdit = posts.find(p => p.id === parseInt(selected[0].dataset.id));
        manageModal.classList.add('hidden');
        openWriteForm(postToEdit);
    });

    document.getElementById('write-post-btn').addEventListener('click', () => openWriteForm());
    document.getElementById('cancel-write-btn').addEventListener('click', () => navigateTo('list'));
    document.getElementById('back-to-list-btn').addEventListener('click', () => navigateTo('list'));
    closeAlertModalBtns.forEach(btn => btn.addEventListener('click', () => alertModal.classList.add('hidden')));

    postAttachmentInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        attachmentPreviewContainer.innerHTML = '';
        attachmentData = null;
        if (!file) return;
        if (file.size > 50 * 1024 * 1024) { // 50MB 제한
            showAlert('파일 크기는 50MB를 초과할 수 없습니다.');
            postAttachmentInput.value = '';
            return;
        }
        const reader = new FileReader();
        reader.onload = (event) => {
            const url = event.target.result;
            attachmentData = { url, type: file.type };
            if (file.type.startsWith('image/')) {
                attachmentPreviewContainer.innerHTML = `<img src="${url}" alt="미리보기">`;
            } else if (file.type.startsWith('video/')) {
                attachmentPreviewContainer.innerHTML = `<video src="${url}" controls></video>`;
            }
        };
        reader.readAsDataURL(file);
    });

    // --- 초기화 ---
    const init = async () => {
        try {
            await initDB();
            posts = await loadDataFromDB();
            migrateData();
            renderCategories();
            renderPostList();
            navigateTo('list');
        } catch (error) {
            console.error('초기화 실패:', error);
            showAlert('데이터를 불러오는데 실패했습니다. 페이지를 새로고침 해주세요.');
        }
    };
    
    init();
});

