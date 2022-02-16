const toggleBall = document.querySelector('header .toggle-theme .toggleBall');
const body = document.querySelector('body');

function darkMode(){
    let setTheme = body;

    setTheme.classList.toggle('dark');

    let theme;

    if(setTheme.classList.contains('dark')){
        theme = 'dark';
    } else {
        theme = 'light';
    }

    localStorage.setItem('pageTheme', JSON.stringify(theme));
}

let getTheme = JSON.parse(localStorage.getItem('pageTheme'));

if(getTheme == 'dark'){
    body.classList.add('dark')
} else{
    body.classList.remove('dark')
}

toggleBall.addEventListener('click', darkMode);