// Routes.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "./pages/login";
import Cadastro from "./pages/cadastro";
import Main from "./pages/main"; // pode trocar se sua tela principal tiver outro nome
import ResetPassword from "./pages/resetpassword";
import Faturas from "./pages/faturas"; // adicione aqui
import CadastroDispositivo from "./pages/cadastroDispositivo";
import CadastroFatura from "./pages/cadastroFatura";

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen
          name="Faturas"
          component={Faturas}
          options={{ title: "Faturas de Energia" }}
        />
        <Stack.Screen
          name="Cadastro"
          component={Cadastro}
          options={{ title: "Cadastrar Usuário" }}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{ title: "Recuperar Senha" }}
        />
        <Stack.Screen
          name="CadastroFatura"
          component={CadastroFatura}
          options={{ presentation: "modal", headerShown: false }}
        />
        <Stack.Screen
          name="CadastroDispositivo"
          component={CadastroDispositivo}
          options={{ presentation: "modal", headerShown: false }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
