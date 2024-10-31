

  
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
  

  // Função para calcular a média e armazenar as informações no Firebase
export async function calcularNotas() {
    console.log("Função calcularNotas foi chamada!");
    // Captura as notas inseridas
    const nota1 = parseFloat(document.getElementById('nota1').value);
    const nota2 = parseFloat(document.getElementById('nota2').value);

    // Lista de disciplinas e suas notas
    const disciplinas = ['Algoritmos', 'Cálculo I', 'Física I', 'Álgebra Linear', 'Estruturas de Dados', 'Sistemas Operacionais'];
    const notas = [nota1, nota2];

    // Limpa a tabela de resultados anteriores
    const resultBody = document.getElementById('resultBody');
    resultBody.innerHTML = '';

    // Função para determinar o status com base na média
    function determinarStatus(media) {
        if (media >= 7) {
            return 'Aprovado';
        } else if (media >= 5) {
            return 'Exame';
        } else {
            return 'Reprovado';
        }
    }

    // Loop para calcular a média e exibir na tabela
    for (let i = 0; i < disciplinas.length; i++) {
        // Calcula a média das duas notas
        const media = (nota1 + nota2) / 2;

        // Cria a linha da tabela com os resultados
        const row = document.createElement('tr');
        const cellDisciplina = document.createElement('td');
        const cellMedia = document.createElement('td');
        const cellStatus = document.createElement('td');

        cellDisciplina.textContent = disciplinas[i];
        cellMedia.textContent = media.toFixed(1);
        cellStatus.textContent = determinarStatus(media);

        row.appendChild(cellDisciplina);
        row.appendChild(cellMedia);
        row.appendChild(cellStatus);

        resultBody.appendChild(row);

        // Salva os resultados no Firebase
        try {
            const user = auth.currentUser;
            if (user) {
                const userDocRef = doc(db, 'usuarios', user.uid, 'resultados', disciplinas[i]);
                await setDoc(userDocRef, {
                    disciplina: disciplinas[i],
                    media: media.toFixed(1),
                    status: determinarStatus(media),
                    timestamp: new Date()
                });
                console.log(`Resultado de ${disciplinas[i]} salvo com sucesso!`);
            } else {
                console.log("Usuário não autenticado.");
            }
        } catch (error) {
            console.error(`Erro ao salvar os resultados de ${disciplinas[i]}: `, error);
        }
    }
}

// Função para zerar as notas e a tabela
function zerarNotas() {
    document.getElementById('gradeForm').reset();
    document.getElementById('resultBody').innerHTML = '';
}

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


  // Seleciona os elementos
  const toggleButton = document.getElementById('toggle-aside');
  const sidebar = document.querySelector('.sidebar');
  const navbar = document.querySelector('.navbar');
  const body = document.body;  // Captura o body do documento
  const parallaxtext = document.querySelector('.sample-header-section')
  const parallax = document.querySelector('.sample-header');
  const missao = document.querySelector('.sample-section-wrap');
  const fotos = document.querySelector('.collage');
  
  // Adiciona o evento de clique ao botão
  toggleButton.addEventListener('click', function () {
      // Alterna a classe 'active' no sidebar
      sidebar.classList.toggle('active');
      
  
      navbar.classList.toggle('move-right');

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