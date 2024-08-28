# Introdução

A gestão de resíduos sólidos representa um desafio crescente nas áreas urbanas, agravado pela falta de infraestruturas adequadas para coleta e destinação correta dos materiais recicláveis. Este problema é acentuado pela ausência de informações claras e acessíveis sobre onde e como descartar os resíduos de forma ambientalmente responsável. A carência de informações e a dificuldade em acessar os pontos de coleta apropriados levam ao descarte inadequado, o que contribui para a poluição ambiental, desperdício de recursos recicláveis e sobrecarga dos aterros sanitários.

Um exemplo evidente desse problema pode ser observado em São Paulo, Brasil, onde, apesar de ser uma das cidades com o maior programa de coleta seletiva do país, apenas 23% dos resíduos sólidos são reciclados. Muitos cidadãos enfrentam dificuldades em encontrar pontos de coleta apropriados, o que desestimula a prática da reciclagem e contribui para a poluição ambiental e sobrecarga dos aterros sanitários (Prefeitura de São Paulo, 2023).

De acordo com a Organização das Nações Unidas (ONU), cerca de 2,01 bilhões de toneladas de resíduos sólidos urbanos são gerados anualmente em todo o mundo, e apenas 19% desses resíduos são reciclados ou compostados. 

Para enfrentar esses desafios, é preciso criar um sistema integrado que facilite o acesso às informações sobre reciclagem e incentive práticas sustentáveis, através do acesso à pontos de coleta de materiais recicláveis, promovendo assim, bons hábitos para a população de maneira eficaz e simplificada.

## Problema
A ausência de informações claras e acessíveis sobre a localização e os tipos de materiais aceitos pelos pontos de coleta representa uma barreira significativa. Mesmo quando os pontos de coleta estão disponíveis, a falta de uma plataforma centralizada que permita aos cidadãos encontrar facilmente essas informações torna o processo de reciclagem inconveniente. Essa situação desmotiva a população a adotar práticas de reciclagem e perpetua o problema da gestão inadequada de resíduos.

## Objetivo Geral:

Desenvolver um sistema distruibuído que permita o cadastro de pontos de coleta de materiais recicláveis, com uma interface de administração para gestores e um aplicativo móvel para que os cidadãos possam localizar facilmente os pontos de coleta próximos a eles.

### Objetivos Especificos:

 - Criar um sistema web para cadastro de pontos de coleta.
 - Desenvolver um aplicativo móvel que exiba um mapa com a localização dos pontos de coleta.
 - Implementar funcionalidades de busca e filtragem no aplicativo móvel para facilitar a localização de pontos de coleta específicos.
 - Promover a conscientização ambiental e incentivar a reciclagem na comunidade.

## Justificativa

O Projeto "EcoPonto" surge como uma resposta à urgente necessidade de combater o descarte inadequado de resíduos sólidos nas cidades. Com a criação de um sistema web e um aplicativo mobile que centralizam informações sobre pontos de coleta de materiais recicláveis, incluindo localizações, horários de funcionamento e tipos de materiais aceitos, busca-se superar a dificuldade de acesso a esses dados, uma das principais barreiras à adoção de práticas sustentáveis. Ao facilitar o acesso a essas informações, o projeto incentiva a população a participar mais ativamente nos programas de coleta seletiva. Além disso, conecta cidadãos e gestores municipais, permitindo uma gestão de resíduos mais eficiente e promovendo uma cultura ambiental mais consciente, com impactos positivos significativos.

## Público-Alvo

- Cidadãos: Pessoas que estão preocupadas com o meio ambiente e desejam praticar a reciclagem.
  
- Gestores Públicos e Municipais: Autoridades e departamentos governamentais responsáveis pela gestão de resíduos urbanos.

- Instituições de Coleta: Organizações, cooperativas e empresas responsáveis pela coleta e reciclagem de materiais.

- Estudantes e Educadores: Instituições de ensino e grupos de estudantes que buscam promover a conscientização ambiental e a educação sobre a importância da reciclagem. 

- Empresas e Indústrias: Empresas que geram resíduos recicláveis e buscam colaborar com iniciativas sustentáveis.
# Especificações do Projeto

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade de requisitos, aplicar uma técnica de priorização de requisitos e detalhar como a técnica foi aplicada.

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| Permitir que o usuário visualize os pontos coletas | ALTA | 
|RF-002| Emitir um relatório de tarefas no mês   | MÉDIA |
|RF-003| Permitir a criação, leitura, atualização e exclusão (CRUD), de registro de pontos de coleta  | ALTA | 
|RF-004| O aplicativo móvel deve exibir o mapa geográfico com os pontos de coleta cadastrados.| ALTA | 

### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| O sistema deve ser responsivo para rodar em um dispositivos móvel | MÉDIA | 
|RNF-002| Deve processar requisições do usuário em no máximo 3s |  BAIXA | 
|RNF-003| O sistema deve ser desenvolvido com arquitetura escalável para suportar futuras expansões. | ALTA | 
|RNF-004| O sistema deve garantir a segurança e privacidade dos dados dos usuários, em conformidade com a LGPD (Lei Geral de Proteção de Dados).   | ALTA |

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| Não pode ser desenvolvido um módulo de backend        |
|03|  Permitir acesso apenas a usuários autenticados para realizar operações de cadastro e atualização | ALTA |
|04|  Desenvolver utilizando tecnologias open-source | ALTA |

# Catálogo de Serviços

## Serviço de Cadastro e Edição de Pontos de Coleta

**Descrição:**  
Este serviço permite o cadastro de novos pontos de coleta de materiais recicláveis no sistema. As instituições de coleta podem registrar suas informações, como nome, endereço, tipos de resíduos aceitos, entre outros.

**Funcionalidades:**

- Cadastro de novos pontos de coleta.
- Atualização de informações de pontos de coleta existentes.
- Exclusão de pontos de coleta (se necessário).
- Validação de dados de endereço e seleção dos tipos de resíduos aceitos.

 **Usuários:**

- Administradores do sistema. 
- Representantes de instituições de coleta.

**Nível de Serviço:**

- Tempo de resposta: Até 5 segundos para salvar ou atualizar um registro. 
- Acesso: Web. 

## Serviço de Exibição de Mapa com Pontos de Coleta

**Descrição:**  
Este serviço fornece a visualização de um mapa interativo onde os usuários podem localizar os pontos de coleta cadastrados. O mapa pode ser filtrado por tipo de material reciclável, facilitando a busca.

**Funcionalidades:**

- Exibição de mapa geográfico com todos os pontos de coleta.
- Filtro por tipo de resíduo (plástico, papel/papelão, resíduos eletrônicos).
- Informação detalhada ao clicar em um ponto de coleta. 
- Integração com OpenStreetMap.

**Usuários:**

- Usuários finais que desejam localizar pontos de coleta. 
- Administradores para fins de monitoramento. 

**Nível de Serviço:**

- Tempo de resposta: Até 5 segundos para carregar o mapa e os pontos. 
- Acesso: Mobile. 

## Serviço de Busca por Tipo de Resíduo

**Descrição:**
Este serviço permite que os usuários busquem pontos de coleta específicos com base no tipo de material reciclável que desejam descartar. Ao digitar o nome do resíduo, o sistema exibe os pontos de coleta correspondentes no mapa. 

**Funcionalidades:**

- Campo de busca para tipos de resíduos. 
- Exibição de resultados no mapa. 
- Sugestões de busca autocompletadas. 

**Usuários:** 

- Usuários finais que desejam localizar rapidamente pontos de coleta por tipo de resíduo. 

**Nível de Serviço:**

- Tempo de resposta: Até 3 segundos para exibir resultados de busca. 
- Acesso: Web e Mobile. 




# Arquitetura da Solução

Definição de como o software é estruturado em termos dos componentes que fazem parte da solução e do ambiente de hospedagem da aplicação.

![application](https://github.com/user-attachments/assets/fb429fe6-adc6-45f8-a904-fd7d5bd3a316)


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

A hospedagem do Front-end será feita pela plataforma da Vercel, o Back-end será hospedado na AWS utilizando o serviço da EC2 e o aplicativo mobile vai estar disponível pela plataforma do Expo.

## Referências Bibliográficas 

Prefeitura de São Paulo. (2023). Programa de Coleta Seletiva. Disponível em: https://www.prefeitura.sp.gov.br/cidade/secretarias/meio_ambiente/coleta_seletiva/index.php. Acesso em: 25 ago. 2024.

Organização das Nações Unidas (ONU): United Nations Environment Programme (UNEP). (2021). Global Environment Outlook – GEO-6: Healthy Planet, Healthy People. Disponível em: https://www.unep.org/resources/global-environment-outlook-6
