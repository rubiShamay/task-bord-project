// clock
function startTime() {
  const today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById("txt").innerHTML = h + ":" + m + ":" + s;
  setTimeout(startTime, 1000);
}
function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  } // add zero in front of numbers < 10
  return i;
}
//weather
!(function (d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (!d.getElementById(id)) {
    js = d.createElement(s);
    js.id = id;
    js.src = "https://weatherwidget.io/js/widget.min.js";
    fjs.parentNode.insertBefore(js, fjs);
  }
})(document, "script", "weatherwidget-io-js");

// background
function changeToLake() {
  document.getElementById("main").style.backgroundImage = "url(assets/images/lake.jpg)";
}
function changeToWolf() {
  document.getElementById("main").style.backgroundImage = "url(assets/images/wolf.jpg)";
}
function changeToGrass() {
  document.getElementById("main").style.backgroundImage = "url(assets/images/grass.jpg)";
}
function changeToSky() {
  document.getElementById("main").style.backgroundImage = "url(assets/images/sky.jpg)";
}
function changeToMountains() {
  document.getElementById("main").style.backgroundImage = "url(assets/images/mountains.jpg)";
}
function changeToOcean() {
  document.getElementById("main").style.backgroundImage = "url(assets/images/ocean.jpg)";
}
// notes
let arr = []

const KEY = "rubiNotes" 

loadFromLocalStorage()
function addNote() {
  event.preventDefault();
  const textBox = document.getElementById("textBox")
  const inputTime = document.getElementById("inputTime")
  const inputDate = document.getElementById("inputDate")
  const noteForm = document.getElementById("noteForm")
  const note = {
    text: textBox.value,
    time: inputTime.value,
    date: inputDate.value
  };
  arr.push(note);
  // save note
  saveToLocalStorage();
  // show note
  showNotes();

  noteForm.reset();

  textBox.focus();
}
function saveToLocalStorage() {
  const str = JSON.stringify(arr)
  localStorage.setItem(KEY, str)
}

function loadFromLocalStorage() {
  const getNotes = localStorage.getItem(KEY)
  if (getNotes !== "" && getNotes ) {
    arr = JSON.parse(getNotes);
    showNotes()
  }
}

function showNotes() {
  const divContainer = document.getElementById("divContainer")
  if (arr.length > 12) {
    alert("too much notes")
  }
  else {
    let html = "";
    for (let i =0 ; i < arr.length;i++) {
      html += `<div class="note">`
      html += `<button id=${i} onclick="deleteNote(this)" class="btnDelete"><i class="bi bi-file-excel-fill"></i></button>`
      html += "<div>"
      html += `
      <span class="noteTextBox">${arr[i].text}</span>
      <div>
      <span>${arr[i].date}</span>
      <br>
      <span>${arr[i].time}</span>
      </div>
      `
      html += "</div>"
      html += "</div>"

    }
    divContainer.innerHTML = html
  }
}
function deleteNote(element){
  const index = element.id;
  arr.splice(index,1)
  saveToLocalStorage() 
  loadFromLocalStorage()
  showNotes() 
}

function deleteArr(){
  arr = []
  localStorage.clear(KEY)
  loadFromLocalStorage()
  showNotes() 
}
