import { Text } from "@/components/ui/text";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView } from 'react-native';
import Todo from "./Todo";



export default function TodoList() {
    const router = useRouter();
    const [data, setData] = useState([])
    const isFocused = useIsFocused();

    useEffect(() => {
        console.log('-------------')
        const loadData = async () => {
            try {
                const todoList = [
                    {
                        id: 1,
                        name: "Prepare presentation",
                        description: "Create slides for quarterly report",
                        location: "Office",
                        status: "in progress",
                        date: "05/15/2023 10:30:00 AM"
                    },
                    {
                        id: 2,
                        name: "Buy groceries",
                        description: "Milk, eggs, bread, fruits",
                        location: "Supermarket",
                        status: "backlog",
                        date: "05/16/2023 02:15:00 PM"
                    },
                    {
                        id: 3,
                        name: "Call client",
                        description: "Discuss project details",
                        location: "Home office",
                        status: "completed",
                        date: "05/14/2023 11:45:00 AM"
                    },
                    {
                        id: 4,
                        name: "Schedule dentist appointment",
                        description: "Check available dates for cleaning",
                        location: "Dental clinic",
                        status: "backlog",
                        date: "05/20/2023 09:00:00 AM"
                    },
                    {
                        id: 5,
                        name: "Renew gym membership",
                        description: "Choose annual subscription plan",
                        location: "Fitness center",
                        status: "cancel",
                        date: "05/18/2023 04:45:00 PM"
                    },
                    {
                        id: 6,
                        name: "Submit expense reports",
                        description: "Collect receipts from business trip",
                        location: "Office",
                        status: "completed",
                        date: "05/12/2023 03:20:00 PM"
                    },
                    {
                        id: 7,
                        name: "Plan team building event",
                        description: "Research venues and activities",
                        location: "Conference room",
                        status: "backlog",
                        date: "05/22/2023 01:00:00 PM"
                    },
                    {
                        id: 8,
                        name: "Update project documentation",
                        description: "Add new API endpoints to docs",
                        location: "Home office",
                        status: "in progress",
                        date: "05/15/2023 04:00:00 PM"
                    },
                    {
                        id: 9,
                        name: "Book flight tickets",
                        description: "Find best deals for New York trip",
                        location: "Online",
                        status: "completed",
                        date: "05/13/2023 06:15:00 PM"
                    }
                ];
                const jsonValue = JSON.stringify(todoList);
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

    useEffect(() => {
        const loadData = async () => {
            try {

                if (isFocused) {
                    const savedData = await AsyncStorage.getItem('@data');
                    if (savedData !== null) {
                        setData(JSON.parse(savedData));
                    }
                }
            } catch (error) {
                console.error('Error', error);
            }
        };

        loadData();

    }, [isFocused]);

    const onDeleteTodo = async (id: int) => {
        const savedData = await AsyncStorage.getItem('@data');
        const parsedSavedData = JSON.parse(savedData);
        let index = parsedSavedData.findIndex(el => el.id === id);

        parsedSavedData.splice(index, 1);

        setData(parsedSavedData);

        const jsonValue = JSON.stringify(parsedSavedData);
        await AsyncStorage.setItem('@data', jsonValue);
    }

    return (
        <ScrollView
            style={{
                flex: 1
            }}
        >


            <Text size="2xl" className="mb-3 mt-3 mr-6 ml-4">Backlog</Text>
            {
                data.filter(item => item.status === 'backlog').map(item => (
                    <Todo onDeleteTodo={onDeleteTodo} key={item.id} item={item} />
                ))
            }
            <Text size="2xl" className="mb-3 mt-3 mr-6 ml-4">In progress</Text>
            {
                data.filter(item => item.status === 'in progress').map(item => (
                    <Todo onDeleteTodo={onDeleteTodo} key={item.id} item={item} />
                ))
            }
            <Text size="2xl" className="mb-3 mt-3 mr-6 ml-4">Completed</Text>
            {
                data.filter(item => item.status === 'completed').map(item => (
                    <Todo onDeleteTodo={onDeleteTodo} key={item.id} item={item} />
                ))
            }
            <Text size="2xl" className="mb-3 mt-3 mr-6 ml-4">Cancel</Text>
            {
                data.filter(item => item.status === 'cancel').map(item => (
                    <Todo onDeleteTodo={onDeleteTodo} key={item.id} item={item} />
                ))
            }
        </ScrollView>
    );
}
