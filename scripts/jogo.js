const cardPairs = [
    { id: 'ovo', image: './img/ovo.jpeg' },
    { id: 'ovo', image: './img/ovorespo.jpeg' },
    { id: 'macarrao', image: './img/macarrao.jpeg' },
    { id: 'macarrao', image: './img/macarraorespo.jpeg' },
    { id: 'manteiga', image: './img/manteiga.jpeg' },
    { id: 'manteiga', image: './img/manteigarespo.jpeg' },
    { id: 'pao', image: './img/pao.jpeg' },
    { id: 'pao', image: './img/paorespo.jpeg' },
    { id: 'chocolate', image: './img/chocolate.jpeg' },
    { id: 'chocolate', image: './img/chocolaterespo.jpeg' },
    { id: 'carne', image: './img/carne.jpeg' },
    { id: 'carne', image: './img/carnerespo.jpeg' },
    { id: 'feijao', image: './img/feijao.jpeg' },
    { id: 'feijao', image: './img/feijaorespo.jpeg' },
];

// Criar as cartas do jogo a partir dos pares
let gameCards = cardPairs.flatMap(pair => [pair.image, pair.image]);
let firstCard, secondCard;
let lockBoard = false;
let matchedCards = 0;

// Embaralhar as cartas
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Criar o tabuleiro
function createBoard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = ''; // Limpar o tabuleiro ao reiniciar o jogo
    shuffle(gameCards).forEach(image => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.image = image;

        const img = document.createElement('img');
        img.src = image;
        img.alt = 'Imagem da Carta'; // Adicionando alt para acessibilidade
        card.appendChild(img);

        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);

        // Verificar se a imagem foi carregada
        img.onload = () => console.log(`${image} carregada com sucesso.`);
        img.onerror = () => console.error(`Erro ao carregar a imagem: ${image}`);
    });
}

// Virar a carta
function flipCard() {
    if (lockBoard || this.classList.contains('flipped')) return;
    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    checkForMatch();
}

// Checar se as cartas combinam
function checkForMatch() {
    const firstCardId = cardPairs.find(pair => pair.image === firstCard.dataset.image).id;
    const secondCardId = cardPairs.find(pair => pair.image === secondCard.dataset.image).id;

    // Verifica se as IDs correspondem, mas não as mesmas imagens
    if (firstCardId === secondCardId && firstCard.dataset.image !== secondCard.dataset.image) {
        matchedCards += 2;
        resetBoard();
        if (matchedCards === gameCards.length) {
            alert('Você ganhou!');
        }
    } else {
        // Se não forem correspondentes, desvira as cartas após um tempo
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetBoard();
        }, 1000);
    }
}

// Resetar o tabuleiro
function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

// Reiniciar o jogo
document.getElementById('reset-button').addEventListener('click', () => {
    matchedCards = 0;
    gameCards = cardPairs.flatMap(pair => [pair.image, pair.image]); // Recria a lista de cartas
    createBoard();
});

// Iniciar o jogo
createBoard();


// Seleciona os elementos
const toggleButton = document.getElementById('toggle-aside');
const sidebar = document.querySelector('.sidebar');
const navbar = document.querySelector('.navbar');
const mainContent = document.querySelector('.main-content');
const rodapeProjeto = document.querySelector('.rodape_projeto');
const body = document.body;  // Captura o body do documento

// Adiciona o evento de clique ao botão
toggleButton.addEventListener('click', function () {
    // Alterna a classe 'active' no sidebar
    sidebar.classList.toggle('active');
    
    // Move a navbar e o main para a direita quando o sidebar estiver ativo
    navbar.classList.toggle('move-right');
    mainContent.classList.toggle('move-right');
    rodapeProjeto.classList.toggle('move-right');

    // Verifica se o aside está ativo para bloquear/desbloquear o scroll
    if (sidebar.classList.contains('active')) {
        // Adiciona a classe no-scroll quando o sidebar está aberto
        body.classList.add('no-scroll');
        console.log('Scroll bloqueado'); // Verifica se o scroll foi bloqueado
    } else {
        // Remove a classe no-scroll quando o sidebar está fechado
        body.classList.remove('no-scroll');
        console.log('Scroll desbloqueado'); // Verifica se o scroll foi desbloqueado
    }
});


  window.addEventListener('scroll', function() {
    var footer = document.getElementById('footer');
    var scrollPosition = window.scrollY + window.innerHeight;
    var pageHeight = document.documentElement.scrollHeight;

    // Checa se o usuário está no final da página (ou muito próximo)
    if (scrollPosition >= pageHeight - 10) {
        footer.style.display = 'block'; // Exibe o footer
    } else {
        footer.style.display = 'none'; // Oculta o footer quando não estiver no final
    }
});

  // Certifique-se de importar o Firebase antes de qualquer serviço
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
  import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
  import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";
  
  // Configuração do Firebase
  const firebaseConfig = {
      apiKey: "AIzaSyDrCRFEp578oqcJm7uzruWe-cbU_ZpZLHo",
      authDomain: "projetofinal-devfront.firebaseapp.com",
      projectId: "projetofinal-devfront",
      storageBucket: "projetofinal-devfront.appspot.com",
      messagingSenderId: "153065613348",
      appId: "1:153065613348:web:95860e84f52477ef6450b1",
      measurementId: "G-079F55DKF5"
  };
  
  // Inicializa o Firebase apenas uma vez
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);
  
  onAuthStateChanged(auth, async (user) => {
      if (user) {
          console.log("Usuário autenticado com UID: ", user.uid);
          try {
              const userDocRef = doc(db, "usuarios", user.uid);
              const userDoc = await getDoc(userDocRef);
              
              console.log("Buscando documento do usuário com UID:", user.uid); // Log para depuração
              
              if (userDoc.exists()) {
                  const userData = userDoc.data();
                  document.getElementById("user-name").textContent = userData.nome;
              } else {
                  console.log("Documento do usuário não encontrado.");
              }
          } catch (error) {
              console.log("Erro ao buscar o documento: ", error);
          }
      } else {
          console.log("Usuário não autenticado.");
          window.location.href = "login.html"; 
      }
  });

  const toggleDarkModeBtn = document.getElementById('toggle-dark-mode');
  const logo = document.getElementById('logo');
  
  // Função para aplicar o modo noturno
  function applyDarkMode(isDark) {
      document.body.classList.toggle('dark-mode', isDark);
      if (isDark) {
          logo.src = "./img/logo-dark.png"; // Logo para o modo escuro
      } else {
          logo.src = "./img/logo-claro.png"; // Logo para o modo claro
      }
  }
  
  // Verifica se o modo noturno está ativado no localStorage
  const isDarkMode = localStorage.getItem('dark-mode') === 'true';
  applyDarkMode(isDarkMode);
  
  // Altera o modo ao clicar no botão
  toggleDarkModeBtn.addEventListener('click', function() {
      const isCurrentlyDark = document.body.classList.toggle('dark-mode');
      // Alterar ícone entre lua e sol
      const icon = toggleDarkModeBtn.querySelector('i');
      if (isCurrentlyDark) {
          icon.classList.remove('ri-moon-line');
          icon.classList.add('ri-sun-line');
      } else {
          icon.classList.remove('ri-sun-line');
          icon.classList.add('ri-moon-line');
      }
  
      // Salva a preferência no localStorage
      localStorage.setItem('dark-mode', isCurrentlyDark);
  
      // Atualiza a logo
      logo.src = isCurrentlyDark ? "./img/logo-dark.png" : "./img/logo-claro.png";
  });
  