//on récupére les éléments du DOM
let cases = [...document.getElementsByClassName("case")]
let joueur = document.getElementById("joueur")
let score1 = document.getElementById("score1")
let score2 = document.getElementById("score2")
let scoreNul = document.getElementById("scoreNul")

//on initialise un objet avec les infos dont on a besoin
let state = {
    joueurEncours: 1,
    scoreJ1: 0,
    scoreJ2: 0,
    matchNuls: 0,
    c1: 0,
    c2: 0,
    c3: 0,
    c4: 0,
    c5: 0,
    c6: 0,
    c7: 0,
    c8: 0,
    c9: 0
};

const verifierVictoire = () => {
    if(
        (state.c1 === state.c2 && state.c2 === state.c3 && state.c1 > 0) ||
        (state.c1 === state.c4 && state.c4 === state.c7 && state.c1 > 0) ||
        (state.c1 === state.c5 && state.c5 === state.c9 && state.c1 > 0) ||
        (state.c4 === state.c5 && state.c5 === state.c6 && state.c4 > 0) ||
        (state.c7 === state.c8 && state.c8 === state.c9 && state.c7 > 0) ||
        (state.c2 === state.c5 && state.c5 === state.c8 && state.c2 > 0) ||
        (state.c3 === state.c6 && state.c6 === state.c9 && state.c3 > 0) 
        
    )
}

const jouerCase = (e) => {
    //on récupère l'id de la case
    let idCase = e.target.id;
    //on vérifie si la case a déja été jouée
    if (state[idCase] !== 0 ) return;

    state[idCase] = state.joueurEncours;

    let isVictoire = verifierVictoire();
}

//on ajoute un écouteur d'évevenement sur chacunes des cases
cases.forEach((el) => {
    el.addEventListener('click', jouerCase);
})