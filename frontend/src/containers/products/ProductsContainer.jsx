import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../../actions';

import ProductsMainPage from '../../components/products/ProductsMainPage';
import awaitedRequestDecorator from '../../utils/decorators/awaitedRequestDecorator';
import awaitedProductActionsDecorator from '../../utils/decorators/awaitedProductActionsDecorator';

const mapStateToProps = state => ({
  products: state.products.items,
  users: state.users.items,
  areProductsFetching: state.products.areFetching,
  areProductsLoaded: state.products.areLoaded,
  areUsersFetching: state.users.isFetching,
  areUsersLoaded: state.users.isLoaded,
  isProductsError: state.products.isError,
  isActiveRequest: state.app.isActiveRequest,
});

const mapDispatchToProps = dispatch => ({
  usersActions: bindActionCreators(actions.users, dispatch),
  productsActions: bindActionCreators(actions.products, dispatch),
  storeProduct: (product) => {
    dispatch(awaitedRequestDecorator(awaitedProductActionsDecorator(actions.product.storeProduct(product))));
  },
  updateProduct: (id, product) => {
    dispatch(awaitedRequestDecorator(awaitedProductActionsDecorator(actions.product.updateProduct(
      id,
      product,
    ))));
  },
  removeProduct: (login) => {
    dispatch(awaitedRequestDecorator(actions.product.removeProduct(login)));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsMainPage);
