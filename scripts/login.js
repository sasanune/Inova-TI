
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
    import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";
    import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

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

    // Inicializa o Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const auth = getAuth(app);

    // Referências dos elementos
    const signInForm = document.getElementById("sign-in-form");
    const signUpForm = document.getElementById("sign-up-form");
    const signUpBtn = document.getElementById("sign-up-btn");
    const signInBtn = document.getElementById("sign-in-btn");
    const toggleButton = document.getElementById("toggle-dark-mode");
    const userNameElement = document.getElementById('user-name'); // Referência ao elemento

    // Alternar entre login e cadastro
    signUpBtn.addEventListener('click', () => {
        document.querySelector(".container").classList.add("sign-up-mode");
    });

    signInBtn.addEventListener('click', () => {
        document.querySelector(".container").classList.remove("sign-up-mode");
    });

    // Alternar entre modo claro e modo escuro
    toggleButton.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        toggleButton.textContent = document.body.classList.contains("dark-mode") ? "Modo Claro" : "Modo Noturno";
    });

    // Função de login
    signInForm.addEventListener("submit", handleLogin);
    function handleLogin(event) {
        event.preventDefault();
        const email = document.getElementById('login-email').value;
        const senha = document.getElementById('login-senha').value;

        if (!email || !senha) {
            alert("Por favor, insira email e senha válidos.");
            return;
        }

        signInWithEmailAndPassword(auth, email, senha)
            .then(() => {
                alert('Login realizado com sucesso!');
                window.location.href = "main.html";
            })
            .catch((error) => {
                alert('Erro no login: ' + error.message);
            });
    }

    // Função de cadastro
    signUpForm.addEventListener("submit", handleSignup);
    function handleSignup(event) {
        event.preventDefault();
        const nome = document.getElementById('signup-nome').value;
        const email = document.getElementById('signup-email').value;
        const senha = document.getElementById('signup-senha').value;

        if (!nome || !email || !senha) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        createUserWithEmailAndPassword(auth, email, senha)
            .then(async (userCredential) => {
                const user = userCredential.user;
                const matricula = generateRandomNumber(100000, 999999); // Gera número de matrícula aleatório

                try {
                    // Salva o documento do usuário no Firestore usando o UID como ID do documento
                    await setDoc(doc(db, "usuarios", user.uid), {
                        uid: user.uid,
                        email: user.email,
                        nome: nome,
                        matricula: matricula,
                        createdAt: new Date()
                    });
                    alert('Cadastro realizado com sucesso!');
                    window.location.href = "main.html";
                } catch (error) {
                    alert('Erro ao salvar dados: ' + error.message);
                }
            })
            .catch((error) => {
                alert('Erro no cadastro: ' + error.message);
            });
    }

    // Função para gerar um número aleatório
    function generateRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Verifica se o usuário está autenticado ao carregar a página
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            console.log("Usuário autenticado com UID:", user.uid);
            
            // Buscar o documento do usuário
            const userDocRef = doc(db, "usuarios", user.uid);
            try {
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    // Verifique se o elemento existe antes de definir o textContent
                    if (userNameElement) {
                        userNameElement.textContent = userData.nome;
                    } else {
                        console.error("Elemento 'user-name' não encontrado.");
                    }
                } else {
                    console.log("Documento do usuário não encontrado.");
                    if (userNameElement) {
                        userNameElement.textContent = "NOME DO ALUNO"; // Reseta o nome caso não encontrado
                    }
                }
            } catch (error) {
                console.error("Erro ao buscar documento do usuário:", error);
            }
        } else {
            console.log("Usuário não autenticado");
        }
    });

    
