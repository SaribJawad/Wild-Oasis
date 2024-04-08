import { useUser } from "../features/authentication/useUser";
import styled from "styled-components";
import Spinner from "./Spinner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1 - Load the authenticated user
  const { isAuthenticated, isLoading } = useUser();

  // 2 - if there is No Authenticated user , redirect to login page

  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate]
  );

  // 3 - While loading, show a spinner

  if (isLoading)
    return (
      <FullPage>
        <Spinner />;
      </FullPage>
    );

  // 4 - if there is then render the app

  if (isAuthenticated) return children;
}
