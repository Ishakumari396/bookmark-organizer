const bookmarkBtn = document.getElementById("bookmark-add");
const bookmarkList = document.getElementById("bookmark-list");
const bookmarkName = document.getElementById("bookmark-name");
const bookmarkURLInput = document.getElementById("bookmark-URL");

document.addEventListener('loadContent', loadBookmarks);

bookmarkBtn.addEventListener("click", function () {
    const name = bookmarkName.value.trim();
    const URL = bookmarkURLInput.value.trim();


    if (!name || !URL) {
        alert('please enter both name and URL');
        return;
    } else {
        if (!URL.startsWith("http://") && !URL.startsWith("https://")) {
            alert("please enter URL starting with http:// or https://");
            return;
        }
        addbookmark(name, URL);
        saveBookmark(name, URL);
        bookmarkName.value = "";
        bookmarkURLInput = "";



    }
}
);

function addbookmark(name, URL) {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = URL;
    link.textContent = name;
    link.target = "_blank";

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", function () {
        bookmarkList.removeChild(li);
        removeBookmarkFromStorage(name, URL);
    })

    li.appendChild(link);
    li.appendChild(removeButton);

    bookmarkList.appendChild(li);
}
function removeBookmarkFromStorage() {
    const bookmarks = localStorage.getItem("bookmarks");
    return bookmarks ? JSON.parse(bookmarks) : []
}
function saveBookmark(name, URL) {
    const bookmarks = getbookmarksFromStorage();
    bookmarks.push({ name, URL });
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

function loadBookmarks() {
    const bookmarks = getbookmarksFromStorage();
    bookmarks.forEach((bookmarks) => addbookmark(bookmarkBtn.name, bookmarkBtn.URL));
}
function removeBookmarkFromStorage(name, URL) {
    let bookmarks = getbookmarksFromStorage();
    bookmarks = bookmarks.filter((bookmark) => bookmark.name !== name || bookmark.URL == !URL);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

