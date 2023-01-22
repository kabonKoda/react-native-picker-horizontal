# react-native-picker-horizontal
![Node.js CI](https://github.com/andrey-sh/react-native-picker-horizontal/actions/workflows/nodejs.yml/badge.svg)

A picker component for React Native. Allows to select the item from horizontal scrolling container with custom animations.

![Picker example](https://github.com/andrey-sh/react-native-picker-horizontal/blob/master/screen1.gif)
![Picker example](https://github.com/andrey-sh/react-native-picker-horizontal/blob/master/screen2.gif)

## Getting Started

### Installing

```
npm install react-native-picker-horizontal
```

### Basic Usage

```js
import Picker from 'react-native-picker-horizontal';

const Items = Array.from(Array(30).keys());
const itemWidth = 50;

export const Picker = () => (
  <Picker
    data={Items}
    renderItem={rednerItem}
    itemWidth={itemWidth}
    initialIndex={selected}
    onChange={newValue => {}}
  />
);

const rednerItem = (item, index) => (
  <Text style={{ width: itemWidth }}>
    { item }
  </Text>
);
```

### Props

| Name                  | Type                    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Details                  |
| ----------------------|------------------------ | -------------------------------------------------------------------------------------------------------- | ------------------------ |
| `data`                | any[]                   | Array of scrolling items  | **Required**
| `renderItem`          | (item: any, index: number) => ReactNode | Function generates `ReactNode` scrolling items  | **Required**
| `itemWidth`           | number                  | Should be same as width of `renderItem` result  | **Required**
| `initialIndex`        | number                  | Index of initial selected element
| `onChange`            | (position: number) => void | Callback which returns new `position`
| `mark`                | ReactNode               | Create your own mark for selected element
| `interpolateScale`    | (index: number, itemWidth: number) => Animated.InterpolationConfigType | Set custom animation effect for items scale
| `interpolateOpacity`  | (index: number, itemWidth: number) => Animated.InterpolationConfigType | Set custom animation effect for items opacity

