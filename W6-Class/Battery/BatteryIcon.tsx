import React from 'react';
import { View } from 'react-native';
import Svg, { Rect, Text} from 'react-native-svg';


const BatteryIcon = ({ batteryLevel }) => {
  const batteryWidth = 200;
  const batteryHeight = 100;
  const batteryBorderRadius = 5;
  const borderOffset = 1;

  const fillWidth = batteryWidth * (batteryLevel / 100);

  return (
    <View>
      <Svg width={batteryWidth} height={batteryHeight}>
      <Rect
          x={borderOffset}
          y={borderOffset}
          width={batteryWidth - 2 * borderOffset}
          height={batteryHeight - 2 * borderOffset}
          rx={batteryBorderRadius}
          ry={batteryBorderRadius}
          fill="none"
          stroke="black"
          strokeWidth="2"
        />
        <Rect
          x={0}
          y={0}
          width={batteryWidth}
          height={batteryHeight}
          rx={batteryBorderRadius}
          ry={batteryBorderRadius}
          fill="#ccc"

        />
        <Rect
          x={0}
          y={0}
          width={fillWidth}
          height={batteryHeight}
          rx={batteryBorderRadius}
          ry={batteryBorderRadius}
          fill={batteryLevel > 20 ? 'yellow' : 'red'}
        />
        <Rect
          x={0}
          y={0}
          width={fillWidth}
          height={batteryHeight}
          rx={batteryBorderRadius}
          ry={batteryBorderRadius}
          fill={batteryLevel > 40 ? '#2fd049' : 'yellow'}
        />
        <Text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy="0.3em"
          fontSize="20"
          fill="black"
        >
          {batteryLevel} %
        </Text>
      </Svg>
    </View>
  );
};

export default BatteryIcon;