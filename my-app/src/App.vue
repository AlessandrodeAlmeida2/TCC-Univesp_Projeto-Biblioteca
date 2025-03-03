<template>
  <div id="app">
    <header class="header">
      <div class="logo-container">
        <img src="./assets/img/logo.png" alt="Logo da Biblioteca" class="logo" />
        <h1 class="titulo-principal">Biblioteca Escolar</h1>
      </div>
      <div class="search-bar">
        <input type="text" placeholder="Buscar livros, autores..." v-model="searchQuery" />
        <button class="search-button">
          <i class="fas fa-search"></i>
        </button>
      </div>
      <div class="user-info" ref="userDropdown">
        <img 
          src="" 
          alt="Foto do usuário" 
          class="user-avatar" 
          @click="toggleDropdown"
        />
        <div class="user-dropdown" v-show="isDropdownOpen">
          <nav>
            <ul class="dropdown-menu">
              <li><a href="#" class="active">Início</a></li>
              <li><a href="#">Livros</a></li>
              <li><a href="#">Empréstimos</a></li>
              <li><a href="#">Alunos</a></li>
              <li><a href="#">Relatórios</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
    <main>
      <div class="content">
        <RouterView/>
      </div>
    </main>
    
    <footer>
      <FooterView/>
    </footer>  
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      notifications: 3,
      isDropdownOpen: false
    }
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    openChat() {
      // Implementação da abertura do chat
      console.log('Abrindo chat');
    },
    closeDropdownOnOutsideClick(event) {
      if (this.isDropdownOpen && !this.$refs.userDropdown.contains(event.target)) {
        this.isDropdownOpen = false;
      }
    }
  },
  mounted() {
    // Adiciona listener para fechar o dropdown quando clicar fora dele
    document.addEventListener('click', this.closeDropdownOnOutsideClick);
  },
  beforeUnmount() {
    // Remove o listener quando o componente for desmontado
    document.removeEventListener('click', this.closeDropdownOnOutsideClick);
  }
}
</script>

<style>
@import './assets/base.css';
@import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 90px;
  background-image: linear-gradient(to top, #ff3737, #ac0101);
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo {
  width: 80px;
  margin-right: 10px;
}

.titulo-principal {
  color: #fff;
  margin: 0;
  font-size: 2rem;
}

.search-bar {
  display: flex;
  align-items: center;
  background-color: #f3f2ef;
  border-radius: 4px;
  padding: 5px 10px;
  margin: 0 15px;
  flex: 1;
  max-width: 300px;
}

.search-bar input {
  border: none;
  background: transparent;
  width: 100%;
  outline: none;
}

.search-button {
  background: none;
  border: none;
  cursor: pointer;
}

/* Menu de navegação horizontal */
.menu {
  flex: 2;
}

.menu ul {
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.menu li {
  margin: 0 10px;
}

.menu a {
  text-decoration: none;
  color: #333;
  padding: 5px 10px;
  transition: color 0.2s;
}

.menu a.active, 
.menu a:hover {
  color: #0077b5;
  border-bottom: 2px solid #0077b5;
}

.user-info {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ddd;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color 0.2s;
}

.user-avatar:hover {
  border-color: #0077b5;
}

.user-dropdown {
  position: absolute;
  top: 60px;
  right: 0;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  min-width: 200px;
  z-index: 1000;
}

.dropdown-menu {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.dropdown-menu li {
  margin: 0;
}

.dropdown-menu a {
  display: flex;
  align-items: center;
  padding: 12px 15px;
  text-decoration: none;
  color: #333;
  transition: background-color 0.2s;
}

.dropdown-menu a:hover {
  background-color: #f3f2ef;
}

.dropdown-menu i {
  margin-right: 10px;
  width: 20px;
  text-align: center;
}

.notification-badge {
  background-color: #e74c3c;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 0.7rem;
  margin-left: 5px;
}

.divider {
  height: 1px;
  background-color: #e0e0e0;
  margin: 5px 0;
}

.logout {
  color: #e74c3c !important;
}

.logout:hover {
  background-color: #fce8e6 !important;
}

main {
  min-height: calc(100vh - 60px - 100px);
  padding: 20px;
}
</style>