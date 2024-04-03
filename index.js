const pizzas = [
  {
    id: 1,
    nombre: "Pizza de Muzzarella",
    precio: 500,
    ingredientes: ["Muzzarella", "Tomate", "Aceitunas"],
    imagen: "./img/muzzarella.png",
  },

  {
    id: 2,
    nombre: "Pizza de Cebolla",
    precio: 1500,
    ingredientes: ["Muzzarella", "Tomate", "Cebolla"],
    imagen: "./img/cebolla.png",
  },

  {
    id: 3,
    nombre: "Pizza 4 Quesos",
    precio: 1380,
    ingredientes: [
      "Muzzarella",
      "Tomate",
      "Queso Azul",
      "Parmesano",
      "Roquefort",
    ],
    imagen: "./img/4quesos.png",
  },

  {
    id: 4,
    nombre: "Pizza Especial",
    precio: 1000,
    ingredientes: ["Muzzarella", "Tomate", "Rucula", "Jamón"],
    imagen: "./img/especial.png",
  },

  {
    id: 5,
    nombre: "Pizza con Anana",
    precio: 600,
    ingredientes: ["Muzzarella", "Tomate", "Anana"],
    imagen: "./img/anana.png",
  },
];


const registerForm = document.querySelector("#register_form");
const numberInput = document.querySelector("#number");
const containerCards = document.querySelector(".card_info_conteiner");
const card = document.querySelector(".cards")
const succes = document.querySelector(".exito");

//Funciones Auxiliares
const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

//Permite almacenar datos en el storage
const saveToLocalStorage = () => {
  localStorage.setItem("pedidos", JSON.stringify(pedidos));
};

//Chequeamos si el campo está vacío
const isEmpty = (input) => {
  return !input.value.trim().length;
};

const isBetween = (input, min, max) => {
  return input.value.length >= min && input.value.length < max;
};

//Validamos si el número ingresado existe
const isNumberValid = (input) => {
  const re = /^[1-5]{1}$/;
  //testeamos
  return re.test(input.value.trim());
};

// Mostrar error al validar el input
const showError = (input, message) => {
  const formField = input.parentElement;
  formField.classList.remove("success");
  formField.classList.add("error");
  const error = formField.querySelector("small");
  error.style.display = "block";
  error.textContent = message;
};
const showSuccess = (input) => {
  const formField = input.parentElement;
  formField.classList.remove("error");
  formField.classList.add("success");
  const error = formField.querySelector("small");

  error.textContent = "";
};

//Validamos el input
const checkNumberInput = (input) => {
  let valid = false;
  if (isEmpty(input)) {
    showError(input, "Debe elegír un número");
    card.style.display = 'none'
    succes.style.display = 'none'
    return;
  }
  if (!isNumberValid(input)) {
    showError(input, "El número ingresado no es valido");
    card.style.display = 'none'
    succes.style.display = 'none'
    return;
  }

  showSuccess(input);
  valid = true;
  return valid;
};

// Validación general y almacenamiento de los datos
const validateForm = (e) => {
  e.preventDefault();

  //Almacenamos en variables el estado de los inputs

  let isNumberValid = checkNumberInput(numberInput);

  let isValidForm = isNumberValid;

  if (isValidForm) {
    const pizzaNumber = parseInt(numberInput.value);
    const pizza = pizzas.find((pizza) => pizza.id === pizzaNumber);



    if (pizza) {
      pedidos.push(pizza);
      saveToLocalStorage(pedidos);
      const createCardHTML = () => {
        return `
        <div>
        <img src="${pizza.imagen}" alt="${pizza.nombre}" />
        <h3>${pizza.nombre}</h3>
        <ul>
        <li><span>Precio:</span> $${pizza.precio}</li>
        <li><span>Ingredientes:</span> ${pizza.ingredientes.join(", ")}</li>
        </ul>
        
        </div>
      `;
      }
      containerCards.innerHTML = createCardHTML();
      card.style.display = 'flex'
      succes.style.display = 'flex'
      // window.location.href="login.html";
    } else {
      alert("No se encontró ninguna pizza con ese número.");
    }

    // window.location.href="login.html";
  }
};




//Funcion para inicializar
const init = () => {
  registerForm.addEventListener("submit", validateForm);
  numberInput.addEventListener("input", () => checkNumberInput(numberInput));
};

init();


// numberInput.addEventListener("input", () => {
//   const pizzaNumber = parseInt(numberInput.value);
//   const pizza = pizzas.find((pizza) => pizza.id === pizzaNumber);
//   const createCardHTML = () => {
//     return `
//     <div>
//     <img src="${pizza.imagen}" alt="${pizza.nombre}" />
//     <h3>${pizza.nombre}</h3>
//     <p>Precio: $${pizza.precio}</p>
//     <p>Ingredientes: ${pizza.ingredientes.join(", ")}</p>
//     </div>
//   `;
//   }
//   containerCards.innerHTML = createCardHTML();
// })



