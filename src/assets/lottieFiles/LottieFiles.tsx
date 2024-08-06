import Lottie from "lottie-react";
import LoadingPage from "./LoadingPage.json";
import NotFoundSearch from "./NotFoundSearch.json";
import PaymentSuccessfully from "./PaymentSuccessfully.json";
import Loading from "./Loading.json";

const LottilesFiels = {
  LoadingPage,
  Loading,
  NotFoundSearch,
  PaymentSuccessfully
};

type TProps = {
  message?: string;
  className?: string;
  variant: keyof typeof LottilesFiels;
};

const LottileFiles = ({
  message,
  className = `flex flex-col justify-center h-[600px] mx-auto size-[250px]`,
  variant,
}: TProps) => {
  const selectFile = LottilesFiels[variant];
  return (
    <div className={className}>
      <Lottie animationData={selectFile} />
      {message && (
        <h2 className=" text-center font-bold text-orange-500 text-3xl ">
          {message}
        </h2>
      )}
    </div>
  );
};

export default LottileFiles;
