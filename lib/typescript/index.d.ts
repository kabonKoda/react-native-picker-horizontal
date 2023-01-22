import { ReactNode } from 'react';
import { ScrollViewProps, Animated } from 'react-native';
export interface Props extends ScrollViewProps {
    data: any[];
    renderItem: (item: any, index: number) => ReactNode;
    itemWidth: number;
    initialIndex?: number;
    onChange?: (position: number) => void;
    mark?: ReactNode | null;
    interpolateScale?: (index: number, itemWidth: number) => Animated.InterpolationConfigType;
    interpolateOpacity?: (index: number, itemWidth: number) => Animated.InterpolationConfigType;
    style?: object;
    passToFlatList?: object;
}
declare const _default: (props: Props) => JSX.Element;
export default _default;
