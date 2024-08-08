## Decisões de implementação

> O projeto se consolida em TDD, sendo assim TODO caso de uso será testado em seu cenário de sucesso e de erro antes de ser implantada a camada de http a nível de rotas e de controllers. 

> Seguindo as boas práticas do AAA ( Arrange, Act ad assert ) os testes estão separado em 3 blocos que compreendem aos mesmos.

> O projeto segue implantações baseadas nos princípios do SOLID, sendo assim o projeto tem a idéia tem como proposta ser o mais desacoplado possível.

### Tecnologias envolvidas

- Vitest
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
> src/http/controllers/cart.http

### End Points

 [x] - Listagem de produtos - Obs : Ao menos 40 produtos cadastrados para retorno.

 [x] - Busca por produtos (nome/descrição).
 
 [x] - Adição ao carrinho