import React, { useState, Fragment } from 'react'
import styled from 'styled-components'

const Label = styled.label`
  font-family: 'Bebas Neue', cursive;
  color: #fff;
  text-transform: bold;
  font-size: 2.4rem;
  margin-top: 2rem;
  display: block;
`

const Select = styled.select`
  width: 100%;
  display: block;
  padding: 1rem;
  -webkit-appearance: none;
  border: none;
  font-size: 1.2rem
`

const useMoneda = (label, stateInicial, opciones) => {
  // state de nuestro custom hook
  const [state, setState] = useState('')

  const handleChange = e => {
    setState(e.target.value)
  }

  const Seleccionar = () => (
    <Fragment>
      <Label>{label}</Label>
      <Select onChange={handleChange} value={state}>
        <option value=''>--Seleccione--</option>
        {opciones.map(opcion => (
          <option key={opcion.codigo} value={opcion.codigo}>
            {opcion.nombre}
          </option>
        ))}
      </Select>
    </Fragment>
  )

  // Retornar state, interfaz y fn que modifica el state
  return [state, Seleccionar, setState]
}

export default useMoneda
