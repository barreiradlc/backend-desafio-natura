## Decisões de implementação

### Tecnologias envolvidas


- Nodejs
- Typescript
- Docker
- Prisma

## Setup Inicial

### Faça o setup do docker

```sh
  docker compose up # ou adicione -d paa evitar logs caso julgue necessário
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

> src/http/controllers/products.http

### End Points

 [x] - Listagem de produtos - Obs : Ao menos 40 produtos cadastrados para retorno.
 [x] - Busca por produtos (nome/descrição).
 [ ] - Adição ao carrinho