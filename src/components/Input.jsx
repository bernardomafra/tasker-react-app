import React from 'react'

export default function Input({ label, id, ...rest }) {
  return <section className="input-group">
    <input
      id={id}
      {...rest}
    />
    <label htmlFor={id}>{label}</label>
  </section>
}
