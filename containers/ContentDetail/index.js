import React from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  ImageEditor,
  ImageStore,
  Dimensions,
  StatusBar,
} from 'react-native';
import {connect} from 'react-redux';
import {Touch} from 'react-native-kin-ui';
import Share from 'react-native-share';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  Video,
  PDFModal,
  ImageSwiper,
  ImageModalViewer,
  TextLink,
  ContentReferences,
  ContentReaction,
  NavigationBar,
  HeaderButton,
} from '../../config/components';
import {productDetailRequest} from '../../actions/cavabenActions';
import reactionSendRequest from '../../actions/reactionActions';
import theme from '../../const/theme';
import {name} from '../../package.json';

import styles from './styles';

class ContentDetail extends React.Component {
  static navigationOptions = () => ({
    header: null,
  });

  constructor(props) {
    super(props);

    const isPortrait = () => {
      const dimesion = Dimensions.get('screen');
      return dimesion.height >= dimesion.width;
    };

    this.state = {
      PDFModalVisibility: false,
      imageModalVisibility: false,
      imageUrls: [],
      userReaction: 0,
      showStatusBar: true,
      styleVideo: styles.video,
    };

    Dimensions.addEventListener('change', () => {
      this.setState({
        ...this.state,
        showStatusBar: isPortrait() ? true : false,
        styleVideo: isPortrait() ? styles.video : styles.videoLandscape,
      });
    });
  }

  componentWillMount() {
    let imageUrl = null;
    const {item} = this.props.navigation.state.params;

    this.setState({
      userReaction: item.reaction ? item.reaction.like : 0,
    });

    if (item.imageUrl) {
      imageUrl = item.imageUrl;

      this.setState({
        imageUrls: [
          {
            url: item.imageUrl,
          },
        ],
      });
    } else if (item.images && item.images.length) {
      imageUrl = item.images[0];

      let imageUrls = item.images.map((url) => {
        return {
          url,
        };
      });

      this.setState({
        imageUrls,
      });
    }

    if (imageUrl) {
      Image.getSize(
        imageUrl,
        (width, height) => {
          const cropInfo = {
            size: {width, height},
            offset: {x: 0, y: 0},
          };

          ImageEditor.cropImage(
            imageUrl,
            cropInfo,
            (imageURI) => {
              ImageStore.getBase64ForTag(
                imageURI,
                (pictureBase64) => {
                  this.props.navigation.setParams({
                    pictureBase64,
                  });

                  //ImageStore.removeImageForTag(imageURI);
                },
                (reason) => console.log('reason'),
              );
            },
            (reason) => console.log('reason'),
          );
        },
        (reason) => console.log('reason'),
      );
    }
  }

  componentWillUnmount() {
    const {item} = this.props.navigation.state.params;

    let lastReaction = item.reaction ? item.reaction.like : 0;

    if (this.state.userReaction !== lastReaction) {
      this.props.sendReaction({
        reaction: this.state.userReaction,
        contentId: item.contentId,
      });
    }
  }

  /**
   * @name togglePDFModal
   * @description focus the input
   * @return {Void}
   */
  togglePDFModal() {
    this.setState({
      PDFModalVisibility: !this.state.PDFModalVisibility,
    });
  }

  /**
   * @name togglePDFModal
   * @description focus the input
   * @return {Void}
   */
  toggleImageModal() {
    this.setState({
      imageModalVisibility: !this.state.imageModalVisibility,
    });
  }

  renderDescription(item) {
    return item.text && item.text.length === 1
      ? (item.abstract && item.abstract.length > 1) || item.title
      : item.text;
  }

  handleReaction(reaction) {
    let userReaction = this.state.userReaction === reaction ? 0 : reaction;

    this.setState({
      userReaction: userReaction,
    });
  }

  handleProductDetail(contentId) {
    if (contentId) {
      this.props.loadProductDetail(contentId);
    }
  }

  render() {
    const {item} = this.props.navigation.state.params;

    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={theme.statusBarBackground}
          hidden={!this.state.showStatusBar}
          translucent={false}
        />

        {this.state.showStatusBar && (
          <NavigationBar
            left={
              <HeaderButton
                navigation={this.props.navigation}
                back={true}
                icon="arrow-left"
              />
            }
            title={this.props.navigation.state.params.item.title}
            right={
              <TouchableOpacity
                style={styles.shareButton}
                onPress={() => {
                  if (this.props.navigation.state.params) {
                    const {params} = this.props.navigation.state;
                    let fileTitle = '\n\n';
                    let fileUrl = null;

                    if (params.item.videoUrl) {
                      fileTitle += 'Vídeo: ';
                    } else if (params.item.pdfUrl) {
                      fileTitle += 'PDF: ';
                    }

                    if (
                      (params.item.imageUrl || params.item.images) &&
                      params.pictureBase64
                    ) {
                      fileUrl = `data:image/png;base64,${params.pictureBase64}`;
                    } else if (params.item.videoUrl) {
                      fileUrl = params.item.videoUrl;
                    } else if (params.item.pdfUrl) {
                      fileUrl = params.item.pdfUrl;
                    }

                    Share.open({
                      title: params.item.title,
                      message: params.item.text + fileTitle,
                      url: fileUrl,
                      subject: `Novidades ${name}`,
                    });
                  }
                }}>
                <View style={styles.instructions}>
                  <Icon name="share-alt" style={styles.shareIcon} />
                </View>
              </TouchableOpacity>
            }
          />
        )}

        <ScrollView scrollEnabled={this.state.showStatusBar}>
          {item.images && item.images.length && (
            <View style={styles.swiperContainer}>
              <ImageSwiper
                onPress={this.toggleImageModal.bind(this)}
                images={item.images}
              />
            </View>
          )}
          {item.imageUrl && (
            <Touch onPress={this.toggleImageModal.bind(this)}>
              <Image source={{uri: item.imageUrl}} style={styles.image} />
            </Touch>
          )}
          {item.product && item.videoUrl && (
            <View style={styles.videoContainer}>
              <Video
                source={item.videoUrl}
                thumb={item.thumbnailUrl}
                style={this.state.styleVideo}
              />
            </View>
          )}
          {!item.product && item.videoUrl && (
            <Video
              source={item.videoUrl}
              thumb={item.thumbnailUrl}
              style={this.state.styleVideo}
            />
          )}
          {item.pdfUrl && (
            <Image source={{uri: item.thumbnailUrl}} style={styles.image} />
          )}
          {item.contentId && this.props.session.logged && (
            <ContentReaction
              title={item.title}
              like={this.state.userReaction}
              reaction={item.reaction}
              sendReaction={this.handleReaction.bind(this)}
            />
          )}
          {item.publishedAt && (
            <Text style={styles.date}>{item.publishedAt}</Text>
          )}
          {item.product && item.text && (
            <Text style={styles.title}>Descrição</Text>
          )}
          <Text style={styles.description}>{this.renderDescription(item)}</Text>
          {item.pdfUrl && (
            <View>
              <View style={styles.textLinkContainer}>
                <TextLink
                  onPress={this.togglePDFModal.bind(this)}
                  text="Visualizar documento"
                />
              </View>
              <PDFModal
                uri={item.pdfUrl}
                visible={this.state.PDFModalVisibility}
                onClose={this.togglePDFModal.bind(this)}
              />
            </View>
          )}
          {item.product && item.product.alternative && (
            <ContentReferences
              title="Outras alternativas"
              references={item.product.alternative}
              loadDetail={this.handleProductDetail.bind(this)}
            />
          )}
          {item.product && item.product.related && (
            <ContentReferences
              title="Relacionado com"
              references={item.product.related}
              loadDetail={this.handleProductDetail.bind(this)}
            />
          )}
          {item.product && item.product.soldWith && (
            <ContentReferences
              title="Vendido com"
              references={item.product.soldWith}
              loadDetail={this.handleProductDetail.bind(this)}
            />
          )}
        </ScrollView>
        {this.state.imageModalVisibility && (
          <ImageModalViewer
            imageUrls={this.state.imageUrls}
            visible={this.state.imageModalVisibility}
            onClose={this.toggleImageModal.bind(this)}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = ({session}) => ({
  session,
});

const mapDispatchToProps = (dispatch) => ({
  sendReaction: (data) => {
    dispatch(reactionSendRequest(data));
  },
  loadProductDetail: (contentId) => {
    dispatch(productDetailRequest(contentId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ContentDetail);
