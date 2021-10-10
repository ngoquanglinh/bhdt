import React, { useEffect, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { path } from './../../constant/path'
import RatingStart from './../RatingStart/RatingStart'
import * as sly from './Fillter.styled'
import qs from 'query-string'
import PropTypes from 'prop-types'
import { Controller, useForm } from 'react-hook-form'
import CheckBox from './../../components/BaseCheckBox/CheckBox'
import { Alert } from '@material-ui/lab'
import { useLocation } from 'react-router-dom';
import useQuerry from './../../hook/useQuerry';

export default function FilterPanel({ categories, fillter, brands }) {
  const history = useHistory()
  const query = useQuerry()
  const [idsC, setIdsC] = useState([]);
  const [idsB, setIdsB] = useState([]);
  const location = useLocation()
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
    setValue,
    clearErrors
  } = useForm({
    defaultValues: {
      minPrice: fillter.minPrice || '',
      maxPrice: fillter.maxPrice || ''
    },
    reValidateMode: 'onSubmit'
  })

  useEffect(() => {
    setValue('minPrice', fillter.minPrice || '')
    setValue('maxPrice', fillter.maxPrice || '')
  }, [setValue, fillter])

  useEffect(() => {
    let newParams = query.name ? { ...fillter, name: query.name } : { ...fillter };
    newParams = qs.stringify(newParams, {
      allowDots: true,
    })
    history.push(path.home + "?" + newParams);
  }, [idsB, idsC])

  const searchPrice = data => {
    const { minPrice, maxPrice } = data
    if (minPrice !== '' || maxPrice !== '') {
      let _filters = fillter
      if (minPrice !== '') {
        _filters = { ..._filters, minPrice }
      } else {
        delete _filters.minPrice
      }
      if (maxPrice !== '') {
        _filters = { ..._filters, maxPrice }
      } else {
        delete _filters.maxPrice
      }
      history.push(path.home + `?${qs.stringify(_filters)}`)
    }
  }
  const clearAllFilters = () => {
    reset();
    setIdsC([]);
    setIdsB([]);
    history.push({
      pathname: path.home
    })
  }
  const ValidPrice = () => {
    const minPrice = getValues('minPrice')
    const maxPrice = getValues('maxPrice')
    const message = 'Vui lòng điền giá phù hợp'
    if ((minPrice !== '') & (maxPrice !== '')) {
      return Number(maxPrice) >= Number(minPrice) || message
    }
    return minPrice !== '' || maxPrice !== '' || message
  }

  const setValueFilter = (name, id) => {
    let index = -1;
    if (name == "branch") {
      index = idsB.findIndex(x => x == id);
      if (index >= 0) {
        setIdsB(idsB.filter(x => x != id));
      } else {
        setIdsB([...idsB, id]);
      }
    } else {
      index = idsC.findIndex(x => x == id);
      if (index >= 0) {
        setIdsC(idsC.filter(x => x != id));
      } else {
        setIdsC([...idsC, id]);
      }
    }
  }
  return (
    <div>
      <sly.CategoryTitleLink to={path.home}>
        <svg enablebackground="new 0 0 15 15" viewBox="0 0 15 15" x={0} y={0} className="shopee-svg-icon ">
          <g>
            <polyline
              fill="none"
              points="5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2"
              strokelinecap="round"
              strokeLinejoin="round"
              strokemiterlimit={10}
            />
          </g>
        </svg>
        Bộ lọc tìm kiếm
      </sly.CategoryTitleLink>
      <sly.CategoryList>
        Danh mục
        {categories?.items.map(category => (
          <sly.CategoryItems key={category.id}>
            <div className="d-flex align-items-center"
            ><CheckBox
                onChange={() => setValueFilter("category", category.id)}
                checked={idsC.includes(category.id)} />
              <span className="ml-1">{category.name}</span>
            </div>
          </sly.CategoryItems>
        ))}
      </sly.CategoryList>
      <sly.CategoryList>
        Thương hiệu
        {brands.items.map(br => (
          <sly.CategoryItems key={br.id}>
            <div className="d-flex align-items-center"
            ><CheckBox
                onChange={() => setValueFilter("branch", br.id)}
                checked={idsB.includes(br.id)} />
              <span className="ml-1">{br.name}</span>
            </div>
          </sly.CategoryItems>
        ))}
      </sly.CategoryList>
      <sly.FillterGroup>
        <sly.FillterPriceHeader>Khoảng giá</sly.FillterPriceHeader>
        <sly.PriceRange>
          <sly.PriceRangeGroup>
            <Controller
              name="minPrice"
              control={control}
              rules={{
                validate: {
                  ValidPrice
                }
              }}
              render={({ field }) => (
                <sly.PriceRangeInPut
                  placeholder="Từ"
                  onChange={value => {
                    clearErrors()
                    field.onChange(value)
                  }}
                  value={getValues('minPrice')}
                />
              )}
            ></Controller>

            <sly.PriceRangeLine />
            <Controller
              name="maxPrice"
              control={control}
              rules={{
                validate: {
                  ValidPrice
                }
              }}
              render={({ field }) => (
                <sly.PriceRangeInPut
                  placeholder="Đến"
                  onChange={value => {
                    clearErrors()
                    field.onChange(value)
                  }}
                  value={getValues('maxPrice')}
                />
              )}
            ></Controller>
          </sly.PriceRangeGroup>
          {Object.values(errors).length !== 0 && <sly.PriceErr>Vui lòng điền giá phù hợp</sly.PriceErr>}

          <sly.PriceButton onClick={handleSubmit(searchPrice)}>Áp dụng</sly.PriceButton>
        </sly.PriceRange>
      </sly.FillterGroup>
      <sly.FillterGroup>
        <sly.FillterPriceHeader>Đánh giá</sly.FillterPriceHeader>
        <RatingStart fillter={fillter}></RatingStart>
      </sly.FillterGroup>
      <sly.RemoveFillterBtn onClick={clearAllFilters}>Xóa tất cả </sly.RemoveFillterBtn>
    </div>
  )
}
// FilterPanel.propTypes = {
//   categories: PropTypes.array.isRequired,
//   fillter: PropTypes.object.isRequired
// }
