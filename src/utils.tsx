import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { signIn } from "next-auth/react";

export function generateKey() {
    return Math.random().toString(36).substring(7);
}

export async function SignUp({ credentials }: { credentials: { email: string, password: string } }) {
    const supabase = createClientComponentClient();

    await supabase.auth.signUp(credentials).then((response) => {
        console.log(response);
    });
}

export async function SignIn({ credentials }: { credentials: { email: string, password: string } }) {
    const supabase = createClientComponentClient();

    console.log(credentials);
    await supabase.auth.signInWithPassword(credentials).then((response) => {
        console.log(response);
    });

    await signIn("email", {
        email: credentials.email,
        password: credentials.password,
        callbackUrl: "/settings/profile"
    });
}