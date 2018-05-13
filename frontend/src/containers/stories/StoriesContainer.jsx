import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../../actions';

import StoriesMainPage from '../../components/stories/StoriesMainPage';
import awaitedRequestDecorator from '../../utils/decorators/awaitedRequestDecorator';
import awaitedStoryActionsDecorator from '../../utils/decorators/awaitedStoryActionsDecorator';
import notificationDecorator from '../../utils/decorators/notificationDecorator';

const mapStateToProps = state => ({
  products: state.products.items,
  stories: state.stories.items,
  areProductsFetching: state.products.areFetching,
  areProductsLoaded: state.products.areLoaded,
  areStoriesFetching: state.stories.areFetching,
  areStoriesLoaded: state.stories.areLoaded,
  isStoriesError: state.stories.isError,
  isActiveRequest: state.app.isActiveRequest,
});

const mapDispatchToProps = dispatch => ({
  storiesActions: bindActionCreators(actions.stories, dispatch),
  productsActions: bindActionCreators(actions.products, dispatch),
  storeStory: (story) => {
    dispatch(awaitedRequestDecorator(awaitedStoryActionsDecorator(notificationDecorator(
      actions.story.storeStory(story),
      'Successfully added story',
      'There is an input error in field(s)',
    ))));
  },
  updateStory: (id, story) => {
    dispatch(awaitedRequestDecorator(awaitedStoryActionsDecorator(notificationDecorator(
      actions.story.updateStory(id, story),
      'Successfully updated story',
      'There is an input error in field(s)',
    ))));
  },
  removeStory: (id) => {
    dispatch(awaitedRequestDecorator(notificationDecorator(
      actions.story.removeStory(id),
      'Successfully deleted story',
      'The story is connected to some other entity',
    )));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(StoriesMainPage);
