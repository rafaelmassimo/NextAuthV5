First step install next auth, 

* Copy from documentation 
import NextAuth from "next-auth"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [],
})

In the Root create the file auth.ts

Create a middleware.ts file also in the root

Create the route ts inside /app/api/auth/[...nextauth]/route.ts

create the folder action and then the auth.ts inside it