/** Facebook's share dialog; the preview comes from the page's Open Graph tags */
export const facebookShareUrl = (pageUrl: string) =>
  `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;

/** A WhatsApp message, to whichever chat the sender picks */
export const whatsappShareUrl = (text: string, pageUrl: string) =>
  `https://wa.me/?text=${encodeURIComponent(`${text}\n${pageUrl}`)}`;
