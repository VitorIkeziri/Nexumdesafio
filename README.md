Cadastro de Pessoas

Desenvolvido por: Vitor Ikeziri

Descrição do Projeto

Esta aplicação tem como objetivo realizar o gerenciamento completo de pessoas, permitindo o controle de registros de forma eficiente e organizada. O sistema possibilita listar, cadastrar, editar e excluir pessoas por meio de uma interface simples, intuitiva e responsiva.

O projeto foi desenvolvido com foco em usabilidade, organização do código e boas práticas de desenvolvimento front-end.

Importante o uso do postgre para conexão, modificar o arquivo :
\System\backend\cadastrodepessoa\src\main\resources\application

Para sua senha e URL do DBA.
-----------------------------------------

Funcionalidades

Listagem de pessoas cadastradas

Cadastro de novos registros

Edição de informações existentes

Exclusão de registros

-----------------------------------------

Tecnologias Utilizadas

Vue.js 3

Vite

Vue Router

Bootstrap 5

ESLint

-----------------------------------------

Comandos Utilizados no Desenvolvimento

Abaixo estão os principais comandos utilizados para criação e configuração do projeto:

# Criação do projeto Vue com Vite
npm create vue@latest

# Instalação do Vite como dependência de desenvolvimento
npm install vite --save-dev

# Instalação do Bootstrap
npm i bootstrap@5.3.8

# Instalação do Vue Router
npm install vue-router@4

# Instalação do ESLint
npm install eslint -D

# Inicialização da configuração do ESLint
npx eslint --init

# Plugins adicionais para Vue e ESLint
npm install -D eslint eslint-plugin-vue vue-eslint-parser

-----------------------------------------
Execução do Projeto:

Frontend (Vue 3)

Acesse a pasta:

System/frontend/Cadastro/


Execute o comando:

npm run dev
---------------------------------------

Backend (Java)

Acesse a pasta do backend:

System/backend/


execute o arquivo .jar.

ou no caso do Intellij - compilador

Adicione a classe "CadastrodepessoaApplication" 
com jdk versão 24+ parar execução.
-----------------------------------------


Responsividade

A aplicação foi desenvolvida utilizando Bootstrap, garantindo adaptação adequada para diferentes tamanhos de tela e dispositivos.