## Decisões de implementação

### Tecnologias envolvidas


- Nodejs
- Typescript
- Docker
- Prisma

## Setup Inicial

### Faça o setup do docker

```sh
#  setup inicial
docker run --name natura_db -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=natura -p 5432:5432 bitnami/postgresql

# executar em demais outras ocasiões
docker start natura_db
```

### Copiando variáveis de ambiente

```sh
  cp .env.sample .env
```

### Configurando DB

```sh
  # configurar prisma no ambiente local
  npx prisma generate
  
  # migrar banco de dados
  npx prisma migrate dev
```

### Inicialzando a aplicação

```sh
  npm run start:dev
```

A aplicação estará disponível no endereço http://localhost:3333
Para interagir com ela é possível utilizar os próprios arquivos de http, por meio da extensão do vscode chamada [Rest client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) disponíveis em:

> TODO: Endpoints

### End Points

 [ ] - Listagem de produtos - Obs : Ao menos 40 produtos cadastrados para retorno.
 [ ] - Adição ao carrinho
 [ ] - Busca por produtos (nome/descrição).