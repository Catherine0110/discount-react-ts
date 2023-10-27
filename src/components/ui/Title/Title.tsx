import React, { memo } from 'react'

import { classNames } from '../../../utils/ClassNames'
import './Title.scss'

interface TitleProps {
  className?: string
  children?: React.ReactNode
  htmlEl?: string
}

const Title = memo((props: TitleProps) => {
  const { children, className, htmlEl } = props
  return (
    <h1
      dangerouslySetInnerHTML={{ __html: htmlEl || '' }}
      className={classNames(`title`, {}, [className!])}>
      {children}
    </h1>
  )
})

export default Title
