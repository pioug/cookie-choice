import consentJs from "./consent.js";
import consentNoopJs from "./consent-noop.js";

const COOKIE_CONSENT_COUNTRIES = [
  "AT",
  "BE",
  "BG",
  "CY",
  "CZ",
  "DE",
  "DK",
  "DK",
  "EE",
  "EL",
  "ES",
  "EU",
  "FI",
  "FR",
  "FR",
  "GB",
  "GR",
  "HR",
  "HU",
  "IE",
  "IT",
  "IT",
  "LT",
  "LU",
  "LV",
  "MT",
  "NL",
  "PL",
  "PT",
  "SE",
  "SK",
  "UK"
];

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const { searchParams } = new URL(request.url);
  const country = request.headers.get("cf-ipcountry");
  const script =
    COOKIE_CONSENT_COUNTRIES.includes(country) ||
    searchParams.get("force") === "true"
      ? consentJs.replace(
          "PRIVACY_POLICY_LINK",
          searchParams.get("privacy-policy-link")
        )
      : consentNoopJs;

  return new Response(script, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "text/javascript"
    }
  });
}
