document.addEventListener('DOMContentLoaded', () => {
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
    const imagePreviewContainer = document.getElementById('image-preview-container');
    let attachmentBase64 = null; // 이미지 Base64 데이터를 저장할 변수

    // 데이터베이스 역할
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    let userVotes = JSON.parse(localStorage.getItem('userVotes')) || {}; // 사용자 투표 기록
    let state = {
        currentPage: 'list',
        currentCategory: '전체',
        currentPostId: null,
    };

    const categories = ['전체', 'T1', 'GENG', 'HLE', 'DK', 'KT', 'BRO', 'DRX', 'NS', 'LSB', 'DNF'];

    // --- 유틸리티 함수 ---
    const savePosts = () => {
        localStorage.setItem('posts', JSON.stringify(posts));
    };

    const saveUserVotes = () => {
        localStorage.setItem('userVotes', JSON.stringify(userVotes));
    };

    const showAlert = (message) => {
        document.getElementById('alert-message').textContent = message;
        alertModal.classList.remove('hidden');
    };

    // --- 페이지 전환 함수 ---
    const navigateTo = (pageName, postId = null) => {
        Object.values(pages).forEach(page => page.classList.add('hidden'));
        pages[pageName].classList.remove('hidden');
        state.currentPage = pageName;
        state.currentPostId = postId;
        window.scrollTo(0, 0);
    };

    // --- 렌더링 함수 ---
    const renderCategories = () => {
        const categoryBar = document.getElementById('category-bar');
        const categorySelect = document.getElementById('post-category');
        categoryBar.innerHTML = '';
        categorySelect.innerHTML = '';

        categories.forEach(cat => {
            if (cat !== '전체') {
                const option = document.createElement('option');
                option.value = cat;
                option.textContent = cat;
                categorySelect.appendChild(option);
            }

            const button = document.createElement('button');
            button.className = 'category-btn';
            button.textContent = cat;
            if (cat === state.currentCategory) {
                button.classList.add('active');
            }
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

        const filteredPosts = state.currentCategory === '전체'
            ? posts
            : posts.filter(p => p.category === state.currentCategory);

        if (filteredPosts.length === 0) {
            postListContainer.innerHTML = '<p>게시물이 없습니다.</p>';
            return;
        }

        filteredPosts.sort((a, b) => b.id - a.id).forEach(post => {
            const postEl = document.createElement('div');
            postEl.className = 'post-item';
            postEl.dataset.id = post.id;
            
            const imageIcon = post.attachmentURL ? ' 🖼️' : '';

            postEl.innerHTML = `
                <h2>${post.title}${imageIcon}</h2>
                <div class="post-meta">
                    <span>작성자: ${post.author}</span>
                    <span class="views">👁️ ${post.views}</span>
                    <span class="upvotes">👍 ${post.upvotes}</span>
                    <span class="downvotes">👎 ${post.downvotes}</span>
                </div>
            `;
            postEl.addEventListener('click', () => {
                viewPost(post.id);
            });
            postListContainer.appendChild(postEl);
        });
    };

    const renderPostDetail = () => {
        const post = posts.find(p => p.id === state.currentPostId);
        if (!post) {
            navigateTo('list');
            return;
        }

        const container = document.getElementById('post-detail-container');
        let attachmentHTML = '';
        if (post.attachmentURL) {
            attachmentHTML = `<div class="post-attachment"><img src="${post.attachmentURL}" alt="첨부 이미지"></div>`;
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
            <div class="post-detail-content">${post.content.replace(/\n/g, '<br>')}</div>
            <div class="post-vote">
                <button class="vote-btn ${upvoteBtnClass}" id="upvote-btn">추천 👍 ${post.upvotes}</button>
                <button class="vote-btn ${downvoteBtnClass}" id="downvote-btn">싫어요 👎 ${post.downvotes}</button>
            </div>
        `;

        document.getElementById('upvote-btn').addEventListener('click', () => handleVote(post.id, 'up'));
        document.getElementById('downvote-btn').addEventListener('click', () => handleVote(post.id, 'down'));
        
        renderComments(post.id);
    };

    // --- 댓글 관련 함수 ---

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
            </div>
        `;
        
        if (comment.replies && comment.replies.length > 0) {
            const replyContainer = document.createElement('div');
            replyContainer.className = 'reply-container';
            comment.replies.forEach(reply => {
                replyContainer.appendChild(createCommentElement(postId, reply));
            });
            commentEl.appendChild(replyContainer);
        }

        const commentId = comment.id;
        commentEl.querySelector('.reply-comment-btn').addEventListener('click', (e) => showReplyForm(e.target.closest('.comment-item'), postId, commentId));
        commentEl.querySelector('.edit-comment-btn').addEventListener('click', (e) => showEditForm(e.target.closest('.comment-item'), postId, commentId));
        commentEl.querySelector('.delete-comment-btn').addEventListener('click', (e) => showDeleteForm(e.target.closest('.comment-item'), postId, commentId));

        return commentEl;
    };

    const renderComments = (postId) => {
        const post = posts.find(p => p.id === postId);
        const commentList = document.getElementById('comment-list');
        commentList.innerHTML = '';

        if (!post || !post.comments || post.comments.length === 0) {
            commentList.innerHTML = '<p>아직 댓글이 없습니다.</p>';
            return;
        }

        const commentTree = document.createDocumentFragment();
        post.comments.forEach(comment => {
            commentTree.appendChild(createCommentElement(postId, comment));
        });
        commentList.appendChild(commentTree);
    };

    const showReplyForm = (commentEl, postId, parentId) => {
        const existingForm = document.querySelector('.reply-form');
        if (existingForm) {
            existingForm.remove();
        }

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
            </div>
        `;
        
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

            if (!newReply.author || !newReply.content || !newReply.password) {
                showAlert('덧글 작성자와 내용, 비밀번호를 모두 입력해주세요.');
                return;
            }

            const post = posts.find(p => p.id === postId);
            if (post) {
                if (!post.comments) {
                    post.comments = [];
                }
                const parentCommentData = findComment(parentId, post.comments);
                if (parentCommentData) {
                    if (!parentCommentData.comment.replies) {
                         parentCommentData.comment.replies = [];
                    }
                    parentCommentData.comment.replies.push(newReply);
                    savePosts();
                    renderComments(postId);
                } else {
                    showAlert("오류: 상위 댓글을 찾지 못했습니다.");
                }
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
                <input type="password" class="edit-password" placeholder="비밀번호를 입력하세요" required>
                <div class="edit-actions">
                    <button type="button" class="cancel-edit-btn">취소</button>
                    <button type="submit">수정</button>
                </div>
            </form>
        `;

        const editForm = contentWrapper.querySelector('.comment-edit-form');
        editForm.querySelector('.cancel-edit-btn').addEventListener('click', () => renderComments(postId));

        editForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const password = editForm.querySelector('.edit-password').value;
            if (password === comment.password) {
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
                <p>정말로 이 댓글을 삭제하시겠습니까?</p>
                <input type="password" class="delete-password" placeholder="비밀번호를 입력하세요" required>
                <div class="delete-actions">
                    <button type="button" class="cancel-delete-btn">취소</button>
                    <button type="submit">삭제</button>
                </div>
            </form>
        `;

        const deleteForm = contentWrapper.querySelector('.comment-delete-form');
        deleteForm.querySelector('.cancel-delete-btn').addEventListener('click', () => renderComments(postId));

        deleteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const password = deleteForm.querySelector('.delete-password').value;
            if (password === comment.password) {
                const findResult = findComment(commentId, post.comments);
                if (!findResult) return;
                
                const { parentList } = findResult;
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

        if (!newComment.author || !newComment.content || !newComment.password) {
            showAlert('댓글 작성자와 내용, 비밀번호를 모두 입력해주세요.');
            return;
        }

        const post = posts.find(p => p.id === state.currentPostId);
        if (post) {
            if(!post.comments) post.comments = [];
            post.comments.push(newComment);
            savePosts();
            renderComments(post.id);
            e.target.reset();
        }
    });

    // --- 기능 핸들러 (게시물) ---
    const viewPost = (postId) => {
        const post = posts.find(p => p.id === postId);
        if (post) {
            post.views++;
            savePosts();
            navigateTo('post', postId);
            renderPostDetail();
        }
    };
    
    const handleVote = (postId, voteType) => {
        const post = posts.find(p => p.id === parseInt(postId));
        if (!post) return;
    
        const currentVote = userVotes[postId];
    
        // Case 1: 투표 취소
        if (currentVote === voteType) {
            if (voteType === 'up') post.upvotes--;
            else post.downvotes--;
            delete userVotes[postId];
        } 
        // Case 2: 투표 변경
        else if (currentVote) {
            if (currentVote === 'up') post.upvotes--;
            else post.downvotes--;
            
            if (voteType === 'up') post.upvotes++;
            else post.downvotes++;
            userVotes[postId] = voteType;
        }
        // Case 3: 새로운 투표
        else {
            if (voteType === 'up') post.upvotes++;
            else post.downvotes++;
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
        imagePreviewContainer.innerHTML = '';
        attachmentBase64 = null;

        const title = document.getElementById('write-page-title');
        const submitBtn = document.getElementById('submit-post-btn');
        
        if (postToEdit) {
            title.textContent = '게시물 수정';
            submitBtn.textContent = '수정완료';
            document.getElementById('post-id-input').value = postToEdit.id;
            document.getElementById('post-category').value = postToEdit.category;
            document.getElementById('post-author').value = postToEdit.author;
            document.getElementById('post-title').value = postToEdit.title;
            document.getElementById('post-content').value = postToEdit.content;
            document.getElementById('post-author').readOnly = true; 
            if (postToEdit.attachmentURL) {
                attachmentBase64 = postToEdit.attachmentURL;
                imagePreviewContainer.innerHTML = `<img src="${attachmentBase64}" alt="Image preview">`;
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
        const postData = {
            category: document.getElementById('post-category').value,
            author: document.getElementById('post-author').value.trim(),
            title: document.getElementById('post-title').value.trim(),
            content: document.getElementById('post-content').value.trim(),
            password: document.getElementById('post-password').value,
        };

        if (!postData.author || !postData.title || !postData.content || !postData.password) {
            showAlert('모든 필수 항목을 입력해주세요.');
            return;
        }

        if (id) {
            const postIndex = posts.findIndex(p => p.id === parseInt(id));
            if (postIndex > -1) {
                posts[postIndex] = { ...posts[postIndex], ...postData, attachmentURL: attachmentBase64 };
            }
        } else {
            const newPost = {
                id: Date.now(), ...postData, views: 0, upvotes: 0, downvotes: 0,
                attachmentURL: attachmentBase64, comments: [],
            };
            posts.push(newPost);
        }
        
        savePosts();
        navigateTo('list');
        renderPostList();
    });
    
    // --- 수정/삭제 모달 로직 ---
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
            const userPostListContainer = document.getElementById('user-post-list-container');
            userPostListContainer.classList.remove('hidden');
            const userPostList = document.getElementById('user-post-list');
            userPostList.innerHTML = '';
            userPosts.forEach(post => {
                userPostList.innerHTML += `
                    <div class="user-post-item">
                        <input type="checkbox" data-id="${post.id}">
                        <label>${post.title}</label>
                    </div>
                `;
            });
        } else {
            showAlert('작성자명 또는 비밀번호가 일치하지 않거나 작성한 게시물이 없습니다.');
        }
    });

    document.getElementById('delete-selected-btn').addEventListener('click', () => {
        const selectedIds = Array.from(document.querySelectorAll('#user-post-list input[type="checkbox"]:checked'))
            .map(cb => parseInt(cb.dataset.id));
        if (selectedIds.length === 0) {
            showAlert('삭제할 게시물을 선택하세요.'); return;
        }
        posts = posts.filter(p => !selectedIds.includes(p.id));
        savePosts();
        manageModal.classList.add('hidden');
        renderPostList();
        showAlert('선택한 게시물이 삭제되었습니다.');
    });

    document.getElementById('edit-selected-btn').addEventListener('click', () => {
        const selectedCheckboxes = Array.from(document.querySelectorAll('#user-post-list input[type="checkbox"]:checked'));
        if (selectedCheckboxes.length !== 1) {
            showAlert(selectedCheckboxes.length === 0 ? '수정할 게시물을 선택하세요.' : '하나의 게시물만 선택하여 수정할 수 있습니다.');
            return;
        }
        const postIdToEdit = parseInt(selectedCheckboxes[0].dataset.id);
        const postToEdit = posts.find(p => p.id === postIdToEdit);
        manageModal.classList.add('hidden');
        openWriteForm(postToEdit);
    });

    // --- 기타 이벤트 리스너 ---
    document.getElementById('write-post-btn').addEventListener('click', () => openWriteForm());
    document.getElementById('cancel-write-btn').addEventListener('click', () => navigateTo('list'));
    document.getElementById('back-to-list-btn').addEventListener('click', () => navigateTo('list'));
    closeAlertModalBtns.forEach(btn => btn.addEventListener('click', () => alertModal.classList.add('hidden')));

    postAttachmentInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                attachmentBase64 = event.target.result;
                imagePreviewContainer.innerHTML = `<img src="${attachmentBase64}" alt="Image preview">`;
            };
            reader.readAsDataURL(file);
        } else {
            attachmentBase64 = null;
            imagePreviewContainer.innerHTML = '';
        }
    });

    // --- 초기화 ---
    const init = () => {
        renderCategories();
        renderPostList();
        navigateTo('list');
    };

    init();
});

