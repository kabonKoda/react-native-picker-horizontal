function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, Animated, Platform } from 'react-native';
export default (props => {
  const {
    data,
    renderItem,
    itemWidth,
    style = {},
    passToFlatList = {},
    onChange,
    ...passedProps
  } = props;
  const scrollX = React.useRef(new Animated.Value(0)).current;
  let fixed = React.useRef(false).current;
  let timeoutFixPosition = React.useRef(setTimeout(() => {}, 0)).current;
  const flatListRef = React.useRef(null);
  let [paddingSide, setPaddingSide] = useState(0);

  const onLayoutScrollView = e => {
    const {
      width
    } = e.nativeEvent.layout;
    const {
      itemWidth,
      onLayout,
      initialIndex
    } = props;
    setPaddingSide((width - itemWidth) / 2);

    if (onLayout != null) {
      onLayout(e);
    }

    if (initialIndex) {
      if (flatListRef && flatListRef.current) {
        // @ts-ignore
        flatListRef.current.scrollToIndex({
          animated: true,
          index: "" + initialIndex
        });
      }
    }
  };

  const onMomentumScrollBegin = () => {
    fixed = false;
    clearTimeout(timeoutFixPosition);
  };

  const onMomentumScrollEnd = ({
    nativeEvent: {
      contentOffset: {
        x
      }
    }
  }) => {
    const selected = Math.round(x / itemWidth);
    changePosition(selected);
  };

  const onScrollBeginDrag = () => {
    fixed = false;
    clearTimeout(timeoutFixPosition);
  };

  const onScrollEndDrag = () => {
    clearTimeout(timeoutFixPosition);
  };

  const changePosition = position => {
    let fixedPosition = position;

    if (position < 0) {
      fixedPosition = 0;
    }

    if (position > data.length - 1) {
      fixedPosition = data.length - 1;
    }

    if (onChange) {
      onChange(fixedPosition);
    }

    clearTimeout(timeoutFixPosition);
    timeoutFixPosition = setTimeout(function () {
      if (!fixed && flatListRef && flatListRef.current) {
        fixed = true; // @ts-ignore

        flatListRef.current.scrollToIndex({
          animated: true,
          index: "" + fixedPosition
        });
      }
    }, Platform.OS == "ios" ? 50 : 0);
  };

  return /*#__PURE__*/React.createElement(View, _extends({
    style: {
      display: "flex",
      height: "100%",
      ...style
    }
  }, passedProps), /*#__PURE__*/React.createElement(View, {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center'
    }
  }, typeof props.mark === "undefined" ? DefaultMark : props.mark), /*#__PURE__*/React.createElement(Animated.FlatList, _extends({
    ref: process.env.NODE_ENV === 'test' ? null : flatListRef,
    onLayout: onLayoutScrollView,
    onScroll: Animated.event([{
      nativeEvent: {
        contentOffset: {
          x: scrollX
        }
      }
    }], {
      useNativeDriver: true
    }),
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    data: data,
    keyExtractor: (_item, index) => index.toString(),
    onMomentumScrollBegin: onMomentumScrollBegin,
    onMomentumScrollEnd: onMomentumScrollEnd,
    onScrollBeginDrag: onScrollBeginDrag,
    onScrollEndDrag: onScrollEndDrag,
    contentContainerStyle: {
      paddingHorizontal: paddingSide,
      display: "flex",
      alignItems: "center",
      backgroundColor: 'transparent'
    },
    initialNumToRender: 100
  }, passToFlatList, {
    renderItem: ({
      item,
      index
    }) => {
      const {
        itemWidth,
        interpolateScale,
        interpolateOpacity
      } = props;
      const scale = scrollX.interpolate(interpolateScale ? interpolateScale(index, itemWidth) : defaultScaleConfig(index, itemWidth));
      const opacity = scrollX.interpolate(interpolateOpacity ? interpolateOpacity(index, itemWidth) : defaultOpacityConfig(index, itemWidth));
      return /*#__PURE__*/React.createElement(TouchableWithoutFeedback, {
        onPress: () => {
          if (flatListRef && flatListRef.current) {
            fixed = true; // @ts-ignore

            flatListRef.current.scrollToIndex({
              animated: true,
              index: "" + index
            });
          }

          if (onChange) {
            onChange(index);
          }
        },
        key: index
      }, /*#__PURE__*/React.createElement(Animated.View, {
        style: {
          transform: [{
            scale
          }],
          opacity
        }
      }, renderItem(item, index)));
    }
  })));
});
const DefaultMark = /*#__PURE__*/React.createElement(Text, {
  style: {
    color: "black",
    fontWeight: "bold",
    paddingTop: 60
  }
}, "^");

const defaultScaleConfig = (index, itemWidth) => ({
  inputRange: [itemWidth * (index - 2), itemWidth * (index - 1), itemWidth * index, itemWidth * (index + 1), itemWidth * (index + 2)],
  outputRange: [1, 1.5, 2.2, 1.5, 1]
});

const defaultOpacityConfig = (index, itemWidth) => ({
  inputRange: [itemWidth * (index - 2), itemWidth * (index - 1), itemWidth * index, itemWidth * (index + 1), itemWidth * (index + 2)],
  outputRange: [0.7, 0.9, 1, 0.9, 0.7]
});
//# sourceMappingURL=index.js.map