import React, {
  memo,
  useState,
  useEffect,
} from 'react'

import Dropdown from '../../components/Dropdown'

import Docs from './Docs'
import Doc from './Doc'

import data from '../../db'

function parseData() {
  const dataByDate = {}
  const docAmount = {}

  data.forEach((item) => {
    const date = new Date(item.date).toLocaleDateString('ru', {
      day: '2-digit',
      month: 'long'
    })

    if (typeof dataByDate[date] === 'undefined') {
      dataByDate[date] = {}
    } if (typeof dataByDate[date][item.id] === 'undefined') {
      dataByDate[date][item.id] = [item]
    } else {
      dataByDate[date][item.id].push(item)
    }

    if (typeof docAmount[item.id] === 'undefined') {
      docAmount[item.id] = parseFloat(item.price * item.quantity)
    } else {
      docAmount[item.id] = parseFloat(docAmount[item.id] + item.price * item.quantity)
    }

  })

  return {
    docList: Object.entries(dataByDate).sort(([a], [b]) => a > b),
    docAmount,
  }
}

function DocList() {
  const [{ docList, docAmount }, setData] = useState({
    docList: [],
    docAmount: {},
  })

  useEffect(() => {
    setData(parseData())
  }, [])

  return (
    docList.map(([date, docsMap]) => (
      <Dropdown
        key={date}
        component={
          ({...ddProps}) => {
            const docs = Object.entries(docsMap)
              .sort(([a], [b]) => a > b)
            let amount = 0

            docs.forEach(([id]) => {
              amount += docAmount[id]
            })

            return (
              <Docs
                date={date}
                amount={amount}
                docsCount={docs.length}
                {...ddProps}
              >
                {docs.map(([id, products]) => (
                    <Dropdown 
                      key={id}
                      component={({...ddPropsDoc}) => (
                        <Doc 
                          products={products}
                          amount={docAmount[id]}
                          {...ddPropsDoc}
                        />
                      )} 
                    />))
                }
              </Docs>
        )}
        }
      />
    ))
  )
}

export default memo(DocList)
