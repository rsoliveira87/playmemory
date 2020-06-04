# tabs
Simple tabs with HTML, CSS and Javascript

## Ferramentas utilizadas

* HTML
* SASS/CSS
* Javascript/ES6
* NodeJS v10.16.3 - Para rodar as tasks do Gulp.
* Gulp - Para automatizar as tarefas, tais como, converter o SASS para CSS e gerar o arquivo minificado, converter o script de ES6 para ES5 e gerar o arquivo minificado
* Babel - Transpila o script para um formato aceito por todos os navegadores.

## Tasks do Gulp

* sassDev - Converte o SASS para CSS.
* sassProd - Gera o arquivo CSS minificado.
* jsProd - Converte o script para um formato aceito por todos os navegadores utilizando o Babel e gera o arquivo minificado.
* watch - Monitora alterações nos arquivos e executa as tasks automaticamente.

Todos os arquivos de assets (css, js e scss), estão dentro do diretório assets.

Para rodar o projeto é necessário ter o NodeJS instalado, caso não tenha, [clique aqui](https://nodejs.org/en/) e faça do download da versão de acordo com o seu sistema operacional.

Após efetuar o download do NodeJS, faça o clone do repositório, (caso não tenha o GIT instalado, [clique aqui](https://git-scm.com/downloads)) no seu terminal, execute o comando abaixo.

`git clone https://github.com/rsoliveira87/tabs.git && cd tabs`

Dentro da pasta tabs, execute o comando abaixo para instalar as dependências do Node.

`npm install`

Depois execute a task default do Gulp para gerar os arquivos CSS e JS.

`gulp`

Para rodar as outras tasks.

```
gulp sassProd
gulp sassProd
gulp jsProd
gulp watch
```

Para visualizar o projeto basta abrir o arquivo `index.html` (localizado na raiz do projeto) no browser.