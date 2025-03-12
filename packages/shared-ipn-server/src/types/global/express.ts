declare global {
  namespace Express {
    interface Request {
      trueIP: string | undefined;
    }
  }
}

export {};
