import type {
  Request as ExpressRequest,
  Response as ExpressResponse,
  NextFunction,
  RequestHandler,
} from 'express';

interface EReqLocalAdmin {
    id: string;
    email: string;
}
    

export interface EReqLocals {
    admin: EReqLocalAdmin;
}

export type ECoreReq = ExpressRequest;

export type EPartialReq = ExpressRequest & Partial<EReqLocals>;

export type EReq = ExpressRequest & EReqLocals;

export type ERes = ExpressResponse;

export type ENext = NextFunction;

export type ENextError = (err? : 'router' | 'route') => void;

export type ENextHandler = RequestHandler;
