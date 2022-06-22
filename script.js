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


const reset = () => {
    state.joueurEncours = 1;
    state.c1 = 0; 
    state.c2 = 0; 
    state.c3 = 0; 
    state.c4 = 0; 
    state.c5 = 0; 
    state.c6 = 0; 
    state.c7 = 0; 
    state.c8 = 0; 
    state.c9 = 0;
}

const verifierVictoire = () => {
    if (
        //on vérifie chaque cas de victoire
        (state.c1 === state.c2 && state.c2 === state.c3 && state.c1 > 0) ||
        (state.c1 === state.c4 && state.c4 === state.c7 && state.c1 > 0) ||
        (state.c1 === state.c5 && state.c5 === state.c9 && state.c1 > 0) ||
        (state.c4 === state.c5 && state.c5 === state.c6 && state.c4 > 0) ||
        (state.c7 === state.c8 && state.c8 === state.c9 && state.c7 > 0) ||
        (state.c2 === state.c5 && state.c5 === state.c8 && state.c2 > 0) ||
        (state.c3 === state.c6 && state.c6 === state.c9 && state.c3 > 0) ||
        (state.c3 === state.c5 && state.c5 === state.c7 && state.c3 > 0) 

    ){
        //s'il y a victoire la fonction retourne "true"
        return true
    } else if (
        // en cas de non victoire on vérifie si toutes les cases sont jouées
        state.c1 !== 0 &&
        state.c2 !== 0 &&
        state.c3 !== 0 &&
        state.c4 !== 0 &&
        state.c5 !== 0 &&
        state.c6 !== 0 &&
        state.c7 !== 0 &&
        state.c8 !== 0 &&
        state.c9 !== 0 
    ) {
        //si oui, il s'agit d'un match nul, la fonction retourne "null"
        return null
    } else {
        // si l'on ne se trouve dans aucun des cas précédénts, le dernier mouvement de joueur est sans conséquences
        return false
    }
}

const jouerCase = (e) => {
    //on récupère l'id de la case
    let idCase = e.target.id;
    //on vérifie si la case a déja été jouée
    if (state[idCase] !== 0) return;
    //on initialise l'id de la case avec la valeur de la propriété "joueur en cours"
    //cela permet d'indiquer que la case est jouée
    state[idCase] = state.joueurEncours;
    //on initialise une variable "victoire" qui nous permettra de tester la victoire après chaque mouvement de joueur
    let victoire = verifierVictoire();
    //on vérifie la victoire
    if (victoire === true) {
        alert("Le gagnant est le joueur " + state.joueurEncours)
        if (state.joueurEncours === 1) {
            state.scoreJ1++;
            score1.textContent = state.scoreJ1;
        } else {
            state.scoreJ2++;
            score2.textContent = state.scoreJ2;
        }
        reset();
        cases.forEach((c) => (c.textContent = ""));
    } else if ( victoire === null) {
        alert("Match nul");
        state.matchNuls++;
        scoreNul.textContent = state.matchNuls;
        joueur.textContent = "1";
        reset();
        cases.forEach((c) => (c.textContent = ""));
    } else if (victoire === false) {
        if (state.joueurEncours === 1) {
            e.target.textContent = "X";
            state.joueurEncours = 2;
            joueur.textContent = "2"
        } else {
            e.target.textContent = "O";
            state.joueurEncours = 1;
            joueur.textContent = "1"
        }
    }
}

//on ajoute un écouteur d'évevenement sur chacunes des cases
cases.forEach((el) => {
    el.addEventListener('click', jouerCase);
})