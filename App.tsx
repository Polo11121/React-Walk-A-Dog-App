import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MainScreen } from "./screens/Authentication/MainScreen/MainScreen";
import { LoginScreen } from "./screens/Authentication/LoginScreen/LoginScreen";
import { RegisterScreen } from "./screens/Authentication/RegisterScreen/RegisterScreen";
import { HeaderLogo } from "./components/HeaderLogo/HeaderLogo";
import { AuthenticationStackParamList } from "./screens/Authentication/shared/types";
import { ForgotPasswordScreen } from "./screens/Authentication/ForgotPasswordScreen/ForgotPasswordScreen";
import {
  Roboto_100Thin,
  Roboto_100Thin_Italic,
  Roboto_300Light,
  Roboto_300Light_Italic,
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_500Medium,
  Roboto_500Medium_Italic,
  Roboto_700Bold,
  Roboto_700Bold_Italic,
  Roboto_900Black,
  Roboto_900Black_Italic,
  useFonts,
} from "@expo-google-fonts/roboto";
import AppLoading from "expo-app-loading";

const AuthenticationStack =
  createNativeStackNavigator<AuthenticationStackParamList>();

export default function App() {
  const [fontsLoaded, error] = useFonts({
    Roboto_100Thin,
    Roboto_100Thin_Italic,
    Roboto_300Light,
    Roboto_300Light_Italic,
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_500Medium,
    Roboto_500Medium_Italic,
    Roboto_700Bold,
    Roboto_700Bold_Italic,
    Roboto_900Black,
    Roboto_900Black_Italic,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <AuthenticationStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <AuthenticationStack.Screen name="Main" component={MainScreen} />
        <AuthenticationStack.Screen
          name="Login"
          options={{
            headerShown: true,
            headerTitle: HeaderLogo,
            headerTitleAlign: "center",
          }}
          component={LoginScreen}
        />
        <AuthenticationStack.Screen
          name="Register"
          options={{
            headerShown: true,
            headerTitle: HeaderLogo,
            headerTitleAlign: "center",
          }}
          component={RegisterScreen}
        />
        <AuthenticationStack.Screen
          name="ForgotPassword"
          options={{
            headerShown: true,
            headerTitle: HeaderLogo,
            headerTitleAlign: "center",
          }}
          component={ForgotPasswordScreen}
        />
      </AuthenticationStack.Navigator>
    </NavigationContainer>
  );
}
