export function formatarCPF(valor) {
  if (!valor) return "";

  let cpf = valor.replace(/\D/g, "");

  if (cpf.length > 11) cpf = cpf.slice(0, 11);

  if (cpf.length <= 3) return cpf;
  if (cpf.length <= 6) return cpf.replace(/(\d{3})(\d+)/, "$1.$2");
  if (cpf.length <= 9) return cpf.replace(/(\d{3})(\d{3})(\d+)/, "$1.$2.$3");

  return cpf.replace(
    /(\d{3})(\d{3})(\d{3})(\d{2})/,
    "$1.$2.$3-$4"
  );
}

export function limparCPF(valor) {
  return valor ? valor.replace(/\D/g, "") : "";
}