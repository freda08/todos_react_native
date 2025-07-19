import { Fab, FabLabel } from "@/components/ui/fab";
import { Stack } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  const goToAddPage = () => {
        // navigation.navigate('NewPage'); // 'NewPage' is the name defined in your navigator
    };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
        <Stack.Screen
          options={{
            headerTitle: props => <Text />,
        }}
      />
      <Fab
        size="md"
        placement="bottom right"
        isHovered={false}
        isDisabled={false}
        isPressed={false}
        onPress={goToAddPage}
      >
        
        <FabLabel>Quick start!!!!</FabLabel>
      </Fab>
    </View>
  );
}
