function cambiarTitulo(e) {
  let atribute = e.getAttribute("alt");
  e.setAttribute("title", atribute);
}