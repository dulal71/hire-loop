import SigninForm from "@/components/SigninForm";
import { Suspense } from "react";


export default function SigninPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SigninForm />
    </Suspense>
  );
}