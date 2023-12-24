import React from "react";
import RegisterForm from "@/components/RegisterForm";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Facebook } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { roboto } from "@/components/fonts";
import AppCard from "@/components/AppCard";

const Register = () => {
  return (
    <main className="flex flex-col gap-5 items-center justify-center h-screen bg-white text-black ">
      <div className="relative mx-auto flex flex-col w-full max-w-[350px] space-y-2.5 p-8 gap-2 shadow-sm border-gray-300 border">
        <Image
          src={"/Instapix.svg"}
          alt={"logo"}
          width={150}
          height={150}
          className="self-center pt-5"
        />

        <p
          className={`text-center font-semibold text-[#737373] text-[16px] ${roboto.className}`}
        >
          Sign up to see photos and videos from your friends.
        </p>

        <Button className="text-primary font-bold bg-[#0095f6] hover:bg-[#0095f6]/90 gap-1  w-3/4 self-center">
          <Facebook size={16} /> Log in with Facebook
        </Button>

        <div className="flex justify-around items-center my-4">
          <Separator decorative className="w-1/3 border-1 bg-gray-300 " />
          <p
            className={`text-sm font-semibold text-[#737373] ${roboto.className}`}
          >
            OR
          </p>
          <Separator decorative className="w-1/3 border-1 bg-gray-300 " />
        </div>
        <RegisterForm />
      </div>

      <div className="mx-auto flex w-full max-w-[350px] flex-col space-y-2.5 p-4 gap-5 shadow-sm border-gray-300 border">
        <p className="text-sm text-center">
          Have an account?{" "}
          <Link className="text-[#0095f6] font-bold" href={"/login"}>
            Login
          </Link>
        </p>
      </div>
      <div className="mt-6 flex flex-col items-center gap-2 w-full max-w-[350px] space-y-2.5 p-4">
        <p className="">Get the app.</p>
        <div className="flex space-x-1">
          <div>
            <AppCard></AppCard>
          </div>
          <div>
            <AppCard></AppCard>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;
