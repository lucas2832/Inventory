# Sistema de Inventário

Uma API construída com Node.js e Express para gerenciamento de um inventário de peças e acessórios de motocicletas. O projeto utiliza o **MongoDB** como banco de dados principal e o **Elasticsearch** para otimização e indexação de buscas.

## Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) (Mongoose)
- [Elasticsearch](https://www.elastic.co/)
- [Docker](https://www.docker.com/)

## Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- Node.js
- MongoDB (rodando localmente na porta padrão `27017`)
- Docker (para rodar o container do Elasticsearch)

## Instalação e Configuração

1. **Clone o repositório e instale as dependências:**
   Na raiz do projeto, instale os pacotes necessários via npm:
   ```bash
   npm install
   ```

2. **Inicie o Elasticsearch via Docker:**
   Utilize o comando abaixo para gerar e rodar o container do Elasticsearch (versão 8.13.4) com a segurança desabilitada para ambiente de desenvolvimento local:
   ```bash
   docker run -d -p 9200:9200 -e "discovery.type=single-node" -e "xpack.security.enabled=false" elasticsearch:8.13.4
   ```

3. **Certifique-se de que o MongoDB está rodando:**
   A aplicação tentará se conectar à URI `mongodb://localhost:27017/inventory`. 

4. **Popular o Banco de Dados (Seed):**
   O projeto possui um script para limpar os bancos e inserir uma lista inicial de produtos (tanto no MongoDB quanto no índice do Elasticsearch). Para rodar, execute:
   ```bash
   node seedProducts.js
   ```
   *A saída no console deve confirmar que os produtos foram limpos e indexados com sucesso em ambos os bancos.*

5. **Inicie o Servidor:**
   Com os bancos de dados rodando e populados, inicie a API:
   ```bash
   node server.js
   ```
   O servidor estará rodando e escutando requisições na porta `3000`.

## Rotas da API

- As rotas de produtos estão mapeadas no caminho `/products`. (Certifique-se de checar o arquivo `routes/productRoutes.js` para ver os endpoints disponíveis).