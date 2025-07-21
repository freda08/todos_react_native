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
import { HStack } from "@/components/ui/hstack";
import { ArrowRightIcon, CloseIcon, Icon, ThreeDotsIcon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { TTodo } from "@/types/TTodo";
import { Link, useRouter } from "expo-router";
import { useState } from "react";

type TodoProps = {
    item: TTodo,
    changeStatus: (id: number, name: string) => void,
    onDeleteTodo: (id: number) => void
};

export default function Todo({ item, onDeleteTodo, changeStatus }: TodoProps) {
    const router = useRouter();
    const [showActionsheet, setShowActionsheet] = useState(false)
    const handleClose = () => setShowActionsheet(false)

    return (
        <Box
            className="bg-gray-200 rounded-lg p-6 mb-3 mt-3 mr-6 ml-4"
        >
            <HStack space="md">
                <Box style={{ flex: 1 }}>
                    <HStack space="md">
                        <Box>
                            <Text className="text-black-900 text-wrap" size="md">{item.name}</Text>
                            <Text className="text-black-900" size="xs">{item.date}</Text>
                        </Box>
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
                            <ActionsheetItem onPress={() => changeStatus(item.id, "cancel")}>
                                <ActionsheetItemText>Mark Cancel</ActionsheetItemText>
                            </ActionsheetItem>
                            <ActionsheetItem onPress={() => changeStatus(item.id, "completed")}>
                                <ActionsheetItemText>Mark Completed</ActionsheetItemText>
                            </ActionsheetItem>
                            <ActionsheetItem onPress={() => changeStatus(item.id, "in progress")}>
                                <ActionsheetItemText>Mark In progress</ActionsheetItemText>
                            </ActionsheetItem>
                        </ActionsheetContent>
                    </Actionsheet>



                    <Button onPress={() => onDeleteTodo(item.id)} size="sm" action="negative" className="p-2">
                        <ButtonIcon as={CloseIcon} size="xl" />
                    </Button>

                    <Link
                        href={{
                            pathname: '/todo/[id]',
                            params: { id: item.id }
                        }}
                    >
                        <Icon as={ArrowRightIcon} size="xl" />
                    </Link>

                </HStack>
            </HStack>
        </Box>
    );
}
