// write.js
document.addEventListener('DOMContentLoaded', () => {
    const postTitleInput = document.getElementById('postTitle');
    const postCategorySelect = document.getElementById('postCategory');
    const postContentTextarea = document.getElementById('postContent');
    const imageUpload = document.getElementById('imageUpload');
    const fileList = document.getElementById('fileList');
    const writeForm = document.getElementById('postForm');
    const postPasswordInput = document.getElementById('postPassword');
    const postAuthorInput = document.getElementById('postAuthor');
    const postIdInput = document.getElementById('postId');

    // Essential DOM element check
    if (!postTitleInput || !postCategorySelect || !postContentTextarea || !writeForm || !postPasswordInput || !postIdInput || !postAuthorInput) {
        console.error("Critical form elements are missing. Please check your write.html structure carefully (IDs: postTitle, postCategory, postContent, postForm, postPassword, postId, postAuthor).");
        return; // Stop execution if critical elements are missing
    }

    const MOCK_POSTS_STORAGE_KEY = 'mockPosts';

    function getPostsFromLocalStorage() {
        try {
            const storedPosts = localStorage.getItem(MOCK_POSTS_STORAGE_KEY);
            return storedPosts ? JSON.parse(storedPosts) : [];
        } catch (e) {
            console.error("Error parsing posts from localStorage in write.js:", e);
            return [];
        }
    }

    function savePostsToLocalStorage(posts) {
        try {
            localStorage.setItem(MOCK_POSTS_STORAGE_KEY, JSON.stringify(posts));
        } catch (e) {
            console.error("Error saving posts to localStorage in write.js:", e);
        }
    }

    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    const editId = getQueryParam('editId');

    if (editId) {
        const allPosts = getPostsFromLocalStorage();
        const postToEdit = allPosts.find(p => String(p.id) === String(editId));

        if (postToEdit) {
            postTitleInput.value = postToEdit.title || '';
            postContentTextarea.value = postToEdit.content || '';
            postAuthorInput.value = postToEdit.author || '';
            postPasswordInput.value = postToEdit.password || '';
            postCategorySelect.value = postToEdit.category || '자유';
            postIdInput.value = postToEdit.id;

            if (fileList) {
                fileList.innerHTML = '';
                if (Array.isArray(postToEdit.images)) {
                    postToEdit.images.forEach(imagePath => {
                        const listItem = document.createElement('li');
                        listItem.textContent = imagePath.split('/').pop().split('?')[0];
                        const removeButton = document.createElement('button');
                        removeButton.textContent = 'X';
                        removeButton.type = 'button';
                        removeButton.addEventListener('click', () => {
                            listItem.remove();
                        });
                        listItem.appendChild(removeButton);
                        fileList.appendChild(listItem);
                    });
                }
            }

            const submitButton = writeForm.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.textContent = '게시물 수정';
            }
            const pageTitle = document.querySelector('h2'); // Adjusted to h2 for "게시물 작성"
            if (pageTitle) pageTitle.textContent = '게시물 수정'; // Change title on edit page

        } else {
            alert('수정할 게시물을 찾을 수 없습니다.');
            window.location.href = 'com.html'; // Redirect to main page
        }
    } else {
        postTitleInput.value = '';
        postContentTextarea.value = '';
        postAuthorInput.value = '';
        postPasswordInput.value = '';
        postCategorySelect.value = '자유';
        postIdInput.value = '';
        if (fileList) fileList.innerHTML = '';
        const pageTitle = document.querySelector('h2');
        if (pageTitle) pageTitle.textContent = '게시물 작성'; // Ensure title is "게시물 작성" for new posts
    }

    if (imageUpload) {
        imageUpload.addEventListener('change', (event) => {
            if (fileList) fileList.innerHTML = '';
            const files = event.target.files;

            if (files.length > 3) {
                alert('이미지는 최대 3개까지 첨부할 수 있습니다.');
                imageUpload.value = ''; // Clear selected files
                if (fileList) fileList.innerHTML = '';
                return;
            }

            for (const file of files) {
                const listItem = document.createElement('li');
                listItem.textContent = file.name;
                const removeButton = document.createElement('button');
                removeButton.textContent = 'X';
                removeButton.type = 'button';
                removeButton.addEventListener('click', () => {
                    listItem.remove();
                });
                listItem.appendChild(removeButton);
                if (fileList) fileList.appendChild(listItem);
            }
        });
    }

    writeForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const title = postTitleInput.value.trim();
        const category = postCategorySelect.value;
        const content = postContentTextarea.value.trim();
        const password = postPasswordInput.value; // Do not trim password
        const author = postAuthorInput.value.trim();

        let imagePaths = [];
        if (imageUpload.files.length > 0) {
            imagePaths = Array.from(imageUpload.files).map(file => {
                // In a real application, you would upload the file and get a URL.
                // Here, we simulate it with a placeholder.
                return `https://via.placeholder.com/300x200?text=${encodeURIComponent(file.name)}`;
            });
        } else if (editId) {
            // If no new files are uploaded during edit, retain existing images
            const existingPosts = getPostsFromLocalStorage();
            const currentPost = existingPosts.find(p => String(p.id) === String(editId));
            if (currentPost && Array.isArray(currentPost.images)) {
                imagePaths = [...currentPost.images]; // Keep existing images
            }
        }

        // Client-side validation
        if (!title) {
            alert('제목을 입력해주세요.');
            return;
        }
        if (!content) {
            alert('내용을 입력해주세요.');
            return;
        }
        if (!category) {
            alert('카테고리를 선택해주세요.');
            return;
        }
        if (!author) {
            alert('작성자를 입력해주세요.');
            return;
        }
        if (!password && !editId) { // Password is required for new posts, but optional for edit if already set
            alert('비밀번호를 입력해주세요.');
            return;
        }

        const todayDate = new Date().toISOString().split("T")[0];
        const currentTime = new Date().toLocaleTimeString('ko-KR', {
            hour: '2-digit',
            minute: '2-digit'
        });

        let posts = getPostsFromLocalStorage();
        let postToSave = {};

        if (editId) {
            const postIndex = posts.findIndex(p => String(p.id) === String(editId));
            if (postIndex !== -1) {
                // Update existing post
                postToSave = {
                    ...posts[postIndex], // Keep existing properties not being edited
                    title: title,
                    category: category,
                    content: content,
                    password: password, // Update password only if provided, otherwise keep existing
                    author: author,
                    images: imagePaths,
                    date: todayDate, // Update date/time on edit, or keep original
                    time: currentTime
                };
                posts[postIndex] = postToSave;
                alert('게시물이 성공적으로 수정되었습니다.');
            } else {
                alert('게시물 수정에 실패했습니다: 게시물을 찾을 수 없습니다.');
                return;
            }
        } else {
            // Create new post
            postToSave = {
                id: Date.now(), // Unique ID for new posts
                title: title,
                category: category,
                time: currentTime,
                author: author,
                vote: 0,
                commentCount: 0,
                date: todayDate,
                content: content,
                images: imagePaths,
                thumbnail: imagePaths.length > 0 ? imagePaths[0] : null, // Set thumbnail from first image
                comments: [],
                password: password
            };
            posts.unshift(postToSave); // Add new post to the beginning
            alert('게시물이 성공적으로 작성되었습니다.');
        }

        console.log("Saving posts to localStorage:", posts);
        savePostsToLocalStorage(posts);
        window.location.href = 'com.html'; // Redirect to the main community page
    });
});