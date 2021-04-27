
  const figuras = ["albus","hagrid","harry","hermione","malfoy","ron","severus","sirius","albus","hagrid","harry","hermione","malfoy","ron","severus","sirius"];

  function obtenerIndiceFigura(){
    const index = Math.floor(Math.random() * figuras.length);
    return index;
  }

  function asignarFigura(index, cuadro){
    cuadro.src = `img/${figuras[index]}.jpg`;
  }

  function eliminaClaseCuadro(cuadro){
    cuadro.classList.remove("cuadro-vacio")
    cuadro.classList.add("cuadro");
  }

  function eliminarIndiceFigura(index){
    figuras.splice(index,1);
  }

  function empieza(){

    $cuadrosTotales = document.querySelectorAll(".cuadro-vacio");

    $cuadrosTotales.forEach(function(cuadro){
      const $cuadrosVacios = document.querySelectorAll(".cuadro-vacio");
      const index = obtenerIndiceFigura();
      asignarFigura(index, cuadro);
      eliminaClaseCuadro(cuadro);
      eliminarIndiceFigura(index)
    })
  }
  empieza();

  function agregarEvento(){
    const cuadrosOcultos = document.querySelectorAll(".cuadro");
    cuadrosOcultos.forEach(function(elemento){
      if(!elemento.classList.contains("encontrado")){
        elemento.addEventListener("click",mostrarImagen);
      }
    })
  }

  agregarEvento();
  var intentos = 0;
  function mostrarImagen(event){
    event.srcElement.classList.remove('salir');
    event.srcElement.classList.add("visible");
    compararImagenes();
  }

  function compararImagenes(){
    const cuadrosVisibles = document.querySelectorAll(".visible");
    if (cuadrosVisibles.length == 2 ){
      intentos++;
      if (cuadrosVisibles[0].src == cuadrosVisibles[1].src){
        setTimeout(function () {
          cuadrosVisibles[0].classList.remove("visible");
          cuadrosVisibles[0].classList.add("encontrado");
          cuadrosVisibles[1].classList.remove("visible");
          cuadrosVisibles[1].classList.add("encontrado");
          quitarEvento(cuadrosVisibles[0]);
          quitarEvento(cuadrosVisibles[1]);
          terminaJuego();
        },800)
      }else{
        setTimeout(function(){
          ocultarImagen(cuadrosVisibles[0]);
          ocultarImagen(cuadrosVisibles[1]);
        },1000)
        
      }
    }
  }

  function quitarEvento(cuadro){
    cuadro.removeEventListener("click",mostrarImagen);
  }
  function ocultarImagen(cuadro){
    cuadro.classList.remove('visible');
    cuadro.classList.add('salir');
    
    
  }
  function terminaJuego(){
    let encontrados = document.querySelectorAll(".encontrado");
    if(encontrados.length == 16){
      swal("Muy bien", "Terminaste el juego en " + intentos + " intentos", "success");
      //alert("Felicidades, completó el juego en " + intentos + " intentos");
    }
  }