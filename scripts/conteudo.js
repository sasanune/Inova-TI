        // Seleciona os elementos
        const toggleButton = document.getElementById('toggle-aside');
        const sidebar = document.querySelector('.sidebar');
        const navbar = document.querySelector('.navbar');
        const mainContent = document.querySelector('.main-content');
        const rodapeProjeto = document.querySelector('.rodape_projeto');
        const dropdown = document.querySelector('.dropdown');
        const body = document.body;

        // Adiciona o evento de clique ao botão para abrir/fechar o aside
        toggleButton.addEventListener('click', function () {
            sidebar.classList.toggle('active');
            navbar.classList.toggle('move-right');
            mainContent.classList.toggle('move-right');
            rodapeProjeto.classList.toggle('move-right');

            if (sidebar.classList.contains('active')) {
                body.classList.add('no-scroll');
            } else {
                body.classList.remove('no-scroll');
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
