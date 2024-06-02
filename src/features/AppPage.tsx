import { FC, ReactElement, useCallback, useEffect, useState } from 'react';
import HomeHeader from 'src/shared/header/components/HomeHeader';
import { saveToSessionStorage } from 'src/shared/utils/utils.service';
import { useAppDispatch, useAppSelector } from 'src/store/store';
import { IReduxState } from 'src/store/store.interface';

import { addAuthUser } from './auth/reducers/auth.reducer';
import { useCheckCurrentUserQuery } from './auth/services/auth.service';
import Home from './home/Home';
import Index from './index/Index';

const AppPage: FC = (): ReactElement => {
  const authUser = useAppSelector((state: IReduxState) => state.authUser);
  const appLogout = useAppSelector((state: IReduxState) => state.logout);
  const showCategoryContainer = true;
  const [tokenIsValid, setTokenIsValid] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { data: currentUserData, isError } = useCheckCurrentUserQuery(undefined, { skip: authUser.id === null });

  const checkUser = useCallback(async () => {
    try {
      if (currentUserData && currentUserData.user && !appLogout) {
        setTokenIsValid(true);
        dispatch(addAuthUser({ authInfo: currentUserData.user }));
        saveToSessionStorage(JSON.stringify(true), JSON.stringify(authUser.username));
      }
    } catch (error) {
      console.log(error);
    }
  }, [appLogout, authUser.username, currentUserData, dispatch]);

  const logoutUser = useCallback(async () => {
    if ((!currentUserData && appLogout) || isError) {
      setTokenIsValid(false);
    }
  }, [currentUserData, appLogout, isError]);

  useEffect(() => {
    checkUser();
    logoutUser();
  }, [checkUser, logoutUser]);

  if (authUser) {
    return !tokenIsValid && !authUser.id ? (
      <Index />
    ) : (
      <>
        <HomeHeader showCategoryContainer={showCategoryContainer} />
        <Home />
      </>
    );
  } else {
    return <Index />;
  }
};

export default AppPage;
