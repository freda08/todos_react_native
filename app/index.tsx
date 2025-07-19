import { Box } from "@/components/ui/box";
import { Fab, FabIcon } from "@/components/ui/fab";
import { AddIcon } from "@/components/ui/icon";
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
      <Box className="w-20 h-20 bg-primary-300" />


          <Box className="w-50 bg-gray-200 rounded-lg p-6 m-4 w-xl">
      <Text className="text-black-900">This is the Box</Text>
    </Box>

      {
        data.map(item => (
          <Text
              key={item.id}
              size="2xl"
              style={{
                  border: "1px solid #eee"
              }}
          >{item.name}</Text>
        ))
      }
      <Fab
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
