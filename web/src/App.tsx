import { ThemeProvider } from "styled-components";
import { AuthContextProvider } from "./contexts/AuthContext";
import { TransactionsContextProvider } from "./contexts/TransactionsContext";

import { Transactions } from "./pages/Transactions";
import { GlobalStyle } from "./styles/global";
import { defaultTheme } from "./styles/themes/default";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <AuthContextProvider>
        <TransactionsContextProvider>
          <Transactions />
        </TransactionsContextProvider>
      </AuthContextProvider>
    </ThemeProvider>
  );
}
