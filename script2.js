const element = JSON.parse(localStorage.getItem("user"));
let userPosts;
if (element == undefined) {
  window.location.href = "/index.html";
}

const postDiv = document.getElementById("posts");
const buttonDiv = document.getElementById("button-area");
const BulkAddBtn = document.createElement("button");
BulkAddBtn.innerText = "Bulk Add";
BulkAddBtn.className = "bulk-add-btn";
BulkAddBtn.addEventListener("click", async () => {
  try {
    const res = await fetch(`http://localhost:8000/posts/${element.id}`, {
      method: "POST",
      body: JSON.stringify(userPosts),
      headers: {
        "Content-type": "application/json",
      },
    });
    if (res.status === 201 || res.status === 200) {
      BulkAddBtn.style.display = "none";
      DownloadBtn.style.display = "block";
    } else {
      console.error("Error:", res.status);
      // Handle error appropriately, e.g., show error message to the user
    }
  } catch (err) {
    console.log(err);
  }
});

const DownloadBtn = document.createElement("button");
DownloadBtn.innerText = "Download in Excel";
DownloadBtn.className = "bulk-add-btn";
DownloadBtn.style.display = "none";
DownloadBtn.addEventListener("click", async () => {
  try {
    window.location.href = `http://localhost:8000/${element.id}/download`;
    // const res = await fetch(`http://localhost:8000/${element.id}/download`);
    // const data = res.blob();
    // const objectURL = URL.createObjectURL(data);
    // window.location.href = objectURL
  } catch (err) {
    console.log(err);
  }
});

buttonDiv.appendChild(BulkAddBtn);
buttonDiv.appendChild(DownloadBtn);
const postFetch = async () => {
  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${element.id}`
    );
    const data = await res.json();
    userPosts = data.map((ele) => {
      return { ...ele, name: element.name, company: element.company.name };
    });
    data.forEach((post) => {
      const onePost = document.createElement("div");
      onePost.className = "post";
      const postNameDiv = document.createElement("div");
      postNameDiv.innerText = "Name :-- " + element.name;

      const postTitleDiv = document.createElement("div");
      postTitleDiv.innerText = "Title :-- " + post.title;

      const postBodyDiv = document.createElement("div");
      postBodyDiv.innerText = "Body :-- " + post.body;

      const userCompanyDiv = document.createElement("div");
      userCompanyDiv.innerText = "Company :-- " + element.company.name;

      onePost.appendChild(postNameDiv);
      onePost.appendChild(postTitleDiv);
      onePost.appendChild(postBodyDiv);
      onePost.appendChild(userCompanyDiv);
      postDiv.appendChild(onePost);
    });
  } catch (err) {
    console.log(err);
  }
};
postFetch();
