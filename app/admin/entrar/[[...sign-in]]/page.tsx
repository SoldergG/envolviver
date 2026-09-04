import type { Metadata } from "next";
import { SignIn } from "@clerk/nextjs";
import { clerkConfigured } from "@/lib/auth-config";
import { SetupNotice } from "@/components/admin/SetupNotice";

export const metadata: Metadata = {
  title: "Entrar",
  robots: { index: false, follow: false },
};

export default function SignInPage() {
  if (!clerkConfigured) return <SetupNotice />;
  return (
    <div className="shell flex min-h-[70vh] flex-col items-center justify-center py-16">
      <h1 className="text-title mb-8">Entrar na administração</h1>
      <SignIn
        routing="path"
        path="/admin/entrar"
        signUpUrl="/admin/entrar"
        forceRedirectUrl="/admin"
      />
    </div>
  );
}
