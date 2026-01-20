<template>
  <div class="container mt-4">
    <div class="row justify-content-center align-items-center layout-editar">

      <div class="col-md-3 text-center left-box">
        <h2 class="titulo-left">Editar Cadastro</h2>
        <p class="descricao-left">
          Busque o usuário pelo CPF para visualizar ou editar os dados.
        </p>

        <img
          src="https://cdn-icons-png.flaticon.com/512/942/942799.png"
          class="img-fluid ilustracao"
          width="220"
        />
      </div>

      <div class="col-md-6">
        <div class="card p-4 shadow-lg form-box">

          <div v-if="!ocultarBusca">
            <h2 class="text-center mb-3 titulo">Buscar Usuário</h2>

            <div class="input-group mb-4">
              <input
                type="text"
                v-model="cpfBusca"
                @input="cpfBusca = formatarCPF(cpfBusca)"
                class="form-control campo"
                placeholder="Digite o CPF"
              />
              <button class="btn btn-primary botao-busca" @click="buscarPessoa">
                Buscar
              </button>
            </div>
          </div>

          <div v-if="loading" class="alert alert-info">Carregando...</div>
          <div v-if="errorMsg" class="alert alert-danger">{{ errorMsg }}</div>

          <form v-if="pessoaEncontrada" @submit.prevent>
            <h2 class="text-center mb-4 titulo">Dados do Usuário</h2>

            <div class="row">
              <div class="col-md-6 col-12 mb-3">
                <label class="form-label fw-bold">Nome completo</label>
                <input type="text" v-model="pessoa.nome" class="form-control campo" :disabled="!modoEdicao" />
              </div>

              <div class="col-md-6 col-12 mb-3">
                <label class="form-label fw-bold">CPF</label>
                <input type="text" v-model="pessoa.cpf" class="form-control campo" disabled />
              </div>

              <div class="col-md-6 col-12 mb-3">
                <label class="form-label fw-bold">E-mail</label>
                <input type="email" v-model="pessoa.email" class="form-control campo" :disabled="!modoEdicao" />
              </div>

              <div class="col-md-6 col-12 mb-3">
                <label class="form-label fw-bold">Telefone</label>
                <input type="text" v-model="pessoa.telefone" class="form-control campo" :disabled="!modoEdicao" />
              </div>

              <div class="col-md-6 col-12 mb-3">
                <label class="form-label fw-bold">CEP</label>
                <input type="text" v-model="pessoa.cep" class="form-control campo" :disabled="!modoEdicao" />
              </div>

              <div class="col-12 mb-3">
                <label class="form-label fw-bold">Endereço</label>
                <input type="text" v-model="pessoa.endereco" class="form-control campo" :disabled="!modoEdicao" />
              </div>

              <div class="col-md-4 col-12 mb-3">
                <label class="form-label fw-bold">Bairro</label>
                <input type="text" v-model="pessoa.bairro" class="form-control campo" :disabled="!modoEdicao" />
              </div>

              <div class="col-md-4 col-12 mb-3">
                <label class="form-label fw-bold">Cidade</label>
                <input type="text" v-model="pessoa.cidade" class="form-control campo" :disabled="!modoEdicao" />
              </div>

              <div class="col-md-4 col-12 mb-3">
                <label class="form-label fw-bold">Estado</label>
                <input type="text" v-model="pessoa.estado" class="form-control campo" :disabled="!modoEdicao" />
              </div>
            </div>

            <div class="d-flex gap-2 flex-wrap mt-3">
              <button
                v-if="!modoEdicao"
                type="button"
                class="btn btn-warning w-100 botao"
                @click="modoEdicao = true"
              >
                Editar Dados
              </button>

              <button
                v-if="modoEdicao"
                type="button"
                class="btn btn-success w-100 botao"
                data-bs-toggle="modal"
                data-bs-target="#modalConfirmar"
              >
                Salvar Alterações
              </button>

              <RouterLink to="/" class="btn btn-secondary w-100 botao">
                Voltar
              </RouterLink>
            </div>

            <div class="text-center mt-5">
              <button
                type="button"
                class="btn btn-danger btn-lg px-4 btn-excluir"
                data-bs-toggle="modal"
                data-bs-target="#modalExcluir"
              >
                Excluir Cadastro
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="modal fade" id="modalConfirmar" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirmar Alterações</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            Deseja realmente salvar as alterações?
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button class="btn btn-success" @click="confirmarSalvar" data-bs-dismiss="modal">
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="modalExcluir" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-danger">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title">Confirma Exclusão?</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body text-center">
            <p class="fw-bold text-danger">Atenção!</p>
            <p>
              Esta ação <strong>não poderá ser desfeita</strong>.<br />
              Deseja realmente excluir este cadastro?
            </p>
          </div>
          <div class="modal-footer justify-content-center">
            <button class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button class="btn btn-danger px-4" @click="confirmarExclusao" data-bs-dismiss="modal">
              Excluir
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useEditarPessoa } from "./editarPorCpf.js";
import { formatarCPF } from "@/components/functions/formatacpf.js";

const route = useRoute();
const ocultarBusca = ref(false);
const cpfBusca = ref("");
const pessoa = reactive({});
const loading = ref(false);
const errorMsg = ref("");
const pessoaEncontrada = ref(false);
const modoEdicao = ref(false);

  onMounted(() => {
    const cpfRota = route.params.cpf;
    if (cpfRota) {
      cpfBusca.value = cpfRota;
      ocultarBusca.value = true;
      buscarPessoa();
    }
  });

  async function buscarPessoa() {
    loading.value = true;
    errorMsg.value = "";
    pessoaEncontrada.value = false;
    try {
      const response = await fetch(`http://localhost:8080/pessoa/cpf?cpf=${encodeURIComponent(cpfBusca.value)}`);
      if (!response.ok) throw new Error("CPF não encontrado!");
      const data = await response.json();
      Object.assign(pessoa, data);
      pessoaEncontrada.value = true;
      modoEdicao.value = false;
    } catch (e) {
      errorMsg.value = e.message;
    } finally {
      loading.value = false;
    }
  }

  async function confirmarSalvar() {
    try {
      
      const res = await fetch(
        `http://localhost:8080/pessoa/email?email=${encodeURIComponent(pessoa.email)}`
      );

      if (res.ok) {
        const pessoaExistente = await res.json();

        
        if (pessoaExistente.cpf !== pessoa.cpf) {
          alert("Este e-mail já utilizado por outro usuário.");
          return;
        }
      }

      await salvarPessoa();
      modoEdicao.value = false;

    } catch (e) {
      alert("Erro ao salvar alterações.");
    }
  }

async function confirmarExclusao() {
  await excluirPessoa();
}

const { salvarPessoa, excluirPessoa } = useEditarPessoa(pessoa);
</script>

<style scoped>
.form-box {
  border-radius: 16px;
  background: #ffffff;
}

.titulo {
  font-size: 24px;
  font-weight: 700;
  color: #2452A3;
}

.campo {
  height: 45px;
  border-radius: 10px;
}

.botao,
.botao-busca {
  font-size: 17px;
  font-weight: 600;
  border-radius: 10px;
}

.left-box {
  padding: 20px;
}

.titulo-left {
  font-size: 28px;
  font-weight: 700;
  color: #0423d2;
}

.descricao-left {
  font-size: 16px;
  color: #141616;
}

.ilustracao {
  margin-top: 20px;
  opacity: 0.9;
}

.btn-excluir {
  border-radius: 12px;
}

@media (max-width: 768px) {
  .layout-editar {
    flex-direction: column;
  }

  .left-box {
    margin-bottom: 24px;
  }

  .titulo {
    font-size: 22px;
  }

  .titulo-left {
    font-size: 24px;
  }

  .campo {
    height: 42px;
  }

  .botao,
  .botao-busca {
    font-size: 16px;
  }
}
</style>
