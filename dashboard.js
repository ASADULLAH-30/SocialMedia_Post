// ✅ Import Firebase modules
import { auth, db } from "./firebase.js";
import { 
    onAuthStateChanged, 
    signOut 
} from "https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js";
import { 
    collection, 
    addDoc, 
    onSnapshot, 
    query, 
    orderBy, 
    doc, 
    deleteDoc, 
    updateDoc 
} from "https://www.gstatic.com/firebasejs/11.3.0/firebase-firestore.js";

// ✅ Function to Get Profile Picture Based on First Letter
function getProfilePicture(name) {
    if (!name) return "default-avatar.png"; // Fallback image

    const firstLetter = name.charAt(0).toUpperCase();
    return `avatars/${firstLetter}.png`; // Assumes images are in "avatars" folder (e.g., avatars/A.png)
}

// ✅ Check if user is logged in and set profile details
onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById("user-name").innerText = user.displayName || "User";
        document.getElementById("user-email").innerText = user.email;

        // ✅ Set Profile Picture Based on First Letter
        document.getElementById("user-photo").src = user.photoURL || getProfilePicture(user.displayName);
    } else {
        window.location.href = "index.html";
    }
});

// ✅ Logout Function
document.getElementById("logout-btn").addEventListener("click", () => {
    signOut(auth)
        .then(() => {
            alert("Logged out successfully!");
            window.location.href = "index.html";
        })
        .catch((error) => {
            alert("Logout Failed: " + error.message);
            console.error("Logout Error:", error);
        });
});

// ✅ Create Post Function
document.getElementById("post-btn").addEventListener("click", async () => {
    const postContent = document.getElementById("post-content").value.trim();
    if (postContent === "") {
        alert("Post cannot be empty!");
        return;
    }

    const user = auth.currentUser;
    if (user) {
        await addDoc(collection(db, "posts"), {
            content: postContent,
            userId: user.uid,
            userName: user.displayName || "Anonymous", // ✅ Ensure the username from signup is used
            timestamp: new Date()
        });
        document.getElementById("post-content").value = "";
    }
});

// ✅ Fetch & Display Posts
const postsList = document.getElementById("posts-list");

onSnapshot(query(collection(db, "posts"), orderBy("timestamp", "desc")), (snapshot) => {
    postsList.innerHTML = ""; // Clear existing posts
    snapshot.forEach((doc) => {
        const post = doc.data();
        const postItem = document.createElement("li");
        postItem.classList.add("list-group-item");

        // ✅ Fetch Profile Picture Based on User's Name
        const profilePic = getProfilePicture(post.userName);

        // 📝 Display post content with Profile Picture
        postItem.innerHTML = `
            <img src="${profilePic}" class="rounded-circle" width="40" height="40" alt="Profile">
            <strong>${post.userName}</strong>: ${post.content}
            <br><small>${new Date(post.timestamp.seconds * 1000).toLocaleString()}</small>
        `;

        // 🔄 Edit & Delete options for post owner
        if (auth.currentUser && auth.currentUser.uid === post.userId) {
            const editBtn = document.createElement("button");
            editBtn.innerText = "Edit";
            editBtn.classList.add("btn", "btn-warning", "btn-sm", "mx-2");
            editBtn.onclick = () => editPost(doc.id, post.content);

            const deleteBtn = document.createElement("button");
            deleteBtn.innerText = "Delete";
            deleteBtn.classList.add("btn", "btn-danger", "btn-sm");
            deleteBtn.onclick = () => deletePost(doc.id);

            postItem.appendChild(editBtn);
            postItem.appendChild(deleteBtn);
        }

        postsList.appendChild(postItem);
    });
});

// ✅ Edit Post Function
async function editPost(postId, oldContent) {
    const newContent = prompt("Edit your post:", oldContent);
    if (newContent && newContent !== oldContent) {
        await updateDoc(doc(db, "posts", postId), {
            content: newContent
        });
    }
}

// ✅ Delete Post Function
async function deletePost(postId) {
    if (confirm("Are you sure you want to delete this post?")) {
        await deleteDoc(doc(db, "posts", postId));
    }
}
