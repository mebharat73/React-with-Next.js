import RegisterForm from "@/components/auth/RegisterForm";

export const metadata = {
  title: "Register",
};

function RegisterPage() {
  return (
    <div className="w-4/5 mb-10 mr-10 md:w-2/3 lg:w-1/3 transition-transform transform hover:scale-105 ease-in-out duration-300">
      <h3 className="font-serif text-3xl text-center mb-3 font-bold text-[#68217A] dark:text-white">
        Register
      </h3>
      <RegisterForm />
    </div>
  );
}

export default RegisterPage;


