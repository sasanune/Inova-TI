const cartas = [
    { letra: 'A', imagem: './img/libras1.png' },
    { letra: 'B', imagem: './img/libras2.png' },
    { letra: 'C', imagem: './img/libras3.png' },
    { letra: 'D', imagem: './img/libras4.png' },
    { letra: 'E', imagem: './img/libras5.png' },
    { letra: 'F', imagem: './img/libras6.png' },
    { letra: 'G', imagem: './img/libras7.png' },
    { letra: 'H', imagem: './img/libras8.png' },
    { letra: 'I', imagem: './img/libras9.png' },
    { letra: 'J', imagem: './img/libras10.png' },
    { letra: 'K', imagem: './img/libras11.png' },
    { letra: 'L', imagem: './img/libras12.png' },
    { letra: 'M', imagem: './img/libras13.png' },
    { letra: 'N', imagem: './img/libras14.png' },
    { letra: 'O', imagem: './img/libras15.png' },
    { letra: 'P', imagem: './img/libras16.png' },
    { letra: 'Q', imagem: './img/libras17.png' },
    { letra: 'R', imagem: './img/libras18.png' },
    { letra: 'S', imagem: './img/libras19.png' },
    { letra: 'T', imagem: './img/libras20.png' },
    { letra: 'U', imagem: './img/libras21.png' },
    { letra: 'V', imagem: './img/libras22.png' },
    { letra: 'W', imagem: './img/libras23.png' },
    { letra: 'X', imagem: './img/libras24.png' },
    { letra: 'Y', imagem: './img/libras25.png' },
    { letra: 'Z', imagem: './img/libras26.png' },
    { letra: '0', imagem: './img/0.png' },
    { letra: '1', imagem: './img/1.png' },
    { letra: '2', imagem: './img/2.png' },
    { letra: '3', imagem: './img/3.png' },
    { letra: '4', imagem: './img/4.png' },
    { letra: '5', imagem: './img/5.png' },
    { letra: '6', imagem: './img/6.png' },
    { letra: '7', imagem: './img/7.png' },
    { letra: '8', imagem: './img/8.png' },
    { letra: '9', imagem: './img/9.png' },
];

const cardContainer = document.getElementById('cardContainer');

// Função para embaralhar as cartas
function embaralharCartas(cartas) {
    return cartas.sort(() => Math.random() - 0.5);
}

let cartasEmbaralhadas = embaralharCartas(cartas); // Embaralha as cartas
let indexAtual = 0; // Índice da carta atual

// Função para exibir a carta atual
function exibirCartaAtual() {
    // Limpa o conteúdo do container para mostrar apenas uma carta por vez
    cardContainer.innerHTML = '';

    const cart = cartasEmbaralhadas[indexAtual];
    
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.letra = cart.letra;

    const img = document.createElement('img');
    img.src = cart.imagem;
    img.alt = `Imagem de ${cart.letra} em Libras`;
    card.appendChild(img);

    cardContainer.appendChild(card);
    
    // A carta já está revelada, então o jogador tenta adivinhar
    setTimeout(() => {
        revelarCarta(card); // Chama a função para verificar a resposta
    }, 500); // Pequeno atraso para mostrar a carta antes de perguntar
}

function revelarCarta(card) {
    const respostaUsuario = prompt("Que letra ou número é?").toUpperCase(); // Pergunta ao usuário
    const respostaCorreta = card.dataset.letra; // Resposta correta

    if (respostaUsuario === respostaCorreta) {
        alert("Correto! Avançando para a próxima carta."); // Resposta certa
        indexAtual++; // Vai para a próxima carta

        if (indexAtual < cartasEmbaralhadas.length) {
            exibirCartaAtual(); // Mostra a próxima carta
        } else {
            alert("Parabéns! Você completou o jogo.");
        }
    } else {
        alert(`Incorreto. A resposta correta é ${respostaCorreta}`); // Resposta errada
        exibirCartaAtual(); // Mostra a mesma carta novamente para tentar de novo
    }
}

// Inicia o jogo mostrando a primeira carta
exibirCartaAtual();



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
  