import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import imagen from './cryptomonedas.png'
import Form from './components/Form'
import Cotizacion from './components/Cotizacion'
import Spinner from './components/Spinner'

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;

  @media screen and (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin: 80px 0 50px 0;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
  }
`

function App() {
  const [moneda, setMoneda] = useState('')
  const [criptomoneda, setCriptomoneda] = useState('')
  const [resultado, setResultado] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (moneda === '') return

    // consultar la api para obtener la cotización
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`

    fetch(url)
      .then(response => response.json())
      .then(data => {
        setLoading(true)

        // ocultar el spinner y mostrar el resultado
        setTimeout(() => {
          // cambiar el estado de loading
          setLoading(false)
          setResultado(data.DISPLAY[criptomoneda][moneda])
        }, 2000)
      })
  }, [moneda, criptomoneda])

  // mostrar spinner o resultado
  const componente = loading ? (
    <Spinner />
  ) : (
    <Cotizacion resultado={resultado} />
  )

  return (
    <Contenedor>
      <div>
        <Imagen src={imagen} alt='Imagen crypto' />
      </div>
      <div>
        <Heading>Cotiza cryptomonedas al instante</Heading>
        <Form setMoneda={setMoneda} setCriptomoneda={setCriptomoneda} />
        {componente}
      </div>
    </Contenedor>
  )
}

export default App
