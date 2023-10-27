import React, { useState } from 'react'
import { classNames } from '../../../utils/ClassNames'

import './CardItem.scss'

export interface Card {
  id: string
  title: string
  subtitle: string
  text: string
  discount: string
  img: string
  mark: string
  disabled: boolean
  selected: boolean
}

enum CardItemStatus {
  DISABLED = 'card__inner_disabled',
  SELECTED = 'card__inner_selected',
}

interface CardItemProps {
  card: Card
  setSelected: (id: string) => void
  selected: string
  className?: string
}

const CardItem = (props: CardItemProps) => {
  const { card, className, selected, setSelected } = props
  const [disabled, setDisabled] = useState(card.disabled)
  const [hovered, setHovered] = useState(false)
  const selectedCard = selected === card.id
  const clickHandler = () => {
    !disabled && setSelected(card.id)
    if (selectedCard) {
      setSelected('')
      setHovered(false)
    }
  }

  return (
    <div className="card">
      <div
        onClick={clickHandler}
        onMouseEnter={() => !disabled && !!selectedCard && setHovered(true)}
        onMouseLeave={() => !disabled && !!selectedCard && setHovered(false)}
        className={classNames(
          'card__inner',
          {
            [CardItemStatus.DISABLED]: disabled,
            [CardItemStatus.SELECTED]: selectedCard,
          },
          [className!],
        )}>
        <img src={card.mark} className="card__mark" alt="" />
        <div className="card__content">
          <div className="card__head">
            <h4 className="card__title">{card.title}</h4>
            <p className="card__subtitle">
              {hovered ? 'Excellent decision!' : card.subtitle}
            </p>
            <div className="card__discount">
              <span className="card__rate">{card.discount}</span>
              <span>%OFF</span>
            </div>
          </div>
          <img src={card.img} alt="" className="card__img" />
        </div>
      </div>
      <p
        className="card__text"
        dangerouslySetInnerHTML={{
          __html: selectedCard ? card.subtitle : card.text,
        }}></p>
    </div>
  )
}

export default CardItem
