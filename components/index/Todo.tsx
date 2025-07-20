import {
    Actionsheet,
    ActionsheetBackdrop,
    ActionsheetContent,
    ActionsheetDragIndicator,
    ActionsheetDragIndicatorWrapper,
    ActionsheetItem,
    ActionsheetItemText
} from "@/components/ui/actionsheet";
import { Box } from "@/components/ui/box";
import { Button, ButtonIcon } from "@/components/ui/button";
import {
    Checkbox,
    CheckboxIcon,
    CheckboxIndicator,
    CheckboxLabel,
} from "@/components/ui/checkbox";
import { HStack } from "@/components/ui/hstack";
import { ArrowRightIcon, CheckIcon, CloseIcon, Icon, ThreeDotsIcon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { Link, useRouter } from "expo-router";

export default function Todo({ item, onDeleteTodo }) {
    const router = useRouter();
    const [showActionsheet, setShowActionsheet] = React.useState(false)
    const handleClose = () => setShowActionsheet(false)

    return (
        <Box
            className="bg-gray-200 rounded-lg p-6 mb-3 mt-3 mr-6 ml-4"
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
                                    <Text className="text-black-900 text-wrap" size="md">{item.name}</Text>
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



                    <Button size="sm" action="secondary" className="p-2" onPress={() => setShowActionsheet(true)}>
                        <ButtonIcon as={ThreeDotsIcon} size="xl" />
                    </Button>
                    <Actionsheet isOpen={showActionsheet} onClose={handleClose}>
                        <ActionsheetBackdrop />
                        <ActionsheetContent>
                            <ActionsheetDragIndicatorWrapper>
                                <ActionsheetDragIndicator />
                            </ActionsheetDragIndicatorWrapper>
                            <ActionsheetItem onPress={handleClose}>
                                <ActionsheetItemText>Edit Message</ActionsheetItemText>
                            </ActionsheetItem>
                            <ActionsheetItem onPress={handleClose}>
                                <ActionsheetItemText>Mark Unread</ActionsheetItemText>
                            </ActionsheetItem>
                            <ActionsheetItem onPress={handleClose}>
                                <ActionsheetItemText>Remind Me</ActionsheetItemText>
                            </ActionsheetItem>
                            <ActionsheetItem onPress={handleClose}>
                                <ActionsheetItemText>Add to Saved Items</ActionsheetItemText>
                            </ActionsheetItem>
                            <ActionsheetItem isDisabled onPress={handleClose}>
                                <ActionsheetItemText>Delete</ActionsheetItemText>
                            </ActionsheetItem>
                        </ActionsheetContent>
                    </Actionsheet>



                    <Button onPress={() => onDeleteTodo(item.id)} size="sm" action="negative" className="p-2">
                        <ButtonIcon as={CloseIcon} size="xl" />
                    </Button>

                    <Link href={`todo/{item.id}`}>
                        <Icon as={ArrowRightIcon} size="xl" />
                    </Link>

                </HStack>
            </HStack>
        </Box>
    );
}
