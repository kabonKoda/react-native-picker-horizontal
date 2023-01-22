"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var _default = props => {
  const {
    data,
    renderItem,
    itemWidth,
    style = {},
    passToFlatList = {},
    onChange,
    ...passedProps
  } = props;

  const scrollX = _react.default.useRef(new _reactNative.Animated.Value(0)).current;

  let fixed = _react.default.useRef(false).current;

  let timeoutFixPosition = _react.default.useRef(setTimeout(() => {}, 0)).current;

  const flatListRef = _react.default.useRef(null);

  let [paddingSide, setPaddingSide] = (0, _react.useState)(0);

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
          animated: false,
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
    }, _reactNative.Platform.OS == "ios" ? 50 : 0);
  };

  return /*#__PURE__*/_react.default.createElement(_reactNative.View, _extends({
    style: {
      display: "flex",
      height: "100%",
      ...style
    }
  }, passedProps), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center'
    }
  }, typeof props.mark === "undefined" ? DefaultMark : props.mark), /*#__PURE__*/_react.default.createElement(_reactNative.Animated.FlatList, _extends({
    ref: process.env.NODE_ENV === 'test' ? null : flatListRef,
    onLayout: onLayoutScrollView,
    onScroll: _reactNative.Animated.event([{
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
    initialNumToRender: 30
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
      return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableWithoutFeedback, {
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
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
        style: {
          transform: [{
            scale
          }],
          opacity
        }
      }, renderItem(item, index)));
    }
  })));
};

exports.default = _default;

const DefaultMark = /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
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