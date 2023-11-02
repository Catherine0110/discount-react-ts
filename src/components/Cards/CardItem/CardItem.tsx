import React, { useRef, useState } from 'react'
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
  const subTitleRef = useRef(null) as React.RefObject<HTMLSpanElement>
  let [subtitleTextHeight, setSubtitleTextHeight] = useState<number>()

  const clickHandler = (event: React.FormEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement
    setSelected(`${input.id}`)
  }

  const hoveredandler = (hovered: boolean) => {
    if (!disabled && !!selectedCard) {
      setHovered(hovered)
    }
  }

  return (
    <div className="card">
      <label
        onMouseEnter={() => {
          !disabled &&
            !!selectedCard &&
            setSubtitleTextHeight(subTitleRef.current?.offsetHeight)
          hoveredandler(true)
        }}
        onMouseLeave={() => hoveredandler(false)}
        className={classNames(
          'card__inner',
          {
            [CardItemStatus.DISABLED]: disabled,
            [CardItemStatus.SELECTED]: selectedCard,
          },
          [className!],
        )}>
        <input
          hidden
          type="radio"
          name="discount-radio"
          value={card.discount}
          id={card.id}
          disabled={card.disabled}
          onChange={clickHandler}
          checked={selectedCard}
        />
        <img src={card.mark} className="card__mark" alt="" />
        <span className="card__content">
          <span className="card__head">
            <span className="card__title">{card.title}</span>
            <span className="card__subtitle">
              {!hovered && (
                <span ref={subTitleRef} className="card__subtitleText">
                  {card.subtitle}
                </span>
              )}
              {hovered && (
                <span
                  style={{
                    height: `${subtitleTextHeight}px`,
                  }}
                  className="card__subtitle card__subtitle_hovered">
                  Excellent decision!
                </span>
              )}
            </span>
            <span className="card__discount">
              <span className="card__rate">{card.discount}</span>
              <span>%OFF</span>
            </span>
          </span>
          <img
            loading="lazy"
            src={card.img}
            alt={card.subtitle}
            className="card__img"
          />
        </span>
      </label>
      <p
        className="card__text"
        dangerouslySetInnerHTML={{
          __html: selectedCard ? card.subtitle : card.text,
        }}></p>
    </div>
  )
}

export default CardItem
