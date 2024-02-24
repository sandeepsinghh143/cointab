window.addEventListener('load',()=>localStorage.clear())
const fetchButton = document.getElementById('fetch-data');
const mainDiv = document.getElementById("users-data");

const fetchUsers = async () => {
    try{
        const res = await fetch(`https://jsonplaceholder.typicode.com/users`);
        const data = await res.json();
        data.forEach(element => {
            const userDiv = document.createElement("div");
            userDiv.className = "user"

            const nameDiv = document.createElement("div");
            nameDiv.innerText = "Name :-- " + element.name;

            const emailDiv = document.createElement("div");
            emailDiv.innerText = "Email :-- " + element.email;

            const phoneDiv = document.createElement("div");
            phoneDiv.innerText = "Phone No :-- " + element.phone;

            const webDiv = document.createElement("div");
            webDiv.innerText = "Website :-- " + element.website;

            const cityDiv = document.createElement("div");
            cityDiv.innerText = "City :-- " + element.address.city;

            const companyDiv = document.createElement("div");
            companyDiv.innerText = "Company :-- " + element.company.name;

            const buttonDiv = document.createElement("div");

            const openBtn = document.createElement("button");
            openBtn.innerText = "Open";
            openBtn.className = "user-btn";
            // openBtn.style.display="none";
            openBtn.addEventListener("click", () => {
                localStorage.setItem("user", JSON.stringify(element));
                window.location.href = "/post.html";
            });

            openBtn.style.display = "none";

            const addBtn = document.createElement("button");
            addBtn.innerText = "Add";
            addBtn.className = "user-btn";

            addBtn.addEventListener("click", async () => {
                try{
                  const res = await fetch("http://localhost:8000/addUser", {
                  method: "POST",
                  body: JSON.stringify(element),
                  headers: {
                    "Content-type": "application/json"
                  }
                })
                    if (res.status===201 || res.status===200) {
                        addBtn.style.display="none";
                        openBtn.style.display="block";
                    } else {
                        console.error('Error:', res.status)
                        // Handle error appropriately, e.g., show error message to the user
                    }
                }
                catch(err){
                    console.log(err)
                }
                }
                );

            buttonDiv.appendChild(openBtn);
            buttonDiv.appendChild(addBtn);

            userDiv.appendChild(nameDiv);
            userDiv.appendChild(emailDiv);
            userDiv.appendChild(phoneDiv);
            userDiv.appendChild(webDiv);
            userDiv.appendChild(cityDiv);
            userDiv.appendChild(companyDiv);
            userDiv.appendChild(buttonDiv);

            mainDiv.appendChild(userDiv);
        });
        fetchButton.style.display = "none";
    }
    catch(err){
        console.log(err);
    }
}


fetchButton.addEventListener("click", fetchUsers);