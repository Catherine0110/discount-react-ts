import React, { memo, useState } from 'react'
import './CardsWrap.scss'
import CardItem, { Card } from '../CardItem/CardItem'

interface CardsProps {
  cards: Card[]
  className?: string
  setSelected: (id: string) => void
  selected: string
}

const CardsWrap = memo((props: CardsProps) => {
  const { cards, selected, setSelected } = props

  return (
    <form className="cards">
      {cards.map((card) => (
        <CardItem
          selected={selected}
          setSelected={setSelected}
          key={card.id}
          card={card}
        />
      ))}
    </form>
  )
})

export default CardsWrap
