console.log('script.js loaded');

import { generateScale, toneToWord } from './functions.js';

const skillsBox = document.querySelector("[data-skills-box]");
const skillCards = document.querySelectorAll(".skill-card");
const boxBtns = document.querySelectorAll('[id^="box-button"]');
const boxContent = document.querySelectorAll('[id^="box-content"]');
const resetBtn = document.querySelector("[data-reset-btn]");
const sectionTitle = document.getElementById("section-title");
const sectionText = document.getElementById("section-text");


// skillsBox.style.display = 'none';
// resetBtn.style.display = 'none';

/**
 * functions
 */

function showSectionContent(tone) {
    let word = toneToWord(tone);
    sectionTitle.textContent = `Escala de ${word} (${tone})`;
    sectionText.textContent = `A escala de ${word} é formada pelas seguintes notas:`
}

function showScale(scale) {
    boxContent.forEach(function(box, index) {
        if (scale[index]) {
            box.textContent = scale[index];
        }
    });
}

function handleClickOnce(event) {
    const tone = event.target.querySelector('.h3').textContent.trim();
    const scale = generateScale(tone);

    boxBtns.forEach(function(botao) {
        botao.removeEventListener('click', handleClickOnce);
    });

    skillsBox.classList.toggle("active");
    skillCards.forEach(function(card) {
        card.classList.toggle("active");
    });
    sectionTitle.classList.toggle("active");
    sectionText.classList.toggle("active");
    resetBtn.classList.toggle("active");
    modeToggleBox.style.display = 'none';

    showSectionContent(tone);
    showScale(scale);
}

/**
 * event listeners
 */

boxBtns.forEach(function(botao) {
    botao.addEventListener('click', handleClickOnce);
});

boxContent.forEach(function(botao) {
    botao.addEventListener('click', function() {
        botao.parentElement.parentElement.click();
    });
});

resetBtn.addEventListener('click', function() {
    window.location.reload(true);
});

/**
 * dark & light theme toggle
 */

const themeToggleBtn = document.querySelector("[data-theme-btn]");

themeToggleBtn.addEventListener("click", function () {

    themeToggleBtn.classList.toggle("active");

    if (themeToggleBtn.classList.contains("active")) {
        document.body.classList.remove("light_theme");
        document.body.classList.add("dark_theme");

        localStorage.setItem("theme", "dark_theme");

    } 
    else {
        document.body.classList.remove("dark_theme");
        document.body.classList.add("light_theme");

        localStorage.setItem("theme", "light_theme");

    }

});

/**
 * toggle skills btn
 */


const modeToggleBtns = document.querySelectorAll("[data-toggle-btns]");
const modeToggleBox = document.querySelector("[data-toggle-box]");

modeToggleBox.addEventListener("click", function () {

    for (let i = 0; i < modeToggleBtns.length; i++) { 
        modeToggleBtns[i].classList.toggle("active");
    }

    modeToggleBox.classList.toggle("active");
    skillsBox.classList.toggle("active");

    if (modeToggleBox.classList.contains("active")) {
        boxContent.forEach(function(box, index) {
            box.textContent = box.textContent + 'm';
        });
    } 
    else {
        boxContent.forEach(function(box, index) {
            box.textContent = box.textContent.replace('m', '');
        });
    }

});

/**
 * check & apply last time selected theme from localStorage
 */

if (localStorage.getItem("theme") === "dark_theme") {
    themeToggleBtn.classList.add("active");
    document.body.classList.remove("light_theme");
    document.body.classList.add("dark_theme");
}

/**
 * header sticky & go to top
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {

    if (window.scrollY >= 10) {
        header.classList.add("active");
    } 
    
    else {
        header.classList.remove("active");
    }

});

