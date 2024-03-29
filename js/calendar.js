const daysTag = document.querySelector("#days"),
  daysTag2 = document.querySelector("#days2"),
  currentDate = document.querySelector("#current-date"),
  currentDate2 = document.querySelector("#current-date2"),
  prevNextIcon1 = document.querySelector("#icons1"),
  icons1 = prevNextIcon1.getElementsByTagName("span"),
  prevNextIcon2 = document.querySelector("#icons2"),
  icons2 = prevNextIcon2.getElementsByTagName("span");
calendar1 = document.querySelector("#calendar1");
calendar2 = document.querySelector("#calendar2");

let dateselect = "",
  monthselect = "",
  yearselect = "";

const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

let date = new Date(),
  currYear1 = date.getFullYear(),
  currYear2 = date.getFullYear(),
  currMonth1 = date.getMonth(),
  currMonth2 = date.getMonth();

class renderCalendar {
  constructor() {
    this.listLi = "";
    this.year = "";
    this.month = "";
  }

  createCalendar(daystag, currentdate, currMonth, currYear) {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
      lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
      lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
      lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) {
      liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }
    for (let i = 1; i <= lastDateofMonth; i++) {
      let isToday =
        i === date.getDate() &&
        currMonth === new Date().getMonth() &&
        currYear === new Date().getFullYear()
          ? "active"
          : "";
      liTag += `<li data-click="click" class="${isToday}">${i}</li>`;
    }
    for (let i = lastDayofMonth; i < 6; i++) {
      liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
    }
    currentdate.innerText = `${months[currMonth]} ${currYear}`;

    daystag.innerHTML = liTag;
  }

  validarCalendar(daystag, currMonth, currYear) {
    this.listLi = daystag.getElementsByTagName("li");

    for (let i = 0; i < this.listLi.length; i++) {
      const days = this.listLi[i];
      if (
        days.textContent < new Date().getDate() &&
        currMonth === new Date().getMonth() &&
        currYear === new Date().getFullYear()
      ) {
        days.classList.add("inactive");
      }

      if (
        currMonth < new Date().getMonth() &&
        currYear <= new Date().getFullYear()
      ) {
        days.classList.add("inactive");
      }

      if (currYear < new Date().getFullYear()) {
        days.classList.add("inactive");
      }
    }
  }

  selectDate(calendar, daystag, currMonth, currYear, input) {
    calendar.addEventListener("click", (e) => {
      dateselect = "";
      monthselect = "";
      yearselect = "";

      this.listLi = daystag.getElementsByTagName("li");

      for (let i = 0; i < this.listLi.length; i++) {
        const days = this.listLi[i];
        if (days.classList.contains("active")) {
          days.classList.remove("active");
        }

        if (e.target.classList.contains("inactive") === false) {
          e.target.classList.add("active");
        }
      }

      if (e.target.classList.contains("inactive") === false) {
        if (e.target.closest("li") === null) {
          return;
        }
        if (isNaN(Number(e.target.closest("li").textContent))) {
          return;
        }
        if (this.month === "") {
          monthselect = currMonth.toString();
        } else {
          monthselect = this.month;
        }
        if (this.year === "") {
          yearselect = currYear.toString();
        } else {
          yearselect = this.year;
        }

        dateselect = e.target.closest("li").textContent;

        if (
          Number(dateselect) === new Date().getDate() &&
          Number(monthselect) === new Date().getMonth() &&
          Number(yearselect) === new Date().getFullYear()
        ) {
          return selectores.mensajeAlerta(
            "Usted no puede ingresar la fecha de hoy"
          );
        }

        if (monthselect < 10) {
          input.value = `${dateselect}/0${
            Number(monthselect) + 1
          }/${yearselect}`;
          return Events.validarInputs(input1, input2);
        }
        Events.validarInputs(input1, input2);
        input.value = `${dateselect}/${Number(monthselect) + 1}/${yearselect}`;
      }
    });
  }

  prevNextCalendar(prevNextIcon, daystag, currentdate, currMonth, currYear) {
    for (let i = 0; i < prevNextIcon.length; i++) {
      const icon = prevNextIcon[i];
      icon.addEventListener("click", () => {
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if (currMonth < 0 || currMonth > 11) {
          date = new Date(currYear, currMonth, new Date().getDate());
          currYear = date.getFullYear();
          currMonth = date.getMonth();
        } else {
          date = new Date();
        }
        this.createCalendar(daystag, currentdate, currMonth, currYear);
        this.validarCalendar(daystag, currMonth, currYear);
        this.year = currYear;
        this.month = currMonth;
      });
    }
  }
}

const calendario = new renderCalendar();

calendario.createCalendar(daysTag, currentDate, currMonth1, currYear1);
calendario.validarCalendar(daysTag, currMonth1, currYear1);
calendario.prevNextCalendar(
  icons1,
  daysTag,
  currentDate,
  currMonth1,
  currYear1
);
calendario.selectDate(calendar1, daysTag, currMonth1, currYear1, input1);

calendario.createCalendar(daysTag2, currentDate2, currMonth1, currYear2);
calendario.validarCalendar(daysTag2, currMonth2, currYear2);
calendario.prevNextCalendar(
  icons2,
  daysTag2,
  currentDate2,
  currMonth2,
  currYear2
);
calendario.selectDate(calendar2, daysTag2, currMonth2, currYear2, input2);
