import React from 'react'
import { useHistory } from 'react-router-dom'
import * as sly from './Panigation.styled'
import { usePagination } from '@material-ui/lab'
import classNames from 'classnames'
import { path } from './../../constant/path'
import qr from 'query-string'
export default function Panigation({ pagination, fillter }) {
  const history = useHistory()
  const { items } = usePagination({
    count: pagination.page_size || 0,
    page: pagination.page || 1
  })
  const clickPrev = (page) => {
    if (pagination.page != 1 && page != pagination.page) {
      const _filters = { ...fillter, page: parseInt(pagination.page - 1) }
      history.push(path.home + `?${qr.stringify(_filters)}`)
    }
  }
  const clickNext = (page) => {
    if (pagination.page != pagination.page_size && page != pagination.page) {
      const _filters = { ...fillter, page: parseInt(pagination.page + 1) }
      history.push(path.home + `?${qr.stringify(_filters)}`)
    }
  }
  const clickGotoPage = page => {
    if (page != pagination.page) {
      const _filters = { ...fillter, page }
      history.push(path.home + `?${qr.stringify(_filters)}`)
    }
  }

  return (
    <div>
      <sly.panigation>
        {items.map(({ page, type, selected }, index) => {
          let children = null
          if (type == 'start-ellipsis' || type == 'end-ellipsis') {
            children = (
              <sly.ButtonNoOutLine disabled key={index}>
                ...
              </sly.ButtonNoOutLine>
            )
          } else if (type == 'previous') {
            children = (
              <sly.ButtonIcon key={index} onClick={() => clickPrev(index + 1)} disabled={pagination.page == 1}>
                <svg
                  enableBackground="new 0 0 11 11"
                  viewBox="0 0 11 11"
                  x={0}
                  y={0}
                  className="shopee-svg-icon icon-arrow-left"
                >
                  <g>
                    <path d="m8.5 11c-.1 0-.2 0-.3-.1l-6-5c-.1-.1-.2-.3-.2-.4s.1-.3.2-.4l6-5c .2-.2.5-.1.7.1s.1.5-.1.7l-5.5 4.6 5.5 4.6c.2.2.2.5.1.7-.1.1-.3.2-.4.2z" />
                  </g>
                </svg>
              </sly.ButtonIcon>
            )
          } else if (type == 'next') {
            children = (
              <sly.ButtonIcon key={index} onClick={() => clickNext(index + 1)} disabled={pagination.page == pagination.page_size}>
                <svg
                  enableBackground="new 0 0 11 11"
                  viewBox="0 0 11 11"
                  x={0}
                  y={0}
                  className="shopee-svg-icon icon-arrow-right"
                >
                  <path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z" />
                </svg>
              </sly.ButtonIcon>
            )
          } else if (type == 'page') {
            children = (
              <sly.ButtonNoOutLine
                key={index}
                className={classNames({ active: selected })}
                onClick={() => clickGotoPage(page)}
              >
                {' '}
                {page}
              </sly.ButtonNoOutLine>
            )
          }
          return children
        })}
      </sly.panigation>
    </div>
  )
}
