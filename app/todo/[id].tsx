import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from "react";
import { ScrollView } from 'react-native';

export default function Todo() {
    const { getItem, setItem } = useAsyncStorage('@data');
    const { id } = useLocalSearchParams();
    const [value, setValue] = useState('');

    const readItemFromStorage = async () => {
        const todos = await getItem();
        const parsedSavedData = JSON.parse(todos);


        const item = parsedSavedData.filter(el => el.id == id);
        setValue(item[0]);
    };

    useEffect(() => {
        readItemFromStorage();
    }, []);

    console.log(value)

    return (
        <ScrollView
            style={{
                flex: 1
            }}

        >
            <Box className="bg-gray-200 rounded-lg p-6 mb-3 mt-3 mr-6 ml-4">
                <HStack space="md">
                    <Box style={{ flex: 1 }}>
                        <HStack space="md">
                            <Box>
                                <Text className="text-black-900 text-wrap" size="md">{value.name}</Text>
                                <Text className="text-black-900" size="xs">{value.description}</Text>
                            </Box>

                        </HStack>

                    </Box>
                </HStack>
            </Box>

            <Box className="bg-gray-200 rounded-lg p-6 mb-3 mt-3 mr-6 ml-4">
                <Box>
                    <Text className="text-black-900 text-wrap" size="md">{value.date}</Text>
                </Box>
            </Box>

            <Box className="bg-gray-200 rounded-lg p-6 mb-3 mt-3 mr-6 ml-4">
                <Box>
                    <Text className="text-black-900 text-wrap" size="md">{value.location}</Text>
                </Box>
            </Box>

            <Box className="bg-gray-200 rounded-lg p-6 mb-3 mt-3 mr-6 ml-4">
                <Box>
                    <Text className="text-black-900 text-wrap" size="md">{value.status}</Text>
                </Box>
            </Box>
        </ScrollView>

    );
}