# Teste tecnico-NG_CASH

Uma API que simula uma carteira digital onde é possível criar um usuário, efetuar login, realizar transações de cash-out e cash-in e consultar essas transações.

## Dev

- [Daniel Francisco](https://www.github.com/daniell18)

## Funcionalidades

- Autenticação
- Registro de usuários
- Login de usuários
- Transações de cash-In e cash-Out
- Consulta das Transações que o usuário participou

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env;

- `PORT` onde rodará sua aplicação;
- `POSTGRES_DB` nome do banco de dados (em desenvolvimento);
- `POSTGRES_PASSWORD` senha do banco de dados (em desenvolvimento);
- `DATABASE_URL` url com as credenciais do banco (em produção);
- `SECRET_KEY` senha para criação de token de autenticação;
- `EXPIRES_IN` tempo de expiração do token gerado;

# Como rodar a aplicação

Deve se ter o docker instalado, preencher o .env e rodar comando

```
Na primeira vez para gerar a imagen e o container rodar com a flag --build
 docker-compose up --build
```

# Como usar os Endpoints

## A documentação também foi feita utilizando swagger pode ser acessada através do Endpoint /api-docs <br><br>

As rotas da aplicação podem ser dividas em três categorias básicas:

- Rotas User
- Rotas Accounts
- Rotas Transactions

A validação é feita pelo envio de um Bearer Token no Header nas requisições protegidas. Esse tokens seguem o padrão JSON Web Token e são gerados automaticamente pela aplicação durante o login de um usuário.

Logo abaixo seguem exemplos de cada rota aceita pela aplicação, junto com seu
comportamento esperado, os campos necessários para sua utilização e o que será
retornado pelo servidor.

## Autenticação

Ao criar uma conta, a senha do usuário é haseada e registrada de forma segura no
banco de dados.

## Rotas

- [user](#postusersignup)
- [account](#postuseraddressregister)
- [transaction](#getuserfeedback)

### POST/user/signup

#### Descrição

```
   - cria um novo usuário
    - A senha deve ter pelo menos 1 letra máscula, 1 letra minúscula, 1 numero , 1 caráter especial e no mínimo 8 dígitos
```

_Envio:_

```json
{
    "username":"admin",
    "password":"12345As*"
}​
```

_Resposta:_

```json
{
  "msg": "account successfully created ",
  "username": "admin"
}
```

### POST/user/signin

#### Descrição

```
    - login do usuário registrado
```

_Envio:_

```json
{
  "username": "admin",
  "password": "12345As*"
}​
```

_Resposta:_

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6ImRhbmllbCIsInBhc3N3b3JkIjoiJDJhJDEwJHNSSUNJSGJ2R01HekVxc2FBVHdRYS5tOWZqNXdUY2hzd1RFVVBEYXY3aTlnUHJCZngvSTN1IiwiYWNjb3VudCI6eyJpZCI6MSwiYmFsYW5jZSI6MTAwfX0sImlhdCI6MTY2ODk3ODMxNiwiZXhwIjoxNjY4OTgxOTE2fQ.LS1tFmZBTZSZ7tY2I0YzdZGJmj8SX-rafXrSuqmvBHs"
}
```

### POST/account/:username/cashin

#### Descrição

```
    - Necessário o envio do token
    - Necessário passar o usuário logado na URL
    - No body deve ser passado o valor que deseja adicionar
    - Esse permite que seja acionado dinheiro a conta
    - Ela foi criada como extra para caso fosse desejado adicionar mais dinheiro a uma conta
```

_Envio:_

```json
{
  "value": 15
}
```

_Resposta:_

```json
{
  "id": 1,
  "balance": 100
}
```

### GET/account/:username/balance

#### Descrição

```
    - Necessário o envio do token
    - Necessário passar o usuário logado na URL
    - Retorna o balanço atual do cliente
```

_Envio:_

- Não é necessário um Body

_Resposta:_

```json
{
  "msg": "Your current account balance is 145"
}
```

### POST/account/:username/cashout

#### Descrição

```
    - Necessário o envio do token
    - Necessário passar o usuário logado na URL
    - No Body deve ser passado o usuário que ira receber e o valor desejado
    - Cria um feedback e o vincula ao usuário solicitante
```

_Envio:_

```json
{
  "username": "admin",
  "value": 30
}
```

_Resposta:_

```json
{
  "data": {
    "id": 1,
    "value": 30,
    "createdAt": "2022-11-20T21:05:42.342Z",
    "creditAccount": 1,
    "newBalance": 70
  }
}
```

### POST/transactions/larissa?type=debit&&order=DESC

#### Descrição

```
    - Necessário o envio do token
    - Necessário passar o usuário logado na URL
    - Esta rota recebe 2 parâmetros opcionais para filtro:
        type: que recebe credit ou debit dependendo do que deseja filtrar
        order: que recebe ASC ou DESC dependendo da ordem que deseja filtrar por padrão recebe ASC
```

_Envio:_

```
Não é necessário um Body
```

### Caso não seja passado os paramatros opcionais retorna todas as transções realizadas pela conta separadas pela sua natureza:

_Resposta:_

```json
[
  {
    "creditTransaction": [
      {
        "data": {
          "id": 1,
          "value": 30,
          "createdAt": "2022-11-19T23:58:30.745Z",
          "creditAccount": 1,
          "newBalance": 70
        }
      }
    ],
    "debitTransaction": []
  }
]
```

### Caso os parametros forem passados retorna baseados nos filtros escolhidos por exemplo se type=credit e order=ASC:

_Resposta:_

```json
[
  {
    "id": 1,
    "value": 30,
    "createdAt": "2022-11-19T23:58:30.745Z",
    "creditAccount": {
      "id": 1,
      "balance": 70
    },
    "debitAccount": {
      "id": 2
    }
  }
]
```
