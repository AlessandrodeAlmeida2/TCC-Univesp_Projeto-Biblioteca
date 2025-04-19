<template>
  <div class="cadastro-admin">
    <h2>Cadastro de Administradores</h2>
    <form @submit.prevent="cadastrarAdmin">
      <div class="form-group">
        <label for="email">E-mail</label>
        <input type="email" id="email" v-model="email" />
      </div>
      <div class="form-group">
        <label for="senha">Senha</label>
        <input type="password" id="senha" v-model="senha" />
      </div>
      <button type="submit">Cadastrar</button>
    </form>
  </div>
</template>

<script>
import { supabase } from '../supabase'

export default {
  data() {
    return {
      email: '',
      senha: ''
    }
  },
  methods: {
    async cadastrarAdmin() {
      const { data, error } = await supabase.auth.signUp({
        email: this.email,
        password: this.senha
      })
      if (error) {
        console.error(error)
      } else {
        this.$router.push('/home')
      }
    }
  }
}
</script>

<style scoped>
.cadastro-admin {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f3f3f3;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

label {
  margin-bottom: 5px;
  color: #666;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

button[type="submit"] {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
