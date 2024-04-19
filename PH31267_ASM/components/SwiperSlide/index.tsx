import { View, Text, Dimensions, SafeAreaView, Image, ScrollView } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';

interface Props {
    heightConfig: number;
    images: any[];
}

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const Index: React.FC<Props> = ({ heightConfig, images }) => {
    const [imgActive, setImgActive] = useState(0);
    const scrollViewRef = useRef<ScrollView>(null);

    const onchange = (nativeEvent: any) => {
        if (nativeEvent) {
            const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
            if (slide !== imgActive) {
                setImgActive(slide);
            }

        }
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (scrollViewRef.current) {
                scrollViewRef.current.scrollTo({
                    animated: true,
                    x: (imgActive + 1) * WIDTH,
                    y: 0,
                });
            }
            if (imgActive === images.length-1) {
                scrollViewRef.current?.scrollTo({ animated: true, x: 0, y: 0 });
                setImgActive(0);
            }
        }, 3000);

        return () => clearInterval(intervalId);
    }, [imgActive]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ width: WIDTH, height: HEIGHT * heightConfig }}>
                <ScrollView
                    ref={scrollViewRef}
                    onScroll={({ nativeEvent }) => onchange(nativeEvent)}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    horizontal
                    style={{ width: WIDTH, height: HEIGHT * heightConfig }}
                >
                   
                    {images.map((e, index) => (
                        <Image
                            key={index}
                            resizeMode='cover'
                            style={{ width: WIDTH, height: HEIGHT * heightConfig, borderRadius:15 }}
                            source={{ uri: e }}
                        />
                    ))}
                </ScrollView>

                
                <View style={{ position: 'absolute', bottom: 0, flexDirection: 'row', alignSelf: 'center' }}>
                    {images.map((e, index) => (
                        <Text key={index} style={imgActive == index ? { margin: 3, color: '#000000' } : { margin: 3, color: '#ffffff' }}>
                            ●
                        </Text>
                    ))}
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Index;
