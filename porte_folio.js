var compteur = 1;
// Définition des paramètres pour chaque appel de createHexagons
var hexagonsParams = [{ containerId: "hex-container", num: 61, marginTop: "-27.45px", marginLeft: "0px" },{ containerId: "hex-container2", num: 62, marginTop: "-15px", marginLeft: "-16px" },{ containerId: "hex-container3", num: 61, marginTop: "-15px", marginLeft: "0px" },{ containerId: "hex-container4", num: 62, marginTop: "-15px", marginLeft: "-16px" },{ containerId: "hex-container5", num: 61, marginTop: "-15px", marginLeft: "0px" },{ containerId: "hex-container6", num: 62, marginTop: "-16px", marginLeft: "-16px" },{ containerId: "hex-container7", num: 61, marginTop: "-15px", marginLeft: "0px" },{ containerId: "hex-container8", num: 62, marginTop: "-15px", marginLeft: "-16px" },{ containerId: "hex-container9", num: 61, marginTop: "-15px", marginLeft: "0px" },{ containerId: "hex-container10", num: 62, marginTop: "-15px", marginLeft: "-16px" },{ containerId: "hex-container11", num: 61, marginTop: "-16px", marginLeft: "0px" },{ containerId: "hex-container12", num: 62, marginTop: "-15px", marginLeft: "-16px" },{ containerId: "hex-container13", num: 61, marginTop: "-15px", marginLeft: "0px" },{ containerId: "hex-container14", num: 62, marginTop: "-15px", marginLeft: "-16px" },{ containerId: "hex-container15", num: 61, marginTop: "-15px", marginLeft: "0px" },{ containerId: "hex-container16", num: 62, marginTop: "-16px", marginLeft: "-16px" },{ containerId: "hex-container17", num: 61, marginTop: "-15px", marginLeft: "0px" },{ containerId: "hex-container18", num: 62, marginTop: "-15px", marginLeft: "-16px" }];
var hexagons = []; // Tableau pour stocker les hexagones
// Récupérez le bouton 1
var buttons = document.getElementsByClassName("blob-btn");
// Initialisation des états pour le premier et le dernier index
var firstIndexNotAnimated = false;
var lastIndexNotAnimated = false;
var globalStartNonAnimatedCount = 0; var globalEndNonAnimatedCount = 0;// Compteurs globaux pour les hexagones non animés au début et à la fin
var probabiliteAnimation = calculateAnimationProbability(); // Initialise la probabilité
var containerWidth = 100; // Largeur initiale du conteneur en pourcentage de la fenêtre
var baseHexagons = 61; // Nombre d'hexagones par conteneur à une largeur de fenêtre de référence
var maxWidth = 1920; // Définissez ici la largeur maximale pour la probabilité d'animation à 100%
var imagetopreload = ["/porte_folio_delay/image/banniere.jpeg", "/porte_folio_delay/image/banniereLW.jpeg"]
var aPropos = document.getElementById('aPropos');
var aProposText = document.getElementById('aProposText');
var pictureContainer = document.getElementById('picturecontainer');
var contactForm = document.getElementById('contactForm');

/**
 * @returns "Au chargement de la page, remplie le background de chacun de mes hexagones"
 *
 * Créé mes hexagones dans ma div containerId. Ajoute un ID à chaque hexagone créé, du haut vers le bas.
 * @param {*} containerId 
 * @param {*} num 
 * @param {*} marginTop 
 * @param {*} marginLeft 
 */

imagetopreload.forEach(function(imageUrl) {
    var img = new Image();
    img.src = imageUrl;
});

function createHexagons(containerId, num, marginTop, marginLeft) {
    var container = document.getElementById(containerId);
    container.style.marginLeft = marginLeft; // Nouvelle marge gauche
    container.style.whiteSpace = "nowrap"; // Empêcher le passage à la ligne
    for (let i = 0; i < num; i++){
        var hexagon = document.createElement("div");
        hexagon.className = "hexagon";
        hexagon.id = containerId + "-hex-" + compteur; // Utilisation de l'index pour créer un identifiant unique
        container.appendChild(hexagon);
        hexagon.style.marginTop = marginTop;
        compteur++;
    }
}

/**
 * Affiche le numéro de l'ID de mon hexagone SUR l'hexagone
 */
function addIdNumberToHexagons() {
    var hexagones = document.querySelectorAll('.hexagon');
    hexagones.forEach(function(hexagon, index) {
        //var idNumber = index + 1;
        var idElement = document.createElement("span");
        //idElement.textContent = idNumber;
        idElement.className = "hexagon-id";
        hexagon.appendChild(idElement);
    });
}


hexagonsParams.forEach(function(params) {
    createHexagons(params.containerId, params.num, params.marginTop, params.marginLeft);
});


addIdNumberToHexagons();

    
    // Définir les intervalles spécifiés pour chaque conteneur d'hexagones
    var intervals = [
        { prefix: "hex-container-hex-", start: 1, end: 61 },
        { prefix: "hex-container2-hex-", start: 62, end: 123 },
        { prefix: "hex-container3-hex-", start: 124, end: 184 },
        { prefix: "hex-container4-hex-", start: 185, end: 246 },
        { prefix: "hex-container5-hex-", start: 247, end: 307 },
        { prefix: "hex-container6-hex-", start: 308, end: 369 },
        { prefix: "hex-container7-hex-", start: 370, end: 430 },
        { prefix: "hex-container8-hex-", start: 431, end: 492 },
        { prefix: "hex-container9-hex-", start: 493, end: 553 },
        { prefix: "hex-container10-hex-", start: 554, end: 615 },
        { prefix: "hex-container11-hex-", start: 616, end: 676 },
        { prefix: "hex-container12-hex-", start: 677, end: 738 },
        { prefix: "hex-container13-hex-", start: 739, end: 799 },
        { prefix: "hex-container14-hex-", start: 800, end: 861 },
        { prefix: "hex-container15-hex-", start: 862, end: 922 },
        { prefix: "hex-container16-hex-", start: 923, end: 984 },
        { prefix: "hex-container17-hex-", start: 985, end: 1045 },
        { prefix: "hex-container18-hex-", start: 1046, end: 1107 }
    ];


document.addEventListener('DOMContentLoaded', function() {
    var currentWidth = window.innerWidth;
    console.log("La largeur de la fenêtre au chargement est : " + currentWidth + " pixels");
    // Initialisation des ajustements
    adjustAll();
});

function adjustAll() {
    adjustHexagons();
    adjustAnimationProbability();
}

// Calculez le nombre d'hexagones en fonction de la largeur proportionnelle
function adjustHexagons() {
    var currentWidth = window.innerWidth;
    var hexagons = Math.floor(baseHexagons * (currentWidth / maxWidth)); 

    intervals.forEach(interval => {
        interval.end = interval.start + hexagons - 1;
    });
}

function calculateAnimationProbability() {
    var screenWidth = window.innerWidth;
    var threshold = maxWidth * 1; // 100% de maxWidth
    if (screenWidth > threshold) {
        return 0.4; // Probabilité reste à 0.4 si l'écran est plus grand que 60% de maxWidth
    } else {
        // Calculez une diminution linéaire de la probabilité de 0.4 à 0 à mesure que la largeur diminue de threshold à 0
        return 0.4 * (screenWidth / threshold);
    }
}

function adjustAnimationProbability() {
    var newProb = calculateAnimationProbability();
    if (newProb !== probabiliteAnimation) {
        probabiliteAnimation = newProb;
        console.log('Probabilité d\'animation mise à jour :', probabiliteAnimation.toFixed(2));
    }
}

// Ajout d'un écouteur d'événements unique pour redimensionner
window.addEventListener('resize', adjustAll);

function generateHexagonIds(prefix, start, end, startAdjustment, endAdjustment) {
    var hexagonIds = [];
    for (var i = start + startAdjustment; i <= end - endAdjustment; i++) {
        hexagonIds.push(prefix + i);
    }
    return hexagonIds;
}
//cette fonction génère un délai aléatoire ue j'ajoute à chaque fois que j'appel un délai
function randomDelay() {
    return Math.floor(Math.random() * 5) + 1; // Génère un nombre entre 1 et 5
}



function toggleAnimationWithProgressiveDelay(hexIds) {
    var middleIndex = Math.floor(hexIds.length / 2);

    hexIds.forEach(function(hexId, index) {
        var distanceFromMiddle = Math.abs(index - middleIndex);
        var delay = (distanceFromMiddle + 1) * 50; // Calcul du délai basé sur la distance du milieu
        
        // Utilise une durée d'animation constante pour tous les hexagones
        var animationDuration = 1000; // Durée uniforme pour tous

        // Condition pour ne pas animer certains hexagones basée sur une probabilité
        if (index === 0 && Math.random() < probabiliteAnimation) {
            // Marque le premier hexagone comme non animé
            firstIndexNotAnimated = true;
        } else if (index === hexIds.length - 1 && Math.random() < probabiliteAnimation) {
            // Marque le dernier hexagone comme non animé
            lastIndexNotAnimated = true;
        } else {
            // Applique l'animation avec la durée uniforme
            setTimeout(function() {
                toggleAnimation(hexId, animationDuration);
            }, delay);
        }
    });

    // Ajuste les compteurs globaux si nécessaire
    if (firstIndexNotAnimated) globalStartNonAnimatedCount++;
    if (lastIndexNotAnimated) globalEndNonAnimatedCount++;
    var firstIndexNotAnimated = false;
    var lastIndexNotAnimated = false;
}


function animateContainersWithDelay(index, intervals) {
    // Animer les 10 premiers containers simultanément
    if (index < 1) {
        for (let i = index; i < 1; i++) {
            animateContainer(i, intervals);
        }
        // Commencez l'animation du 11e container après un délai
        setTimeout(function() {
            animateContainersWithDelay(1, intervals);
        }); // Utilisez un délai initial avant de commencer les animations suivantes
    } else if (index < intervals.length) {
        animateContainer(index, intervals);
        
        setTimeout(function() {
            animateContainersWithDelay(index + 1, intervals);
        }); // Continue avec le reste des containers
    }
}

function animateContainer(index, intervals) {
    if (index < intervals.length) {
        var interval = intervals[index];
        var hexagonIds = generateHexagonIds(interval.prefix, interval.start, interval.end, globalStartNonAnimatedCount, globalEndNonAnimatedCount);
        
        toggleAnimationWithProgressiveDelay(hexagonIds);
    }
}
    
if (buttons.length >= 3) {
    buttons[0].addEventListener("click", function() {
        // Désactiver le bouton pour empêcher d'autres clics
        this.disabled = true;

        // ici j'ajoute un display : none à mon texte et titre de l'onglet "à propos"
        aPropos.style.display = 'none';
        aProposText.style.display = 'none';
        Acceuil.style.display = 'none';
        AcceuilText.style.display = 'none';
        contactForm.style.display = 'none';
        // Réinitialiser les compteurs globaux
        globalStartNonAnimatedCount = 0;
        globalEndNonAnimatedCount = 0;

        // Démarrer l'animation
        animateContainersWithDelay(0, intervals);

        // Réactiver le bouton après 5 secondes
        setTimeout(() => {
            this.disabled = false;
        }, 5000);
    });

    buttons[1].addEventListener("click", function() {
        this.disabled = true;
        console.log("Animation en cours pour button2. Le bouton sera réactivé dans 5 secondes.");

        // ici j'ajoute un display : flex à mon texte et titre de l'onglet à propos
        aPropos.style.display = 'flex';
        aProposText.style.display = 'flex';
        Acceuil.style.display = 'none';
        AcceuilText.style.display = 'none';
        contactForm.style.display = 'none';
        // Réinitialiser les compteurs globaux si nécessaire
        globalStartNonAnimatedCount = 0;
        globalEndNonAnimatedCount = 0;

        // Démarrer l'animation avec le nouveau tableau d'intervalles
        animateContainersWithDelay(0, intervals);

        setTimeout(() => {
            this.disabled = false;
        }, 5000);
    });

    buttons[2].addEventListener("click", function() {
        this.disabled = true;
        console.log("Animation en cours pour button3. Le bouton sera réactivé dans 5 secondes.");

        // ici j'ajoute un display : none à mon texte et titre de l'onglet "à propos"
        aPropos.style.display = 'none';
        aProposText.style.display = 'none';
        Acceuil.style.display = 'none';
        AcceuilText.style.display = 'none';
        contactForm.style.display = 'flex';
        // Réinitialiser les compteurs globaux si nécessaire
        globalStartNonAnimatedCount = 0;
        globalEndNonAnimatedCount = 0;

        // Démarrer l'animation avec le nouveau tableau d'intervalles
        animateContainersWithDelay(0, intervals);

        setTimeout(() => {
            this.disabled = false;
        }, 5000);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Fonction pour vérifier si le curseur est dans les 100 premiers pixels horizontaux
    function updateCursor(event) {
        var rect = pictureContainer.getBoundingClientRect();
        var relativeX = event.clientX - rect.left;

        // Ajuster le curseur et gérer le clic en fonction de la position X
        if (relativeX <= 130) {
            pictureContainer.style.cursor = 'pointer'; // Curseur en forme de pointeur
            return true; // Retourne vrai si dans la zone cliquable
        } else {
            pictureContainer.style.cursor = 'default'; // Curseur par défaut
            return false; // Retourne faux si hors de la zone
        }
    }

    // Événement de survol pour changer le curseur
    pictureContainer.addEventListener('mousemove', updateCursor);

    // Événement de clic pour la zone spécifique
    pictureContainer.addEventListener('click', function(event) {
        if (updateCursor(event)) { // Réutilise updateCursor pour vérifier la position du clic
        // ici j'ajoute un display : none à mon texte et titre de l'onglet "à propos"
        aPropos.style.display = 'none';
        aProposText.style.display = 'none';
        this.disabled = true;
        console.log("Animation en cours pour button3. Le bouton sera réactivé dans 5 secondes.");

        // ici j'ajoute un display : none à mon texte et titre de l'onglet "à propos"
        aPropos.style.display = 'none';
        aProposText.style.display = 'none';
        Acceuil.style.display = 'flex';
        AcceuilText.style.display = 'flex';
        contactForm.style.display = 'none';
        // Réinitialiser les compteurs globaux si nécessaire
        globalStartNonAnimatedCount = 0;
        globalEndNonAnimatedCount = 0;

        // Démarrer l'animation avec le nouveau tableau d'intervalles
        animateContainersWithDelay(0, intervals);

        setTimeout(() => {
            this.disabled = false;
        }, 5000);
        }
    });
});

    
    function toggleAnimation(elementId, duration = 0) { // Paramètre de durée avec valeur par défaut
        var hexElement = document.getElementById(elementId);
        if (hexElement) {
            hexElement.classList.toggle("activate-animation");
            setTimeout(function() {
                hexElement.classList.remove("activate-animation");
            }, duration); // Utiliser la durée ajustée + délai aléatoire
        }
    }