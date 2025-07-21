import { Text } from "@/components/ui/text";
import { TodoStatus, TTodo } from "@/types/TTodo";
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from "react";
import { ScrollView } from 'react-native';
import TodoListGroup from "./TodoListGroup";

const todoList = [{
    id: 1,
    name: "Prepare presentation",
    description: "Create slides for quarterly report",
    location: "Office",
    status: "in progress",
    date: "05/15/2023"
}, {
    id: 2,
    name: "Buy groceries",
    description: "Milk, eggs, bread, fruits",
    location: "Supermarket",
    status: "backlog",
    date: "05/16/2023"
}, {
    id: 3,
    name: "Call client",
    description: "Discuss project details",
    location: "Home office",
    status: "completed",
    date: "05/14/2023"
}, {
    id: 4,
    name: "Schedule dentist appointment",
    description: "Check available dates for cleaning",
    location: "Dental clinic",
    status: "backlog",
    date: "05/20/2023"
}, {
    id: 5,
    name: "Renew gym membership",
    description: "Choose annual subscription plan",
    location: "Fitness center",
    status: "cancel",
    date: "05/18/2023"
}, {
    id: 6,
    name: "Submit expense reports",
    description: "Collect receipts from business trip",
    location: "Office",
    status: "completed",
    date: "05/12/2023"
}, {
    id: 7,
    name: "Plan team building event",
    description: "Research venues and activities",
    location: "Conference room",
    status: "backlog",
    date: "05/22/2023"
}, {
    id: 8,
    name: "Update project documentation",
    description: "Add new API endpoints to docs",
    location: "Home office",
    status: "in progress",
    date: "05/15/2023"
}, {
    id: 9,
    name: "Book flight tickets",
    description: "Find best deals for New York trip",
    location: "Online",
    status: "completed",
    date: "05/13/2023"
}];


export default function TodoList() {
    const [data, setData] = useState<Record<string, TTodo[]>>({})
    const isFocused = useIsFocused();
    const { getItem, setItem } = useAsyncStorage('@data');

    const readTodosFromStorage = async () => {
        try {
            const jsonValue = JSON.stringify(todoList);
            await setItem(jsonValue);

            const savedData = await getItem();
            if (savedData !== null) {
                setData(groupByStatus(JSON.parse(savedData)));
            }
        } catch (error) {
            console.error('Error', error);
        }
    };

    useEffect(() => {
        readTodosFromStorage();
    }, []);

    useEffect(() => {
        const loadData = async () => {
            try {
                if (isFocused) {
                    const savedData = await getItem();
                    if (savedData !== null) {
                        setData(groupByStatus(JSON.parse(savedData)));
                    }
                }
            } catch (error) {
                console.error('Error', error);
            }
        };

        loadData();

    }, [isFocused]);

    const onDeleteTodo = async (id: number) => {
        const savedData = await getItem();
        if (savedData !== null) {
            const parsedSavedData = JSON.parse(savedData);
            let index = parsedSavedData.findIndex((el: TTodo) => el.id === id);

            parsedSavedData.splice(index, 1);

            setData(groupByStatus(parsedSavedData));

            const jsonValue = JSON.stringify(parsedSavedData);
            await AsyncStorage.setItem('@data', jsonValue);
        }
    }

    const changeStatus = async (id: number, status: string) => {
        const savedData = await getItem();

        if (savedData !== null) {
            const parsedSavedData = JSON.parse(savedData);
            let index = parsedSavedData.findIndex((el: TTodo) => el.id === id);

            parsedSavedData[index].status = status;

            setData(groupByStatus(parsedSavedData));

            const jsonValue = JSON.stringify(parsedSavedData);
            await AsyncStorage.setItem('@data', jsonValue);
        }
    }

    const groupByStatus = (data: TTodo[]): Record<string, TTodo[]> => {
        const groupedData = data.reduce((groups: Record<string, TTodo[]>, task: TTodo): Record<string, TTodo[]> => {
            const { status } = task;
            if (!groups[status]) {
                groups[status] = [];
            }

            groups[status].push(task);
            return groups;
        }, {});

        return groupedData;
    };

    const arrStatus = [
        TodoStatus.BACKLOG,
        TodoStatus.IN_PROGRESS,
        TodoStatus.COMPLETED,
        TodoStatus.CANCEL
    ];

    return (
        <ScrollView
            style={{
                flex: 1
            }}
        >
            {
                Object.keys(data).length !== 0
                    ? arrStatus.map((el: TodoStatus) => {
                        return <TodoListGroup
                            title={el}
                            data={data[el]}
                            onDeleteTodo={onDeleteTodo}
                            changeStatus={changeStatus}
                        />
                    })
                    : <Text>No Data</Text>

            }
        </ScrollView>
    );
}
