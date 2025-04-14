// Get the container element for displaying blogs
const blogsList = document.getElementById('blogsList');

// Retrieve blogs from localStorage or use default if none found
let blogsData = JSON.parse(localStorage.getItem('blogsData')) || defaultBlogsData;

// Function to render blogs as cards
function renderBlogs() {
    blogsList.innerHTML = ''; // Clear current blog list

    blogsData.forEach(blog => {
        const blogCard = document.createElement('div');
        blogCard.className = 'blog-card';

        // Handle blog content truncation if too long
        const content = blog.content && blog.content.length > 150
            ? `${blog.content.substring(0, 150)}... <span class="read-more">Read more</span>`
            : blog.content || '';

        // Blog card template
        blogCard.innerHTML = `
            <div class="blog-details">
                <h3 class="blog-title">${blog.title}</h3>
                <p class="blog-content">${content}</p>
                <div class="comment-count" id="count-${blog.id}">
                    <i class="fas fa-comments"></i> ${blog.comments.length} Comments
                </div>
            </div>
            <img src="${blog.image}" alt="${blog.title}" class="blog-image">
        `;

        // Attach "Read more" event if needed
        const readMore = blogCard.querySelector('.read-more');
        if (readMore) {
            readMore.addEventListener('click', () => openModal(blog, blogsData.indexOf(blog)));
        }

        // Open modal on blog card click
        blogCard.addEventListener('click', () => openModal(blog, blogsData.indexOf(blog)));

        blogsList.appendChild(blogCard); // Add blog card to list
    });
}

// Open modal to show full blog and comments
function openModal(blog, index) {
    selectedBlogIndex = index;
    document.getElementById('modalTitle').textContent = blog.title;
    document.getElementById('modalContent').textContent = blog.content || "No content available.";
    document.getElementById('commentCount').textContent = blog.comments.length;
    document.getElementById('newComment').value = '';
    renderComments(blog); // Load comments
    document.getElementById('blogModal').style.display = 'flex'; // Show modal
    document.body.classList.add('blurred'); // Blur background
}

// Render comments in blog modal
function renderComments(blog) {
    const list = document.getElementById('commentsList');
    list.innerHTML = ''; // Clear current comments

    // Show message if no comments
    if (blog.comments.length === 0) {
        const noComments = document.createElement('div');
        noComments.textContent = "No comments yet.";
        list.appendChild(noComments);
    } else {
        blog.comments.forEach((comment, i) => {
            const div = document.createElement('div');
            div.innerHTML = `
                <p>
                    <strong>${comment.username}:</strong> 
                    <span id="comment-text-${i}">${comment.content}</span>
                    ${comment.username === currentUsername
                    ? `<span class="comment-actions">
                              <i class="fas fa-edit" title="Edit" onclick="editComment(${i})" style="cursor:pointer; margin-left: 10px;"></i>
                              <i class="fas fa-trash-alt" title="Delete" onclick="deleteComment(${i})" style="cursor:pointer; margin-left: 5px;"></i>
                           </span>`
                    : ''}  
                </p>
            `;
            list.appendChild(div);
        });
    }
}

// Enable inline editing of a comment
function editComment(index) {
    const commentText = document.getElementById(`comment-text-${index}`);
    const originalText = commentText.innerText;

    // Replace text with editable textarea
    const inputField = document.createElement('textarea');
    inputField.value = originalText;
    inputField.classList.add('edit-comment-textarea');

    commentText.innerHTML = '';
    commentText.appendChild(inputField);

    // Change edit icon to save icon
    const actionSpan = commentText.parentElement.querySelector('.comment-actions');
    const editIcon = actionSpan.querySelector('.fa-edit');
    editIcon.classList.remove('fa-edit');
    editIcon.classList.add('fa-save');
    editIcon.setAttribute('title', 'Save');
    editIcon.style.color = 'green';

    // Save the new comment on click
    editIcon.onclick = function () {
        saveComment(index, inputField.value);
    };
}

// Save edited comment content
function saveComment(index, newContent) {
    const blog = blogsData[selectedBlogIndex];
    blog.comments[index].content = newContent;
    renderComments(blog); // Refresh UI
    saveBlogsData(); // Update localStorage
}

// Add a new comment to selected blog
function addComment() {
    const comment = document.getElementById('newComment').value.trim();
    if (comment && selectedBlogIndex !== null) {
        const blog = blogsData[selectedBlogIndex];
        blog.comments.push({ username: currentUsername, content: comment });
        updateCommentUI(); // Refresh UI
        saveBlogsData(); // Save to localStorage
    }
}

// Delete comment with confirmation
function deleteComment(i) {
    if (confirm("Are you sure you want to delete your comment?")) {
        blogsData[selectedBlogIndex].comments.splice(i, 1); // Remove comment
        updateCommentUI(); // Refresh comments
        saveBlogsData(); // Update storage
    }
}

// Update comment UI and count
function updateCommentUI() {
    const blog = blogsData[selectedBlogIndex];
    renderComments(blog); // Refresh comments
    document.getElementById('commentCount').textContent = blog.comments.length;

    const commentCountElement = document.getElementById(`count-${blog.id}`);
    commentCountElement.innerHTML = `<i class="fas fa-comments"></i> ${blog.comments.length} Comments`;
}

// Save blogs data to localStorage
function saveBlogsData() {
    localStorage.setItem('blogsData', JSON.stringify(blogsData));
}

// Load blogs and user info on page load
window.addEventListener('DOMContentLoaded', () => {
    const nameElement = document.getElementById('userName');
    currentUsername = nameElement ? nameElement.textContent.trim() : "Guest";
    document.getElementById('userName').textContent = currentUsername;
    renderBlogs(); // Show all blogs
});

// Close blog modal and remove blur
function closeModal() {
    document.getElementById('blogModal').style.display = 'none';
    document.body.classList.remove('blurred');
}

// Filter blogs by title based on search input
function filterBlogs() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toLowerCase();
    const blogCards = document.querySelectorAll('.blog-card');

    blogCards.forEach(card => {
        const title = card.querySelector('.blog-title')?.innerText.toLowerCase();
        card.style.display = (title && title.includes(filter)) ? '' : 'none';
    });
}