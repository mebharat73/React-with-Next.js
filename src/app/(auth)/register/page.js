import RegisterForm from "@/components/auth/RegisterForm";

export const metadata = {
  title: "Register",
};

function RegisterPage() {
  return (
    <div className="w-11/12 md:w-2/3 lg:w-1/3 transition-transform transform hover:scale-105 ease-in-out duration-300">
      <h3 className="-mb-4 font-serif text-3xl text-center font-bold text-[#1A1A1A] dark:text-white">
        Register
      </h3>
      <RegisterForm />
    </div>
  );
}

export default RegisterPage;


