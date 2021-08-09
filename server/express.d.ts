declare namespace Express {
  export interface Request {
    user?: {
      id: string
      name: string
    } // I use string for example, you can put other type
  }
}
