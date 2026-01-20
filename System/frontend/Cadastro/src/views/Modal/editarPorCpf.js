import { useRouter } from "vue-router";

export function useEditarPessoa(pessoa) {
  const router = useRouter();

    async function salvarPessoa() {
        if (!pessoa.id) {
          console.error("Erro: pessoa.id não existe. Não é possível salvar.");
          return false;
        }

        const response = await fetch(
          `http://localhost:8080/pessoa/${pessoa.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nome: pessoa.nome,
              cpf: pessoa.cpf,
              email: pessoa.email,
              telefone: pessoa.telefone,
              cep: pessoa.cep,
              endereco: pessoa.endereco,
              bairro: pessoa.bairro,
              cidade: pessoa.cidade,
              estado: pessoa.estado,
            }),
          }
        );

        if (response.ok) {
          router.push("/");
          return true;
        }

        return false;
      }


    async function excluirPessoa() {
    if (!pessoa.cpf) {
      console.error("Erro: CPF não encontrado.");
      return false;
    }

    const response = await fetch(
      `http://localhost:8080/pessoa?cpf=${pessoa.cpf}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      router.push("/");
      return true;
    }

    return false;
  }

  return { salvarPessoa, excluirPessoa};
}

export function formatarCPF() {
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

        return {formatarCPF };
      }