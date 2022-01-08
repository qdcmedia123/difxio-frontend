import {environments} from './environments';

export const baseURI = environments.mode === 'production' 
  ? 'http://ec2-18-222-10-243.us-east-2.compute.amazonaws.com:8000'
  : 'http://localhost:8000';
