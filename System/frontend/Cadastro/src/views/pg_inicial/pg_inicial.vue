<script setup>
import { useListarPessoas } from "./pg_inicial.js";

const { pessoas, loading, errorMsg } = useListarPessoas();
</script>

<template>
  <div class="container mt-4">
    <div v-if="loading" class="alert alert-info text-center">
      Carregando dados...
    </div>

    <div v-if="errorMsg" class="alert alert-danger text-center">
      {{ errorMsg }}
    </div>

    <table v-if="!loading && pessoas.length" class="table custom-table mt-4">
      <thead>
        <tr>
          <th>Email</th>
          <th>Nome</th>
          <th>CPF/CNPJ</th>
          <th>Telefone</th>
          <th>Endereço</th>
          <th>Bairro</th>
          <th>Cidade</th>
          <th>Estado</th>
          <th>CEP</th>
          <th class="text-center">Edição</th>
        </tr>
      </thead>
      
      <tbody>
        <tr v-for="p in pessoas" :key="p.id">
          <td data-label="Email">{{ p.email }}</td>
          <td data-label="Nome">{{ p.nome }}</td>
          <td data-label="CPF/CNPJ">{{ p.cpf }}</td>
          <td data-label="Telefone">{{ p.telefone }}</td>
          <td data-label="Endereço">{{ p.endereco }}</td>
          <td data-label="Bairro">{{ p.bairro }}</td>
          <td data-label="Cidade">{{ p.cidade }}</td>
          <td data-label="Estado">{{ p.estado }}</td>
          <td data-label="CEP">{{ p.cep }}</td>
          <td data-label="Edição" class="text-center">
            <router-link :to="`/editar/${p.cpf}`" class="action-btn">
              <i class="fa-solid fa-pen-to-square"></i>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="!loading && pessoas.length === 0" class="alert alert-warning text-center">
      Nenhum registro encontrado.
    </div>
  </div>
</template>

<style scoped>
.custom-table {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  font-size: 14px;
  border: 1px solid #e3e3e3;
}

.custom-table thead {
  background: #141616;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
}

.custom-table th {
  padding: 12px;
  vertical-align: middle;
  color: #000000;
}

.custom-table tbody tr {
  transition: background 0.2s;
}

.custom-table tbody tr:hover {
  background: #f1f8ff !important;
}

.custom-table td {
  padding: 12px;
  vertical-align: middle;
}

.action-btn {
  font-size: 26px;
  color: #000000;
  transition: 0.2s;
}

.action-btn:hover {
  color: #d20d0a;
}

@media (max-width: 992px) {
  .custom-table thead {
    display: none;
  }

  .custom-table,
  .custom-table tbody,
  .custom-table tr,
  .custom-table td {
    display: block;
    width: 100%;
  }

  .custom-table tr {
    margin-bottom: 16px;
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 10px;
    background: #fff;
  }

  .custom-table td {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 10px;
    border-bottom: 1px solid #eee;
    text-align: right;
    font-size: 14px;
  }

  .custom-table td:last-child {
    border-bottom: none;
  }

  .custom-table td::before {
    content: attr(data-label);
    font-weight: 600;
    color: #fb0202;
    text-align: left;
    font-size: 13px;
  }

  .action-btn {
    font-size: 22px;
  }
}
</style>
