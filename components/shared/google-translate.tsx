"use client";

import { useEffect } from "react";

export function GoogleTranslate() {
  useEffect(() => {
    // Only add script if it doesn't exist
    if (document.getElementById("google-translate-script")) return;

    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    (window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,ur,ar", // English, Urdu, Arabic
          layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };
  }, []);

  return (
    <div id="google_translate_element" className="translate-container">
      <style dangerouslySetInnerHTML={{__html: `
        .translate-container select {
          padding: 8px 12px;
          border-radius: 6px;
          border: 1px solid var(--border);
          background-color: var(--background);
          color: var(--foreground);
          font-size: 14px;
          outline: none;
          cursor: pointer;
        }
        .goog-te-gadget {
          color: transparent !important;
        }
        .goog-te-gadget span {
          display: none !important;
        }
        .goog-logo-link {
          display: none !important;
        }
        .goog-te-banner-frame {
          display: none !important;
        }
        body {
          top: 0 !important;
        }
      `}} />
    </div>
  );
}
