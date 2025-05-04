<template>
    <div class="cadastro-aluno-container">
      <section v-if="aluno" class="cadastro-aluno">
        <h2>Cadastro de Aluno</h2>
        <!-- Container das duas colunas principais -->
        <div class="columns-container">
          <!-- Coluna da esquerda (Formulário) -->
          <div class="left-column">
            <div class="form-group">
              <label for="ra">Registro Acadêmico (RA)</label>
              <input 
                type="text" 
                id="ra" 
                v-model="aluno.ra" 
                required 
                placeholder="Digite o RA"
              >
            </div>

            <div class="form-group">
              <label for="rg">RG</label>
              <input 
                type="text" 
                id="rg" 
                v-model="aluno.rg" 
                required 
                placeholder="Digite o RG"
              >
            </div>

            <div class="form-group">
              <label for="cpf">CPF</label>
              <input 
                type="text" 
                id="cpf" 
                v-model="aluno.cpf" 
                required 
                placeholder="Digite o CPF"
              >
            </div>
  
            <div class="form-group">
              <label for="nome">Nome Completo</label>
              <input 
                type="text" 
                id="nome" 
                v-model="aluno.nome" 
                required 
                placeholder="Digite o nome completo"
              >
            </div>
  
            <div class="form-group endereco">
              <label for="endereco">Endereço</label>
              <input 
                type="text" 
                id="endereco" 
                v-model="aluno.endereco" 
                placeholder="Digite o endereço completo"
              >
            </div>

            <div class="form-group">
              <label for="bairro">Bairro</label>
              <input 
                type="text" 
                id="bairro" 
                v-model="aluno.bairro" 
                placeholder="Digite o bairro"
              >
            </div>

            <div class="form-group">
              <label for="cidade">Cidade</label>
              <input 
                type="text" 
                id="cidade" 
                v-model="aluno.cidade" 
                required 
                placeholder="Digite a cidade"
              >
            </div>

            <div class="form-group">
              <label for="cep">CEP</label>
              <input 
                type="text" 
                id="cep" 
                v-model="aluno.cep" 
                placeholder="Digite o CEP"
              >
            </div>
  
            <div class="form-group">
              <label for="dataNascimento">Data de Nascimento</label>
              <input 
                type="date" 
                id="dataNascimento" 
                v-model="aluno.data_nascimento" 
                required
              >
            </div>
  
            <div class="form-group">
              <label for="telefone">Telefone</label>
              <input 
                type="tel" 
                id="telefone" 
                v-model="aluno.telefone" 
                placeholder="(XX) XXXXX-XXXX"
              >
            </div>

            <div class="form-group">
              <label for="tel_recado">Telefone de Recado</label>
              <input 
                type="tel" 
                id="tel_recado" 
                v-model="aluno.tel_recado" 
                placeholder="(XX) XXXXX-XXXX"
              >
            </div>
  
            <div class="form-group">
              <label for="email">E-mail</label>
              <input 
                type="email" 
                id="email" 
                v-model="aluno.email" 
                required 
                placeholder="Digite o e-mail"
              >
            </div>

            <div class="form-group">
              <label for="senha">Senha</label>
              <input 
                type="password" 
                id="senha" 
                v-model="aluno.senha" 
                required 
                placeholder="Digite a senha"
              >
            </div>

          </div>
  
          <!-- Coluna da direita (Foto) -->
          <div class="right-column">
            <div class="foto-container">
              <div class="foto-preview">
                <img v-if="urlImagem" :src="urlImagem" alt="Foto do Aluno">
                <img v-else-if="aluno.url_foto" :src="aluno.url_foto" alt="Foto do Aluno">
                <div v-else class="placeholder">Foto do aluno</div>
              </div>
  
              <div class="foto-acoes">
                <input 
                  type="file" 
                  id="carregarFoto" 
                  ref="carregarFoto"
                  @change="handleFileUpload" 
                  accept="image/*"
                  hidden
                >
                <button type="button" class="btn-foto" @click="$refs.carregarFoto.click()">
                  Carregar Foto
                </button>
  
                <input 
                  type="file" 
                  id="tirarFoto" 
                  accept="image/*" 
                  capture="camera"
                  hidden
                >
                <button type="button" class="btn-foto" @click="$refs.tirarFoto.click()">
                  Tirar Foto
                </button>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Informações adicionais abaixo das colunas -->
        <div class="info-adicional">
          <div class="form-row">
            <div class="form-group">
              <label for="sala">Sala de Aula</label>
              <select 
                id="sala" 
                v-model="aluno.sala" 
                required
              >
                <option value="">Selecione a sala</option>
                <option value="Sala 101">Sala 101</option>
                <option value="Sala 202">Sala 202</option>
                <option value="Sala 303">Sala 303</option>
              </select>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="educacao">Nível de Ensino</label>
              <select 
                id="educacao" 
                v-model="aluno.educacao" 
                required
              >
                <option value="">Selecione o nível de ensino</option>
                <option value="Fundamental">Fundamental</option>
                <option value="Médio">Médio</option>
                <option value="Superior">Superior</option>
              </select>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="serie">Série</label>
              <select 
                id="serie" 
                v-model="aluno.serie" 
                required
              >
                <option value="">Selecione a série</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
              </select>
            </div>
          </div>
  
          <div class="form-row periodo-container">
            <label>Período</label>
            <div class="radio-group">
              <div class="radio-option">
                <input 
                  type="radio" 
                  id="manha" 
                  value="Manhã" 
                  v-model="aluno.periodo"
                >
                <label for="manha">Manhã</label>
              </div>
              
              <div class="radio-option">
                <input 
                  type="radio" 
                  id="tarde" 
                  value="Tarde" 
                  v-model="aluno.periodo"
                >
                <label for="tarde">Tarde</label>
              </div>
              
              <div class="radio-option">
                <input 
                  type="radio" 
                  id="noite" 
                  value="Noite" 
                  v-model="aluno.periodo"
                >
                <label for="noite">Noite</label>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Botões de ação -->
        <div class="form-actions">
          <button type="button" class="btn-cancelar" @click="limparFormulario">
            Cancelar
          </button>
          <button type="submit" class="btn-salvar" @click="atualizarAluno">
            Atualizar Aluno
          </button>
        </div>
      </section>
      <section v-else class="cadastro-aluno-loading">
        <h2>Carregando dados do aluno...</h2>
      </section>
    </div>
</template>
  
<script>
import alunoService from '../services/alunoService';
import { supabase } from '../supabase';

export default {
  name: 'EditarAluno',
  data() {
    return {
      aluno: null,
      urlImagem: null
    };
  },
  async mounted() {
    const ra = this.$route.params.ra;
    console.log('RA recebido pela rota:', ra);
    try {
      this.aluno = await alunoService.buscarAlunoPorRa(ra);
      console.log('Aluno retornado do Supabase:', this.aluno);
      if (!this.aluno) {
        alert('Aluno não encontrado');
        this.$router.push('/alunos');
      }
    } catch (e) {
      console.error('Erro ao buscar aluno:', e);
      alert('Erro ao buscar aluno');
      this.$router.push('/editar-alunos');
    }
  },
  methods: {
    async atualizarAluno() {
      try {
        // Se houver uma foto nova selecionada, faz upload para o Supabase Storage
        let url_foto = this.aluno.url_foto;
        if (this.aluno.foto) {
          const fileExt = this.aluno.foto.name.split('.').pop();
          const fileName = `${this.aluno.ra}_${Date.now()}.${fileExt}`;
          const { data: uploadData, error: uploadError } = await supabase.storage.from('fotos').upload(fileName, this.aluno.foto, { upsert: true });
          if (uploadError) {
            alert('Erro ao enviar a foto: ' + uploadError.message);
            return;
          }
          // Recupera a URL pública
          const { data: publicUrlData } = supabase.storage.from('fotos').getPublicUrl(fileName);
          url_foto = publicUrlData.publicUrl;
          this.aluno.url_foto = url_foto;
        }
        // Cria uma cópia do aluno sem o campo 'foto', pois não existe na tabela
        const alunoParaAtualizar = { ...this.aluno };
        delete alunoParaAtualizar.foto;
        await alunoService.atualizarAluno(this.aluno.ra, alunoParaAtualizar);
        alert('Aluno atualizado com sucesso!');
        this.$router.push('/editar-alunos');
      } catch (e) {
        alert('Erro ao atualizar aluno: ' + (e.message || e));
        console.error('Erro ao atualizar aluno:', e);
      }
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.aluno.foto = file;
        this.urlImagem = URL.createObjectURL(file);
      }
    },
    limparFormulario() {
      this.aluno = {
        ra: '',
        rg: '',
        cpf: '',
        nome: '',
        email: '',
        telefone: '',
        tel_contato: '',
        data_nascimento: '',
        sala: '',
        periodo: '',
        endereco: '',
        bairro: '',
        cidade: '',
        cep: '',
        educacao: '',
        serie: '',
        senha: '',
        url_foto: null
      };
      this.urlImagem = null;
    }
  }
};
</script>
  
  <style scoped>
  .columns-container {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 2rem;
    margin-bottom: 20px;
    border: solid 1px var(--cor-cinza);
    border-radius: 10px;
    padding: 20px;
    margin: 20px;
    background-color: var(--cor-cinza-claro);
  }
  
  .left-column {
    width: 80%;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .right-column {
    padding: 20px;
    border-radius: 8px;
  }
  
  .form-group {
    display: grid;
    grid-template-columns: 150px 1fr;
    gap: 10px;
    align-items: center;
  }
  
  .form-group label {
    color: var(--cor-cinza-escuro);
    font-weight: 500;
    text-align: right;
    padding-right: 10px;
  }
  
  .form-group input, 
  .form-group select {
    background-color: var(--cor-branco);
    padding: 10px;
    border: 1px solid var(--cor-cinza-claro);
    border-radius: 4px;
    font-size: 1rem;
  }
  
  .form-actions {
    display: flex;
    justify-content: space-evenly;
    margin-top: 15px;
  }
  
  .foto-preview {
    width: 100%;
    height: 200px;
    border: 1px dashed var(--cor-cinza);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;
  }
  
  .foto-preview img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
  }
  
  .placeholder {
    color: var(--cor-black);
    text-align: center;
    font-style: italic;
  }
  
  .foto-acoes {
    display: flex;
    gap: 10px;
    flex-direction: column;
  }

  .form-row {
    max-width: 500px;
    margin: 8px 0px;
  }
  
  .btn-foto {
    padding: 10px;
    background-image: linear-gradient(to right, #d4d4d4, #f3f3f3a4);
    color: var(--cor-cinza-escuro);
    border: solid 2px var(--cor-cinza);
    border-radius: 4px;
    cursor: pointer;
    transition: background-image 0.3s;
  }
  
  .btn-foto:hover {
    background-image: none;
    background-color: var(--cor-azul-claro);
  }
  
  .info-adicional {
    color: var(--cor-cinza-escuro);
    margin: 20px;
    padding: 20px;
    border: 1px solid var(--cor-cinza);
    border-radius: 10px;
    background-color: var(--cor-cinza-claro);
  }
  
  .periodo-container {
    margin-top: 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
  }
  
  .radio-group {
    display: flex;
    gap: 20px;
    padding: 10px 0;
  }
  
  .radio-option {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  
  @media (max-width: 768px) {
    .columns-container {
      grid-template-columns: 1fr;
      display: flex;
      flex-direction: column-reverse;
    }
    
    .right-column {
      max-width: 400px;
      margin: 0 auto;
    }
    
    .form-group {
      grid-template-columns: 1fr;
    }
    
    .form-group label {
      text-align: left;
    }

    .form-row.periodo-container {
    flex-direction: column;
    gap: 10px;
  }
  }
  </style>
  