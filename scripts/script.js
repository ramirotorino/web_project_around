document.addEventListener("DOMContentLoaded", (event) => {
  let editButton = document.querySelector(".content__profile-edit");
  let modal = document.getElementById("editModal");
  let closeButton = document.querySelector(".modal__content-closeButton");
  let editForm = document.getElementById("editForm");
  let profileName = document.querySelector(".content__profile-title");
  let profileSubtitle = document.querySelector(".content__profile-subtitle");

  // Mostrar el modal y rellenar los campos con los valores actuales
  editButton.addEventListener("click", () => {
    document.getElementById("name").value = profileName.textContent.trim(); // Rellenar el campo de nombre
    document.getElementById("title").value = profileSubtitle.textContent.trim(); // Rellenar el campo de título
    modal.style.display = "block";
  });

  // Cerrar el modal al hacer clic en el botón de cierre
  closeButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Cerrar el modal al hacer clic fuera del contenido del modal
  window.addEventListener("click", (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });

  // Actualizar los datos del perfil al enviar el formulario
  editForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevenir comportamiento por defecto del formulario

    let name = document.getElementById("name").value.trim();
    let title = document.getElementById("title").value.trim();

    profileName.textContent = name;
    profileSubtitle.textContent = title;

    modal.style.display = "none"; // Cerrar el modal después de guardar
  });
});
