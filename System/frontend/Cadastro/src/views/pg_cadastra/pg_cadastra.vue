<script src="./pg_cadastro.js"></script>

<template>
  <div class="container mt-4">
    <div class="row justify-content-center align-items-center layout-cadastro">

      <div class="col-md-3 text-center left-box">
        <h2 class="titulo-left">Bem-vindo!</h2>
        <p class="descricao-left">
          Preencha os dados ao lado para realizar o cadastro do usuário.
          Utilize um CEP válido para preencher endereço automaticamente.
        </p>

        <img
          src="https://cdn-icons-png.flaticon.com/512/3209/3209265.png"
          class="img-fluid ilustracao"
          width="220"
        >
      </div>

      <div class="col-md-6">
        <div class="card p-4 shadow-lg form-box">
          <h2 class="text-center mb-4 titulo">Cadastro de Usuário</h2>

          <form @submit.prevent="salvarPessoa">
            <div class="row">

              <div class="col-md-6 col-12 mb-3">
                <label class="form-label fw-bold">Nome completo</label>
                <input type="text" v-model="pessoa.nome" class="form-control campo" required>
              </div>

              <div class="col-md-6 col-12 mb-3">
                <label class="form-label fw-bold">CPF</label>
                <input type="text" v-model="pessoa.cpf" @input="formatarCPF" @blur="verificarCpfExiste" class="form-control campo" required>
              </div>

              <div class="col-md-6 col-12 mb-3">
                <label class="form-label fw-bold">E-mail</label>
                <input type="email" v-model="pessoa.email" @blur="verificarEmailExiste" class="form-control campo" required>
              </div>

              <div class="col-md-6 col-12 mb-3">
                <label class="form-label fw-bold">Telefone</label>
                <input type="text" v-model="pessoa.telefone" @input="formatarTelefone" class="form-control campo" required>
              </div>

              <div class="col-md-6 col-12 mb-3">
                <label class="form-label fw-bold">CEP</label>
                <input type="text" v-model="pessoa.cep" @blur="buscarCEP" @input="formatarCEP" maxlength="9" class="form-control campo" required>
              </div>

              <div class="col-12 mb-3">
                <label class="form-label fw-bold">Endereço</label>
                <input type="text" v-model="pessoa.endereco" class="form-control campo" readonly>
              </div>

              <div class="col-md-4 col-12 mb-3">
                <label class="form-label fw-bold">Bairro</label>
                <input type="text" v-model="pessoa.bairro" class="form-control campo" readonly>
              </div>

              <div class="col-md-4 col-12 mb-3">
                <label class="form-label fw-bold">Cidade</label>
                <input type="text" v-model="pessoa.cidade" class="form-control campo" readonly>
              </div>

              <div class="col-md-4 col-12 mb-3">
                <label class="form-label fw-bold">Estado</label>
                <input type="text" v-model="pessoa.estado" class="form-control campo" readonly>
              </div>

            </div>

            <button class="btn btn-primary w-100 py-2 botao">
              Salvar Cadastro
            </button>
          </form>

          <div v-if="erroCpf" class="alert alert-danger d-flex align-items-center mt-3 erro-cpf-box">
            <i class="fa-solid fa-triangle-exclamation me-2"></i>
            <div>
              <strong>Atenção!</strong><br>
              {{ erroCpf }}
            </div>
          </div>

          <div v-if="erroEmail" class="alert alert-danger d-flex align-items-center mt-2">
            <i class="fa-solid fa-triangle-exclamation me-2"></i>
            <div>
              <strong>Atenção!</strong><br>
              {{ erroEmail }}
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

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

.botao {
  font-size: 18px;
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

.erro-cpf-box {
  border-radius: 12px;
  font-size: 15px;
  font-weight: 500;
  border-left: 6px solid #dc3545;
}

@media (max-width: 768px) {
  .layout-cadastro {
    flex-direction: column;
  }

  .left-box {
    order: 1;
    margin-bottom: 24px;
  }

  .form-box {
    padding: 20px;
  }

  .titulo {
    font-size: 22px;
  }

  .titulo-left {
    font-size: 24px;
  }

  .descricao-left {
    font-size: 15px;
  }

  .campo {
    height: 42px;
  }

  .botao {
    font-size: 17px;
  }
}
</style>
