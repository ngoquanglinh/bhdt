import React from 'react';

function Paginate(props) {

    const handleChange = page => {
        if (props.onChange) {
            props.onChange(page);
        }
    }

    const getRange = (start, end, total) => {
        return Array(total + 1).fill(1).map((v, i) => i).slice(start, end + 1);
    }

    const getPager = (total, page, pageSize, buttonCount) => {

        // mặc định trang hiện tại là đầu tiên
        page = page || 1;

        // mặc định 1 trang có 10 items
        pageSize = pageSize || 10;

        // tính toán số trang
        var totalPages = Math.ceil(total / pageSize);

        var start, end;

        start = page - Math.floor(buttonCount / 2);
        start = start < 1 ? 1 : start;

        end = buttonCount + start - 1;
        end = end > totalPages ? totalPages : end;

        start = end - buttonCount + 1;
        start = start < 1 ? 1 : start;

        var pages = getRange(start, end, totalPages);

        return {
            total: totalPages,
            start: start,
            end: end,
            pages: pages
        };
    }

    const { page, total, pageSize, numberButtons } = props;

    const pager = getPager(total, page, pageSize, numberButtons);

    if (pager.total < 2) return null;

    var start = pageSize * (page - 1) + 1;
    var end = start + pageSize - 1;
    end = end > total ? total : end;

    return (
        <nav className="pagination">
            <ul className="page-numbers">
                <li onClick={() => handleChange(page - 1)}><a className="first" ><i className="fa fa-angle-double-left" /></a></li>
                {
                    pager.pages.map(num =>
                        <li key={num}>
                            {
                                page === num ?
                                    <span onClick={() => handleChange(num)} className="current">{num}</span>
                                    :
                                    <a className="ml-1" onClick={() => handleChange(num)}>{num}</a>
                            }
                        </li>
                    )
                }
                <li onClick={() => handleChange(page + 1)}><a className="last"  ><i className="fa fa-angle-double-right " /></a></li>
            </ul>
        </nav>
    )
}
Paginate.defaultProps = {
    page: 1,
    align: 'center',
    showPrevNext: true,
    showFirstLast: false,
    showLabel: true,
    alwayDisplay: false,
    numberButtons: 5,
    total: 10
};
export default Paginate;