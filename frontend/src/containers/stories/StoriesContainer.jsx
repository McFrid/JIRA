import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../../actions';

import StoriesMainPage from '../../components/stories/StoriesMainPage';
import awaitedRequestDecorator from '../../utils/decorators/awaitedRequestDecorator';
import awaitedStoryActionsDecorator from '../../utils/decorators/awaitedStoryActionsDecorator';

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
    dispatch(awaitedRequestDecorator(awaitedStoryActionsDecorator(actions.story.storeStory(story))));
  },
  updateStory: (id, story) => {
    dispatch(awaitedRequestDecorator(awaitedStoryActionsDecorator(actions.story.updateStory(
      id,
      story,
    ))));
  },
  removeStory: (id) => {
    dispatch(awaitedRequestDecorator(actions.story.removeStory(id)));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(StoriesMainPage);
