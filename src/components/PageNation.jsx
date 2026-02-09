import { Link } from "react-router-dom";

import PropTypes from 'prop-types';

function PageNation({ pagination, changePage }) {
    const handleClick = (page) => {
        changePage(page);
    };

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                <li className="page-item">
                    <Link
                    to={`/admin?page=${pagination.current_page - 1}`}
                    className={`page-link ${pagination.has_pre ? '' : 'disabled'}`}
                    onClick={() => handleClick( pagination.current_page - 1)}>
                        <span aria-hidden="true">&laquo;</span>
                    </Link>
                </li>

                {[...new Array(pagination.total_pages)].map((_, index,) => (
                <li className="page-item" key={`${index}_page`}>
                    <Link
                    to={`/admin/products?page=${index + 1}`}
                    className={`page-link ${
                    index + 1 === pagination.current_page && 'active'
                    }`}
                    onClick={() => handleClick(index + 1)}
                    >
                    {index + 1}
                    </Link>
                </li>
                ),)}

                <li className="page-item">
                    <Link
                    to={`/admin/products?page=${pagination.current_page + 1}`}
                    className={`page-link ${pagination.has_next ? '' : 'disabled'}`}
                    onClick={() => handleClick(pagination.current_page + 1)}
                    >
                        <span aria-hidden="true">&raquo;</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

PageNation.propTypes = {
    PageNation: PropTypes.shape({
        total_pages: PropTypes.number,
        current_page: PropTypes.number,
        has_pre: PropTypes.bool,
        has_next: PropTypes.bool,
    }).isRequired,
    changePage: PropTypes.func.isRequired,
};

export default PageNation;