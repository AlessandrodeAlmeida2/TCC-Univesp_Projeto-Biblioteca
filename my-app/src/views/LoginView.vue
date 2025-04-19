<template>
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="handleSubmit" class="login-form">
        <div class="form-group">
          <label for="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            v-model="formData.email"
            :class="{ 'input-error': errors.email }"
            required
          />
          <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
        </div>
        
        <div class="form-group">
          <label for="password">Senha:</label>
          <div class="password-container">
            <input 
              :type="showPassword ? 'text' : 'password'" 
              id="password" 
              v-model="formData.password"
              :class="{ 'input-error': errors.password }"
              required
            />
            <button 
              type="button" 
              class="toggle-password" 
              @click="showPassword = !showPassword"
            >
              {{ showPassword ? 'Ocultar' : 'Mostrar' }}
            </button>
          </div>
          <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
        </div>
        
        <button type="submit" class="submit-button" :disabled="isSubmitting">
          {{ isSubmitting ? 'Processando...' : 'Entrar' }}
        </button>
        
        <div v-if="loginMessage" :class="['message', loginMessage.type]">
          {{ loginMessage.text }}
        </div>
      </form><br>
      <div>
        <h4><a class="cadastro" href="/login-aluno">Sou aluno</a></h4>
      </div>
    </div>
  </template>
  
  <script>
  import { supabase } from '../supabase';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default {
    setup() {
      const router = useRouter();
      const formData = ref({
        email: '',
        password: '',
      });
      
      const errors = ref({
        email: '',
        password: '',
      });
      
      const loginMessage = ref(null);
      
      const showPassword = ref(false);
      
      const isSubmitting = ref(false);
      
      const handleSubmit = async () => {
        isSubmitting.value = true;
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email: formData.value.email,
            password: formData.value.password,
          });
          if (error) {
            loginMessage.value = {
              type: 'error',
              text: 'Erro ao realizar login. Verifique suas credenciais!',
            };
          } else {
            loginMessage.value = {
              type: 'success',
              text: 'Login realizado com sucesso!',
            };
            router.push('/');
          }
        } catch (error) {
          console.error(error);
          loginMessage.value = {
            type: 'error',
            text: 'Erro ao realizar login. Verifique suas credenciais!',
          };
        } finally {
          isSubmitting.value = false;
        }
      };
      
      return {
        formData,
        errors,
        loginMessage,
        showPassword,
        handleSubmit,
        isSubmitting,
      };
    },
  };
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
  
  .input-error {
    border-color: #e74c3c !important;
  }
  
  .error-message {
    color: #e74c3c;
    font-size: 14px;
    margin-top: 5px;
  }
  
  .password-container {
    display: flex;
    position: relative;
  }
  
  .password-container input {
    flex: 1;
  }
  
  .toggle-password {
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #666;
    cursor: pointer;
    font-size: 14px;
    padding: 5px;
  }
  
  .toggle-password:hover {
    color: #333;
  }
  
  .submit-button {
    padding: 12px;
    background-color: #4a90e2;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .submit-button:hover {
    background-color: #3a7bc8;
  }
  
  .submit-button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  .message {
    padding: 10px;
    border-radius: 4px;
    margin-top: 15px;
    text-align: center;
  }
  
  .success {
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
  }
  
  .error {
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
  }

  .cadastro {
    color: #4a90e2;
  }

  .cadastro:hover {
    text-decoration: underline;
  }
  </style>
  Last edited 3 hours ago
  
  
  