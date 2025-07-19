import { Fab, FabIcon } from "@/components/ui/fab";
import { AddIcon } from "@/components/ui/icon";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  const router = useRouter();



  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >

      <Text>ddddddddd</Text>
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
