// on récupère les éléments du DOM
let cases = [...document.getElementsByClassName("case")]
let joueur = document.getElementById("joueur")
let score1 = document.getElementById("score1")
let score2 = document.getElementById("score2")
let scoreNul = document.getElementById("scoreNul")
let modal = document.getElementById("modal")
let modalMessage = document.getElementById("modal-message")
let closeModal = document.getElementsByClassName("close")[0]
let modalButton = document.getElementById("modal-button")
let playerForm = document.getElementById("player-form")
let game = document.getElementById("game")
let form = document.getElementById("form")
let player1NameDisplay = document.getElementById("player1-name")
let player2NameDisplay = document.getElementById("player2-name")
let backButton = document.getElementById("back-button")

// on initialise un objet avec les infos dont on a besoin
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
    c9: 0,
    player1: "Joueur 1",
    player2: "Joueur 2"
};

// fonction remise à zéro qu'on appellera à chaque fin de partie
const reset = () => {
    state.joueurEncours = Math.floor(Math.random() * 2) + 1;
    joueur.textContent = state.joueurEncours === 1 ? state.player1 : state.player2;
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

// fonction pour afficher la modal
const showModal = (message) => {
    modalMessage.textContent = message;
    modal.style.display = "block";
}

// fonction pour fermer la modal
const hideModal = () => {
    modal.style.display = "none";
}

// fonction pour vérifier la victoire
const verifierVictoire = () => {
    if (
        // on vérifie chaque cas de victoire
        (state.c1 === state.c2 && state.c2 === state.c3 && state.c1 > 0) ||
        (state.c1 === state.c4 && state.c4 === state.c7 && state.c1 > 0) ||
        (state.c1 === state.c5 && state.c5 === state.c9 && state.c1 > 0) ||
        (state.c4 === state.c5 && state.c5 === state.c6 && state.c4 > 0) ||
        (state.c7 === state.c8 && state.c8 === state.c9 && state.c7 > 0) ||
        (state.c2 === state.c5 && state.c5 === state.c8 && state.c2 > 0) ||
        (state.c3 === state.c6 && state.c6 === state.c9 && state.c3 > 0) ||
        (state.c3 === state.c5 && state.c5 === state.c7 && state.c3 > 0)
    ) {
        // s'il y a victoire, la fonction retourne "true"
        return true
    } else if (
        // en cas de non victoire, on vérifie si toutes les cases sont jouées
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
        // si oui, il s'agit d'un match nul, la fonction retourne "null"
        return null
    } else {
        // si l'on ne se trouve dans aucun des cas précédents, le dernier mouvement de joueur est sans conséquences
        return false
    }
}

// fonction pour jouer une case
const jouerCase = (e) => {
    // on récupère l'id de la case
    let idCase = e.target.id;
    // on vérifie si la case a déjà été jouée
    if (state[idCase] !== 0) return;
    // on initialise l'id de la case avec la valeur de la propriété "joueur en cours"
    // cela permet d'indiquer que la case est jouée
    state[idCase] = state.joueurEncours;
    // on initialise une variable "victoire" qui nous permettra de tester la victoire après chaque mouvement de joueur
    let victoire = verifierVictoire();
    // on vérifie la victoire
    if (victoire === true) {
        showModal("Le gagnant est " + (state.joueurEncours === 1 ? state.player1 : state.player2));
        if (state.joueurEncours === 1) {
            // on incrémente le score du joueur 1
            state.scoreJ1++;
            score1.textContent = state.scoreJ1;
        } else {
            // on incrémente le score du joueur 2
            state.scoreJ2++;
            score2.textContent = state.scoreJ2;
        }
        reset();
        // on vide les cases à l'écran
        cases.forEach((c) => (c.textContent = ""));
    } else if (victoire === null) {
        showModal("Match nul");
        // on incrémente le total de matchs nuls
        state.matchNuls++;
        scoreNul.textContent = state.matchNuls;
        joueur.textContent = state.joueurEncours === 1 ? state.player1 : state.player2;
        reset();
        // on vide les cases à l'écran
        cases.forEach((c) => (c.textContent = ""));
    } else if (victoire === false) {
        if (state.joueurEncours === 1) {
            // on inscrit un X dans la case jouée par le joueur 1
            e.target.textContent = "X";
            // on indique que c'est au joueur 2 de jouer
            state.joueurEncours = 2;
            joueur.textContent = state.player2;
        } else {
            // on inscrit un O dans la case jouée par le joueur 2
            e.target.textContent = "O";
            // on indique que c'est au joueur 1 de jouer
            state.joueurEncours = 1;
            joueur.textContent = state.player1;
        }
    }
}

// on ajoute un écouteur d'événement sur chacune des cases
cases.forEach((el) => {
    el.addEventListener('click', jouerCase);
})

// on ajoute un écouteur d'événement pour fermer la modal
closeModal.onclick = hideModal;
modalButton.onclick = hideModal;

// on ferme la modal en cliquant en dehors de celle-ci
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// fonction pour démarrer le jeu après la soumission du formulaire
form.addEventListener('submit', (e) => {
    e.preventDefault();
    state.player1 = document.getElementById('player1').value;
    state.player2 = document.getElementById('player2').value;
    player1NameDisplay.textContent = state.player1;
    player2NameDisplay.textContent = state.player2;
    joueur.textContent = state.joueurEncours === 1 ? state.player1 : state.player2;
    playerForm.style.display = 'none';
    game.style.display = 'flex';
    reset();
});

// fonction pour revenir au formulaire de soumission des noms
backButton.addEventListener('click', () => {
    playerForm.style.display = 'flex';
    game.style.display = 'none';
    reset();
    // on vide les cases à l'écran
    cases.forEach((c) => (c.textContent = ""));
    // on réinitialise les scores et les affichages
    state.scoreJ1 = 0;
    state.scoreJ2 = 0;
    state.matchNuls = 0;
    score1.textContent = state.scoreJ1;
    score2.textContent = state.scoreJ2;
    scoreNul.textContent = state.matchNuls;
});