# Introdução

A gestão de resíduos sólidos representa um desafio crescente nas áreas urbanas, agravado pela falta de infraestruturas adequadas para coleta e destinação correta dos materiais recicláveis. Este problema é acentuado pela ausência de informações claras e acessíveis sobre onde e como descartar os resíduos de forma ambientalmente responsável. A carência de informações e a dificuldade em acessar os pontos de coleta apropriados levam ao descarte inadequado, o que contribui para a poluição ambiental, desperdício de recursos recicláveis e sobrecarga dos aterros sanitários.

Um exemplo evidente desse problema pode ser observado em São Paulo, Brasil, onde, apesar de ser uma das cidades com o maior programa de coleta seletiva do país, apenas 23% dos resíduos sólidos são reciclados. Muitos cidadãos enfrentam dificuldades em encontrar pontos de coleta apropriados, o que desestimula a prática da reciclagem e contribui para a poluição ambiental e sobrecarga dos aterros sanitários (Prefeitura de São Paulo, 2023).

Para enfrentar esses desafios, é preciso criar um sistema integrado que facilite o acesso às informações sobre reciclagem e incentive práticas sustentáveis, através do acesso à pontos de coleta de materiais recicláveis, promovendo assim, bons hábitos para a população de maneira eficaz e simplificada.

## Problema
A ausência de informações claras e acessíveis sobre a localização e os tipos de materiais aceitos pelos pontos de coleta representa uma barreira significativa. Mesmo quando os pontos de coleta estão disponíveis, a falta de uma plataforma centralizada que permita aos cidadãos encontrar facilmente essas informações torna o processo de reciclagem inconveniente. Essa situação desmotiva a população a adotar práticas de reciclagem e perpetua o problema da gestão inadequada de resíduos.

## Objetivo Geral:

Desenvolver um sistema completo que permita o cadastro de pontos de coleta de materiais recicláveis, com uma interface de administração para gestores e um aplicativo móvel para que os cidadãos possam localizar facilmente os pontos de coleta próximos a eles.

### Objetivos Especificos:

> - Criar um sistema web para cadastro de pontos de coleta.
> - Desenvolver um aplicativo móvel que exiba um mapa com a localização dos pontos de coleta.
> - Implementar funcionalidades de busca e filtragem no aplicativo móvel para facilitar a localização de pontos de coleta específicos.
> - Promover a conscientização ambiental e incentivar a reciclagem na comunidade.

## Justificativa

Descreva a importância ou a motivação para trabalhar com esta aplicação que você escolheu. Indique as razões pelas quais você escolheu seus objetivos específicos ou as razões para aprofundar em certos aspectos do software.

O grupo de trabalho pode fazer uso de questionários, entrevistas e dados estatísticos, que podem ser apresentados, com o objetivo de esclarecer detalhes do problema que será abordado pelo grupo.

## Público-Alvo

Descreva quem serão as pessoas que usarão a sua aplicação indicando os diferentes perfis. O objetivo aqui não é definir quem serão os clientes ou quais serão os papéis dos usuários na aplicação. A ideia é, dentro do possível, conhecer um pouco mais sobre o perfil dos usuários: conhecimentos prévios, relação com a tecnologia, relações
hierárquicas, etc.

# Especificações do Projeto

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade de requisitos, aplicar uma técnica de priorização de requisitos e detalhar como a técnica foi aplicada.

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| Permitir que o usuário cadastre tarefas | ALTA | 
|RF-002| Emitir um relatório de tarefas no mês   | MÉDIA |

### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| O sistema deve ser responsivo para rodar em um dispositivos móvel | MÉDIA | 
|RNF-002| Deve processar requisições do usuário em no máximo 3s |  BAIXA | 

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| Não pode ser desenvolvido um módulo de backend        |


# Catálogo de Serviços

### Serviço de Cadastro e Edição de Pontos de Coleta

**Descrição:**  
Este serviço permite o cadastro e a gestão de pontos de coleta de materiais recicláveis no sistema. As instituições de coleta podem registrar suas informações, como nome, endereço, tipos de resíduos aceitos, e outras informações relevantes.

**Funcionalidades:**

- Cadastro de novos pontos de coleta.
- Atualização de informações de pontos de coleta existentes.
- Exclusão de pontos de coleta, se necessário.
- Validação de dados de endereço e seleção dos tipos de resíduos aceitos.

### Serviço de Exibição de Mapa com Pontos de Coleta

**Descrição:**  
Este serviço oferece uma visualização de mapa interativo, permitindo que os usuários localizem pontos de coleta cadastrados. O mapa inclui filtros por tipo de material reciclável para facilitar a busca.

**Funcionalidades:**

- Exibição de mapa geográfico com todos os pontos de coleta.
- Filtro por tipo de resíduo (plástico, papel/papelão, resíduos eletrônicos).
- Exibição de informações detalhadas ao clicar em um ponto de coleta.
- Integração com OpenStreetMap.

# Arquitetura da Solução

Definição de como o software é estruturado em termos dos componentes que fazem parte da solução e do ambiente de hospedagem da aplicação.

![application](https://github.com/user-attachments/assets/4b37be46-1a96-4448-865c-87c299962e77)

## Tecnologias Utilizadas

- Linguagens:
  - Typescript: Linguagem tipada, baseada no JavaScript, que será utilizada no desenvolvimento do frontend (React e React Native) e backend (Node.js).
- Frontend (Web):
  - React: Framework JavaScript para construir a interface do usuário do projeto web.
  - Next.js: Framework React utilizado para desenvolvimento fullstack com renderização server-side e geração de sites estáticos.
  - Tailwind CSS: Framework utilitário de CSS utilizado para estilizar os componentes do frontend.
  - Leaflet: Biblioteca JavaScript utilizada para exibir mapas interativos no projeto web.
  - React Dropzone: Biblioteca utilizada para implementar áreas de drop para uploads de arquivos.
- Frontend (Mobile):
  - React Native: Framework para o desenvolvimento do aplicativo mobile.
  - Expo: Plataforma usada no desenvolvimento do app mobile com React Native, que facilita o processo de construção, deploy e publicação.
  - expo-location: Biblioteca utilizada para obter a localização do dispositivo no app mobile.
  - React Native Maps: Biblioteca utilizada para exibir mapas no aplicativo mobile.
- Backend:
  - Node.js: Ambiente de execução JavaScript no backend.
  - Express.js: Framework minimalista utilizado para criar a API REST.
  - Knex.js: Query builder SQL usado para interagir com o banco de dados PostgreSQL de maneira mais flexível e eficiente.
  - Multer: Middleware utilizado para fazer o upload de arquivos no backend.
  - PostgreSQL: Banco de dados relacional utilizado para armazenar e gerenciar os dados da aplicação.
- Ferramentas e IDE:
  - VSCode: Ambiente de desenvolvimento integrado (IDE) para escrever e testar o código.
  - Postman: Ferramenta utilizada para testar e documentar as APIs REST.
  - Figma: Ferramenta utilizada para criação de layouts e protótipos.
 
Apresente também uma figura explicando como as tecnologias estão relacionadas ou como uma interação do usuário com o sistema vai ser conduzida, por onde ela passa até retornar uma resposta ao usuário.

## Hospedagem

Explique como a hospedagem e o lançamento da plataforma foi feita.

> **Links Úteis**:
>
> - [Website com GitHub Pages](https://pages.github.com/)
> - [Programação colaborativa com Repl.it](https://repl.it/)
> - [Getting Started with Heroku](https://devcenter.heroku.com/start)
> - [Publicando Seu Site No Heroku](http://pythonclub.com.br/publicando-seu-hello-world-no-heroku.html)

## Referências Bibliográficas 

Prefeitura de São Paulo. (2023). Programa de Coleta Seletiva. Disponível em: https://www.prefeitura.sp.gov.br/cidade/secretarias/meio_ambiente/coleta_seletiva/index.php. Acesso em: 25 ago. 2024.
