const input1 = document.querySelector("#date1"),
  input2 = document.querySelector("#date2"),
  url = "js/paises.json",
  containerpas = document.querySelector("#container-pas"),
  pasajeros = document.querySelector("#pasajeros"),
  containerprin = document.querySelector("#containerprin"),
  idabtn = document.querySelector("#ida"),
  destbtn = document.querySelector("#dest"),
  separador = document.querySelector(".separador"),
  containerpais1 = document.querySelector("#resultado1"),
  containerpais2 = document.querySelector("#resultado2"),
  selectoror = document.querySelector("#selectoror"),
  selectordest = document.querySelector("#selectordest"),
  textoor = document.querySelector("#textoor"),
  textodest = document.querySelector("#textodest"),
  Btns = document.querySelectorAll(".btn"),
  message = document.querySelector("#message");

let adulto = Number(document.querySelector("#adulto").textContent),
  kid = Number(document.querySelector("#kid").textContent),
  bebe = Number(document.querySelector("#bebe").textContent);

let calendario1 = document.querySelector("#calendario1"),
  calendario2 = document.querySelector("#calendario2");

class selector {
  constructor() {
    this.paises = [];
  }

  imprimirPaises(listaPaises, input) {
    this.paises = listaPaises;

    this.paises.forEach((pais) => {
      const { es_name } = pais;
      const view = document.createElement("div");
      view.innerHTML = `${es_name}`;
      view.setAttribute("pais", `${es_name}`);
      input.appendChild(view);
    });
    let listaPaises1 = containerpais1.getElementsByTagName("div"),
      listaPaises2 = containerpais2.getElementsByTagName("div");
    Events.validarPais(listaPaises1, listaPaises2);
  }

  mensajeAlerta(textmessage) {
    message.innerHTML = textmessage;
    message.classList.remove("hidden");

    setTimeout(() => {
      message.classList.add("hidden");
    }, 3000);
  }
}

const selectores = new selector();

class events {
  constructor() {
    this.listaPaises1 = [];
    this.listaPaises2 = [];
    this.valoror = "Origen";
    this.valordest = "Destino";
  }

  AddandRemove(
    event1,
    event2,
    event3,
    event4,
    event5,
    element1,
    element2,
    element3,
    element4,
    element5,
    element6
  ) {
    event1.addEventListener("click", () => {
      element4.classList.add("margen");
      element2.classList.remove("hidden");
      element1.classList.add("hidden");
      element5.classList.add("hidden");
      element6.classList.add("hidden");
    });

    event2.addEventListener("click", () => {
      element3.classList.remove("hidden");
      element4.classList.add("margen");
      element1.classList.add("hidden");
      element5.classList.add("hidden");
      element6.classList.add("hidden");
    });

    event3.addEventListener("click", () => {
      element1.classList.remove("hidden");
      element2.classList.add("hidden");
      element3.classList.add("hidden");
      element4.classList.add("margen");
      element5.classList.add("hidden");
      element6.classList.add("hidden");
    });

    event4.addEventListener("click", () => {
      element5.classList.remove("hidden");
      element4.classList.add("margen");
      element6.classList.add("hidden");
      element2.classList.add("hidden");
      element3.classList.add("hidden");
      if (this.valoror === this.valordest) {
        this.valoror = "Origen";
        return selectores.mensajeAlerta(
          "Usted no puede seleccionar el mismo destino"
        );
      }
      textoor.innerHTML = `${this.valoror}`;
    });

    event5.addEventListener("click", () => {
      element6.classList.remove("hidden");
      element5.classList.add("hidden");
      element4.classList.add("margen");
      element2.classList.add("hidden");
      element3.classList.add("hidden");
      if (this.valoror === this.valordest) {
        this.valordest = "Destino";
        return selectores.mensajeAlerta(
          "Usted no puede seleccionar el mismo destino"
        );
      }
      textodest.innerHTML = `${this.valordest}`;
    });
  }

  OrigenyDestino(ida, dest) {
    ida.addEventListener("change", () => {
      input2.classList.add("hidden");
      separador.classList.add("hidden");
      calendario2.classList.add("hidden");
    });

    dest.addEventListener("change", () => {
      input2.classList.remove("hidden");
      separador.classList.remove("hidden");
    });
  }

  validarPasajeros() {
    for (let i = 0; i < Btns.length; i++) {
      const btn = Btns[i];
      btn.addEventListener("click", (e) => {
        if (
          e.target.classList.contains("adulto") &&
          e.target.textContent == "+"
        ) {
          if (adulto >= 15) {
            return selectores.mensajeAlerta("Ya no quedan más asientos");
          }
          adulto++;
          document.querySelector("#adulto").innerText = adulto;
        } else {
          if (adulto == 0) {
            return;
          }
          if (
            e.target.classList.contains("adulto") &&
            e.target.textContent == "-"
          ) {
            adulto--;
            document.querySelector("#adulto").innerText = adulto;
          }
        }

        if (e.target.classList.contains("kid") && e.target.textContent == "+") {
          if (kid >= 15) {
            return alert("Ya no quedan más asientos");
          }
          kid++;
          document.querySelector("#kid").innerText = kid;
        } else {
          if (
            e.target.classList.contains("kid") &&
            e.target.textContent == "-"
          ) {
            if (kid > 0) {
              kid--;
              document.querySelector("#kid").innerText = kid;
            }
          }
        }

        if (
          e.target.classList.contains("bebes") &&
          e.target.textContent == "+"
        ) {
          if (bebe > 15) {
            return selectores.mensajeAlerta("Ya no quedan más asientos");
          }
          bebe++;
          document.querySelector("#bebe").innerText = bebe;
        } else {
          if (bebe <= 0) {
            return;
          }
          if (
            e.target.classList.contains("bebes") &&
            e.target.textContent == "-"
          ) {
            bebe--;
            document.querySelector("#bebe").innerText = bebe;
          }
        }
      });
    }
  }

  validarPais(containerpais1, containerpais2) {
    this.listaPaises1 = containerpais1;
    this.listaPaises2 = containerpais2;
    for (let i = 0; i < this.listaPaises1.length; i++) {
      const pais = this.listaPaises1[i];
      pais.addEventListener("click", (e) => {
        this.valoror = e.target.getAttribute("pais");
      });
    }
    for (let i = 0; i < this.listaPaises2.length; i++) {
      const pais = this.listaPaises2[i];
      pais.addEventListener("click", (e) => {
        this.valordest = e.target.getAttribute("pais");
      });
    }
  }

  validarInputs(input1, input2) {
    if (input1.value == input2.value) {
      selectores.mensajeAlerta("Usted no puede seleccionar la misma fecha");
    }
    input2.value = "Seleccionar fecha de vuelta";
  }
}

const Events = new events();

Events.AddandRemove(
  input1,
  input2,
  pasajeros,
  selectoror,
  selectordest,
  containerpas,
  calendario1,
  calendario2,
  containerprin,
  containerpais1,
  containerpais2
);
Events.OrigenyDestino(idabtn, destbtn);
Events.validarPasajeros();

fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    selectores.imprimirPaises(data.countries, containerpais1),
      selectores.imprimirPaises(data.countries, containerpais2);
  });
