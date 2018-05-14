import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const BUTTON_COUNT = 3;

class TablePagination extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
    };
  }

  onLinkClick(index, event) {
    event.preventDefault();

    this.setState({
      currentPage: index,
    });

    // this.props.changePage(index);
  }

  render() {
    const pagesCount = Math.ceil(this.props.total / this.props.rowPerPage);

    const links = [];

    const generateLink = index => (
      <PaginationItem
        key={index}
        disabled={index === this.state.currentPage}
        onClick={index !== this.state.currentPage
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
    } else if (this.state.currentPage === 1) {
      for (let i = 1; i <= 3; i += 1) {
        links.push(generateLink(i));
      }
    } else if (this.state.currentPage === pagesCount) {
      for (let i = pagesCount - 2; i <= pagesCount; i += 1) {
        links.push(generateLink(i));
      }
    } else {
      for (let i = this.state.currentPage - 1; i <= this.state.currentPage + 1; i += 1) {
        links.push(generateLink(i));
      }
    }

    return (
      <Pagination>
        <PaginationItem
          disabled={this.state.currentPage === 1}
          onClick={this.state.currentPage !== 1
            ? this.onLinkClick.bind(this, 1)
            : null}
        >
          <PaginationLink previous href="#" />
        </PaginationItem>

        {links.map(link => link)}

        <PaginationItem
          disabled={this.state.currentPage === pagesCount}
          onClick={this.state.currentPage !== pagesCount
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
