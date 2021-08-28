# Quem é esse pokemon?
**Objetivo do jogo:**
Descobrir qual é o pokemon, a partir de uma pequena amostra da imagem
O jogo deve determinar um pokemon aleatório e mostrar somente um pedacinho do pokemon.
O jogador tem que tentar adivinhar o nome do pokemon.
Maiúsculas/minúsculas não importam, mas espaços e outros símbolos no nome, como ' ou - sim

- HTML inicialmente com as seguintes seções:
  - Topo
    - Título
    - Descrição do jogo
  - Jogo
    - Tempo decorrido (topo esquerda)
    - Quant. tentativas (logo abaixo do tempo)
    - Dicas (topo direita)
    - Imagem do pokemon sorteado
      - Parcialmente encoberta
  - Botões de controle
    - Iniciar jogo
      Só aparece na tela inicial
    - Reiniciar
      Só aparece quando o jogo acaba
    - Desistir
      Quando o usuário clicar no Desistir o jogo revela o pokemon, e exibe o botão de "Reiniciar"
    - Sair
      Sempre presente
      Leva para o início do repositório

## Regras do jogo:
- Quando o jogador clicar no Iniciar Jogo ou Reiniciar
  Um pokemon dos primeiros 151 é sorteado
  Exibe a seção "Jogo"
    Mostra o pokemon sorteado, mas encoberto
    Começa a contar o tempo
    Libera o campo de texto para o usuário fazer as tentativas
  Altera a seção "Botões de controle" para ter somente o botão "Desistir"
- Quando o usuário fizer uma tentativa
  O jogo verifica se está correto
    Se não estiver
      Conta +1 nas tentativas
      Avisa o usuário que não acertou
    Se estiver
      Revela o pokemon
      Mostra uma mensagem amigável de "Vc ganhou"
      Altera os Botões de Controle para somente "Reiniciar"
      Para a contagem
- Quando o usuário clica no "Desistir"
  Para o timer
  Revela o pokemon
Altera os Botões de Controle para somente "Reiniciar"

## Futuras implementações: 
- Níveis de dificuldade, mudando o tamanho da janela
