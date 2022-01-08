import {
    AuthUserAction
  } from "../actions";
   
  export enum ActionTypes {
    authUser
  }
  
  export type Action = | AuthUserAction
  