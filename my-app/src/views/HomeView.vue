<template>
  <div class="biblioteca-container">
    <main>
      <section class="dashboard">
        <div class="cards-container">
          <div class="card">
            <div class="card-icon">
              <img src="../assets/img/open_book.png" alt="livro aberto" class="icon_principal">
            </div>
            <div class="card-info">
              <h3>Livros Cadastrados</h3>
              <p class="numero">1.250</p>
            </div>
          </div>
          
          <div class="card">
            <div class="card-icon">
              <img src="../assets/img/aluno2.png" alt="aluno" class="icon_principal">
            </div>
            <div class="card-info">
              <h3>Alunos cadastrados</h3>
              <p class="numero">520</p>
            </div>

          </div>
          
          <div class="card">
            <div class="card-icon">
              <img src="../assets/img/livros2.png" alt="livros" class="icon_principal">
            </div>
            <div class="card-info">
              <h3>Empréstimos realizados</h3>
              <p class="numero">42</p>
            </div>
          </div>
          
          <!-- <div class="card">
            <div class="card-icon">
              <i class="fas fa-exclamation-triangle"></i>
            </div>
            <div class="card-info">
              <h3>Atrasos</h3>
              <p class="numero">15</p>
              <p>Livros atrasados</p>
            </div>
          </div> -->
        </div>
      </section>

      <section class="acoes-rapidas">
        <h2>O que você gostaria de fazer hoje?</h2>
        <div class="block">
          <div class="title-icon">
            <img src="../assets/img/Aluno.png" alt="icone aluno" class="icon">
          <h2>Gerenciamento de Alunos</h2>
          </div>
          <div class="botoes-container">
            <button class="btn-acao" @click="cadasatrarAluno">
              Cadastrar Aluno
            </button>
            <button class="btn-acao" @click="editarAluno">
              Editar Aluno
            </button>
            <button class="btn-acao" @click="consultarAluno">
              Consultar Aluno
            </button>
          </div>
        </div>
        <div class="block">
          <div class="title-icon">
            <img src="../assets/img/livros.png" alt="icone livros" class="icon">
            <h2>Gerenciamento de Livros</h2>
          </div>
          <div class="botoes-container">
            <button class="btn-acao" @click="cadastarLivro">
              Cadastrar Livro
            </button>
            <button class="btn-acao" @click="editarLivro">
              Editar Livro
            </button>
            <button class="btn-acao" @click="consultarLivro">
              Consultar Livro
            </button>
          </div>
        </div>
        <div class="block">
          <div class="title-icon">
            <img src="../assets/img/monitor.png" alt="icone mointor" class="icon">
            <h2>Gerenciamento de Empréstimos</h2>
          </div>
          <div class="botoes-container">
            <button class="btn-acao" @click="cadastrarEmprestimo">
              Cadastrar Empréstimo
            </button>
            <button class="btn-acao" @click="editarEmprestimo">
              Editar Empréstimo
            </button>
            <button class="btn-acao" @click="consultarEmprestimo">
              Consultar Empréstimo
            </button>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: 'BibliotecaHome',
  data() {
    return {
      // Aqui você pode adicionar os dados dinâmicos que seriam carregados do backend
    }
  },
  methods: {
    // Métodos para interações com a interface
    cadasatrarAluno() {
      this.$router.push('/cadastro-aluno');
    },
    editarAluno() {
      this.$router.push('/editar-alunos');
    },
    consultarAluno() {
      this.$router.push('/consulta-aluno');
    },
    cadastarLivro () {
      this.$router.push('/cadastro-livro');
    },
    editarLivro() {
      this.$router.push('/editar-livro');
    },
    consultarLivro() {
      this.$router.push('/consulta-livro');
    },
    cadastrarEmprestimo() {
      this.$router.push('/cadastro-emprestimo');
    },
    editarEmprestimo() {
      this.$router.push('/editar-emprestimo');
    },
    consultarEmprestimo() {
      this.$router.push('/consulta-emprestimo');
    },
  }
}
</script>

<style scoped>
/* Estilos gerais */
@import '../assets/base.css';
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Roboto', Arial, sans-serif;
}

body {
  background-color: var(--cor-cinza-claro);
  color: var(--cor-texto);
}

.biblioteca-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Header */
.header {
  background-color: var(--cor-azul);
  color: var(--cor-branco);
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo {
  height: 50px;
  margin-right: 15px;
}

.titulo-principal {
  font-size: 1.8rem;
  font-weight: bold;
}

.menu ul {
  display: flex;
  list-style: none;
  gap: 20px;
}

.menu a {
  color: var(--cor-branco);
  text-decoration: none;
  font-weight: 500;
  padding: 5px 10px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.menu a:hover, .menu a.active {
  background-color: rgba(255, 255, 255, 0.2);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.btn-logout {
  background-color: var(--cor-vermelho);
  color: var(--cor-branco);
  border: none;
  padding: 5px 15px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-logout:hover {
  background-color: var(--cor-vermelho-claro);
}

/* Main content */
main {
  flex: 1;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

/* Dashboard */
.dashboard {
  margin-bottom: 30px;
}

h2 {
  color: var(--cor-vermelho);
  margin-bottom: 20px;
  font-size: 1.5rem;
  padding-bottom: 10px;
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}

.card {
  background-color: var(--cor-branco);
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  align-items: center;
  transition: transform 0.3s;
}

.card:hover {
  transform: translateY(-5px);
}

.card-icon {
  font-size: 2.5rem;
  color: var(--cor-azul);
  margin-right: 15px;
}

.card-info h3 {
  margin-bottom: 5px;
  color: var(--black);
}

.numero {
  font-size: 1.8rem;
  font-weight: bold;
  color: var(--cor-texto);
}

/* Ações Rápidas */
.acoes-rapidas {
  margin-bottom: 30px;
}

.block {
  margin-bottom: 30px;
  padding: 5%;
  border: solid 2px var(--cor-cinza);
}

.block h2 {
  color: var(--cor-cinza-escuro);
}

.title-icon {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
}

.icon_principal {
  width: 80px;
}

.icon {
  width: 40px;
  margin-bottom: 15px;
  margin-right: 10px;
}

.botoes-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.btn-acao {
  background-image: linear-gradient(to right, #d4d4d4, #f3f3f3a4);
  color: var(--black);
  border: solid 2px var(--cor-cinza);
  padding: 5%;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  transition: background-image 0.3s;
}

.btn-acao i {
  font-size: 1.5rem;
}

.btn-acao:hover {
  background-image: none;
  background-color: var(--cor-azul-claro);
}

/* Footer */
footer {
  background-color: var(--cor-azul);
  color: var(--cor-branco);
  text-align: center;
  padding: 15px;
  margin-top: auto;
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    padding: 10px;
  }
  
  .logo-container {
    margin-bottom: 10px;
  }
  
  .menu {
    margin: 10px 0;
  }
  
  .menu ul {
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .cards-container {
    grid-template-columns: 1fr;
  }
  
  table {
    display: block;
    overflow-x: auto;
  }
}
</style>
