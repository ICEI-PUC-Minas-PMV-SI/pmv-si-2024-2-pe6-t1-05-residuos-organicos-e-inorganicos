# EcoPonto - Conecte-se Ao Futuro Sustentável

`CURSO: Sistemas de Informação`

`DISCIPLINA: Projeto - Arquitetura de Sistemas Distribuídos`

`SEMESTRE: 6º`

O projeto "EcoPonto" visa resolver os desafios relacionados à gestão de resíduos sólidos em áreas urbanas, facilitando o acesso dos cidadãos a informações sobre pontos de coleta de materiais recicláveis através da criação de um sistema web e um aplicativo móvel. O sistema web permitirá o cadastro e a atualização de pontos de coleta, permitindo que instituições registrem informações detalhadas como localização e tipos de resíduos aceitos. Já o aplicativo móvel exibirá um mapa interativo com os pontos de coleta, oferecendo funcionalidades de busca e filtragem para que os usuários possam facilmente encontrar os locais mais próximos e adequados para o descarte de seus resíduos.

## Integrantes

* Efraim Rocha da Silva
* Lucélia Augusta Silva Maia
* Marcelo Silvério da Cruz
* Mayderson Santos Mello
* Yuri Farnesio Sousa Silva

## Orientador

* Kleber Souza

# Planejamento

| Etapa         | Atividades |
|  :----:   | ----------- |
| ETAPA 1         |[Documentação de Contexto](docs/contexto.md) <br> |
| ETAPA 2         |[Planejar, desenvolver e gerenciar APIs e Web Services](docs/backend-apis.md) <br> |
| ETAPA 3         |[Planejar, desenvolver e gerenciar uma aplicação Web](docs/frontend-web.md) |
| ETAPA 4        |[Planejar, desenvolver e gerenciar uma aplicação Móvel](docs/frontend-mobile.md) <br>  |
| ETAPA 5         | [Apresentação](presentation/README.md) |

## Instruções de utilização Backend

## Implantação - Guia de Implantação em Produção (AWS - Ubuntu)

Este guia descreve como implantar a aplicação Node.js em um ambiente de produção usando a infraestrutura da AWS com uma instância Ubuntu.

### 1. Requisitos de Hardware e Software

#### Requisitos de Hardware

- **Instância EC2 (t2.micro)**: 1 vCPU, 1 GB de RAM.
- **Espaço em Disco**: 8 GB no EBS (Elastic Block Store).

#### Requisitos de Software

- **Node.js**: Versão 20.x ou superior
- **Yarn**: Gerenciador de pacotes Node.js
- **PostgreSQL**: Banco de dados relacional
- **PM2**: Gerenciador de processos para Node.js

### 2. Plataforma de Hospedagem

A aplicação será hospedada em uma instância EC2 da AWS rodando **Ubuntu**. O banco de dados será gerido pelo serviço **Amazon RDS** com PostgreSQL.

### 3. Configuração do Ambiente de Implantação

#### Passo 1: Criar Instância EC2

1. Acesse o [AWS Management Console](https://aws.amazon.com/console/) e inicie uma instância EC2.
2. Escolha a AMI **Ubuntu Server 22.04 LTS**.
3. Selecione o tipo de instância **t2.micro** (coberto pelo nível gratuito).
4. Configure um par de chaves (key pair) para acesso via SSH.

#### Passo 2: Configurar PostgreSQL com Amazon RDS

1. Crie uma instância do Amazon RDS com o PostgreSQL.
2. Configure o acesso público e salve a URL de conexão, usuário e senha.

#### Passo 3: Instalar Dependências no Servidor

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

#### Passo 4: Clonar o Repositório e Instalar Dependências

Dentro da instância EC2:

```bash
# Clone o repositório da aplicação
git clone https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2024-2-pe6-t1-05-residuos-organicos-e-inorganicos.git
cd pmv-si-2024-2-pe6-t1-05-residuos-organicos-e-inorganicos

# Instale as dependências
npm install
```

#### Passo 5: Configurar Variáveis de Ambiente

Crie um arquivo `.env` com as variáveis de ambiente:

```bash
POSTGRES_HOST=localhost
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_DB=database_name
```

### 4. Deploy da Aplicação

#### Rodar Migrations e Seed

```bash
yarn knex:migrate
yarn knex:seed
```

Iniciar a Aplicação com PM2

```bash
pm2 start dist/src/server.js --name "ecoponto-api"
pm2 save
pm2 startup
```

# Código

<li><a href="src/README.md">Código Fonte</a></li>

# Apresentação

<li><a href="presentation/README.md">Apresentação da solução</a></li>
