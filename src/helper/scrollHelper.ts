export const scrollToTop = function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const scrollToBottom = function scrollToBottom() {
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
};
