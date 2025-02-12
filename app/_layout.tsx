import { Stack } from 'expo-router';
import React from 'react'

export default function RootLayout() {
  return (
   <Stack initialRouteName="(auth)" screenOptions={{ headerShown: false}}  >
      <Stack.Screen name="(auth)" options={{ headerShown: false}} />
      <Stack.Screen name="(home)" />
      <Stack.Screen name="+not-found" />
      <Stack.Screen name="productDetails" options={{ presentation: "card", headerShown: false }} />
      <Stack.Screen name="productCreate" options={{ presentation: "card", headerShown: false }} />
   </Stack>
  )
}