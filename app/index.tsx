import { Box } from "@/components/ui/box";
import { Button, ButtonIcon } from "@/components/ui/button";
import {
    Checkbox,
    CheckboxIcon,
    CheckboxIndicator,
    CheckboxLabel,
} from "@/components/ui/checkbox";
import { Fab, FabIcon } from "@/components/ui/fab";
import { HStack } from "@/components/ui/hstack";
import { AddIcon, CheckIcon, CloseIcon, ThreeDotsIcon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function Index() {
    const router = useRouter();
    const [data, setData] = useState([])

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = [{
                    id: 1,
                    name: 'task 1',
                    description: 'description 1',
                    date: 'date 1',
                    location: 'location 1'
                }, {
                    id: 2,
                    name: 'task 2',
                    description: 'description 2',
                    date: 'date 2',
                    location: 'location 2'
                }, {
                    id: 3,
                    name: 'task 3',
                    description: 'description 3',
                    date: 'date 3',
                    location: 'location 3'
                }]
                const jsonValue = JSON.stringify(data);
                await AsyncStorage.setItem('@data', jsonValue);


                const savedData = await AsyncStorage.getItem('@data');
                if (savedData !== null) {
                    setData(JSON.parse(savedData));
                }
            } catch (error) {
                console.error('Error', error);
            }
        };

        loadData();
    }, [])

    return (
        <View
            style={{
                flex: 1
            }}
        >
            {
                data.map(item => (
                    <Box
                        key={item.id}
                        className="w-50 bg-gray-200 rounded-lg p-6 mb-3 mt-3 mr-6 ml-4 w-xl"
                        on={() => router.navigate('/add-todo')}
                    >
                        <HStack space="md">
                            <Box style={{ flex: 1 }}>
                                <HStack space="md">
                                    <Checkbox size="md" isInvalid={false} isDisabled={false}>
                                        <CheckboxIndicator>
                                            <CheckboxIcon as={CheckIcon} />
                                        </CheckboxIndicator>
                                        <CheckboxLabel>
                                            <Box>
                                                <Text className="text-black-900" size="xl">{item.name}</Text>
                                                <Text className="text-black-900" size="xs">{item.date}</Text>
                                            </Box>

                                        </CheckboxLabel>
                                    </Checkbox>


                                </HStack>
                            </Box>

                            <HStack
                                style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'flex-end'
                                }}
                                space="xl"

                            >

                                <Button size="xs" action="secondary" className="p-2">
                                    <ButtonIcon as={ThreeDotsIcon} size="xl" />
                                </Button>

                                <Button size="xs" action="negative" className="p-2">
                                    <ButtonIcon as={CloseIcon} size="xl" />
                                </Button>

                            </HStack>
                        </HStack>
                    </Box>
                ))
            }

            <Fab
                className="mb-12 mr-6"
                size="lg"
                placement="bottom right"
                isHovered={false}
                isDisabled={false}
                isPressed={false}
                onPress={() => router.navigate('/add-todo')}
            >
                <FabIcon as={AddIcon} />
            </Fab>
        </View>
    );
}
