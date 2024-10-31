// Função para abrir o modal
function openModal() {
    document.getElementById('myModal').style.display = 'flex';
}

// Função de exibir modal ao carregar a página Biblioteca
window.onload = function() {
    openModal(); // Se você quiser abrir automaticamente ao carregar, descomente esta linha
};

// Evento de clique na barra de pesquisa
document.getElementById('searchBar').addEventListener('click', openModal);

// Fechar modal ao clicar no "X"
document.getElementsByClassName('close')[0].onclick = function() {
    document.getElementById('myModal').style.display = 'none';
};

// Fechar modal ao clicar fora do modal
window.onclick = function(event) {
    const modal = document.getElementById('myModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

// Função de busca
function searchBooks() {
    const query = document.getElementById('searchInputModal').value;

    // Se a consulta estiver vazia, não faz nada
    if (query.trim() === '') {
        return;
    }

    const apiKey = 'AIzaSyAFm8C9Cc5kViMCUnc0iZBTB5iz9yxlMis'; // Substitua pela sua chave de API
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = ''; // Limpa resultados anteriores

            if (data.items) {
                data.items.forEach(item => {
                    const bookDiv = document.createElement('div');
                    bookDiv.classList.add('book');
                
                    const title = item.volumeInfo.title || 'Sem título';
                    const authors = item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Autor desconhecido';
                    const publishedDate = item.volumeInfo.publishedDate || 'Data não disponível';
                    const previewLink = item.volumeInfo.previewLink ? item.volumeInfo.previewLink : '#';
                    const thumbnail = item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail 
                    ? item.volumeInfo.imageLinks.thumbnail 
                    : './img/placeholder-capa.png';
                
                    bookDiv.innerHTML = `
                        <div class="book-cover">
                            <img src="${thumbnail}" alt="Capa do livro">
                            <div class="book-info">
                                <h3>${title}</h3>
                                <p><strong>Autor(es):</strong> ${authors}</p>
                                <p><strong>Publicado em:</strong> ${publishedDate}</p>
                                <p><a href="${previewLink}" target="_blank">Visualizar Livro</a></p>
                            </div>
                        </div>
                    `;
                    resultsDiv.appendChild(bookDiv);
                });
            } else {
                resultsDiv.innerHTML = '<p>Nenhum livro encontrado.</p>';
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            document.getElementById('results').innerHTML = '<p>Erro ao buscar livros.</p>';
        });

    // Limpa o campo de entrada e fecha a modal
    document.getElementById('searchInputModal').value = '';
    document.getElementById('myModal').style.display = 'none'; // Fecha a modal
}

// Adiciona evento de clique ao botão de pesquisa
document.getElementById('searchButtonModal').addEventListener('click', searchBooks);

// Adiciona evento de tecla ao campo de entrada de pesquisa
document.getElementById('searchInputModal').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        searchBooks(); // Chama a função de pesquisa quando Enter é pressionado
    }
});

// Adiciona o evento para abrir ou fechar a sidebar
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.toggle-button').addEventListener('click', function() {
        const sidebar = document.querySelector('.sidebar');
        const navbar = document.querySelector('.navbar');
        const mainContent = document.querySelector('.main-content');
        const rodape = document.querySelector('.rodape_projeto');
        const searchSection = document.querySelector('.corpo');

        sidebar.classList.toggle('active');

        if (sidebar.classList.contains('active')) {
            navbar.classList.add('move-right');
            mainContent.classList.add('move-right');
            rodape.classList.add('move-right');
            searchSection.classList.add('move-right');
        } else {
            navbar.classList.remove('move-right');
            mainContent.classList.remove('move-right');
            rodape.classList.remove('move-right');
            searchSection.classList.remove('move-right');
        }
    });
});

// Exibe o footer ao chegar ao final da página
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
  