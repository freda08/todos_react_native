import { Button, ButtonText } from "@/components/ui/button";
import {
    FormControl,
    FormControlLabel,
    FormControlLabelText
} from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { VStack } from "@/components/ui/vstack";
import { useState } from "react";
import { View } from "react-native";

import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker, { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';

export default function Index() {
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [decsription, setDecsription] = useState("");
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    const onChange = (event: DateTimePickerEvent, selectedDate: Date | undefined) : void => {
        const currentDate = selectedDate || date; // Use selectedDate or current date if none selected

        if (Platform.OS === 'ios') {
            setShowPicker(false); // Hide picker on iOS after selection
        }

        setDate(currentDate);
    };

    const handleSubmit = async () => {
        const newTodo = {
            name,
            location,
            decsription,
            date: formatDateTime(date),
            status: 'backlog',
            id: undefined
        };

        const savedData = await AsyncStorage.getItem('@data');

        if (savedData !== null) {
            const parsedSavedData = JSON.parse(savedData);

            newTodo.id = parsedSavedData.pop().id + 1;

            parsedSavedData.push(newTodo)
            const jsonValue = JSON.stringify(parsedSavedData);

            await AsyncStorage.setItem('@data', jsonValue);
        }
    };

    const showDatepicker = () => {
        if (Platform.OS === 'android') {
            // Imperative API for Android
            DateTimePickerAndroid.open({
                value: date,
                onChange,
                mode: 'date',
                is24Hour: true, // Optional: for 24-hour time format
            });
        } else {
            // Component-based for iOS/Windows
            setShowPicker(true);
        }
    };

    const formatDateTime = (dateObj: Date) : string => {
        return dateObj.toLocaleString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
            hour12: true
        });
    };

    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
            }}
        >
            <VStack className="w-full p-4">

                <HStack space="md" className=" mb-6">
                    <Button className="w-40" onPress={showDatepicker} size="md" variant="outline" action="primary">
                        <ButtonText>Select Date</ButtonText>
                    </Button>
                    <Text>Selected: {formatDateTime(date)}</Text>
                </HStack>


                {
                    showPicker && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode="date"
                            is24Hour={true}
                            display="default"
                            onChange={onChange}
                        />
                    )
                }


                <FormControl
                    size="md"
                    isDisabled={false}
                    isReadOnly={false}
                    isRequired={false}
                    className="mb-6"
                >
                    <FormControlLabel>
                        <FormControlLabelText>Name</FormControlLabelText>
                    </FormControlLabel>
                    <Input className="my-1">
                        <InputField
                            value={name}
                            onChangeText={(text) => setName(text)}
                        />
                    </Input>
                </FormControl>

                <FormControl
                    size="md"
                    isDisabled={false}
                    isReadOnly={false}
                    isRequired={false}
                    className="mb-6"
                >
                    <FormControlLabel>
                        <FormControlLabelText>Location</FormControlLabelText>
                    </FormControlLabel>
                    <Input className="my-1">
                        <InputField
                            value={location}
                            onChangeText={(text) => setLocation(text)}
                        />
                    </Input>
                </FormControl>

                <FormControl
                    size="md"
                    isDisabled={false}
                    isReadOnly={false}
                    isRequired={false}
                    className="mb-6"
                >
                    <FormControlLabel>
                        <FormControlLabelText>Description</FormControlLabelText>
                    </FormControlLabel>
                    <Textarea
                        size="md"
                        isReadOnly={false}
                        isInvalid={false}
                        isDisabled={false}

                    >
                        <TextareaInput onChangeText={(text) => setDecsription(text)} placeholder="Your text goes here..." />
                    </Textarea>
                </FormControl>


                <Button className="w-full self-end mt-4" size="xl" onPress={handleSubmit}>
                    <ButtonText>Submit</ButtonText>
                </Button>
            </VStack>
        </View>
    );
}
