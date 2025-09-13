

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
      <h4 class="text-gray-700 mt-2"><span><i class="fa-solid fa-dollar-sign"></i> Price :</span> ${cart.price}$</h4>
    </div>
    <div class="flex justify-between items-center text-center mt-3">
      <button class="p-2 rounded shadow-md"><i class="fa-solid fa-thumbs-up"></i></button>
      <button class="text-[#0E7A81] font-bold rounded-sm shadow-md p-2">Adopt</button>
      <button class="text-[#0E7A81] font-bold rounded-sm shadow-md p-2">Details</button>
    </div>
  </div>
`;


        cartContainar.appendChild(cartDiv)

    });
}

loadCartAll()
loadCategoryAllPets();
