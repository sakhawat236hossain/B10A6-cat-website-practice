

// loadCategoryAllPets

const loadCategoryAllPets = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
        .then(res => res.json())
        .then((data) => displayAllCategory(data.categories));
}

const displayAllCategory = (btns) => {
    const cartBtn = document.getElementById("add-btn");
    cartBtn.innerHTML = "";

    btns.forEach(btn => {
      

        const creatBtn = document.createElement("button");
        creatBtn.className = "btn btn-outline flex items-center gap-2";
        creatBtn.innerHTML = `
          <img src="${btn.category_icon}" class="h-6 w-6" />
          ${btn.category}
        `;
        creatBtn.addEventListener("click",()=>{
          loadPetsByCategory(btn.category);

        });

        cartBtn.appendChild(creatBtn);
    });
};

// নির্দিষ্ট ক্যাটাগরি দিয়ে পোষা প্রাণী লোড

 const loadPetsByCategory = (category) => {
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
        .then(res => res.json())
        .then(data => {
            // শুধু এই ক্যাটাগরির পোষা প্রাণীগুলো রাখো
            const filtered = data.pets.filter(pet => pet.category === category);
            displayAllCart(filtered);
        });
};

// সব পোষা প্রাণী লোড
const loadCartAll =()=>{
      fetch("https://openapi.programming-hero.com/api/peddy/pets")
      .then((res)=>res.json())
      .then((data)=>displayAllCart(data.pets))
}

// কার্ড দেখানোর ফাংশন
const displayAllCart =(carts)=>{
    const cartContainar = document.getElementById("cart-containar")
    cartContainar.innerHTML="";    // আগের ডেটা মুছে ফেলতে হবে
    // যদি কোনো ডেটা না থাকে
  if (carts.length === 0) {
    cartContainar.innerHTML = `
        <div class="flex flex-col items-center justify-center text-center mt-8 text-gray-700 p-4">
            <img class="mx-auto w-40 h-40 object-contain" src="./images/error.webp" alt="">
            <div class="mt-4 max-w-md">
                <h1 class="text-2xl text-black font-bold">No Information Available</h1>
                <p class="mt-2 text-sm">
                    It is a long established fact that a reader will be distracted by the readable 
                    content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a.
                </p>
            </div>
        </div>
    `;
    return; // নিচের কোড আর চালাবে না
}

    carts.forEach(cart => {
        console.log(cart);
        const cartDiv = document.createElement("div")
cartDiv.innerHTML = `
  <div class="shadow-md rounded-md space-y-3 w-full">
    <img class="rounded-md w-full h-40 object-cover" src="${cart.image}" alt="">
    <div>
      <h1 class="font-bold">${cart.category}</h1>
      <h4 class="text-gray-700 flex items-center mt-2">
        <i class="fa-solid fa-baby mr-2 text-blue-500"></i>
        <span>Birth:</span> ${cart.date_of_birth}
      </h4>
      <h4 class="text-gray-700 mt-2"><span><i class="fa-solid fa-venus"></i> Gender:</span> ${cart.gender}</h4>
      <h4 class="text-gray-700 mt-2"><span><i class="fa-solid fa-dollar-sign"></i> Price :</span> ${cart.price}</h4>
    </div>
    <div class="flex justify-between items-center text-center mt-3">
      <button class="p-2 rounded shadow-md"><i class="fa-solid fa-thumbs-up"></i></button>
      <button class="text-[#0E7A81] font-bold rounded-sm shadow-md p-2">Adopt</button>
      <button onclick="openModal(${cart.petId})" class="text-[#0E7A81] font-bold rounded-sm shadow-md p-2">Details</button>
    </div>
  </div>
`;


        cartContainar.appendChild(cartDiv)

    });
}

// {
//     "petId": 1,
//     "breed": "Golden Retriever",
//     "category": "Dog",
//     "date_of_birth": "2023-01-15",
//     "price": 1200,
//     "image": "https://i.ibb.co.com/p0w744T/pet-1.jpg",
//     "gender": "Male",
//     "pet_details": "This friendly male Golden Retriever is energetic and loyal, making him a perfect companion for families. Born on January 15, 2023, he enjoys playing outdoors and is especially great with children. Fully vaccinated, he's ready to join your family and bring endless joy. Priced at $1200, he offers love, loyalty, and a lively spirit for those seeking a playful yet gentle dog.",
//     "vaccinated_status": "Fully",
//     "pet_name": "Sunny"
// }
// modal
const openModal = async (id) => {
  const url = `https://openapi.programming-hero.com/api/peddy/pet/pet-${id}`;
  // console.log("Fetching:", url);

 
    const res = await fetch(url);
    const data = await res.json();
    displayDetiles(data);

  }

const displayDetiles =(object)=>{
console.log(object);
    // const modalContainar = document.getElementById("datelis-containar");
   const modalContainar = document.getElementById("datelis-containar");
    modalContainar.innerHTML = `
      <div class="space-y-5 p-5">
        <!-- Image -->
        <img class="w-48 h-48 mx-auto rounded object-cover" src="${object.image}" alt="">
        
        <!-- Info -->
        <div class="flex flex-col md:flex-row justify-between gap-5 text-center md:text-left">
          <div class="space-y-2">
            <h1><strong>Breed:</strong> ${object.breed}</h1>
            <h1><strong>Gender:</strong> ${object.gender}</h1>
            <h1><strong>Vaccinated:</strong> ${object.vaccinated_status}</h1>
          </div>
          <div class="space-y-2">
            <h1><strong>Birth:</strong> ${object.date_of_birth || 'N/A'}</h1>
            <h1><strong>Price:</strong> ${object.price ? '$' + object.price : 'Not Available'}</h1>
          </div>
        </div>

        <!-- Details -->
        <div>
          <h1 class="font-bold text-lg">Details Information</h1>
          <hr class="my-2">
          <p class="text-gray-700 text-sm">${object.pet_details || 'No details available.'}</p>
        </div>
      </div>
    `;
document.getElementById("my_modal_5").showModal();
}

loadCartAll()
loadCategoryAllPets();
