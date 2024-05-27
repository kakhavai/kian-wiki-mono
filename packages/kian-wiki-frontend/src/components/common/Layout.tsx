'use client'; // Mark this file as a client component

// components/Layout.tsx
import styled, { IStyledComponent, Runtime } from 'styled-components';
import { ReactNode } from 'react';

const Container: IStyledComponent<Runtime> = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Header: IStyledComponent<Runtime> = styled.header`
  background: #333;
  color: white;
  padding: 1rem;
  text-align: center;
`;

const Main: IStyledComponent<Runtime> = styled.main`
  padding: 1rem;
`;

const Footer: IStyledComponent<Runtime> = styled.footer`
  background: #333;
  color: white;
  padding: 1rem;
  text-align: center;
`;

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => (
  <Container>
    <Header>My Responsive Site</Header>
    <Main>{children}</Main>
    <Footer>&copy; 2024 My Responsive Site</Footer>
  </Container>
);

export default Layout;
