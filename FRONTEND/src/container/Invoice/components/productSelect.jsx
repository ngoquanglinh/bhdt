import { useEffect, useState, Fragment } from 'react'
import { Select, } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAllProduct,
} from '../../../state/actions'

function ProductSelect({ onChange, values, placeholder }) {
    const { Option } = Select;
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.products);
    const [model, setModel] = useState({
        page: 1,
        pageSize: 20,
        search: ""
    });

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            dispatch(getAllProduct(model))
        }
        return () => mounted = false;
    }, [])

    const handleScroll = (e) => {
        const isEndOfList = e.target.scrollTop > 3 / 5 * e.target.scrollHeight;
        if (isEndOfList) {
            // loadmore
        }
    }

    const handleChange = (id) => {
        const item = products.items.find(x => x.id == id);
        if (onChange) {
            onChange(id, item);
        }
    }

    return (
        <div className="w-100">
            <label className="mb-1">Sản phẩm</label>
            <Select
                onPopupScroll={handleScroll}
                onChange={handleChange}
                style={{ width: '100%' }}
                placeholder={placeholder}
                value=""
            >
                {
                    products.items?.map((item, index) => {
                        return (
                            <Option value={item.id} key={index}>{item.name}</Option>
                        )
                    })
                }
            </Select>
        </div>

    )
}

export default ProductSelect