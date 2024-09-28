# APIs e Web Services

O projeto "EcoPonto" desenvolve uma aplicação de APIs Web para gerenciar pontos de coleta de materiais recicláveis em áreas urbanas, facilitando o acesso a informações sobre coleta seletiva. A plataforma permitirá o cadastro e a atualização de pontos de coleta por gestores através de uma interface web, e ajudará os cidadãos a localizar pontos de coleta próximos por meio de um aplicativo móvel.

## Objetivos da API "EcoPonto"

- Facilitar a Gestão de Pontos de Coleta: A API deve permitir que gestores cadastrem, atualizem, consultem e excluam informações sobre pontos de coleta de materiais recicláveis, como localização, horários de funcionamento e tipos de materiais aceitos.

- Proporcionar Acesso Centralizado a Informações: A API deve oferecer um acesso centralizado e eficiente às informações sobre os pontos de coleta, tanto para gestores quanto para cidadãos, através de uma interface web e um aplicativo móvel.

- Promover a Reciclagem e a Conscientização Ambiental: Os serviços e APIs desenvolvidas se integrarão para formar uma ferramenta, e assim, incentivar a participação dos cidadãos nos programas de reciclagem, facilitando a localização de pontos de coleta e fornecendo informações relevantes sobre práticas sustentáveis.

- Segurança e Conformidade com a LGPD: A API deve garantir a segurança dos dados dos usuários e estar em conformidade com a Lei Geral de Proteção de Dados (LGPD), protegendo informações sensíveis e garantindo a privacidade dos usuários.

- Escalabilidade e Eficiência: A API deve ser escalável para suportar um grande número de usuários e operações simultâneas, mantendo um tempo de resposta eficiente para uma experiência de usuário satisfatória.

- Funcionalidades de Busca e Filtragem: A API deve fornecer recursos para busca e filtragem de pontos de coleta por localização, tipo de material aceito, e outros critérios relevantes, facilitando o acesso às informações específicas que os usuários precisam.

## Arquitetura

[Descrição da arquitetura das APIs, incluindo os componentes e suas interações.]

A API segue a arquitetura MVC (Model-View-Controller), organizada de forma modular para facilitar a manutenção e escalabilidade. Os principais componentes incluem:

- **Controladores (Controllers):** Responsáveis por lidar com as requisições e respostas HTTP, delegando a lógica de negócios e interações com o banco de dados.

  - `ItemsController.ts`: Gera informações relacionadas aos itens recicláveis.
  - `PointsController.ts`: Gerencia os pontos de coleta, fornecendo funções como criação, atualização e remoção de pontos.
  - `UsersController.ts`: Autenticação e gerenciamento de usuários.

- **Middlewares:**

  - `authMiddleware.ts`: Verifica se o token JWT é válido e não expirou, garantindo que apenas usuários autenticados tenham acesso a certas rotas.

- **Banco de Dados:**

  - Utiliza PostgreSQL para armazenamento, com a biblioteca Knex.js como query builder para facilitar as consultas SQL.
  - Migrations e seeds estão configurados para gerenciar a estrutura do banco de dados e inicializar dados, como tipos de materiais.

- **Configuração de Upload:**
  - `multer.ts`: Configura o Multer para permitir o upload de imagens, como as associadas aos pontos de coleta.

## Modelagem da Aplicação

[Descreva a modelagem da aplicação, incluindo a estrutura de dados, diagramas de classes ou entidades, e outras representações visuais relevantes.]

A modelagem da aplicação é composta por quatro tabelas principais:

1. **points**: Armazena informações sobre os pontos de coleta.

   - Campos: `id`, `image`, `name`, `email`, `whatsapp`, `latitude`, `longitude`, `city`, `uf`.

2. **items**: Armazena informações sobre os tipos de materiais aceitos.

   - Campos: `id`, `image`, `title`.

3. **point_items**: Tabela de relacionamento que vincula os pontos de coleta aos itens aceitos.

   - Campos: `id`, `point_id`, `item_id`.

4. **users**: Gerencia os dados dos usuários cadastrados na plataforma.
   - Campos: `id`, `name`, `email`, `password`, `created_at`, `updated_at`.

### Diagrama

![ecoponto-diagram](../.github/ecoponto-diagram.png)

## Fluxo de Dados

[Diagrama ou descrição do fluxo de dados na aplicação.]

1. **Usuário (cidadão ou gestor)** interage com a **interface web ou mobile**.
2. O cliente faz uma requisição HTTP à API, acessando os endpoints de pontos de coleta, itens ou autenticação.
3. A API processa a requisição, interagindo com o banco de dados conforme necessário.
4. A resposta é retornada ao cliente, contendo os dados solicitados ou mensagens de sucesso/erro.

## Requisitos Funcionais

[Liste os principais requisitos funcionais da aplicação.]

1. Cadastrar novos pontos de coleta com imagem, localização e materiais aceitos.
2. Atualizar informações de pontos de coleta existentes.
3. Excluir pontos de coleta.
4. Listar e filtrar pontos de coleta por localização, tipo de material aceito, entre outros critérios.
5. Autenticação de usuários via JWT.
6. Upload de imagens associadas aos pontos de coleta.

## Requisitos Não Funcionais

[Liste os principais requisitos não funcionais da aplicação, como desempenho, segurança, escalabilidade, etc.]

1. **Desempenho:** A API deve ser capaz de processar requisições em menos de 500ms para garantir uma experiência fluida.
2. **Segurança:** Todas as operações sensíveis devem ser protegidas por autenticação JWT e estar em conformidade com a LGPD.
3. **Escalabilidade:** A arquitetura deve permitir o crescimento da base de usuários sem perda de desempenho.
4. **Manutenibilidade:** O código deve ser modular e seguir boas práticas de desenvolvimento, facilitando futuras manutenções.

## Tecnologias Utilizadas

[Lista das tecnologias principais que serão utilizadas no projeto.]

- **Node.js**: Ambiente de execução JavaScript.
- **Express**: Framework web para Node.js.
- **Knex.js**: Query builder SQL.
- **PostgreSQL**: Banco de dados relacional.
- **Multer**: Middleware para upload de arquivos.
- **bcrypt**: Para hashing de senhas.
- **jsonwebtoken**: Para autenticação JWT.
- **TypeScript**: Superconjunto do JavaScript com tipagem estática.

## API Endpoints

[Liste os principais endpoints da API, incluindo as operações disponíveis, os parâmetros esperados e as respostas retornadas.]

A API "EcoPonto" oferece uma série de endpoints que permitem a interação com o sistema de gestão de pontos de coleta de materiais recicláveis. Abaixo estão descritos os principais endpoints, seus métodos, parâmetros e as respostas esperadas.

## Usuários

### Autenticar Usuário

- **Método**: POST
- **URL**: /users/auth
- **Descrição**: Autentica um usuário e retorna um token JWT.
- **Parâmetros**:
  - Corpo da requisição (JSON):
    ```json
    {
      "email": "user@example.com",
      "password": "userpassword"
    }
    ```
- **Resposta**:
  - Sucesso (200 OK)
    ```json
    {
      "token": "jwt-token"
    }
    ```
  - Erro (401 Unauthorized)
    ```json
    {
      "message": "Email ou senha inválidos."
    }
    ```
  - Erro (500 Internal Server Error)
    ```json
    {
      "message": "Erro ao autenticar usuário."
    }
    ```

### Listar Usuários

- **Método**: GET
- **URL**: /users
- **Descrição**: Retorna uma lista paginada de usuários.
- **Parâmetros**:
  - `page`: Número da página.
  - `limit`: Quantidade de usuários por página.
- **Resposta**:
  - Sucesso (200 OK)
    ```json
    {
      "data": [
        {
          "id": 1,
          "name": "John Doe",
          "email": "johndoe@gmail.com",
          "created_at": "2024-09-24 18:35:20",
          "updated_at": "2024-09-24 18:36:31"
        }
      ],
      "pagination": {
        "totalItems": 2,
        "totalPages": 2,
        "currentPage": 1,
        "limit": 1
      }
    }
    ```
  - Erro (401 Unauthorized)
    ```json
    {
      "message": "Token não fornecido." | "Token inválido ou expirado."
    }
    ```
  - Erro (500 Internal Server Error)
    ```json
    {
      "message": "Erro ao listar usuários."
    }
    ```

### Detalhar Usuário

- **Método**: GET
- **URL**: /users/:id
- **Descrição**: Retorna os detalhes de um usuário específico.
- **Parâmetros**:
  - `id`: ID do usuário (na URL).
- **Resposta**:
  - Sucesso (200 OK)
    ```json
    {
      "id": 1,
      "name": "John Doe",
      "email": "johndoe@gmail.com",
      "created_at": "2024-09-24 18:35:20",
      "updated_at": "2024-09-24 18:36:31"
    }
    ```
  - Erro (401 Unauthorized)
    ```json
    {
      "message": "Token não fornecido." | "Token inválido ou expirado."
    }
    ```
  - Erro (404 Not Found)
    ```json
    {
      "message": "Usuário não encontrado."
    }
    ```
  - Erro (500 Internal Server Error)
    ```json
    {
      "message": "Erro ao obter usuário."
    }
    ```

### Criar Usuário

- **Método**: POST
- **URL**: /users
- **Descrição**: Cria um novo usuário.
- **Parâmetros**:
  - Corpo da requisição (JSON):
    ```json
    {
      "name": "User Name",
      "email": "user@example.com",
      "password": "userpassword"
    }
    ```
- **Resposta**:
  - Sucesso (201 Created)
    ```json
    {
      "id": 1,
      "name": "User Name",
      "email": "user@example.com"
    }
    ```
  - Erro (400 Bad Request)
    ```json
    {
      "message": "Email já está em uso."
    }
    ```
  - Erro (401 Unauthorized)
    ```json
    {
      "message": "Token não fornecido." | "Token inválido ou expirado."
    }
    ```
  - Erro (500 Internal Server Error)
    ```json
    {
      "message": "Erro ao criar usuário."
    }
    ```

### Atualizar Usuário

- **Método**: PUT
- **URL**: /users/:id
- **Descrição**: Atualiza os dados de um usuário existente.
- **Parâmetros**:
  - `id`: ID do usuário (na URL).
  - Corpo da requisição (JSON):
    ```json
    {
      "name": "Updated Name",
      "email": "updated@example.com",
      "password": "newpassword"
    }
    ```
- **Resposta**:
  - Sucesso (200 OK)
    ```json
    {
      "message": "Usuário atualizado com sucesso."
    }
    ```
  - Erro (400 Bad Request)
    ```json
    {
      "message": "Email já está em uso."
    }
    ```
  - Erro (401 Unauthorized)
    ```json
    {
      "message": "Token não fornecido." | "Token inválido ou expirado."
    }
    ```
  - Erro (404 Not Found)
    ```json
    {
      "message": "Usuário não encontrado."
    }
    ```
  - Erro (500 Internal Server Error)
    ```json
    {
      "message": "Erro ao atualizar usuário."
    }
    ```

### Deletar Usuário

- **Método**: DELETE
- **URL**: /users/:id
- **Descrição**: Remove um usuário existente.
- **Parâmetros**:
  - `id`: ID do usuário (na URL).
- **Resposta**:
  - Sucesso (204 No Content)
  - Erro (401 Unauthorized)
    ```json
    {
      "message": "Token não fornecido." | "Token inválido ou expirado."
    }
    ```
  - Erro (404 Not Found)
    ```json
    {
      "message": "Usuário não encontrado."
    }
    ```
  - Erro (500 Internal Server Error)
    ```json
    {
      "message": "Erro ao deletar usuário."
    }
    ```

## Pontos de Coleta

### Listar Pontos de Coleta

- **Método**: GET
- **URL**: /points
- **Descrição**: Retorna uma lista de pontos de coleta.
- **Parâmetros**:
  - `page`: Número da página.
  - `limit`: Quantidade de usuários por página.
  - `city`: Cidade para filtrar os pontos.
  - `uf`: Estado (UF) para filtrar os pontos.
  - `items`: IDs dos itens recicláveis separados por vírgula para filtrar pontos que aceitam esses itens.
- **Resposta**:
  - Sucesso (200 OK)
    ```json
    {
      "data": [
        {
          "id": 1,
          "image": "image01.jpg",
          "name": "John Doe",
          "email": "johndoe@gmail.com",
          "whatsapp": "123456789",
          "latitude": -23.55052,
          "longitude": -46.633308,
          "city": "São Paulo",
          "uf": "SP",
          "image_url": ".../uploads/image01.jpg"
        }
      ],
      "pagination": {
        "totalItems": 2,
        "totalPages": 2,
        "currentPage": 1,
        "limit": 1
      }
    }
    ```
  - Erro (401 Unauthorized)
    ```json
    {
      "message": "Token não fornecido." | "Token inválido ou expirado."
    }
    ```

### Detalhar Ponto de Coleta

- **Método**: GET
- **URL**: /points/:id
- **Descrição**: Retorna os detalhes de um ponto de coleta específico.
- **Parâmetros**:
  - `id`: ID do ponto de coleta (na URL).
- **Resposta**:
  - Sucesso (200 OK)
    ```json
    {
      "point": {
        "id": 1,
        "image": "image01.jpg",
        "name": "John Doe",
        "email": "johndoe@gmail.com",
        "whatsapp": "123456789",
        "latitude": -23.55052,
        "longitude": -46.633308,
        "city": "São Paulo",
        "uf": "SP",
        "image_url": ".../uploads/image01.jpg"
      },
      "items": {
        "title": "Pápeis e Papelão"
      }
    }
    ```
  - Erro (401 Unauthorized)
    ```json
    {
      "message": "Token não fornecido." | "Token inválido ou expirado."
    }
    ```
  - Erro (404 Not Found)
    ```json
    {
      "message": "Ponto não encontrado."
    }
    ```

### Criar Ponto de Coleta

- **Método**: POST
- **URL**: /points
- **Descrição**: Cria um novo ponto de coleta.
- **Parâmetros**:
  - Corpo da requisição `FormData`:
    ```json
    {
      "name": "John Doe",
      "email": "johndoe@gmail.com",
      "whatsapp": "123456789",
      "latitude": -23.550520,
      "longitude": -46.633308,
      "city": "São Paulo",
      "uf": "SP",
      "items": "1,2,3",
      "image": File
    }
    ```
- **Resposta**:
  - Sucesso (201 Created)
    ```json
    {
      "id": 1,
      "image": "image01.jpg",
      "name": "John Doe",
      "email": "johndoe@gmail.com",
      "whatsapp": "123456789",
      "latitude": -23.55052,
      "longitude": -46.633308,
      "city": "São Paulo",
      "uf": "SP"
    }
    ```
  - Erro (401 Unauthorized)
    ```json
    {
      "message": "Token não fornecido." | "Token inválido ou expirado."
    }
    ```
  - Erro (500 Internal Server Error)
    ```json
    {
      "message": "Não foi possível criar o ponto, verifique as informações enviadas e tente novamente."
    }
    ```

### Atualizar Ponto de Coleta

- **Método**: PUT
- **URL**: /points/:id
- **Descrição**: Atualiza os dados de um ponto de coleta existente.
- **Parâmetros**:
  - `id`: ID do ponto de coleta (na URL).
  - Corpo da requisição `FormData`:
    ```json
    {
      "name": "Updated Name",
      "email": "updated@example.com",
      "whatsapp": "123456789",
      "latitude": -23.550520,
      "longitude": -46.633308,
      "city": "São Paulo",
      "uf": "SP",
      "items": "1,2,3",
      "image": File
    }
    ```
- **Resposta**:
  - Sucesso (200 OK)
    ```json
    {
      "point": {
        "id": 1,
        "image": "image01.jpg",
        "name": "Updated Name",
        "email": "updated@example.com",
        "whatsapp": "123456789",
        "latitude": -23.55052,
        "longitude": -46.633308,
        "city": "São Paulo",
        "uf": "SP"
      }
    }
    ```
  - Erro (401 Unauthorized)
    ```json
    {
      "message": "Token não fornecido." | "Token inválido ou expirado."
    }
    ```
  - Erro (404 Not Found)
    ```json
    {
      "message": "Ponto não encontrado."
    }
    ```
  - Erro (500 Internal Server Error)
    ```json
    {
      "message": "Não foi possível atualizar o ponto. Tente novamente mais tarde."
    }
    ```

### Deletar Ponto de Coleta

- **Método**: DELETE
- **URL**: /points/:id
- **Descrição**: Remove um ponto de coleta existente.
- **Parâmetros**:
  - `id`: ID do ponto de coleta (na URL).
- **Resposta**:
  - Sucesso (204 No Content)
  - Erro (401 Unauthorized)
    ```json
    {
      "message": "Token não fornecido." | "Token inválido ou expirado."
    }
    ```
  - Erro (404 Not Found)
    ```json
    {
      "message": "Ponto não encontrado."
    }
    ```
  - Erro (500 Internal Server Error)
    ```json
    {
      "message": "Não foi possível deletar o ponto. Tente novamente mais tarde."
    }
    ```

## Itens

### Listar Itens

- **Método**: GET
- **URL**: /items
- **Descrição**: Retorna uma lista de itens.
- **Parâmetros**:
- **Resposta**:
  - Sucesso (200 OK)
    ```json
    [
      {
        "id": 1,
        "title": "Lâmpadas",
        "image_url": ".../uploads/lampadas.svg"
      },
    ],
    ```
  - Erro (401 Unauthorized)
    ```json
    {
      "message": "Token não fornecido." | "Token inválido ou expirado."
    }
    ```

## Considerações de Segurança

[Discuta as considerações de segurança relevantes para a aplicação distribuída, como autenticação, autorização, proteção contra ataques, etc.]

A API "EcoPonto" adota práticas de segurança para garantir a proteção de dados e a privacidade dos usuários, com especial atenção à conformidade com a LGPD (Lei Geral de Proteção de Dados). As principais considerações de segurança incluem:

- **Autenticação e Autorização**: A autenticação de usuários é feita utilizando tokens JWT (JSON Web Tokens), garantindo que apenas usuários autenticados possam acessar rotas protegidas. O middleware de autenticação verifica se o token é válido e não expirado, e protege as rotas sensíveis.

- **Criptografia de Senhas**: As senhas dos usuários são criptografadas usando o bcrypt antes de serem armazenadas no banco de dados. Isso garante que, mesmo que o banco de dados seja comprometido, as senhas não serão expostas de forma legível.

- **Proteção contra Ataques CSRF/XSS**: O uso do CORS (Cross-Origin Resource Sharing) está configurado para limitar os domínios que podem interagir com a API, prevenindo ataques de Cross-Site Scripting (XSS) e Cross-Site Request Forgery (CSRF).

- **Validação de Dados**: Todos os dados enviados para a API são validados para garantir que estejam no formato correto e não representem risco à segurança da aplicação. Isso inclui validação de entradas de usuários e sanitização para prevenir injeções de código.

- **Atualização de Dependências**: As dependências da API são mantidas atualizadas para evitar vulnerabilidades conhecidas em bibliotecas de terceiros.

## Implantação

[Instruções para implantar a aplicação distribuída em um ambiente de produção.]

1. Defina os requisitos de hardware e software necessários para implantar a aplicação em um ambiente de produção.
2. Escolha uma plataforma de hospedagem adequada, como um provedor de nuvem ou um servidor dedicado.
3. Configure o ambiente de implantação, incluindo a instalação de dependências e configuração de variáveis de ambiente.
4. Faça o deploy da aplicação no ambiente escolhido, seguindo as instruções específicas da plataforma de hospedagem.
5. Realize testes para garantir que a aplicação esteja funcionando corretamente no ambiente de produção.

# API Node.js - Guia de Implantação em Produção (AWS - Ubuntu)

Este guia descreve como implantar a aplicação Node.js em um ambiente de produção usando a infraestrutura da AWS com uma instância Ubuntu.

## 1. Requisitos de Hardware e Software

### Requisitos de Hardware

- **Instância EC2 (t2.micro)**: 1 vCPU, 1 GB de RAM.
- **Espaço em Disco**: 8 GB no EBS (Elastic Block Store).

### Requisitos de Software

- **Node.js**: Versão 18.x ou superior
- **NPM**: Gerenciador de pacotes Node.js
- **PostgreSQL**: Banco de dados relacional
- **PM2**: Gerenciador de processos para Node.js

## 2. Plataforma de Hospedagem

A aplicação será hospedada em uma instância EC2 da AWS rodando **Ubuntu**. O banco de dados será gerido pelo serviço **Amazon RDS** com PostgreSQL.

## 3. Configuração do Ambiente de Implantação

### Passo 1: Criar Instância EC2

1. Acesse o [AWS Management Console](https://aws.amazon.com/console/) e inicie uma instância EC2.
2. Escolha a AMI **Ubuntu Server 22.04 LTS**.
3. Selecione o tipo de instância **t2.micro** (coberto pelo nível gratuito).
4. Configure um par de chaves (key pair) para acesso via SSH.

### Passo 2: Configurar PostgreSQL com Amazon RDS

1. Crie uma instância do Amazon RDS com o PostgreSQL.
2. Configure o acesso público e salve a URL de conexão, usuário e senha.

### Passo 3: Instalar Dependências no Servidor

Conecte-se à sua instância EC2 via SSH e instale as dependências necessárias:

```bash
# Atualize o sistema
sudo apt update && sudo apt upgrade -y

# Instale Node.js e NPM
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Instale o PostgreSQL client
sudo apt install postgresql-client -y

# Instale PM2
sudo npm install pm2 -g
```

### Passo 4: Clonar o Repositório e Instalar Dependências

Dentro da instância EC2:

```bash
# Clone o repositório da aplicação
git clone https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2024-2-pe6-t1-05-residuos-organicos-e-inorganicos.git
cd pmv-si-2024-2-pe6-t1-05-residuos-organicos-e-inorganicos

# Instale as dependências
npm install
```

### Passo 5: Configurar Variáveis de Ambiente

Crie um arquivo `.env` com as variáveis de ambiente:

```bash
PORT=3333
DATABASE_URL=postgres://user:password@rds-endpoint.amazonaws.com:5432/database_name
JWT_SECRET=seu-segredo-jwt
```

## 4. Deploy da Aplicação

### Rodar Migrations e Seed

```bash
npm run knex:migrate
npm run knex:seed
```

Iniciar a Aplicação com PM2

```bash
pm2 start dist/src/server.js --name "ecoponto-api"
pm2 save
pm2 startup
```

## Testes

[Descreva a estratégia de teste, incluindo os tipos de teste a serem realizados (unitários, integração, carga, etc.) e as ferramentas a serem utilizadas.]

1. Crie casos de teste para cobrir todos os requisitos funcionais e não funcionais da aplicação.
2. Implemente testes unitários para testar unidades individuais de código, como funções e classes.
3. Realize testes de integração para verificar a interação correta entre os componentes da aplicação.
4. Execute testes de carga para avaliar o desempenho da aplicação sob carga significativa.
5. Utilize ferramentas de teste adequadas, como frameworks de teste e ferramentas de automação de teste, para agilizar o processo de teste.

# Estratégia de Teste End-to-End (E2E) para Aplicação Node.js

## 1. Objetivo dos Testes E2E

Os testes End-to-End (E2E) têm como objetivo validar o fluxo completo da aplicação, simulando o comportamento do usuário e garantindo que todos os componentes funcionem corretamente em conjunto. Esses testes verificam desde a requisição HTTP até a interação com o banco de dados e as respostas da API.

## 2. Testes Realizados

### 2.1 Testes de Endpoints de Itens (Items)

- **Objetivo**: Validar o funcionamento do endpoint de listagem de itens.
- **Cenário Testado**: Enviar uma requisição `GET` para `/items` e verificar se o retorno contém uma lista de itens.
- **Validação**: O retorno deve ter o status 200 e o corpo da resposta deve ser um array de itens.

### 2.2 Testes de Endpoints de Pontos (Points)

- **Objetivo**: Testar todas as funcionalidades dos pontos de coleta.

#### Cenários Testados:

1. **Criação de Ponto**:

   - **Requisição**: `POST` para `/points` com dados de um novo ponto (nome, e-mail, coordenadas, etc.) e um arquivo de imagem via `FormData`.
   - **Validação**: Status 200, com o corpo da resposta contendo o ID do novo ponto criado.

2. **Listagem de Pontos**:

   - **Requisição**: `GET` para `/points`.
   - **Validação**: Status 200, retorno contendo uma lista de todos os pontos cadastrados.

3. **Busca por ID**:

   - **Requisição**: `GET` para `/points/:id`.
   - **Validação**: Status 200, retorno contendo os detalhes de um ponto específico, incluindo nome, e-mail, itens associados e localização.

4. **Filtragem de Pontos**:
   - **Requisição**: `GET` para `/points`, com parâmetros de filtro, como cidade, estado e itens coletados.
   - **Validação**: Status 200, retorno contendo apenas os pontos que correspondem aos critérios de filtragem fornecidos.

### 2.3 Testes de Endpoints de Usuários (Users)

- **Objetivo**: Validar todas as funcionalidades relacionadas aos usuários.

#### Cenários Testados:

1. **Criação de Usuário**:

   - **Requisição**: `POST` para `/users` com dados de nome, e-mail e senha.
   - **Validação**: Status 201, com o corpo da resposta contendo o ID do novo usuário criado. O teste também garante que e-mails duplicados não possam ser registrados.

2. **Listagem de Usuários**:

   - **Requisição**: `GET` para `/users`.
   - **Validação**: Status 200, retorno contendo uma lista de todos os usuários registrados.

3. **Busca por ID**:

   - **Requisição**: `GET` para `/users/:id`.
   - **Validação**: Status 200, retorno contendo os detalhes de um usuário específico, incluindo nome e e-mail.

4. **Atualização de Usuário**:

   - **Requisição**: `PUT` para `/users/:id` com novos dados de nome e senha.
   - **Validação**: Status 200, confirmação de que os dados do usuário foram atualizados corretamente.

5. **Exclusão de Usuário**:
   - **Requisição**: `DELETE` para `/users/:id`.
   - **Validação**: Status 200, confirmação de que o usuário foi removido com sucesso do banco de dados.

## 3. Ferramentas Utilizadas

- **Jest**: Utilizado para estruturar e executar os testes E2E de forma automatizada.
- **Supertest**: Biblioteca para simular requisições HTTP aos endpoints da aplicação e verificar as respostas retornadas.

## 4. Vantagens dos Testes E2E

- Garantem que toda a aplicação está funcionando conforme o esperado, incluindo a integração entre os diferentes componentes.
- Simulam cenários reais de uso, validando a experiência completa do usuário.
- Detectam possíveis problemas de integração entre o frontend, backend e banco de dados.

Os testes E2E foram implementados para garantir a qualidade de todos os endpoints críticos da aplicação, como listagem e criação de itens, pontos de coleta e usuários. Eles asseguram que o fluxo completo esteja correto e estável, desde a requisição até a persistência no banco de dados.

# Referências

Inclua todas as referências (livros, artigos, sites, etc) utilizados no desenvolvimento do trabalho.
