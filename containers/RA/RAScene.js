import React, {Component} from 'react';

import {
  ViroARScene,
  ViroVideo,
  ViroNode,
  ViroARTrackingTargets,
  ViroARImageMarker,
  ViroAnimations,
  ViroAmbientLight,
} from 'react-viro';

import images from '../../const/images';

var createReactClass = require('create-react-class');

var RAScene = createReactClass({
  getInitialState: function () {
    return {
      playAnim: false,
    };
  },

  _onAnchorFound(target) {
    this.setState({
      target,
      playAnim: true,
    });
  },

  render() {
    const {target} = this.state;

    return (
      <ViroARScene>
        <ViroAmbientLight color="#ffffff" intensity={200} />

        <ViroARImageMarker
          target={'target1'}
          onAnchorFound={() => this._onAnchorFound('target1')}>
          <ViroNode
            position={[0, 0, 0]}
            scale={[0, 0, 0]}
            rotation={[270, 0, 0]}
            dragType="FixedToWorld"
            onDrag={() => {}}
            animation={{name: 'scaleModel', run: this.state.playAnim}}>
            {this.state.target === 'target1' && (
              <ViroVideo
                loop={false}
                height={0.3}
                width={0.4}
                source={images.ra.video1}
                visible={this.props.sceneNavigator.viroAppProps.videoVisible}
              />
            )}
          </ViroNode>
        </ViroARImageMarker>

        <ViroARImageMarker
          target={'target2'}
          onAnchorFound={() => this._onAnchorFound('target2')}>
          <ViroNode
            position={[0, 0, 0]}
            scale={[0, 0, 0]}
            rotation={[270, 0, 0]}
            dragType="FixedToWorld"
            onDrag={() => {}}
            animation={{name: 'scaleModel', run: this.state.playAnim}}>
            {this.state.target === 'target2' && (
              <ViroVideo
                loop={false}
                height={0.3}
                width={0.4}
                source={images.ra.video2}
                visible={this.props.sceneNavigator.viroAppProps.videoVisible}
              />
            )}
          </ViroNode>
        </ViroARImageMarker>

        <ViroARImageMarker
          target={'target3'}
          onAnchorFound={() => this._onAnchorFound('target3')}>
          <ViroNode
            position={[0, 0, 0]}
            scale={[0, 0, 0]}
            rotation={[270, 0, 0]}
            dragType="FixedToWorld"
            onDrag={() => {}}
            animation={{name: 'scaleModel', run: this.state.playAnim}}>
            {this.state.target === 'target3' && (
              <ViroVideo
                loop={false}
                height={0.3}
                width={0.4}
                source={images.ra.video3}
                visible={this.props.sceneNavigator.viroAppProps.videoVisible}
              />
            )}
          </ViroNode>
        </ViroARImageMarker>
      </ViroARScene>
    );
  },
});

ViroAnimations.registerAnimations({
  scaleModel: {
    properties: {
      scaleX: 0.5,
      scaleY: 0.5,
      scaleZ: 0.5,
    },
    duration: 1000,
  },
});

ViroARTrackingTargets.createTargets({
  target1: {
    source: images.ra.target1,
    orientation: 'Up',
    physicalWidth: 0.1, // real world width in meters
  },
  target2: {
    source: images.ra.target2,
    orientation: 'Up',
    physicalWidth: 0.1, // real world width in meters
  },
  target3: {
    source: images.ra.target3,
    orientation: 'Up',
    physicalWidth: 0.1, // real world width in meters
  },
});

ViroAnimations.registerAnimations({
  scaleModel: {
    properties: {
      scaleX: 1,
      scaleY: 1,
      scaleZ: 1,
    },
    duration: 1000,
  },
});

module.exports = RAScene;
