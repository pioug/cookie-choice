export function renderCookieChoice() {
  const element = document.createElement("form");
  const banner = `
    <div class="cookie-choice-description">
      <p class="cookie-choice-p">
        To help personalize content, tailor and measure ads, and provide a safer experience, we use cookies. By clicking or navigating the site, you agree to allow our collection of information through cookies. To learn more, read our <a href="PRIVACY_POLICY_LINK" target="_blank" rel="noopener">Privacy Policy</a>.
      </p>
    </div>
    <div class="cookie-choice-action">
      <button class="cookie-choice-button" class="cookie-choice-accept" type="submit">Accept</button>
    <div>
  `;
  element.id = "cookie-choice";
  element.innerHTML = banner;
  element.onsubmit = function(e) {
    e.preventDefault();
    const event = new CustomEvent("cookieChoice:accept", {
      bubbles: true
    });
    element.dispatchEvent(event);
    element.remove();
  };
  document.body.prepend(element);
  return element;
}

export default renderCookieChoice;
