import {Tabs} from "expo-router";
import {Ionicons} from "@expo/vector-icons";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#008fff',
                tabBarInactiveTintColor: '#dee8ee',
                headerStyle: {
                    backgroundColor: 'gray',
                },
                headerShadowVisible: false,
                headerTintColor: 'white',
                tabBarStyle: {
                    backgroundColor: '#0b3d65',
                    borderRadius: 20,
                    marginBottom: 10,
                    width: '90%',
                    margin: 'auto',
                },
            }}
        >

        <Tabs.Screen name="index" options={{ title: 'Home', headerShown: false,  tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
                    ),
                }}
            />
        <Tabs.Screen name="calculator" options={{ title: 'Calculator', headerShown: false, tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'calculator-sharp' : 'calculator-outline'} color={color} size={24} />
                    ),
                }}
            />
            <Tabs.Screen name="images" options={{ title: 'Images', headerShown: false,  tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'images-sharp' : 'images-outline'} color={color} size={24}/>
                    ),
                }}
            />
        </Tabs>
    );
}