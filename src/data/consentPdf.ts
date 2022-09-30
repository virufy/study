export const consentPdf = {
  Argentina: 'https://drive.google.com/file/d/1slccHiR-vCc5mUHZgklTynejddO_IoCT/view',
  Bolivia: 'https://drive.google.com/file/d/1nTzfJAOHQwefCdqwNBBEqzeRc66RYbYf/view',
  Brazil: 'https://drive.google.com/file/d/1YMtfTiFdpg9tXhdWlQF8kh8Vu4q5RL1U/view',
  Colombia: 'https://drive.google.com/file/d/1YMtfTiFdpg9tXhdWlQF8kh8Vu4q5RL1U/view',
  Greece: 'https://drive.google.com/file/d/1lMVygBx3pV_lZBhFtZe5go4UM4mFt0qP/view',
  Peru: 'https://drive.google.com/file/d/1nb9CbF4l6RF2IJQbzWY9YDnomQWMixbT/view',
  Mexico: 'https://drive.google.com/file/d/16_0GEMA5uApVuf9K9YlYD7ukPAS2_8wn/view',
  Japan: 'https://drive.google.com/file/d/11RTMmnHW4SqHNf7htr3xuSi-o2v2vWlp/view',
  'United States': 'https://drive.google.com/file/d/166Fu8RKluJdkRaxPDfWPyCpM7BUIzmnE/view',
  Global: 'https://drive.google.com/file/d/1hnxvDJ5qHBnUi7cnkNdyD4PuWMz8Ntss/view',
};

declare global {
  type ConsentPDFCountry = keyof typeof consentPdf;
}
