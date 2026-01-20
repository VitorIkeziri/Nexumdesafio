<script setup>
  import { ref } from "vue";

  const menuAberto = ref(false);

  function toggleMenu() {
    menuAberto.value = !menuAberto.value;
  }
</script>

<template>
    <div class="container-fluid vh-100 p-0">
  
      <button class="btn btn-hamburguer d-md-none" @click="toggleMenu">
        <i class="fas fa-bars"></i>
      </button>

      <div class="row h-100 m-0">

        <div
          class="barralado px-4 py-5"
          :class="{ 'mostrar-menu': menuAberto }"
        >
          <h3 class="fw-bold mb-4 text-center">Menus</h3>

          <nav class="nav flex-column text-start">
            <router-link to="/" class="nav-link menu-link"> <i class="fas fa-home me-2"></i> Home </router-link>
            <router-link to="/cadastrar" class="nav-link menu-link"> <i class="fas fa-user-plus me-2"></i> Cadastrar </router-link>
            <router-link to="/editar" class="nav-link menu-link"> <i class="fas fa-search me-2"></i> Pesquisar | Editar </router-link>
          </nav>
        </div>

        <div class="col-12 col-md-9 col-lg-10 offset-md-3 offset-lg-2 content-area p-5">
          <h1 class="display-6 fw-semibold mb-4 text-center">
            Cadastro de Pessoas
          </h1>

          <router-view></router-view>
        </div>

      </div>
    </div>
</template>

<style scoped>
  .barralado {
    background: #141616;
    color: white;
    border-right: 1px solid #222;
    height: 100vh;
    width: 250px;
    position: fixed;
    top: 0;
    left: 0;
  }

  .menu-link {
    color: #ddd;
    margin-bottom: 12px;
    font-size: 1rem;
    transition: 0.2s ease;
  }

  .menu-link:hover {
    color: white;
    background: #044876;
    border-radius: 8px;
  }

  .router-link-active {
    color: white !important;
  }

  .content-area {
    background: #f8f9fa;
  }

  .btn-hamburguer {
    background: #2e2e2e;
    color: white;
    padding: 12px 18px;
    border-radius: 10px;
    position: fixed;
    top: 15px;
    left: 15px;
    z-index: 3000;
    font-size: 1.2rem;
  }

  @media (max-width: 767px) {
    
    .barralado {
      transform: translateX(-100%);
      width: 70%;
      max-width: 260px;
      transition: 0.3s ease;
      z-index: 2500;
    }


    .barralado.mostrar-menu {
      transform: translateX(0);
    }


    .content-area {
      transition: 0.3s;
    }

    .barralado.mostrar-menu ~ .content-area {
      filter: brightness(0.3);
      pointer-events: none;
    }
  }


  @media (min-width: 768px) {
    .btn-hamburguer {
      display: none;
    }

    .barralado {
      transform: none !important;
      width: 250px;
    }
  }
</style>
