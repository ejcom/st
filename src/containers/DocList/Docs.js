import React, {
    memo
} from 'react'

import classNames from 'css-bem-classes'
import { formatPrice } from '../../utils'
import './style.css'

function Docs({
    isOpen,
    onToggle,
    children,
    date,
    amount,
    formatedPrice = (() => formatPrice(amount.toFixed(2)))(),
    docsCount,
    productsCount,
}) {
    const cn = classNames('docs')

    return (
        <div className={cn({
            opened: isOpen,
        })}>
            <div
                className={cn('header')}
                onClick={onToggle}
            >
                <div className={cn('date')}>{date}</div>
                <div className={cn('amount')}>
                    Документов: {docsCount} ({formatedPrice} ₽)
                </div>
            </div>
            <div
                className={cn('body')}
            >
                {children.length ? children.map(item => (item)) : null}
            </div>
        </div>
    )
}

export default memo(Docs)
