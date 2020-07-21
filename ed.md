---
layout: math
---
# Ecuaciones diferenciales
- [s](#d)

## Introducción
Una ecuación diferencial es una ecuación que relaciona una función desconocida con una o más de sus derivadas.
#### Ejemplo 1
$$
\frac{dx}{dt} = x^2 + t^2
$$
Esta involucra la función $x(t)$ y su primera derivada $x'(t)=\frac{dx}{dt}$.
#### Ejemplo 2
$$\frac{d^2y}{dx^2} + 3\frac{dy}{dx} + 7y = 0$$
Esta incluye la función $y(x)$ y sus dos primeras derivadas $y'(x)$ y $y''(x)$.

El estudio de las ED tiene como metas:
- Descubrir la ecuación diferencial que describe una situcion fidica especifica
- Encontrar la solucion de la ecuacion
- Interpretarla

## Clasificación
1. Tipo
	- Ecuacion ordinaria: solo aparece en derivadas ordinarias. (1 variable independiente)
	- Ecuacion diferencial parcial: las derivadas son parciales. (más de una variable independiente)
2. Orden
El orden de una ED es el orden de la derivada más alta que aparece en ella.
3. Lineales y no lineales
Se dice que la ED ordindaria
$$F(x,y,y',y'',...,y^n)=D $$
es lineal si $F$ es una función de las variables $y,y',y'',...,y^n$.
Por lo tanto, la ecuación diferencial ordinaria lineal general de orden $n$ es
$$a_0(x)y^n + a_1(x)y^{n-1} + ... + a_n(x)y = g(x)$$

#### Notaciones de EDO 1° Orden 
> $M(x,y)dx + N(x,y)dy = 0 \Rightarrow f(x,y) = C$
> $\frac{dy}{dx} \Rightarrow y = f(x) + c$

## Solucion de ED lineales
- Variables separables
	- Solucion por integración
	Cunado $f$ es independiente de la variable y la ecuacion diferencial
	$$ \frac{dy}{dx} = g(x) $$
	$$ \begin{equation}E=m\end{equation} $$
