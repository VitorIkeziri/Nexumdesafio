import { reactive, watch, ref } from "vue";
import { useRouter } from "vue-router";


export default {
  setup() {
    const router = useRouter();

    const erroCpf = ref("");
    const verificandoCpf = ref(false);

    const erroEmail = ref("");
    const verificandoEmail = ref(false);

    const pessoa = reactive({
      nome: "",
      cpf: "",
      email: "",
      telefone: "",
      cep: "",
      endereco: "",
      bairro: "",
      cidade: "",
      estado: "",
    });

   
    watch(
      () => pessoa.cep,
      (novoValor) => {
        if (!novoValor || novoValor.length < 8) {
          pessoa.endereco = "";
          pessoa.bairro = "";
          pessoa.cidade = "";
          pessoa.estado = "";
        }
      }
    );

    
    async function buscarCEP() {
      if (!pessoa.cep || pessoa.cep.length < 8) return;

      try {
        const response = await fetch(
          `https://viacep.com.br/ws/${pessoa.cep}/json/`
        );
        const data = await response.json();

        if (data.erro) {
          alert("CEP não encontrado.");
          return;
        }

        pessoa.endereco = data.logradouro || "";
        pessoa.bairro = data.bairro || "";
        pessoa.cidade = data.localidade || "";
        pessoa.estado = data.uf || "";

      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
      }
    }

    async function verificarCpfExiste() {
      erroCpf.value = "";

      if (!pessoa.cpf || pessoa.cpf.length < 14) {
        return false;
      }

      verificandoCpf.value = true;

      try {
        const response = await fetch(
          `http://localhost:8080/pessoa/cpf?cpf=${encodeURIComponent(pessoa.cpf)}`
        );

        if (response.ok) {
          erroCpf.value = "CPF já registrado!";
          return true;
        }

        return false;

      } catch (e) {
        return false;

      } finally {
        verificandoCpf.value = false;
      }
    }

    async function verificarEmailExiste() {
      erroEmail.value = "";

      if (!pessoa.email || !pessoa.email.includes("@")) {
        return false;
      }

      verificandoEmail.value = true;

      try {
        const response = await fetch(
          `http://localhost:8080/pessoa/email?email=${encodeURIComponent(pessoa.email)}`
        );

        if (response.ok) {
          erroEmail.value = "E-mail já registrado!";
          return true;
        }

        return false;

      } catch (e) {
        return false;

      } finally {
        verificandoEmail.value = false;
      }
    }
 
    async function salvarPessoa() {
      try {
        if (!pessoa.cpf || pessoa.cpf.trim() === "") {
          alert("CPF é obrigatório.");
          return;
        }

        const cpfExiste = await verificarCpfExiste();
        if (cpfExiste) {
          return;
        }

        const emailExiste = await verificarEmailExiste();
        if (emailExiste) {
          return;
        }

        const response = await fetch("http://localhost:8080/pessoa", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(pessoa),
        });

        if (!response.ok) {
          const mensagem = await response.text();

          alert(mensagem || "Erro ao cadastrar pessoa.");
          return;
        }

        alert("Pessoa cadastrada com sucesso!");

        Object.keys(pessoa).forEach((key) => (pessoa[key] = ""));

        router.push("/");

      } catch (error) {
        console.error(error);
        alert("Erro ao conectar com o servidor.");
      }
    }

    function formatarCPF() {
      let cpf = pessoa.cpf.replace(/\D/g, "");

      if (cpf.length > 11) cpf = cpf.slice(0, 11);

      if (cpf.length <= 3) {
        pessoa.cpf = cpf;
      } else if (cpf.length <= 6) {
        pessoa.cpf = cpf.replace(/(\d{3})(\d+)/, "$1.$2");
      } else if (cpf.length <= 9) {
        pessoa.cpf = cpf.replace(/(\d{3})(\d{3})(\d+)/, "$1.$2.$3");
      } else {
        pessoa.cpf = cpf.replace(
          /(\d{3})(\d{3})(\d{3})(\d{2})/,
          "$1.$2.$3-$4"
        );
      }
    }

    function formatarCEP() {
      let cep = pessoa.cep.replace(/\D/g, "");

      if (cep.length > 8) cep = cep.slice(0, 8);

      if (cep.length <= 5) {
        pessoa.cep = cep;
      } else {
        pessoa.cep = cep.replace(/(\d{5})(\d{1,3})/, "$1-$2");
      }
    }

    function formatarTelefone() {
      let tel = pessoa.telefone.replace(/\D/g, "");

      if (tel.length > 11) tel = tel.slice(0, 11);

      if (tel.length <= 2) {
        pessoa.telefone = `(${tel}`;
      } else if (tel.length <= 6) {
        pessoa.telefone = `(${tel.slice(0, 2)}) ${tel.slice(2)}`;
      } else if (tel.length <= 10) {
        pessoa.telefone = `(${tel.slice(0, 2)}) ${tel.slice(2, 6)}-${tel.slice(6)}`;
      } else {
        pessoa.telefone = `(${tel.slice(0, 2)}) ${tel.slice(2, 7)}-${tel.slice(7)}`;
      }
    }


      return {
        pessoa,
        salvarPessoa,
        buscarCEP,
        formatarCPF,
        formatarCEP,
        formatarTelefone,
        verificarCpfExiste,
        erroCpf,
        verificandoCpf,
        erroEmail,
        verificandoEmail,
        verificarEmailExiste,
      };
  },
};
