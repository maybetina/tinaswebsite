/*
GALLERY PAGE
*/
// function to open the modal
function openModal(image) {
    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");

    modal.style.display = "flex"; // show the modal
    modalImage.src = image.src;  // set the modal image source
}

// function to close the modal
function closeModal() {
    const modal = document.getElementById("imageModal");
    modal.style.display = "none"; // hide the modal
}



/*
COMMENT PAGE AND SECTION
*/

// initialize an array to hold all comments or load from local storage
let commentsArray = JSON.parse(localStorage.getItem('comments')) || [];

// function to load comments from local storage when the page loads
window.onload = function() {
    // if there are comments in the array, display them
    if (commentsArray.length > 0) {
        commentsArray.forEach(displayComment);
    }
};

// handle comment form submission
document.getElementById("commentForm").addEventListener("submit", function(e) {
    e.preventDefault(); // prevent form submission

    const userName = document.getElementById("userName").value;
    const commentText = document.getElementById("commentText").value;

    if (userName && commentText) {
        const currentDate = new Date();
        const commentDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;

        // create a comment object
        const comment = {
            name: userName,
            text: commentText,
            date: commentDate
        };


        // add comment to the array
        commentsArray.push(comment);

        // save the updated array to localStorage
        localStorage.setItem("comments", JSON.stringify(commentsArray));

        // display the comment in the comments section
        displayComment(comment);

        // clear the input fields
        document.getElementById("userName").value = '';
        document.getElementById("commentText").value = '';
    } else {
        alert("Please enter both a name and a comment.");
    }
});

// function to display a comment
function displayComment(comment) {
    const commentDiv = document.createElement("div");
    commentDiv.classList.add("comment");

    const commentName = document.createElement("div");
    commentName.classList.add("comment-name");
    commentName.textContent = comment.name;

    const commentDate = document.createElement("div");
    commentDate.classList.add("comment-date");
    commentDate.textContent = comment.date;

    const commentText = document.createElement("div");
    commentText.classList.add("comment-text");
    commentText.textContent = comment.text;

    commentDiv.appendChild(commentName);
    commentDiv.appendChild(commentDate);
    commentDiv.appendChild(commentText);

    document.getElementById("commentsList").appendChild(commentDiv);
}

// function to export comments as JSON
document.getElementById("exportBtn").addEventListener("click", function() {
    if (commentsArray.length === 0) {
        alert("No comments to export.");
        return;
    }

    const jsonComments = JSON.stringify(commentsArray, null, 2);

    // create a Blob from the JSON string
    const blob = new Blob([jsonComments], { type: 'application/json' });

    // create a link to download the Blob as a file
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "comments.json"; // name of the file

    //  click the link to trigger the download
    link.click();
});

// function to clear all comments with a confirmation alert
document.getElementById("clearBtn").addEventListener("click", function() {
    const confirmation = confirm("Are you sure you want to clear all comments?");
    if (confirmation) {
        //clear comments array
        commentsArray = [];
        //remove from local storage
        localStorage.removeItem("comments");
        // clear the comments display
        document.getElementById("commentsList").innerHTML = '';
    }
});
