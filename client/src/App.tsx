import { Stack, styled } from '@mui/material';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

import CenterSpinner from '@components/ui/Spinner/CenterSpinner';
import useBodyOverflow from '@hooks/useBodyOverflow';
import useLangStore from '@store/useLangStore';
import './App.css';
import Content from './components/ui/Content/Content';
import Footer from './components/ui/Footer/Footer';
import Header from './components/ui/Header/Header';
import { PAGE_TRANSITION_DURATION } from './constants/animationsTiming';

const StackStyled = styled(Stack, {
  shouldForwardProp: prop => prop !== 'hydrated',
})<{
  hydrated: boolean;
}>(({ hydrated }) => ({
  display: hydrated ? 'flex' : 'none',
  flexDirection: 'column',
  height: '100vh',
  justifyContent: 'space-between',
  gap: 4,
  opacity: 0,
  animation: `fadeIn ${PAGE_TRANSITION_DURATION / 1000}s ease-in forwards`,
}));

// TODO: Just for testing heroku deployment, remove later
const App = () => {
  useBodyOverflow();

  const hydrated = useLangStore(state => state.hydrated);

  useEffect(() => {
    AOS.init({
      duration: 3000,
    });
  }, []);

  return (
    <>
      {!hydrated && <CenterSpinner />}
      <StackStyled hydrated={hydrated}>
        <Header />
        <Content />
        <Footer />
      </StackStyled>
    </>
  );
};

export default App;
