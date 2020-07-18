---
layout: post
title: Progreso Hera
date: 2020-07-06
---
Acomodo de los directorios de `Hera`.

Directorios/archivos que requieran la conexión a la BD y revisar si hay alguna sesión iniciada:
- Login:
  ```
  si conexion_bd == existe
	si sesion == existe
		redireccionar a menu correspondiente;
	else
		redireccionar a login;
  else
	imprimir error;
  ```
Durante el fin de semana logré implementar los layouts para el sitio junto con el `login`. Ahora siempre se está comprobando la existencia de una sesión activa, en el caso de existir y querer entrar `login\index.php` automáticamente redirige al menú principal. También en el caso de querer entrar a `menu\index.php` por la barra de dirección y de no contar con una sesión abierta se redirige a la página de login.

Además trabaje con mi curriculum, y ya solo falta retroalimentación, me base en el hecho por [davewhipp](https://davewhipp.github.io/markdown-cv/).
