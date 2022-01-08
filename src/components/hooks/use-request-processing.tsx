
/*
  Below code can be used in following way 
  import useRequest from "components/Hooks/use-request";

    const { data, errors, isLoading } = useRequest({
    url: `${endPoints.dashboard.mapUsersByCountry}/${key}`,
    method: "get",
  });
*/
import { useEffect, useState } from "react";
import axios from "axios";
import { useActions } from 'hooks/use-actions';

axios.defaults.withCredentials = true;

interface UserRequestProps {
  url: any; 
  method: any;
  body?: any

}

const useRequest = ( { url, method, body = undefined} : UserRequestProps) => {
  const [errors, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);
  const { authUser } = useActions();

  useEffect(() => {
    const doRequest = async (props = {}) => {
      try {
        setError(null);
        setIsLoading(true);
        // @ts-ignore
        const response = await axios[method](url, { ...body, ...props });
       
        setData(response.data);
      } catch (err) {
        if(err.response.status === 401) {
          authUser({
            isAuthenticated: false,
            token: null
          });
          window.location.replace('/#/login');
        }
        setError(err.response.data.statusText);
      } finally {
        setIsLoading(false);
      }
    };
    doRequest();
  }, [body, method, url, authUser]);

  return { data, errors, isLoading };
};

export default useRequest;
