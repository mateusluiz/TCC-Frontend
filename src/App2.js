import React, { useState } from 'react';
//import logo from './logo.svg';
//import './App.css';

// Componente: Bloco isolado de HTML, CSS e JS, o qual não interfere no restante da aplicação. 
// Propriedade: Informações que um componente PAI passa para o componente filho.
// Estado: Informações mantidas pelo componente (Lembrar: imutabilidade).

function App() {
  // useState: Devolve vetor com duas informações
  // []: Desestruturação, pega um objeto ou vetor e divide em variaveis
  let [contar, set] = useState(0);

  // React é imutavel, não se altera dados, se cria um dado a partir do valor anterior
  // Ao chamar set ele cria um novo contador ao inves de atualizar
  function incrementar(){
    set(contar + 1);
  }

  return (
      <>
        <h1>Contador: {contar}</h1>
        <button onClick={incrementar}>Incrementar</button>
      </>
  );
}

export default App;
