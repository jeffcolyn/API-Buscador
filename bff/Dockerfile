# Usando a imagem oficial Node.js com Alpine Linux
FROM node:alpine

# Definindo o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiando apenas o package.json e o package-lock.json para o contêiner
COPY package*.json ./

# Instalando as dependências
RUN npm install

# Copiando o restante dos arquivos da aplicação
COPY . .

# Expondo a porta 3000 (se necessário para a sua aplicação)
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["node", "index.js"]
