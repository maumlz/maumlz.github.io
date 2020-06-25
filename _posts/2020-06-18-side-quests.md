---
layout: post
title: "Side Quests"
date: 2020-06-18
---
Hoy empecé a revisar como añadir mi [curriculum vitae](https://maumlz.github.io/cv) a la página de Github y me tope con varias maneras, al final decidí trabajar con una que mezcla [ConTeXt](https://wiki.contextgarden.net/Main_Page), un derivado de LaTeX, pero necesitaba varias cosas en mi maquina comenzando con la intalación del "sistema". Al ser software open-source el montaje resulta poco amigable al ojo no entrenado, la parte que me retraso fue el añadir la variable de entorno ya que las instrucciones indican que con solo ejecutar los archivos `.bat` (bash o por lotes). En mi caso no funcionó el que agrega la variable de entorno por lo que me puse a aprender como agrgar dichas variables tanto por el panel de control como por linea de comandos (cmd), así que aqui pondré un resumen de lo que vi ya sea para alguien que lo necesite como para mi yo del futuro al que se le olvidó.

Despues de arreglar lo de el `path` me entretuve limpinado mi maquina, conocen esos archivos y carpetas que se crean un el folder del usuario, ¿no? bueno, para mi son molestos asi que me puse a investigar que eran y eso me llevo desisntalar software que ya no estaba utilizando y asi me metí en un _rabitt hole_ enorme hasta que llegue a revisar lo de el **git**, ya que lo que hoy quería trabajar era con lo del cv pero como lo dije antes este requiero de diferentes cosas, entonces clone el repositorio que pide la [guía](https://practicalseries.com/1002-vcs/03-03-install.html) que estoy siguiendo y al momento de hacerlo a traves de **Git** este se descargó en la carpeta de usuario que mencioné. Al final logré cambiar el directorio donde se clonarán futuros repositorios asi que no fue una perdida de tiempo.

En cuanto a música no hubo mucho cambio asi que ahi va otra [recomendacion](https://youtu.be/V4-MZtpcsTU). Sobres.


![ese es yhandi!!!](https://i.redd.it/oaxqhemdw4n11.gif "ese es yhandi!!!")

* * *
### Agregar variable de entorno (windows)
1. Primero hay que conocer la direccion del directorio que necesitemos agregar. En mi caso `C:\users\mauri\sc\`
2. Despues abrir el `cmd` como administrador e irnos al directorio raiz `C:\`
3. Escribimos el comando `C:\ SETX PATH "C:\la\direccion\deseada\;%PATH%"` y obtendremos algo como ![https://ibb.co/7gLX5WB](https://i.ibb.co/LQH8WtB/sc1.png)
4. Finalmente cerramos la instancia actual de `cmd` y abrimos una nueva ejecutando el nuevo comando.

*Nota: si quieres verificar que se agrego puedes acceder desde el panel de control.*
*Nota 2: Esto es solo para el usuario actual y no global.*
