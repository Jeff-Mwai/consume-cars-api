document.getElementById('viewCars').addEventListener('click', myCars);
document.getElementById('addCars').addEventListener('submit', newCars);


function newCars(event) {
    event.preventDefault();

    let type = document.getElementById('carType').value;
    let price = document.getElementById('price').value;
    let color = document.getElementById('color').value;
    let engine = document.getElementById('engine').value;

    fetch('http://127.0.0.1:8000/api/new-cars/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'content-type': 'application/json'
        },
        body: JSON.stringify({ car_type: type, price: price, color: color, engine: engine })
    })
        .then((res) => res.json())
        .then((data) => console.log(data))


}

function deleteCars(id) {
    fetch('http://127.0.0.1:8000/api/car-list/' + id, {
        method: "DELETE",
    })
        .then((res) => res.json())
        .then((data) => {this.myCars()});
}

// function updateCars(id) {
//     fetch('http://127.0.0.1:8000/api/car-list/' + id, {
//         method: "PUT",
//     })
//         .then((res) => res.json())
//         .then((data) => {this.myCars()});
// }


function myCars() {

    fetch('http://127.0.0.1:8000/api/new-cars/?').then((res) => res.json()).then((data) => {
        let results = '<h3 class="text-center mt-5">My Car Collection</h3>'
        data.forEach(function (post) {
            results += `
        <div class="card card-cascade wider mt-5">

  <!-- Card image -->
  <div class="view view-cascade gradient-card-header blue-gradient">

    <!-- Title -->
    
    <h2 class="card-header-title mb-3 text-center text-white">${post.car_type}</h2>

  </div>

  <!-- Card content -->
  <div class="card-body card-body-cascade text-center">

    <!-- Text -->
    <h1 class="card-text ">Price: ${post.price}</h1>
    <h3 class="card-text">Color: ${post.color}</h3>
    <h3 class="card-text">Engine Size: ${post.engine}</h3>
    <!-- Link -->
    <button OnClick="updateCars(id)" class="btn btn-primary">Update</button>
    <button onClick="deleteCars(${post.id})" class="btn btn-danger">Delete</button>


  </div>
  <!-- Card content -->

</div>
<!-- Card -->

        `;
        });
        document.getElementById('results').innerHTML = results;
    })
}