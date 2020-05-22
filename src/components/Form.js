import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import useMoneda from '../hooks/useMoneda'
import useCriptomoneda from '../hooks/useCriptomoneda'

import Error from './Error'

const Boton = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #fff;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #326ac0;
    cursor: pointer;
  }
`

const Form = ({ setMoneda, setCriptomoneda }) => {
  // state del listado de criptomonedas
  const [cripto, setCripto] = useState([])
  const [error, setError] = useState(false)

  const MONEDAS = [
    { codigo: 'USD', nombre: 'Dólar de Estados Unidos' },
    { codigo: 'MXN', nombre: 'Peso Mexicano' },
    { codigo: 'EUR', nombre: 'Euro' },
    { codigo: 'COP', nombre: 'Peso Colombiano' },
  ]

  // Utilizar useMoneda
  const [moneda, SelectMonedas] = useMoneda('Elige tu moneda', '', MONEDAS)

  const [criptomoneda, SelectCripto] = useCriptomoneda(
    'Elige tu criptomoneda',
    '',
    cripto
  )

  useEffect(() => {
    const consultarAPI = async () => {
      const url =
        'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
      const resultado = await fetch(url)
      const data = await resultado.json()
      setCripto(data.Data)
    }
    consultarAPI()
  }, [])

  const cotizarMoneda = e => {
    e.preventDefault()

    // validar si ambos campos están llenos
    if (moneda === '' || criptomoneda === '') {
      setError(true)
      return
    }

    // pasar los datos al componente principal
    setError(false)
    setMoneda(moneda)
    setCriptomoneda(criptomoneda)
  }

  return (
    <form onSubmit={cotizarMoneda}>
      {error ? <Error mensaje='Todos los campos son obligatorios' /> : null}
      <SelectMonedas />
      <SelectCripto />
      <Boton type='submit' value='Calcular' />
    </form>
  )
}

export default Form
