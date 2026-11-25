
import { useFocusOnMount } from "@/hooks/useFocusOnMount";
import { getAssetUrl } from "@/utils/getAssetUrl";


function ThankYou() {
    const headingRef = useFocusOnMount();

  return (
    <section
      aria-labelledby="thank-you-title"
      className="grid place-content-center place-items-center gap-6 py-12 text-center md:h-full md:py-0 md:gap-8"
    >
      <img className="size-14 md:size-20 motion-safe:animate-pop-in motion-safe:[animation-delay:150ms] motion-safe:[animation-fill-mode:backwards] motion-reduce:animate-fade-only" src={getAssetUrl("assets/icons/icon-thank-you.svg")} alt=""/>

      <header className="flex flex-col items-center gap-2 md:gap-4">
        <h2
          id="thank-you-title"
          ref={headingRef}
          tabIndex="-1"
          className="text-2xl md:text-[2rem] leading-[1.2] font-bold text-blue-950"
        >
          Thank you!
        </h2>
        <p className="text-base leading-normal text-center text-grey-500 md:max-w-[35ch] lg:max-w-[50ch]">
          Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at{""} <a href="mailto:support@loremgaming.com" className="text-purple-600 underline focus-ring">support@loremgaming.com</a>.
        </p>
      </header>
    </section>
  );
}

export default ThankYou;
