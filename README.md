
# Projeto MyContacts.io 📝

  

## Descrição

  

Projeto de CRUD utilizando a arquitetura MVC, com ReactJs sendo a View e uma API Rest em NodeJs contendo Models, Controllers e uma camada adicional de Services onde estão as regras de negócio.

  

### Funcionalidades:

- O usuário poder realizar o cadastro com email e senha.

- O usuário poder realizar o login com email e senha, gerando um token JWT.

 ***Com o token do usuário logado, é possivel:***
- *Listar todos os contatos;*
- *Criar um contato, inserindo Nome, Email e Telefone*;
- *Editar as informações do contato;*
- *Excluir o contato;*

  

## Tecnologias usadas

  

Front-end:

> Desenvolvido usando: React, CSS3, HTML5, React Hooks.

  

Back-end:

> Desenvolvido usando: NodeJs, ExpressJS, MySQL e Sequelize, Autenticação com JWT.

## Técnicas de desenvolvimento aplicadas

[GitFlow](https://www.atlassian.com/br/git/tutorials/comparing-workflows/gitflow-workflow).

Fluxo de branches de desenvolvimeento aplicado:

<img src="./src/readmeFiles/fluxo gitflow.jpeg" width="60%" />

### Board Kanban com as respesctivas colunas: 

 📚  *Backlog*: coluna onde adicionei todas as Tech Storys e User Storys, utilizando as TS para desenvolvimento de endpoints no Backend e US para desenvolvimento de Telas no Frontend. A order de priorização usada foi de cima para baixo, quanto mais acima mais importante a entrega para o cliente.

> Exemplo de cards de TS, US e Bug criados durante o desenvolvimento:
 
<img src="./src/readmeFiles/exemplo de tech Story.jpeg" width="60%" />

<img src="./src/readmeFiles/exemplo de user story.jpeg" width="60%" />

<img src="./src/readmeFiles/exemplo de bug.jpeg" width="60%" />
 
🔨  *Em desenvolvimento*: coluna onde me dediquei  a desenvolver os requisitos dos cards.

🔍*Em  QA*: coluna onde validei que os critérios de aceite do card estavam sendo atendidos, e anexei evidências para comprovar tal fato.

⚖️ *Homologação*: coluna onde o time de negócio (eu) validou que os critérios de aceite e de teste foram atendidos.

👣 *Teste de Regressão*: coluna destinada a testar todo o fluxo afetado pelo card em questão, afim de validar que os fluxos continuam funcionando normalmente.

⏳ *Aguardando publicação*: coluna destinada aos cards homologados e testados prontos para irem para o ambiente de produção.

✅ *Em produção*: coluna destinada aos cards que foram "deployados" no ambiente de produção. 


### Foto do board de desenvolvimento (14/08/2022):

<img src="./src/readmeFiles/foto do board 14-08-2022.jpeg" width="100%"/>

## Instalando Dependências
> Backend
> cd src/backend
```
npm install
Configure o .env seguindo o modelo do arquivo .env.example
```


> Frontend
cd src/frontend
```
npm install
```

## Executando a aplicação

> Backend
```
npm run db:reset
npm run dev
```
> Frontend
```

npm start

```
