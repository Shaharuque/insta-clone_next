import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Professional Acc profile",
    description: "Professional Acc profile",
  };

async function ProfessionalAcc() {

  return (
    <div className="px-12">
      <h1 className="text-2xl font-medium">Professional Acc profile</h1>
    </div>
  );
}

export default ProfessionalAcc;
