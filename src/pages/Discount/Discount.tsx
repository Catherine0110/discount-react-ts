import React, { useEffect, useState } from 'react'

import Layout from '../../components/Layout/Layout'
import Title from '../../components/ui/Title/Title'
import axios from 'axios'
import CardsWrap from '../../components/Cards/CardsWrap/CardsWrap'

import './Discount.scss'

const Discount = () => {
  const [cards, setCards] = useState([])
  const [title, setTitle] = useState('')
  const [load, setLoad] = useState(false)
  const [error, setError] = useState('')
  const [selected, setSelected] = useState('3')

  useEffect(() => {
    setLoad(true)
    axios
      .get('http://localhost:3001/discount')
      .then(({ data }) => {
        setCards(data.cards)
        setTitle(data.title)
      })
      .catch((error) => {
        setError(error.message)
      })
      .finally(() => {
        setLoad(false)
      })
  }, [])

  if (load) {
    return (
      <div className="discount discount_load">
        <p className="discount__loading">Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="discount discount_error">
        <p className="discount__err">{error}</p>
      </div>
    )
  }

  return (
    <div className="discount">
      <Layout>
        <Title className="discount__title" htmlEl={title} />
        <CardsWrap
          selected={selected}
          setSelected={setSelected}
          cards={cards}
        />
      </Layout>
    </div>
  )
}

export default Discount
