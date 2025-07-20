import { Stack } from "expo-router";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { Text } from "react-native";


export default function RootLayout() {
    return (
        <GluestackUIProvider mode="light">
            <Text>ddd</Text>
            <Stack />
        </GluestackUIProvider>
    );
}
