
const boton = document.querySelector(".BotonListaCalculadora");
const listaCalculadora = document.getElementById("listaCalculadora");
const enlaces = document.querySelectorAll(".listaCalculadora a");
const calculadoras = document.querySelectorAll(".calculadora");

//menu de eleccion de calculadora

if (boton && listaCalculadora) {
  boton.addEventListener("click", () => {
    listaCalculadora.classList.toggle("activo");
  });

  document.addEventListener("click", (e) => {
    if (!boton.contains(e.target) && !listaCalculadora.contains(e.target)) {
      listaCalculadora.classList.remove("activo");
    }
  });
}

// Manejo de enlaces del menú de calculadoras

enlaces.forEach((enlace) => {
  enlace.addEventListener("click", (e) => {
    e.preventDefault();

    // Ocultar todas
    calculadoras.forEach((calc) => {
      calc.style.display = "none";
    });

    // Mostrar la seleccionada
    const id = enlace.getAttribute("data-calculadora");
    const mostrar = document.getElementById(`calc-${id}`);
    if (mostrar) {
      mostrar.style.display = "block";
    }

    // (Opcional) cerrar el menú
    document.getElementById("listaCalculadora").classList.remove("activo");
  });
});

// Manejo de calculadora de fuerza

function calcularTorque() {
  const fuerza = parseFloat(document.getElementById("fuerza").value);
  const distancia = parseFloat(document.getElementById("distancia").value);

  const factorDistancia = parseFloat(
    document.getElementById("unidadDistancia").value
  );
  const unidadTextoDistancia =
    document.getElementById("unidadDistancia").options[
      document.getElementById("unidadDistancia").selectedIndex
    ].text;

  const factorTorqueSalida = parseFloat(
    document.getElementById("unidadTorque").value
  );
  const unidadTextoTorqueSalida =
    document.getElementById("unidadTorque").options[
      document.getElementById("unidadTorque").selectedIndex
    ].text;

  const factorFuerza = parseFloat(
    document.getElementById("unidadFuerza").value
  );
  const unidadTextoFuerza =
    document.getElementById("unidadFuerza").options[
      document.getElementById("unidadFuerza").selectedIndex
    ].text;

  if (isNaN(fuerza) || isNaN(distancia)) {
    document.getElementById("resultadoTorque").textContent =
      "Por favor, ingresa valores válidos.";
    return;
  }

  const fuerzaEnN = fuerza * factorFuerza;
  const distanciaEnMetros = distancia * factorDistancia;

  const torqueNm = fuerzaEnN * distanciaEnMetros;
  const torqueConvertido = torqueNm * factorTorqueSalida;

  let precision = torqueConvertido < 0.01 ? 4 : 2;

  document.getElementById(
    "resultadoTorque"
  ).textContent = `Torque: ${torqueConvertido.toFixed(
    precision
  )} ${unidadTextoTorqueSalida} 
     (Fuerza: ${fuerza} ${unidadTextoFuerza}, Distancia: ${distancia} ${unidadTextoDistancia})`;
}

// Ejecutar el cálculo automáticamente cuando cambie cualquier entrada
["fuerza", "distancia"].forEach((id) => {
  document.getElementById(id).addEventListener("input", calcularTorque);
  document.getElementById(id).addEventListener("keypress", function (e) {
    if (e.key === "Enter") calcularTorque();
  });
});

["unidadFuerza", "unidadDistancia", "unidadTorque"].forEach((id) => {
  document.getElementById(id).addEventListener("change", calcularTorque);
});

// Manejo de calculadora de ohm

function mostrarOpcion() {
  const seleccion = document.getElementById("selectorOhm").value;
  const opciones = document.querySelectorAll(".opcionOhm");

  opciones.forEach((opcion) => {
    opcion.style.display = "none";
  });

  if (seleccion) {
    document.getElementById(seleccion).style.display = "block";
  }
}

function calcularVoltaje() {
  const i =
    parseFloat(document.getElementById("i_v").value) *
    parseFloat(document.getElementById("unidad_i_v").value);
  const r =
    parseFloat(document.getElementById("r_v").value) *
    parseFloat(document.getElementById("unidad_r_v").value);
  const conv = parseFloat(document.getElementById("conv_v").value);
  if (!isNaN(i) && !isNaN(r)) {
    const v = (i * r) / conv;
    document.getElementById("resultado_v").innerText = `${v.toFixed(4)}`;
  } else {
    document.getElementById("resultado_v").innerText = "";
  }
  if (!isNaN(i) && !isNaN(r)) {
    const v = (i * r) / conv;
    document.getElementById("resultado_v").innerText = `${v.toFixed(4)}`;

    const p = Math.pow(i, 2) * r;
    document.getElementById("potencia_v").innerText = `P = ${p.toFixed(2)} W`;
  } else {
    document.getElementById("resultado_v").innerText = "";
    document.getElementById("potencia_v").innerText = "";
  }
}

function calcularCorriente() {
  const v =
    parseFloat(document.getElementById("v_i").value) *
    parseFloat(document.getElementById("unidad_v_i").value);
  const r =
    parseFloat(document.getElementById("r_i").value) *
    parseFloat(document.getElementById("unidad_r_i").value);
  const conv = parseFloat(document.getElementById("conv_i").value);
  if (!isNaN(v) && !isNaN(r) && r !== 0) {
    const i = v / r / conv;
    document.getElementById("resultado_i").innerText = `${i.toFixed(6)}`;
  } else {
    document.getElementById("resultado_i").innerText = "";
  }
  if (!isNaN(v) && !isNaN(r) && r !== 0) {
    const i = v / r / conv;
    document.getElementById("resultado_i").innerText = `${i.toFixed(6)}`;

    const p = Math.pow(v, 2) / r;
    document.getElementById("potencia_i").innerText = `P = ${p.toFixed(2)} W`;
  } else {
    document.getElementById("resultado_i").innerText = "";
    document.getElementById("potencia_i").innerText = "";
  }
}

function calcularResistencia() {
  const v =
    parseFloat(document.getElementById("v_r").value) *
    parseFloat(document.getElementById("unidad_v_r").value);
  const i =
    parseFloat(document.getElementById("i_r").value) *
    parseFloat(document.getElementById("unidad_i_r").value);
  const conv = parseFloat(document.getElementById("conv_r").value);
  if (!isNaN(v) && !isNaN(i) && i !== 0) {
    const r = v / i / conv;
    document.getElementById("resultado_r").innerText = `${r.toFixed(2)}`;
  } else {
    document.getElementById("resultado_r").innerText = "";
  }
  if (!isNaN(v) && !isNaN(i) && i !== 0) {
    const r = v / i / conv;
    document.getElementById("resultado_r").innerText = `${r.toFixed(2)}`;

    const p = v * i;
    document.getElementById("potencia_r").innerText = `P = ${p.toFixed(2)} W`;
  } else {
    document.getElementById("resultado_r").innerText = "";
    document.getElementById("potencia_r").innerText = "";
  }
}


/*calculadroa faraday*/


  function convertirFlujo(valor, unidad) {
    switch (unidad) {
      case "Wb":
        return valor;
      case "mWb":
        return valor / 1000;
      case "μWb":
        return valor / 1_000_000;
      default:
        return valor;
    }
  }

  function convertirTiempo(valor, unidad) {
    switch (unidad) {
      case "s":
        return valor;
      case "ms":
        return valor / 1000;
      case "μs":
        return valor / 1_000_000;
      default:
        return valor;
    }
  }

  function calcularFaraday() {
    const vueltas = parseFloat(document.getElementById("vueltas").value);
    const flujo = parseFloat(document.getElementById("flujo").value);
    const tiempo = parseFloat(document.getElementById("tiempo").value);

    const unidadFlujo = document.getElementById("unidadFlujo").value;
    const unidadTiempo = document.getElementById("unidadTiempo").value;

    const flujoConvertido = convertirFlujo(flujo, unidadFlujo);
    const tiempoConvertido = convertirTiempo(tiempo, unidadTiempo);

    const resultadoDiv = document.getElementById("resultado");

    if (isNaN(vueltas) || isNaN(flujo) || isNaN(tiempo) || tiempoConvertido === 0) {
      resultadoDiv.innerHTML = "Por favor, ingresa todos los valores correctamente. El tiempo no puede ser cero.";
      return;
    }

    const fem = -vueltas * (flujoConvertido / tiempoConvertido);

    resultadoDiv.innerHTML = `Fuerza Electromotriz inducida (ε): <strong>${fem.toFixed(4)} V</strong>`;
  }




