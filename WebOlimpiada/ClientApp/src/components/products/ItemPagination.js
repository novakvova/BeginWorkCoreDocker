import React, { Component } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import PropTypes from "prop-types";

const propTypes = {
    callBackParams: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalPage: PropTypes.number.isRequired,
};

const defaultProps = {};

class ItemPagination extends Component {
    onPageChanged(e) {
        this.props.callBackParams(e);
    }
    render() {
        const { currentPage, totalPage } = this.props;
        let pages = [];
        let point = 7;
        let firstPoint = 4;
        let step = 3;


        for (let i = 1; i <= totalPage; i++) {
            if (currentPage < point) {
                if (i < currentPage + step) {
                    pages.push(i);
                }
                else if (i === currentPage + step && totalPage > currentPage + firstPoint) {
                    pages.push(-1);
                }
                else if (i === totalPage - 1 || i === totalPage) {
                    pages.push(i);
                }

            }
            else if (currentPage >= point) {
                if ((i < firstPoint || i > currentPage - step) && (i < currentPage + step)) {
                    pages.push(i);
                }
                else if (i === firstPoint) {
                    pages.push(-1);
                }
                else if (i === totalPage - 1 || i === totalPage) {

                    pages.push(i);
                }


            }
        }
        // console.log("pagesCount: ", pagesCount);
        return (
            (totalPage <= 0) ? "" : (
                <div>
                    <Pagination>
                        <PaginationItem disabled={currentPage === 1}>
                            <PaginationLink previous onClick={() => this.onPageChanged(currentPage - 1)} tag="button" />
                        </PaginationItem>
                        {pages.map(p => {
                            return p === -1 ? (
                                <PaginationItem disabled key={p}>
                                    <PaginationLink tag="button">...</PaginationLink>
                                </PaginationItem>
                            ) : (
                                    <PaginationItem active={p === currentPage} key={p}>
                                        <PaginationLink tag="button" onClick={() => this.onPageChanged(p)}>
                                            {p}
                                        </PaginationLink>
                                    </PaginationItem>
                                );
                        })}

                        <PaginationItem disabled={currentPage === totalPage}>
                            <PaginationLink next onClick={() => this.onPageChanged(currentPage + 1)} tag="button" />
                        </PaginationItem>
                    </Pagination>
                </div>
            )
        );
    }
}

ItemPagination.propTypes = propTypes;
ItemPagination.defaultProps = defaultProps;

export default ItemPagination;