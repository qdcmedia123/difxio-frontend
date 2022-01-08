// @ts-nocheck
/*
  Below code can be used in following way 
  import useRequest from "components/Hooks/use-request";
    const { data, errors, isLoading } = useRequest({
    url: `${endPoints.dashboard.mapUsersByCountry}/${key}`,
    method: "get",
  });
*/
import React, {useEffect, useState, ReactElement } from "react";
import axios, { Method } from "axios";
import { useActions } from 'hooks/use-actions';

axios.defaults.withCredentials = true;


interface UserRequestProps {
  url: string; 
  method: Method;
  body?: object | undefined

}

const useRequest = ({ url, method, body = undefined}: UserRequestProps) => {
  const [errors, setError] = useState<ReactElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  const { authUser } = useActions();

  useEffect(() => {
    const doRequest = async (props = {}) => {
      try {
        setError(null);
        setIsLoading(true);
        const response = await axios[method](url, { ...body, ...props });
       
        setData(response.data);
      } catch (err:unknown) {
        if(err.statusCode === 401) {
          authUser({
            isAuthenticated: false,
            token: null
          });
          window.location.replace('/#/login');
        }
        setError(
          <div className="alert alert-danger">
            {err.response.data.statusText}
          </div>
        );
      } finally {
        setIsLoading(false);
      }
    };
    doRequest();
  }, [body, method, url, authUser]);

  return { data, errors, isLoading };
};

export default useRequest;
