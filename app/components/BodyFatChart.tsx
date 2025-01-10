import React from 'react';
import { View, Dimensions, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

interface BodyFatChartProps {
    data: Array<{ date: string; value: number }>;
}

const BodyFatChart: React.FC<BodyFatChartProps> = ({ data }) => {
    if (data.length === 0) {
        return <Text>No data available</Text>;
    }

    const chartData = {
        labels: data.map(item => new Date(item.date).toLocaleDateString()),
        datasets: [
            {
                data: data.map(item => {
                    const value = parseFloat(item.value);
                    return isNaN(value) ? 0 : value;
                }),
            },
        ],
    };

    return (
        <View>
            <LineChart
                data={chartData}
                width={Dimensions.get('window').width * 0.9}
                height={220}
                yAxisSuffix="%"
                chartConfig={{
                    backgroundColor: '#ffffff',
                    backgroundGradientFrom: '#ffffff',
                    backgroundGradientTo: '#ffffff',
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(0, 143, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                        borderRadius: 16,
                    },
                    propsForDots: {
                        r: '6',
                        strokeWidth: '2',
                        stroke: '#008fff',
                    },
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                }}
            />
        </View>
    );
};

export default BodyFatChart;

