/**alert pagina em desenvolviemento */

alert("Página em desenvolvimento! \n\nAinda estou trabalhando nela, mas você pode acompanhar o progresso. \n\nObrigado!");

/**
 * element toggle function
*/

const elemToggleFunc = function (elem) { 
    elem.classList.toggle("active"); 
}

/**
 * header sticky & go to top
 */

const header = document.querySelector("[data-header]");
const goToTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {

    if (window.scrollY >= 10) {
        header.classList.add("active");
        goToTopBtn.classList.add("active");
    } 
    
    else {
        header.classList.remove("active");
        goToTopBtn.classList.remove("active");
    }

});


/**
 * navbar toggle
 */

const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const navbar = document.querySelector("[data-navbar]");

navToggleBtn.addEventListener("click", function () {

    elemToggleFunc(navToggleBtn);
    elemToggleFunc(navbar);
    elemToggleFunc(document.body);

});


const navbarItem = document.querySelectorAll("[data-navbar-item]");

for (let i = 0; i < navbarItem.length; i++) {
    
    navbarItem[i].addEventListener("click", function () {

        if (navToggleBtn.classList.contains("active")) {
            elemToggleFunc(navToggleBtn);
            elemToggleFunc(navbar);
            elemToggleFunc(document.body);
        }

    });
}

/**
 * dark & light theme toggle
 */

const themeToggleBtn = document.querySelector("[data-theme-btn]");

themeToggleBtn.addEventListener("click", function () {

    elemToggleFunc(themeToggleBtn);

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

const skillsToggleBtns = document.querySelectorAll("[data-toggle-btns]");
const skillsToggleBox = document.querySelector("[data-toggle-box]");
const skillsBox = document.querySelector("[data-skills-box]");

skillsToggleBox.addEventListener("click", function () {

    for (let i = 0; i < skillsToggleBtns.length; i++) { elemToggleFunc(skillsToggleBtns[i]); }

    elemToggleFunc(skillsToggleBox);
    elemToggleFunc(skillsBox);

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
 * copyright current year
 */

data = new Date();
document.querySelector("[data-copyright]").innerHTML = "&copy;" + " Enzo Porfirio. " + data.getFullYear() + " - Todos os direitos reservados.";

/**
    * alert
*/

alert("Página em desenvolvimento! \n\nAinda estou trabalhando nela, mas você pode acompanhar o progresso. \n\nObrigado!");
