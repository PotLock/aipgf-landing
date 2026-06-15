import { useEffect, useState } from "react";
import ReactModal from "react-modal";

const BANNER_DISMISSED_KEY = "aipgf-deprecation-banner-dismissed";
const POPUP_DISMISSED_KEY = "aipgf-deprecation-popup-dismissed";
const POTLOCK_URL = "https://potlock.org";

if (typeof window !== "undefined") {
  ReactModal.setAppElement("#__next");
}

const DeprecationNotice = () => {
  const [bannerVisible, setBannerVisible] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const bannerDismissed = localStorage.getItem(BANNER_DISMISSED_KEY) === "true";
    const popupDismissed = localStorage.getItem(POPUP_DISMISSED_KEY) === "true";

    setBannerVisible(!bannerDismissed);
    setPopupOpen(!popupDismissed);
  }, []);

  useEffect(() => {
    document.body.style.paddingTop = bannerVisible ? "3rem" : "0";
    return () => {
      document.body.style.paddingTop = "0";
    };
  }, [bannerVisible]);

  const dismissBanner = () => {
    localStorage.setItem(BANNER_DISMISSED_KEY, "true");
    setBannerVisible(false);
  };

  const dismissPopup = () => {
    localStorage.setItem(POPUP_DISMISSED_KEY, "true");
    setPopupOpen(false);
  };

  const goToPotlock = () => {
    window.open(POTLOCK_URL, "_blank", "noopener,noreferrer");
    dismissPopup();
  };

  return (
    <>
      {bannerVisible && (
        <div
          role="banner"
          className="fixed top-0 left-0 right-0 z-[100] bg-communityintercomcom-blue-ribbon text-aipgf-white px-4 py-3 sm:px-6"
        >
          <div className="max-w-[1700px] mx-auto flex items-center justify-center gap-3 pr-8 relative">
            <p className="m-0 text-center text-sm sm:text-base font-aipgf-manrope-semibold-1356 leading-snug">
              AI-PGF is deprecated. Check out{" "}
              <a
                href={POTLOCK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-bold text-aipgf-white hover:opacity-90"
              >
                POTLOCK&apos;s open funding stack
              </a>
              .
            </p>
            <button
              type="button"
              onClick={dismissBanner}
              aria-label="Dismiss deprecation banner"
              className="absolute right-0 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full text-aipgf-white hover:bg-white/20 transition-colors cursor-pointer border-0 bg-transparent text-xl leading-none"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      <ReactModal
        isOpen={popupOpen}
        onRequestClose={dismissPopup}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.55)",
            zIndex: 1100,
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            background: "white",
            padding: "2rem",
            borderRadius: "12px",
            border: "none",
            maxWidth: "28rem",
            width: "calc(100% - 2rem)",
            zIndex: 1101,
          },
        }}
      >
        <button
          type="button"
          onClick={dismissPopup}
          aria-label="Close deprecation notice"
          className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer border-0 bg-transparent text-2xl leading-none"
        >
          &times;
        </button>
        <div className="flex flex-col gap-4 text-aipgf-shark font-p pr-6">
          <h2 className="m-0 text-xl sm:text-2xl font-bold tracking-tight">
            AI-PGF is deprecated
          </h2>
          <p className="m-0 text-base leading-relaxed text-aipgf-nevada">
            AI-PGF is no longer actively maintained. For open funding tools and
            infrastructure, visit POTLOCK&apos;s open funding stack.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <button
              type="button"
              onClick={goToPotlock}
              className="cursor-pointer rounded-3xl bg-communityintercomcom-blue-ribbon px-5 py-2.5 text-sm font-semibold text-aipgf-white border-0 hover:opacity-90 transition-opacity"
            >
              Go to potlock.org
            </button>
            <button
              type="button"
              onClick={dismissPopup}
              className="cursor-pointer rounded-3xl border border-aipgf-geyser bg-transparent px-5 py-2.5 text-sm font-semibold text-aipgf-shark hover:bg-aipgf-aqua-haze transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </ReactModal>
    </>
  );
};

export default DeprecationNotice;
