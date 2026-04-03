import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-ivory">
        <ScrollView contentContainerClassName="flex-grow justify-center items-center p-xl">
          
          <View className="bg-white p-2xl rounded-2xl shadow-card border border-app-border items-center">
            <Text className="text-display font-display text-navy mb-md">
              Malipula Suits
            </Text>
            
            <View className="h-xs w-24 bg-gold rounded-full mb-xl" />
            
            <Text className="text-body text-app-text-secondary text-center mb-2xl">
              Tailwind CSS & NativeWind v4 are now active.
              The luxury experience begins here.
            </Text>
            
            <View className="bg-navy px-xl py-lg rounded-xl active:opacity-80">
              <Text className="text-white font-bold text-button">
                Explore Collection
              </Text>
            </View>
          </View>
          
          <StatusBar style="auto" />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
