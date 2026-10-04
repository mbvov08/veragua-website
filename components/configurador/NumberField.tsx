"use client";

import { useState } from "react";

type NumberFieldProps = {
  value: number;
  min: number;
  max: number;
  onChange: (valor: number) => void;
  className?: string;
};

// Input numérico controlado que permite borrar el campo para escribir otro
// valor. Un <input type="number"> controlado que recalcula value={number}
// directo en cada onChange vuelve al mínimo apenas el campo queda vacío (p.
// ej. Number("") || 1 === 1), lo que impide borrar y escribir un número
// nuevo. Acá el texto se guarda aparte y solo se valida/ajusta al min o max
// cuando el campo pierde el foco. Sincronizamos `texto` con `value` al
// vuelo durante el render (en vez de un efecto) siguiendo el patrón de
// React para "ajustar estado cuando cambia un prop".
export function NumberField({ value, min, max, onChange, className }: NumberFieldProps) {
  const [texto, setTexto] = useState(String(value));
  const [valorPrevio, setValorPrevio] = useState(value);

  if (value !== valorPrevio) {
    setValorPrevio(value);
    setTexto(String(value));
  }

  function manejarCambio(valor: string) {
    setTexto(valor);
    const numero = Number(valor);
    if (valor !== "" && Number.isInteger(numero) && numero >= min && numero <= max) {
      onChange(numero);
    }
  }

  function manejarBlur() {
    const numero = Number(texto);
    if (texto === "" || !Number.isInteger(numero) || numero < min) {
      setTexto(String(min));
      onChange(min);
    } else if (numero > max) {
      setTexto(String(max));
      onChange(max);
    }
  }

  return (
    <input
      type="number"
      min={min}
      max={max}
      value={texto}
      onChange={(e) => manejarCambio(e.target.value)}
      onBlur={manejarBlur}
      className={className}
    />
  );
}
