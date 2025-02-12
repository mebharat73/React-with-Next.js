import LoginForm from "@/components/auth/LoginForm";

export const metadata = {
  title: "Login",
};

function LoginPage() {
  return (
    <div className="w-11/12 md:w-2/3 lg:w-1/3 transition-transform transform hover:scale-105 ease-in-out duration-300">
      <h3 className="md:font-serif text-3xl text-center font-bold text-[#68217A] dark:text-white">
        Login
      </h3>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
