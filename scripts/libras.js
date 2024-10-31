// Espera o DOM estar completamente carregado
document.addEventListener("DOMContentLoaded", function() {
  // Obtém os elementos necessários
  const toggleButton = document.getElementById('toggle-aside');
  const sidebar = document.getElementById('sidebar'); // Usando ID para obter o sidebar
  const navbar = document.querySelector('.navbar');
  const mainContent = document.querySelector('.et-main');
  const body = document.body;
  const rodapeProjeto = document.getElementById('footer');
  const stick1 = document.querySelector('.et-hero-tabs'); // Usando classe para obter stick1
  const stick2 = mainContent; // Isso já é o et-main

  // Adiciona o evento de clique ao botão
  toggleButton.addEventListener('click', function () {
      // Alterna a classe 'active' no sidebar
      sidebar.classList.toggle('active');
      
      // Move a navbar e o main para a direita quando o sidebar estiver ativo
      navbar.classList.toggle('move-right');
      mainContent.classList.toggle('move-right');
      stick1.classList.toggle('move-right'); // Deve funcionar agora
      stick2.classList.toggle('move-right');

      // Verifica se o aside está ativo para bloquear/desbloquear o scroll
      if (sidebar.classList.contains('active')) {
          body.classList.add('no-scroll');
          console.log('Scroll bloqueado');
      } else {
          body.classList.remove('no-scroll');
          console.log('Scroll desbloqueado');
      }
  });
});

class StickyNavigation {

    constructor() {
      this.currentId = null;
      this.currentTab = null;
      this.tabContainerHeight = 70;
      this.tabContainer = $('.et-hero-tabs-container');
      let self = this;
  
      // Evento de clique nas abas
      $('.et-hero-tab').on('click', function(event) {
        self.onTabClick(event, $(this));
      });
  
      // Scroll e resize
      $(window).on('scroll', () => { this.onScroll(); });
      $(window).on('resize', () => { this.onResize(); });
    }
  
    onTabClick(event, element) {
      event.preventDefault();  // Previne comportamento padrão ao clicar
      let scrollTop = $(element.attr('href')).offset().top - this.tabContainerHeight + 1;
      $('html, body').animate({ scrollTop: scrollTop }, 600);
    }
  
    onScroll() {
      this.checkTabContainerPosition();
      this.findCurrentTabSelector();
    }
  
    onResize() {
      if (this.currentId) {
        this.setSliderCss();
      }
    }
  
    checkTabContainerPosition() {
      let offset = $('.et-hero-tabs').offset().top + $('.et-hero-tabs').height() - this.tabContainerHeight;
      if ($(window).scrollTop() > offset) {
        this.tabContainer.addClass('et-hero-tabs-container--top');
      } else {
        this.tabContainer.removeClass('et-hero-tabs-container--top');
      }
    }
  
    findCurrentTabSelector() {
      let newCurrentId;
      let newCurrentTab;
      let self = this;
  
      $('.et-hero-tab').each(function() {
        let id = $(this).attr('href');
        let offsetTop = $(id).offset().top - self.tabContainerHeight;
        let offsetBottom = $(id).offset().top + $(id).height() - self.tabContainerHeight;
  
        if ($(window).scrollTop() > offsetTop && $(window).scrollTop() < offsetBottom) {
          newCurrentId = id;
          newCurrentTab = $(this);
        }
      });
  
      if (this.currentId != newCurrentId || this.currentId === null) {
        this.currentId = newCurrentId;
        this.currentTab = newCurrentTab;
        this.setSliderCss();
      }
    }
  
    setSliderCss() {
      let width = 0;
      let left = 0;
  
      if (this.currentTab) {
        width = this.currentTab.outerWidth();
        left = this.currentTab.offset().left;
      }
  
      $('.et-hero-tab-slider').css({
        'width': width + 'px',
        'left': left + 'px'
      });
    }
  }
  
  // Inicializa a navegação sticky
  new StickyNavigation();

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
  

document.getElementById('jogoMemoria').addEventListener('click', function() {
  window.location.href = 'jogo.html'; // Caminho da página do Jogo da Memória
});

document.getElementById('AlfabetoLibras').addEventListener('click', function() {
  window.location.href = 'jogo2.html'; // Caminho da página do Alfabeto em Libras
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

