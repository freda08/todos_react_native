import { Fab, FabLabel } from "@/components/ui/fab";
import { View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Fab
        size="md"
        placement="bottom right"
        isHovered={false}
        isDisabled={false}
        isPressed={false}
      >
        
        <FabLabel>Quick start</FabLabel>
      </Fab>
    </View>
  );
}
