import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../../actions';

import ProductsMainPage from '../../components/products/ProductsMainPage';
import awaitedRequestDecorator from '../../utils/decorators/awaitedRequestDecorator';
import awaitedProductActionsDecorator from '../../utils/decorators/awaitedProductActionsDecorator';
import notificationDecorator from '../../utils/decorators/notificationDecorator';

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
    dispatch(awaitedRequestDecorator(awaitedProductActionsDecorator(notificationDecorator(
      actions.product.storeProduct(product),
      'Successfully added product',
      'There is an input error in your field(s)',
    ))));
  },
  updateProduct: (id, product) => {
    dispatch(awaitedRequestDecorator(awaitedProductActionsDecorator(notificationDecorator(
      actions.product.updateProduct(id, product),
      'Successfully edited product',
      'There is an input error in your field(s)',
    ))));
  },
  removeProduct: (id) => {
    dispatch(awaitedRequestDecorator(notificationDecorator(
      actions.product.removeProduct(id),
      'Successfully removed product',
      'The product is connected to some other entity',
    )));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsMainPage);
