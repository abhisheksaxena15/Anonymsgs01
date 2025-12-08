import ' next-auth'
import { DefaultSession } from 'next-auth'


declare module "next-auth/jwt" {
  interface JWT {
    _id: string;
    isVerified: boolean;
    username: string;
    isAcceptingMessages: boolean;
  }
}


declare module 'next-auth' {
    interface user {
        _id?: string,
        isVerified?: boolean
        isAcceptingMessages?: boolean
        username?: string
    }
    interface session {
        user: {
            _id?: string,
            isVerified?: boolean
            isAcceptingMessages?: boolean
            username?: string
        } & DefaultSession['user']  
    }
}
