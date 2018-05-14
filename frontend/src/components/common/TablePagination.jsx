import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const BUTTON_COUNT = 3;

class TablePagination extends React.Component {
  constructor(props) {
    super(props);
  }

  onLinkClick(index, event) {
    event.preventDefault();

    this.props.changePage(index);
  }

  render() {
    const pagesCount = Math.ceil(this.props.total / this.props.rowPerPage);

    const links = [];

    const generateLink = index => (
      <PaginationItem
        key={index}
        disabled={index === this.props.currentPage}
        onClick={index !== this.props.currentPage
          ? this.onLinkClick.bind(this, index)
          : null}
      >
        <PaginationLink href="#">
          {index}
        </PaginationLink>
      </PaginationItem>
    );

    if (pagesCount <= BUTTON_COUNT) {
      for (let i = 1; i <= pagesCount; i += 1) {
        links.push(generateLink(i));
      }
    } else if (this.props.currentPage === 1) {
      for (let i = 1; i <= 3; i += 1) {
        links.push(generateLink(i));
      }
    } else if (this.props.currentPage === pagesCount) {
      for (let i = pagesCount - 2; i <= pagesCount; i += 1) {
        links.push(generateLink(i));
      }
    } else {
      for (let i = this.props.currentPage - 1; i <= this.props.currentPage + 1; i += 1) {
        links.push(generateLink(i));
      }
    }

    return (
      <Pagination>
        <PaginationItem
          disabled={this.props.currentPage === 1}
          onClick={this.props.currentPage !== 1
            ? this.onLinkClick.bind(this, 1)
            : null}
        >
          <PaginationLink previous href="#" />
        </PaginationItem>

        {links.map(link => link)}

        <PaginationItem
          disabled={this.props.currentPage === pagesCount}
          onClick={this.props.currentPage !== pagesCount
            ? this.onLinkClick.bind(this, pagesCount)
            : null}
        >
          <PaginationLink next href="#" />
        </PaginationItem>
      </Pagination>
    );
  }
}

export default TablePagination;
