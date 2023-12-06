let images = [],
  tempImages = [];
var bestOne = null;

let prepareSection = document.querySelector(".prepare");
let pollSection = document.querySelector(".poll");
let resultSection = document.querySelector(".result");
let allSections = document.querySelectorAll(".section");

document.addEventListener("DOMContentLoaded", () => {
  start();
});

function start() {
  showSection(prepareSection);
}

function prepareNewPoll() {
  images = [];
  document.querySelector(".images").innerHTML = "";
  showSection(prepareSection);
}

function showSection(elem) {
  for (const section of allSections) {
    section.style.display = "none";
  }
  elem.style.display = "flex";
}

function addImages() {
  document.querySelector("#images").click();
}

function onImageUpload(elem) {
  for (const item of elem.files) {
    images.push(URL.createObjectURL(item));
  }
  generateImages();
}

function generateImages() {
  if (images.length > 2) {
    document.querySelector(".start").disabled = false;
  }
  document.querySelector(".images").innerHTML = "";
  for (const image of images) {
    let imageElem = document.createElement("div");
    imageElem.classList.add("image");
    imageElem.style.backgroundImage = `url(${image})`;
    document.querySelector(".images").appendChild(imageElem);
  }
}

function startPoll() {
  showSection(pollSection);
  tempImages = [...images];
  generateOptions();
}

function generateOptions() {
  if (tempImages.length == 0) {
    return finishPoll();
  }
  const options = [bestOne || tempImages.shift(), tempImages.shift()];
  document.querySelectorAll(
    ".options .option"
  )[0].style.backgroundImage = `url(${options[0]})`;
  document.querySelectorAll(
    ".options .option"
  )[1].style.backgroundImage = `url(${options[1]})`;
}

function chooseOption(elem) {
  document.querySelector(".confirm").disabled = false;
  document.querySelectorAll(".options .option").forEach((option) => {
    option.classList.remove("active");
  });
  elem.classList.add("active");
  bestOne = elem.style.backgroundImage.slice(4, -1).replace(/"/g, "");
}

function confirmSelection() {
  document.querySelector(".confirm").disabled = true;
  generateOptions();
  document.querySelectorAll(".options .option").forEach((option) => {
    option.classList.remove("active");
  });
}

function finishPoll() {
  showSection(resultSection);
  document.querySelector(".winner").style.backgroundImage = `url(${bestOne})`;
}
