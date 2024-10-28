import styled from "styled-components";
import "./App.css";
import { FlexBoxCol, FlexBoxRow } from "./components/styled/styled";
import ConnectWalletButton from "./components/ConnectWalletButton";
import WalletInfo from "./components/WalletInfo";
import InitDataInfo from "./components/InitDataInfo";
import PaymentStar from "./components/PaymentStar";
import { useEffect } from "react";
import eruda from "eruda";

const StyledApp = styled.div`
  background-color: #e8e8e8;
  color: black;

  @media (prefers-color-scheme: dark) {
    background-color: #222;
    color: white;
  }
  min-height: 100vh;
  padding: 20px 20px;
`;

const AppContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

function App() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      eruda.init();
    }
  }, []);

  return (
    <StyledApp>
      <AppContainer>
        <InitDataInfo />
        <FlexBoxCol>
          <FlexBoxRow>
            <ConnectWalletButton />
          </FlexBoxRow>
        </FlexBoxCol>
        <WalletInfo />
        <PaymentStar />
      </AppContainer>
    </StyledApp>
  );
}

export default App;
