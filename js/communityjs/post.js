document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    console.log('페이지 로드: postId =', postId); // 디버깅 로그

    // 모든 DOM 요소를 먼저 가져옵니다.
    const postTitleSpan = document.getElementById('post-title');
    const authorName = document.getElementById('author-name');
    const postDate = document.getElementById('post-date');
    const postTextDiv = document.getElementById('post-text');
    const postViewCount = document.getElementById('post-view-count');
    const postVoteCount = document.getElementById('post-vote-count');
    const postCommentCount = document.getElementById('post-comment-count');

    const commentList = document.getElementById('comment-list');
    const commentForm = document.getElementById('comment-form');
    const newCommentInput = document.getElementById('new-comment');
    const commentPasswordInput = document.getElementById('comment-password');

    // 게시물 수정/삭제 버튼 및 모달 요소
    const editPostButton = document.getElementById('editPostButton');
    const deletePostButton = document.getElementById('deletePostButton');
    const passwordModal = document.getElementById('password-modal');
    const modalPasswordInput = document.getElementById('modal-password');
    const modalConfirmButton = document.getElementById('modal-confirm-button');
    const modalCancelButton = document.getElementById('modal-cancel-button');
    const closeButton = document.querySelector('.modal .close-button');

    let currentCommentId = null;
    let actionType = null; // 'editComment', 'deleteComment', 'editPost', 'deletePost'

    // 모달 외부 클릭 리스너를 최상위 스코프에 선언
    const modalOutsideClickListener = (event) => {
        if (passwordModal && event.target === passwordModal) {
            passwordModal.style.display = 'none';
            if (modalPasswordInput) modalPasswordInput.value = '';
            currentCommentId = null;
            actionType = null; // 모든 액션 타입 초기화
        }
    };

    // localStorage에서 게시물 데이터를 가져오는 함수
    function getPostsFromLocalStorage() {
        try {
            const posts = JSON.parse(localStorage.getItem('mockPosts')) || [];
            return posts.map(post => ({
                ...post,
                comments: post.comments || []
            }));
        } catch (e) {
            console.error("Error reading from localStorage:", e); // 오류 로깅
            return []; // 오류 발생 시 빈 배열 반환하여 스크립트 중단 방지
        }
    }

    // localStorage에 게시물 데이터를 저장하는 함수
    function savePostsToLocalStorage(posts) {
        try {
            localStorage.setItem('mockPosts', JSON.stringify(posts));
        } catch (e) {
            console.error("Error writing to localStorage:", e); // 오류 로깅
            alert('데이터 저장 중 오류가 발생했습니다. 브라우저 저장 공간이 가득 찼거나 문제가 있을 수 있습니다.');
        }
    }

    // 특정 ID의 게시물을 가져오는 함수
    async function fetchPost(id) {
        return new Promise(resolve => {
            setTimeout(() => {
                const posts = getPostsFromLocalStorage();
                const post = posts.find(post => String(post.id) === String(id)); // ID 비교를 문자열로 통일
                resolve(post);
            }, 100);
        });
    }

    // 댓글을 화면에 표시하는 함수
    function displayComments(comments) {
        if (!commentList) {
            console.error('댓글 목록 요소를 찾을 수 없습니다.'); // 오류 로깅
            return;
        }
        commentList.innerHTML = ''; // 기존 댓글 비우기

        if (comments && comments.length > 0) {
            comments.forEach(comment => {
                const commentId = comment.id ? String(comment.id) : Date.now().toString() + Math.random().toString(36).substr(2, 9);
                comment.id = commentId;

                const li = document.createElement('li'); // li 요소 생성
                li.setAttribute('data-comment-id', commentId);

                const commentAuthorSpan = document.createElement('span');
                commentAuthorSpan.className = 'comment-author';
                commentAuthorSpan.textContent = comment.author || '익명';

                const commentDateSpan = document.createElement('span');
                commentDateSpan.className = 'comment-date';
                commentDateSpan.textContent = `(${comment.date || '날짜 없음'})`;

                const commentTextP = document.createElement('p');
                commentTextP.className = 'comment-text';
                commentTextP.textContent = comment.text || '';

                const commentActionsDiv = document.createElement('div');
                commentActionsDiv.className = 'comment-actions';

                const editButton = document.createElement('button');
                editButton.className = 'edit-comment-button bd_btn';
                editButton.textContent = '수정';

                const deleteButton = document.createElement('button');
                deleteButton.className = 'delete-comment-button bd_btn';
                deleteButton.textContent = '삭제';

                commentActionsDiv.appendChild(editButton);
                commentActionsDiv.appendChild(deleteButton);

                const editAreaDiv = document.createElement('div');
                editAreaDiv.className = 'edit-area';
                editAreaDiv.style.display = 'none';

                const editTextArea = document.createElement('textarea');
                editTextArea.className = 'edit-comment-textarea';

                const saveEditButton = document.createElement('button');
                saveEditButton.className = 'save-edit-button bd_btn blue';
                saveEditButton.textContent = '저장';

                const cancelEditButton = document.createElement('button');
                cancelEditButton.className = 'cancel-edit-button bd_btn';
                cancelEditButton.textContent = '취소';

                editAreaDiv.appendChild(editTextArea);
                editAreaDiv.appendChild(saveEditButton);
                editAreaDiv.appendChild(cancelEditButton);

                li.appendChild(commentAuthorSpan);
                li.appendChild(commentDateSpan);
                li.appendChild(commentTextP);
                li.appendChild(commentActionsDiv);
                li.appendChild(editAreaDiv);

                commentList.appendChild(li);
            });

            // 댓글 수정/삭제 버튼에 대한 이벤트 위임 (중복 리스너 방지)
            commentList.addEventListener('click', (e) => {
                const target = e.target;
                const li = target.closest('li[data-comment-id]');
                if (!li) return; // li가 없으면 함수 종료

                currentCommentId = li.getAttribute('data-comment-id');

                if (target.classList.contains('edit-comment-button')) {
                    actionType = 'editComment';
                    if (passwordModal && modalPasswordInput) {
                        const modalTitle = passwordModal.querySelector('h3');
                        if(modalTitle) modalTitle.textContent = '댓글 수정을 위해 비밀번호를 입력하세요';
                        modalPasswordInput.style.display = 'block';
                        passwordModal.style.display = 'flex';
                        modalPasswordInput.focus();
                    }
                } else if (target.classList.contains('delete-comment-button')) {
                    actionType = 'deleteComment';
                    if (passwordModal && modalPasswordInput) {
                        const modalTitle = passwordModal.querySelector('h3');
                        if(modalTitle) modalTitle.textContent = '댓글 삭제를 위해 비밀번호를 입력하세요';
                        modalPasswordInput.style.display = 'block';
                        passwordModal.style.display = 'flex';
                        modalPasswordInput.focus();
                    }
                }
            }, true); // 캡처링 단계에서 이벤트를 받도록 true 설정 (선택 사항이지만 유용)

        }
    }

    async function renderPost() {
        if (!postId) {
            if (postTitleSpan) postTitleSpan.textContent = '오류: 게시물 ID가 없습니다.';
            if (postTextDiv) postTextDiv.innerHTML = '<p>URL에 유효한 게시물 ID(예: ?id=123)가 필요합니다.</p>';
            if (authorName) authorName.textContent = '';
            if (postDate) postDate.textContent = '';
            if (commentList) commentList.innerHTML = '';
            if (postViewCount) postViewCount.textContent = '0';
            if (postVoteCount) postVoteCount.textContent = '0';
            if (postCommentCount) postCommentCount.textContent = '0';
            return;
        }

        const post = await fetchPost(postId);
        console.log('Fetched Post:', post); // 게시물 로드 상태 확인

        if (post) {
            document.title = post.title || '게시물';
            if (postTitleSpan) postTitleSpan.textContent = post.title || '';
            if (authorName) authorName.textContent = post.author || '익명';
            if (postDate) postDate.textContent = post.date || '날짜 정보 없음';
            if (postTextDiv) postTextDiv.innerHTML = post.content || '';

            if (postViewCount) postViewCount.textContent = (post.viewCount || Math.floor(Math.random() * 1000) + 1).toLocaleString();
            if (postVoteCount) postVoteCount.textContent = (post.vote || 0).toLocaleString();
            if (postCommentCount) postCommentCount.textContent = (post.comments ? post.comments.length : 0).toLocaleString(); // 댓글 수 업데이트

            const existingCopyUrlButton = document.getElementById('copy-url-button');
            if (existingCopyUrlButton) {
                existingCopyUrlButton.removeEventListener('click', handleCopyUrl);
                existingCopyUrlButton.addEventListener('click', handleCopyUrl);
            }

            if (commentList) displayComments(post.comments);

        } else {
            if (postTitleSpan) postTitleSpan.textContent = `게시물 ID ${postId}를 찾을 수 없습니다.`;
            if (postTextDiv) postTextDiv.innerHTML = '<p>존재하지 않거나 삭제된 게시물입니다.</p>';
            if (authorName) authorName.textContent = '';
            if (postDate) postDate.textContent = '';
            if (postViewCount) postViewCount.textContent = '0';
            if (postVoteCount) postVoteCount.textContent = '0';
            if (postCommentCount) postCommentCount.textContent = '0';
            if (commentList) commentList.innerHTML = '';
        }
    }

    // URL 복사 버튼 핸들러 (재사용 가능하도록 함수로 분리)
    function handleCopyUrl() {
        const textToCopy = window.location.href;
        const tempInput = document.createElement('textarea');
        document.body.appendChild(tempInput);
        tempInput.value = textToCopy;
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        alert('URL이 복사되었습니다!');
    }

    // 댓글 작성 폼 제출
    if (commentForm) {
        commentForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            const commentText = newCommentInput?.value?.trim() ?? '';
            const commentPassword = commentPasswordInput?.value ?? '';

            if (!commentText) {
                alert('댓글 내용을 입력해주세요.');
                return;
            }
            if (!commentPassword) {
                alert('댓글 비밀번호를 입력해주세요.');
                return;
            }

            const newComment = {
                id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
                author: '익명 사용자',
                date: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\./g, '').replace(/(\d{4})(\d{2})(\d{2})/, '$1.$2.$3.'),
                text: commentText,
                password: commentPassword
            };

            const posts = getPostsFromLocalStorage();
            const postIndex = posts.findIndex(post => String(post.id) === String(postId));

            if (postIndex !== -1) {
                posts[postIndex].comments = posts[postIndex].comments || [];
                posts[postIndex].comments.push(newComment);
                posts[postIndex].commentCount = (posts[postIndex].commentCount || 0) + 1;
                savePostsToLocalStorage(posts);
                await renderPost();
                if (newCommentInput) newCommentInput.value = '';
                if (commentPasswordInput) commentPasswordInput.value = '';
                alert('댓글이 등록되었습니다!');
            } else {
                alert(`오류: 게시물 ID ${postId}를 찾을 수 없습니다. 댓글을 추가할 수 없습니다.`);
            }
        });
    }

    // 게시물 수정 버튼 이벤트 리스너
    if (editPostButton) {
        editPostButton.addEventListener('click', () => {
            if (!postId) {
                alert('수정할 게시물을 찾을 수 없습니다.');
                return;
            }
            actionType = 'editPost'; // 액션 타입을 'editPost'로 설정
            if (passwordModal) {
                passwordModal.style.display = 'flex';
                const modalTitle = passwordModal.querySelector('h3');
                if (modalTitle) modalTitle.textContent = '게시물 수정을 위해 비밀번호를 입력하세요';
                if (modalPasswordInput) {
                    modalPasswordInput.value = '';
                    modalPasswordInput.focus();
                }
            }
        });
    }

    // 게시물 삭제 버튼 이벤트 리스너
    if (deletePostButton) {
        deletePostButton.addEventListener('click', () => {
            if (!postId) {
                alert('삭제할 게시물을 찾을 수 없습니다.');
                return;
            }
            actionType = 'deletePost'; // 액션 타입을 'deletePost'로 설정
            if (passwordModal) {
                passwordModal.style.display = 'flex';
                const modalTitle = passwordModal.querySelector('h3');
                if (modalTitle) modalTitle.textContent = '게시물 삭제를 위해 비밀번호를 입력하세요';
                if (modalPasswordInput) {
                    modalPasswordInput.value = '';
                    modalPasswordInput.focus();
                }
            }
        });
    }


    // --- 비밀번호 확인 모달 로직 ---
    // 모달 관련 요소가 모두 존재하는지 확인
    if (passwordModal && modalPasswordInput && modalConfirmButton && modalCancelButton && closeButton) {
        // 기존 리스너를 제거하고 새 리스너를 추가하여 중복 방지 및 안정성 확보
        const cloneModalConfirmButton = modalConfirmButton.cloneNode(true);
        const cloneModalCancelButton = modalCancelButton.cloneNode(true);
        const cloneCloseButton = closeButton.cloneNode(true);

        modalConfirmButton.replaceWith(cloneModalConfirmButton);
        modalCancelButton.replaceWith(cloneModalCancelButton);
        closeButton.replaceWith(cloneCloseButton);

        // 새롭게 클론된 요소들을 참조
        const newModalConfirmButton = document.getElementById('modal-confirm-button');
        const newModalCancelButton = document.getElementById('modal-cancel-button');
        const newCloseButton = document.querySelector('.modal .close-button');

        // 모달 외부 클릭 리스너 재설정
        passwordModal.removeEventListener('click', modalOutsideClickListener);
        passwordModal.addEventListener('click', modalOutsideClickListener);

        newModalConfirmButton.addEventListener('click', async () => {
            const enteredPassword = modalPasswordInput.value;
            const posts = getPostsFromLocalStorage();
            const post = posts.find(p => String(p.id) === String(postId));

            if (!post) {
                alert('게시물을 찾을 수 없습니다.');
                passwordModal.style.display = 'none';
                modalPasswordInput.value = '';
                actionType = null; // 액션 타입 초기화
                return;
            }

            // 게시물 비밀번호 확인
            if (actionType === 'editPost' || actionType === 'deletePost') {
                if (String(post.password) === String(enteredPassword)) {
                    passwordModal.style.display = 'none';
                    modalPasswordInput.value = '';

                    if (actionType === 'editPost') {
                        window.location.href = `write.html?editId=${post.id}`;
                    } else if (actionType === 'deletePost') {
                        if (confirm('정말로 이 게시물을 삭제하시겠습니까?')) {
                            const postIndex = posts.findIndex(p => String(p.id) === String(postId));
                            if (postIndex !== -1) {
                                posts.splice(postIndex, 1);
                                savePostsToLocalStorage(posts);
                                alert('게시물이 삭제되었습니다.');
                                window.location.href = 'com.html'; // 삭제 후 커뮤니티 페이지로 리다이렉트
                            }
                        }
                    }
                } else {
                    alert('비밀번호가 일치하지 않습니다.');
                    modalPasswordInput.value = '';
                }
                actionType = null; // 게시물 액션 완료 후 초기화
                return;
            }

            // 댓글 비밀번호 확인 (기존 로직 유지)
            const commentToModify = post.comments.find(c => String(c.id) === String(currentCommentId));
            console.log('댓글 수정/삭제 시도. 대상 댓글:', commentToModify);

            if (commentToModify && commentToModify.password === enteredPassword) {
                passwordModal.style.display = 'none';
                modalPasswordInput.value = '';

                const targetLi = document.querySelector(`li[data-comment-id="${currentCommentId}"]`);
                if (!targetLi) {
                    console.error('Target comment LI not found for currentCommentId:', currentCommentId); // 오류 로깅
                    alert('댓글 요소를 찾을 수 없어 작업을 수행할 수 없습니다.');
                    actionType = null; // 액션 타입 초기화
                    return;
                }

                if (actionType === 'editComment') {
                    targetLi.classList.add('editing');
                    const editArea = targetLi.querySelector('.edit-area');
                    const editTextArea = targetLi.querySelector('.edit-comment-textarea');
                    const saveEditButton = targetLi.querySelector('.save-edit-button');
                    const cancelEditButton = targetLi.querySelector('.cancel-edit-button');

                    if (editArea && editTextArea && saveEditButton && cancelEditButton) {
                        editTextArea.value = commentToModify.text;
                        editArea.style.display = 'block';

                        // 수정/취소 버튼 리스너 재설정
                        const cloneSaveEditButton = saveEditButton.cloneNode(true);
                        const cloneCancelEditButton = cancelEditButton.cloneNode(true);
                        saveEditButton.replaceWith(cloneSaveEditButton);
                        cancelEditButton.replaceWith(cloneCancelEditButton);

                        const newSaveEditButton = targetLi.querySelector('.save-edit-button');
                        const newCancelEditButton = targetLi.querySelector('.cancel-edit-button'); // CSS 클래스 확인 필요 (post.css에는 cancel-edit-button으로 되어있음)

                        newSaveEditButton.addEventListener('click', async () => {
                            const newText = editTextArea.value.trim();
                            if (newText) {
                                commentToModify.text = newText;
                                savePostsToLocalStorage(posts);
                                await renderPost();
                                alert('댓글이 수정되었습니다.');
                            } else {
                                alert('수정할 내용을 입력해주세요.');
                            }
                        });

                        newCancelEditButton.addEventListener('click', () => {
                            targetLi.classList.remove('editing');
                            editArea.style.display = 'none';
                        });
                    } else {
                        console.error('Edit area elements not found for comment ID:', currentCommentId); // 오류 로깅
                        alert('수정 기능을 위한 요소를 찾을 수 없습니다.');
                    }
                } else if (actionType === 'deleteComment') {
                    if (confirm('정말로 이 댓글을 삭제하시겠습니까?')) {
                        post.comments = post.comments.filter(c => String(c.id) !== String(currentCommentId));
                        post.commentCount = Math.max(0, (post.commentCount || 0) - 1);
                        savePostsToLocalStorage(posts);
                        await renderPost();
                        alert('댓글이 삭제되었습니다.');
                    }
                }
                actionType = null; // 액션 완료 후 초기화
            } else {
                alert('비밀번호가 일치하지 않습니다.');
                modalPasswordInput.value = '';
            }
        });

        newModalCancelButton.addEventListener('click', () => {
            passwordModal.style.display = 'none';
            modalPasswordInput.value = '';
            actionType = null; // 액션 취소 시 초기화
        });

        newCloseButton.addEventListener('click', () => {
            passwordModal.style.display = 'none';
            modalPasswordInput.value = '';
            actionType = null; // 액션 취소 시 초기화
        });
    }
    // --- 모달 로직 끝 ---

    // 페이지 로드 시 게시물 렌더링 및 이벤트 리스너 설정
    renderPost();
});