import Link from "next/link";

function AuthInputField({
  type,
  placeholder,
  id,
}: {
  type: string;
  placeholder: string;
  id: string;
}) {
  return (
    <label htmlFor={id}>
      <input
        type={type}
        placeholder={placeholder}
        id={id}
        className="py-2 px-3 bg-[#EBEBEB] rounded-md focus:outline-1 focus:border-none focus:outline-[#d2d2d2] w-full text-[#606060] placeholder-gray-400 placeholder:pl-1  caret-gray-400 "
      />
    </label>
  );
}
type AuthType = { authType: "login" | "signup" };

function Auth({ authType }: AuthType) {
  return (
    <div className="md:w-[480px] w-5/6 min-h-[360px] bg-white rounded-md border-2 flex flex-col justify-center gap-6 p-10 ">
      <h1 className=" text-2xl md:text-3xl font-semibold text-center ">
        Welcome to <span className="text-[#4534AC]">Workflo</span>!
      </h1>
      <form className="flex flex-col gap-6 ">
        {authType === "signup" && (
          <AuthInputField type="text" placeholder="Full name" id="fullname" />
        )}

        <AuthInputField type="email" placeholder="Your email" id="email" />

        <AuthInputField type="password" placeholder="Password" id="password" />
        <button className="rounded-md text-white bg-gradient-to-tl from-[#4B36CC] to-[#9C93D4] py-2 capitalize">
          {authType}
        </button>
      </form>

      <p className="text-center text-[#606060] md:text-base text-sm">
        {authType === "login" ? (
          <>
            Don't have an account? Create a
            <Link href="/signup" className="text-blue-600">
              {" "}
              new account
            </Link>
          </>
        ) : (
          <>
            Already have an account?
            <Link href="/login" className="text-blue-600">
              {" "}
              Log in
            </Link>
          </>
        )}
        .
      </p>
    </div>
  );
}

export default Auth;
