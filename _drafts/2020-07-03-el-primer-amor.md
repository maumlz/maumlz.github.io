---
layout: post
title: El primer amor
date: 2020-07-03
---
Hera Ceytem fue el primer proyecto de desarrollo "formal" en el que participé, yo fui el encargado de diseñar la base de datos, después pasé a ser el principal programador del equipo.

El proyecto formó parte de la evaluación de la materia de Ingeniería de Software, el objetivo era crear un sistema que permitiera a los docentes del Colegio de Estudios Científicos y Tecnológicos del Estado de México el llenado de las planeaciones estratégicas de sus respectivas asignaturas. Se realizó toda la documentación requerida, desde el *Project Charter* hasta la planeación de Riesgo y Control de Calidad.

La dinámica del curso consistió en la formación de 4 equipos de entre 8 y 10 integrantes los cuales se dividirían los diferentes roles, al final del semestre se eligió el sistema que cumplía con los requisitos previamente establecidos, resultando en la selección del proyecto realizado por mi equipo. Finalmente, no se terminó y al final el sistema contaba con muchas fallas de seguridad.
Listare las funcionalidades que se establecieron en aquel entonces, pero además incluiré otros que YO considere importantes.
- [ ] Login/logout (Seguridad de la sesión y encriptación)
- [ ] Base de Datos
- [ ] Generación de pdf

## PHP/Jekyll
Bien, encontré alguien que [aplicó](https://christianspecht.de/2017/10/04/running-a-combined-jekyll-php-site-on-xampp/) Jekyll para generar las partes estáticas de su sitio y después utilizo el servidor local de XAMPP para la interpretación `php` y funciona, solo hay que tomar en cuenta que es necesario cambiar el `DocumentRoot`, ubicado en `C:\xampp\apache\conf`, por la dirección del directorio `_site` que se genera con `Jekyll`. Es impráctico a la hora de querer alojar el sitio en un servidor ya que si se le realiza algún cambio es necesario reconstruirla nuevamente con `Jekyll`, pero como esto es pura practica no importa.
