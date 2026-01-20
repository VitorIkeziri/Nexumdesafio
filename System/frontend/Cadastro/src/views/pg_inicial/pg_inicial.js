import { ref, onMounted } from "vue";

export function useListarPessoas() {
  const pessoas = ref([]);
  const loading = ref(true);
  const errorMsg = ref("");

  async function carregarPessoas() {
    try {
      const response = await fetch("http://localhost:8080/pessoa/todos");

      if (!response.ok) {
        throw new Error("Erro ao buscar registros");
      }

      const data = await response.json();

      // Últimos 10 registros
      pessoas.value = data.slice(-10);
    } catch (err) {
      errorMsg.value = err.message;
    } finally {
      loading.value = false;
    }
  }

  onMounted(() => carregarPessoas());

  // retornar variáveis e função
  return {
    pessoas,
    loading,
    errorMsg,
    carregarPessoas
  };
}
