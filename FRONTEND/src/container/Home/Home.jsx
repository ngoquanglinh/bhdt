
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FilterPanel from './../../components/FilterBaner/FilterPanel'
import SearchItemResult from './../../components/SearchItemsResult/SearchItemResult'
import useQuerry from './../../hook/useQuerry'
import * as sly from './Home.styled';
import { getListCategories, getAllProduct, getListBrands } from './../../state/actions';

export default function Home() {
  const [model, setModel] = useState({
    page: 1,
    pageSize: 1000,
    search: ""
  });

  const dispatch = useDispatch()
  const query = useQuerry()
  const brands = useSelector(state => state.brands);
  const categories = useSelector(state => state.categories.categories);
  const products = useSelector(state => state.products.products);
  const [fillter, setFillter] = useState({})

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      dispatch(getListCategories(model));
      dispatch(getListBrands(model));
    }
    return () => mounted = false;
  }, [model])

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const _filters = {
        ...query,
        page: query.page || 1,
        pageSize: query.limit || 20,
        sortBy: query.sortBy || 'view',
      }
      setFillter(_filters)
      dispatch(getAllProduct(_filters));
    }
    return () => mounted = false;
  }, [query, dispatch])



  return (
    <div>
      <sly.Container className="container">
        <sly.Side>
          <FilterPanel categories={categories} brands={brands} fillter={fillter}></FilterPanel>
        </sly.Side>
        <sly.Main>
          <SearchItemResult fillter={fillter} products={products}></SearchItemResult>
        </sly.Main>
      </sly.Container>
    </div>
  )
}
