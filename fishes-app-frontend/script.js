const fishesAPI = "http://localhost:3000/fishes";

const container = document.querySelector("#container");

fetch(fishesAPI)
    .then(resp => resp.json())
    .then(fishes => {
        fishes.forEach(fish => {
            container.insertAdjacentHTML("beforeend", `
                <li id=${fish.id}>
                    <p class="flex">${fish.name} ${fish.type}</p>
                    <button class="fish-delete-buttons" data-fish-to-delete=${fish.id}>Delete</button>
                </li>
            `)
            const fishDeleteButtons = document.querySelectorAll(".fish-delete-buttons");
            fishDeleteButtons.forEach(fishDeleteButton => {
                fishDeleteButton.addEventListener("click", deleteFish);
            })
        });
    });

    const fishAdditionForm = document.querySelector("#new-fish-form");
    const nameField = document.querySelector("#name")
    const typeField = document.querySelector("#type")
    fishAdditionForm.addEventListener("submit", createNewFish)
    

    async function createNewFish(event){

            try {
                // event.preventDefault();
                console.log(nameField.value);
                console.log(typeField.value);
                const newFishObj = {
                name: nameField.value,
                type: typeField.value
            }
    
            const newlyCreatedFish = await (await fetch(fishesAPI, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newFishObj)
            })).json();
            console.log(newlyCreatedFish)
        } catch(err){
            console.log(err);
        }
            
    }

    async function deleteFish() {
        try {
            console.log(this.dataset.fishToDelete);
            const deleteMessage = await (await fetch(`${fishesAPI}/${this.dataset.fishToDelete}`, {
                method: "DELETE",
                mode: "cors",

            })).json();
            console.log(deleteMessage)
            location.reload();
        }catch(err){
            console.log(err);
        }
    }
 