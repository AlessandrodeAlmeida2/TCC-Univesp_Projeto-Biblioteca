<template>
  <div class="login-container">
    <h2>Login de Aluno</h2>

    <form @submit.prevent="loginAluno">
      <div class="form-group">
        <label for="ra">RA</label>
        <input type="text" id="ra" v-model="ra" placeholder="Digite o RA, somente números" required />
      </div>

      <button type="submit">Entrar</button>
    </form>
  </div>
</template>

<script>
import { supabase } from '../supabase'
import { useRouter } from 'vue-router'

export default {
  data() {
    return {
      ra: ''
    }
  },
  methods: {
    async loginAluno() {
      const { data, error } = await supabase
        .from('alunos')
        .select('ra, nome, email, telefone, data_nascimento, endereco, sala, periodo')
        .filter('ra', 'eq', this.ra)
        .single()

      if (error) {
        alert('Erro ao fazer login: ' + error.message)
        return
      }

      if (data) {
        localStorage.setItem('aluno', JSON.stringify(data))
        this.$router.push(`aluno/${data.ra}`)
      } else {
        alert('RA ou Email inválido')
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 5px;
  font-weight: 600;
}

input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s;
}

input:focus {
  outline: none;
  border-color: #4a90e2;
  box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
}

</style>
