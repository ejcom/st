import React, {
  memo,
} from 'react'
import { formatPrice } from '../../utils'
import classNames from 'css-bem-classes'

import imageNoAvailable from '../../img/no-image-available.jpg'
import './style.css'

function Doc({
  isOpen,
  onToggle,
  products,
  amount,
  formatedPrice = (() => formatPrice(amount.toFixed(2)))()
}) {
  const cn = classNames('doc')
  const [{ docName, id }] = products

  return (
    <div className={cn({
      opened: isOpen,
    })}>
      <div 
        className={cn('header')}
      >
        <div className={cn('name')}>
          {docName} №{id}
        </div>
        <div className={cn('amount')}>
          {formatedPrice} ₽
        </div>
      </div>
      <div
        className={cn('products')}
        onClick={onToggle}
       >
         Товаров: {products.length}
        </div>
      <div className={cn('body')}>
        {products.map(({ 
          productName,
          image,
          quantity,
          price, 
          formatedPrice = (() => formatPrice(price.toFixed(2)))(),
        }) => (
          <div 
            key={productName}
            className={cn('product')}
          >
            <div
              className={cn('image')}
              style={{
                backgroundImage: `url(${image || imageNoAvailable})`
              }}
            />
            <div className={cn('product-description')}>
              <div className={cn('product-name')}>
                {productName}
              </div>
              <div className={cn('product-params')}>
                <div className={cn('product-quantity')}>
                    {`${quantity} штук х ${formatedPrice} ₽`}
                </div>
                <div className={cn('product-amount')}>
                    {formatPrice((quantity * price).toFixed(2))} ₽
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default memo(Doc)
