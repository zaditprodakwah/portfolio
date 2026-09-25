"use client";

import React from "react";
import Script from "next/script";

export function GTranslateWidget() {
  return (
    <>
      <Script
        id="gtranslate-settings"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.gtranslateSettings = {"default_language":"id","native_language_names":true,"detect_browser_language":true,"languages":["id","fr","it","es","hi","zh-CN","ja","kn","de","ar","en"],"wrapper_selector":".gtranslate_wrapper","switcher_horizontal_position":"inline","float_switcher_open_direction":"bottom","alt_flags":{"en":"usa"}};`
        }}
      />
      <Script
        src="https://cdn.gtranslate.net/widgets/latest/float.js"
        strategy="afterInteractive"
        defer
      />
    </>
  );
}
