const preguntas = [
    {
        pregunta: "Menciona un color",
        respuestas: [
          { texto: "rojo", puntos: 30 },
          { texto: "azul", puntos: 25 },
          { texto: "amarillo", puntos: 20 },
          { texto: "verde", puntos: 8 },
          { texto: "naranja", puntos: 5 },
          { texto: "morado", puntos: 4 }
        ]
      },
      {
        pregunta: "Menciona una fruta",
        respuestas: [
          { texto: "platano", puntos: 40 },
          { texto: "piña", puntos: 20 },
          { texto: "mango", puntos: 15 },
          { texto: "limon", puntos: 10 },
          { texto: "guayaba", puntos: 5 },
          { texto: "manzana", puntos: 3 }
        ]
      },
      {
        pregunta: "Menciona una bebida alcohólica popular en México",
        respuestas: [
          { texto: "tequila", puntos: 50 },
          { texto: "mezcal", puntos: 25 },
          { texto: "pulque", puntos: 15 },
          { texto: "cerveza", puntos: 10 },
          { texto: "michelada", puntos: 5 },
          { texto: "bacardi", puntos: 4 }
        ]
      },
      {
        pregunta: "Menciona un plato típico mexicano",
        respuestas: [
          { texto: "tacos", puntos: 50 },
          { texto: "tamales", puntos: 30 },
          { texto: "enchiladas", puntos: 25 },
          { texto: "pastes", puntos: 20 },
          { texto: "pozole", puntos: 15 },
          { texto: "sopes", puntos: 10 }
        ]
      },
      {
        pregunta: "Menciona un instrumento musical",
        respuestas: [
          { texto: "guitarra", puntos: 50 },
          { texto: "bateria", puntos: 20 },
          { texto: "bajo", puntos: 15 },
          { texto: "trompeta", puntos: 10 },
          { texto: "tambor", puntos: 8 },
          { texto: "piano", puntos: 5 }
        ]
      },
      {
        pregunta: "Menciona una bebida típica mexicana no alcohólica",
        respuestas: [
          { texto: "horchata", puntos: 50 },
          { texto: "jamaica", puntos: 30 },
          { texto: "atole", puntos: 20 },
          { texto: "tamarindo", puntos: 15 },
          { texto: "nuez", puntos: 10 },
          { texto: "guarapo", puntos: 5 }
        ]
      },
      {
        pregunta: "Menciona una ciudad mexicana famosa por su arquitectura colonial",
        respuestas: [
          { texto: "Querétaro", puntos: 30 },
          { texto: "Pachuca", puntos: 25 },
          { texto: "Guanajuato", puntos: 20 },
          { texto: "Puebla", puntos: 15 },
          { texto: "Oaxaca", puntos: 10 },
          { texto: "Morelia", puntos: 8 }
        ]
      },
      {
        pregunta: "Menciona un platillo mexicano hecho con maíz",
        respuestas: [
          { texto: "tacos", puntos: 50 },
          { texto: "tamales", puntos: 30 },
          { texto: "tortillas", puntos: 25 },
          { texto: "pozole", puntos: 20 },
          { texto: "enchiladas", puntos: 15 },
          { texto: "sopes", puntos: 10 }
        ]
      },
      {
        pregunta: "Menciona peliculas mexicanas",
        respuestas: [
          { texto: "amar te duele", puntos: 40 },
          { texto: "nosotros los nobles", puntos: 30 },
          { texto: "el infierno", puntos: 20 },
          { texto: "cindy la regia", puntos: 15 },
          { texto: "la ley de herodes", puntos: 10 },
          { texto: "amores perros", puntos: 5 }
        ]
      },
      {
        pregunta: "Menciona un género musical originario de México",
        respuestas: [
          { texto: "ranchera", puntos: 50 },
          { texto: "mariachi", puntos: 40 },
          { texto: "banda", puntos: 30 },
          { texto: "norteña", puntos: 20 },
          { texto: "son", puntos: 10 },
          { texto: "corrido", puntos: 8 }
        ]
      }
    ];
  

    const sonidoRonda = document.getElementById("sonidoRonda");
    const sonidoRespuesta = document.getElementById("sonidoRespuesta");
    const sonidoError = document.getElementById("sonidoError");
    
    let indicePregunta = 0;
    let respuestasMostradas = [];
    let erroresA = 0;
    let erroresB = 0;
    let turnoA = true;
    let puntajeA = 0;
    let puntajeB = 0;
    let enRobo = false;
    let equipoEnRobo = "";
    let puntosRonda = 0;
    let equipoGanadorRonda = "A";
    
    const preguntaElemento = document.getElementById("pregunta");
    const tablero = document.getElementById("tablero");
    const respuestaInput = document.getElementById("respuestaInput");
    const puntajeAEl = document.getElementById("puntajeA");
    const puntajeBEl = document.getElementById("puntajeB");
    const erroresAEl = document.getElementById("erroresA");
    const erroresBEl = document.getElementById("erroresB");
    const felicidades = document.getElementById("felicidades");
    
    let tiempoRestante = 30;
    let intervalo;
    
    function iniciarCronometro() {
      clearInterval(intervalo);
      tiempoRestante = 30;
      document.getElementById("tiempo").textContent = tiempoRestante;
    
      intervalo = setInterval(() => {
        tiempoRestante--;
        document.getElementById("tiempo").textContent = tiempoRestante;
    
        if (tiempoRestante <= 0) {
          clearInterval(intervalo);
          sonidoError.play();
        
          if (!enRobo) {
            if (turnoA) {
              erroresA++;
              if (erroresA === 2) mostrarRoboMensaje("B");
              if (erroresA >= 3) {
                activarRobo("B");
              }
            } else {
              erroresB++;
              if (erroresB === 2) mostrarRoboMensaje("A");
              if (erroresB >= 3) {
                activarRobo("A");
              }
            }
            actualizarErrores();
            respuestaInput.value = "";
        
            // 🔁 Reiniciar el cronómetro automáticamente después de marcar X
            iniciarCronometro();
          } else {
            // Robo fallido por tiempo
            if (equipoEnRobo === "A") {
              puntajeB += puntosRonda;
              equipoGanadorRonda = "B";
            } else {
              puntajeA += puntosRonda;
              equipoGanadorRonda = "A";
            }
            puntajeAEl.textContent = puntajeA;
            puntajeBEl.textContent = puntajeB;
            terminarRonda();
          }
        }        
      }, 1000);
    }
    
    function cargarPregunta() {
      const actual = preguntas[indicePregunta];
      preguntaElemento.textContent = actual.pregunta;
      tablero.innerHTML = "";
      felicidades.style.display = "none";
      document.getElementById("roboMensaje").style.display = "none";
      respuestaInput.value = "";
      respuestasMostradas = [];
      erroresA = 0;
      erroresB = 0;
      turnoA = equipoGanadorRonda === "A";
      enRobo = false;
      equipoEnRobo = "";
      puntosRonda = 0;
      actualizarErrores();
    
      actual.respuestas.forEach(() => {
        const div = document.createElement("div");
        div.classList.add("respuesta");
        div.textContent = "?";
        tablero.appendChild(div);
      });
    
      iniciarCronometro();
    }
    
    function verificarRespuesta() {
      const actual = preguntas[indicePregunta];
      const respuesta = respuestaInput.value.trim().toLowerCase();
      if (!respuesta) return;
    
      let encontrado = false;
      actual.respuestas.forEach((r, i) => {
        if (r.texto.toLowerCase() === respuesta && !respuestasMostradas.includes(i)) {
          respuestasMostradas.push(i);
          const cuadros = document.querySelectorAll(".respuesta");
          cuadros[i].classList.add("mostrada");
          cuadros[i].textContent = `${r.texto} - ${r.puntos}`;
          sonidoRespuesta.play();
          puntosRonda += r.puntos;
    
          if (!enRobo) {
            if (turnoA) {
              puntajeA += r.puntos;
              puntajeAEl.textContent = puntajeA;
            } else {
              puntajeB += r.puntos;
              puntajeBEl.textContent = puntajeB;
            }
          } else {
            if ((turnoA && equipoEnRobo === "A") || (!turnoA && equipoEnRobo === "B")) {
              if (equipoEnRobo === "A") {
                puntajeB -= puntosRonda;
                if (puntajeB < 0) puntajeB = 0;
                puntajeA += puntosRonda;
                equipoGanadorRonda = "A";
              } else {
                puntajeA -= puntosRonda;
                if (puntajeA < 0) puntajeA = 0;
                puntajeB += puntosRonda;
                equipoGanadorRonda = "B";
              }
              puntajeAEl.textContent = puntajeA;
              puntajeBEl.textContent = puntajeB;
            }
            terminarRonda();
            return;
          }
    
          encontrado = true;
        }
      });
    
      if (!encontrado) {
        sonidoError.play();
        if (!enRobo) {
          if (turnoA) {
            erroresA++;
            if (erroresA === 2) mostrarRoboMensaje("B");
            if (erroresA >= 3) activarRobo("B");
          } else {
            erroresB++;
            if (erroresB === 2) mostrarRoboMensaje("A");
            if (erroresB >= 3) activarRobo("A");
          }
        } else {
          if (equipoEnRobo === "A") {
            puntajeB += puntosRonda;
            equipoGanadorRonda = "B";
          } else {
            puntajeA += puntosRonda;
            equipoGanadorRonda = "A";
          }
          puntajeAEl.textContent = puntajeA;
          puntajeBEl.textContent = puntajeB;
          terminarRonda();
          return;
        }
      }
    
      actualizarErrores();
      respuestaInput.value = "";
      clearInterval(intervalo);
      iniciarCronometro();
    
      if (respuestasMostradas.length === actual.respuestas.length) {
        felicidades.style.display = "block";
        equipoGanadorRonda = turnoA ? "A" : "B";
        sonidoRonda.play();
      }
    }
    
    function mostrarRoboMensaje(equipo) {
      const msg = document.getElementById("roboMensaje");
      msg.style.display = "block";
      msg.textContent = `¡Equipo ${equipo} se prepara para el robo de puntos!`;
    }
    
    function activarRobo(equipo) {
      enRobo = true;
      equipoEnRobo = equipo;
      turnoA = equipo === "A";
      document.getElementById("roboMensaje").textContent = `¡Equipo ${equipo} tiene la oportunidad de robar los puntos!`;
    }
    
    function terminarRonda() {
      clearInterval(intervalo);
      felicidades.style.display = "block";
      enRobo = false;
      equipoEnRobo = "";
      puntosRonda = 0;
      sonidoRonda.play();
    }
    
    function actualizarErrores() {
      erroresAEl.innerHTML = "";
      erroresBEl.innerHTML = "";
    
      for (let i = 0; i < 3; i++) {
        const boxA = document.createElement("div");
        boxA.classList.add("error-box");
        boxA.textContent = i < erroresA ? "X" : "";
        erroresAEl.appendChild(boxA);
    
        const boxB = document.createElement("div");
        boxB.classList.add("error-box");
        boxB.textContent = i < erroresB ? "X" : "";
        erroresBEl.appendChild(boxB);
      }
    }
    
    function siguientePregunta() {
      indicePregunta = (indicePregunta + 1) % preguntas.length;
      cargarPregunta();
    }
    
    cargarPregunta();