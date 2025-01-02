document.addEventListener('DOMContentLoaded', async () => {
    const bookmarkList = document.getElementById('bookmarkList');

    // Get all bookmarks
    chrome.bookmarks.getRecent(10, (bookmarks) => {
        bookmarks.forEach(bookmark => {
            const li = document.createElement('li');
            li.className = 'bookmark-item';

            const link = document.createElement('a');
            link.href = bookmark.url;
            link.className = 'bookmark-link';
            link.target = '_blank';
            link.textContent = bookmark.title || bookmark.url;

            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'x';
            removeBtn.className = 'remove-btn';
            removeBtn.onclick = () => {
                chrome.bookmarks.remove(bookmark.id, () => {
                    li.remove();
                });
            };

            const date = document.createElement('div');
            date.className = 'bookmark-date';
            date.textContent = new Date(bookmark.dateAdded).toLocaleDateString();

            li.appendChild(link);
            li.appendChild(date);
            li.appendChild(removeBtn);
            bookmarkList.appendChild(li);
        });
    });
});
