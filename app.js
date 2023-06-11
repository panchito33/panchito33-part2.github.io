let select = document.querySelector("#select");
let divTotal = document.querySelector(".total");
let cantidad = document.querySelector(".cantidad");
let name = document.querySelector(".name");
let surname = document.querySelector(".surname");
let email = document.querySelector(".email");
let resume = document.querySelector(".resume");

let total = (cantidad, categoria, div) => {
   if (categoria === "1") {
      div.textContent = `Total a pagar: $ ${200 * cantidad * 0.2}`;
   }

   if (categoria === "2") {
      div.textContent = `Total a pagar: $ ${200 * cantidad * 0.5}`;
   }

   if (categoria === "3") {
      div.textContent = `Total a pagar: $ ${200 * cantidad * 0.85}`;
   }
};

let emptyInput = (input) => {
   if (input.value === "") {
      input.style.borderColor = "red";
      Swal.fire({
         icon: 'error',
         title: 'Error',
         text: 'Complete todos los datos',
      });
      return true;
   } else {
      input.style.borderColor = "green";
      return false;
   }
};

let isValidEmail = (email) => {
   const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
   return emailRegex.test(email);
};

select.addEventListener("change", (e) => {
   if (e.target.value === "Seleccione categoria") {
      divTotal.textContent = "Total a pagar: $";
   }
   total(cantidad.value, e.target.value, divTotal);
});

cantidad.addEventListener("input", (e) => {
   
   e.target.value = e.target.value.replace(/\D/g, "");
   total(e.target.value, select.value, divTotal);
});

resume.addEventListener("click", (e) => {
   e.preventDefault();
   if (
      emptyInput(name) ||
      emptyInput(surname) ||
      emptyInput(cantidad) ||
      emptyInput(email) ||
      !isValidEmail(email.value) ||
      email.value.indexOf("@") === -1
   ) {
      Swal.fire({
         icon: "error",
         title: "Error",
         text: "Ingrese un correo electrónico válido",
      });
      return;
   }

   Swal.fire({
      icon: "success",
      title: "Gracias por su compra",
      html: `<p>${name.value} ${surname.value}</p>
      <p>Se envió la información a: ${email.value}</p>
      <p>${divTotal.textContent}</p>`,
      confirmButtonText: "Continuar",
   }).then((result) => {
      if (result.isConfirmed) {
         window.location.href = "./index.html";
      }
   });
});

resume.addEventListener("click", (e) => {
   e.preventDefault();
   
   name.style.borderColor = "";
   surname.style.borderColor = "";
   email.style.borderColor = "";
   cantidad.style.borderColor = "";
});
