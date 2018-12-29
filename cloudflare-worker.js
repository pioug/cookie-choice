var consentJs = "export function renderCookieChoice() {\n  const element = document.createElement(\"form\");\n  const banner = `\n    <div class=\"cookie-choice-description\">\n      <p class=\"cookie-choice-p\">\n        To help personalize content, tailor and measure ads, and provide a safer experience, we use cookies. By clicking or navigating the site, you agree to allow our collection of information through cookies. To learn more, read our <a href=\"PRIVACY_POLICY_LINK\" target=\"_blank\" rel=\"noopener\">Privacy Policy</a>.\n      </p>\n    </div>\n    <div class=\"cookie-choice-action\">\n      <button class=\"cookie-choice-button\" class=\"cookie-choice-accept\" type=\"submit\">Accept</button>\n    <div>\n  `;\n  element.id = \"cookie-choice\";\n  element.innerHTML = banner;\n  element.onsubmit = function(e) {\n    e.preventDefault();\n    const event = new CustomEvent(\"cookieChoice:accept\", {\n      bubbles: true\n    });\n    element.dispatchEvent(event);\n    element.remove();\n  };\n  document.body.prepend(element);\n  return element;\n}\n\nexport default renderCookieChoice;\n";

var consentNoopJs = "export function renderCookieChoice() {\n  return;\n}\n\nexport default renderCookieChoice;\n";

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
