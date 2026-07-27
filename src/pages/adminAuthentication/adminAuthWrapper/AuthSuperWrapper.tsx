import AdminAuthWrapper from "./adminAuthwrapper";

type AuthPanelProps = {
  testId?: string;
  children?: React.ReactNode;
  imageType?: "user" | "admin";
  title?: string;
  brandName?: string;
  description?: string;
};

type IAuthSuperWrapper = {
  children: React.ReactNode;
  authWrapperHere?: React.ReactNode;
  authWrapperProps?: AuthPanelProps;
  cardClassName?: string;
};

/** Shared layout shell for all authentication pages. */
const AuthSuperWrapper = ({
  children,
  authWrapperHere,
  authWrapperProps,
  cardClassName,
}: IAuthSuperWrapper) => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-primary via-primary-light to-brand">
      <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-brand blur-[140px]" />
      <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-accent blur-[160px]" />

      <div className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-4 px-6 py-10 lg:grid-cols-2">
        <div className="hidden lg:block">
          {authWrapperHere ?? <AdminAuthWrapper {...authWrapperProps} />}
        </div>

        <div
          className={
            cardClassName ||
            "mx-auto w-full max-w-md rounded-[32px] border border-white/10 bg-white/95 p-8 shadow-2xl backdrop-blur-xl lg:p-10"
          }
        >
          {children}
        </div>
      </div>

    </div>
  );
};

export default AuthSuperWrapper;
