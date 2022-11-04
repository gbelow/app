import React from 'react';
import {connect} from 'react-redux';
import {View, FlatList} from 'react-native';

import {
  ContentItem,
  NoResults,
  NoConnection,
  PDFModal,
} from '../../config/components';

import {contentResetRequest} from '../../actions/contentActions';

import {navigate} from '../../actions/navigateActions';

import styles from './styles';

class Content extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.title,
    headerRight: <View />,
  });

  state = {
    PDFModalVisibility: false,
    currentItem: null,
  };

  componentWillUnmount() {
    this.props.resetContent();
  }

  /**
   * @name renderItem
   * @description return item from content list
   * @param { Object } item
   * @return { Component } Grid with children
   */
  renderItem({item}) {
    return (
      <ContentItem
        onPress={() => this.showDetails(item)}
        pdf={item.pdfUrl}
        images={item.images}
        image={item.imageUrl}
        video={item.videoUrl}
        thumb={item.thumbnailUrl}
        date={item.publishedAt}
        title={item.title}
        description={item.abstract}
      />
    );
  }

  /**
   * @name togglePDFModal
   * @description focus the input
   * @return {Void}
   */
  togglePDFModal(item) {
    this.setState({
      PDFModalVisibility: !this.state.PDFModalVisibility,
      currentItem: item,
    });
  }

  /**
   * @name showDetails
   * @description send to ContentDetail screen
   * @param { Object } item
   * @return { Void }
   */
  showDetails(item) {
    if (item.pdfUrl) {
      this.togglePDFModal(item);
    } else {
      this.props.navigate({
        routeName: 'ContentDetail',
        params: {
          item,
        },
      });
    }
  }

  render() {
    const {content} = this.props;

    return (
      <View style={styles.container}>
        <FlatList
          data={content.data && content.data.items}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={(item) => item.contentId.toString()}
          ListEmptyComponent={() => {
            if (content.data && content.data.items.length === 0) {
              return (
                <NoResults
                  icon={content.data.category.icon}
                  text="Não há publicações"
                />
              );
            } else if (!this.props.connection) {
              return <NoConnection />;
            }

            return null;
          }}
        />
        {this.state.currentItem && (
          <PDFModal
            uri={this.state.currentItem.pdfUrl}
            visible={this.state.PDFModalVisibility}
            onClose={this.togglePDFModal.bind(this)}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = ({content, connection}) => ({
  content,
  connection,
});

const mapDispatchToProps = (dispatch) => ({
  resetContent: () => {
    dispatch(contentResetRequest());
  },
  navigate: (data) => {
    dispatch(navigate(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Content);
