import TodoList from "@/components/index/TodoList";
import { Fab, FabIcon } from "@/components/ui/fab";
import { AddIcon } from "@/components/ui/icon";
import { Link } from "expo-router";
import { View } from "react-native";

export default function Index() {
    return (
        <View style={{ flex: 1 }}>
            <TodoList />

            <Link
                href="/add-todo"
                asChild
            >
                <Fab
                    className="mb-12 mr-6"
                    size="lg"
                    placement="bottom right"
                    isHovered={false}
                    isDisabled={false}
                    isPressed={false}
                >
                    <FabIcon as={AddIcon} />
                </Fab>
            </Link>
        </View>
    );
}
