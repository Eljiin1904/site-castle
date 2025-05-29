import { Suit } from "@core/types/blackjack/CardData";

const clubsSvg = `<svg width="44" height="47" viewBox="0 0 44 47" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M30.1202 17.1212C31.7496 15.372 32.73 13.1209 32.73 10.6648C32.73 5.09489 27.6881 0.57959 21.4687 0.57959C15.2493 0.57959 10.2075 5.09489 10.2075 10.6648C10.2075 13.0299 11.1166 15.2049 12.6388 16.9247C12.1845 16.8748 11.7218 16.849 11.2524 16.849C5.03304 16.849 -0.00878906 21.3643 -0.00878906 26.9342C-0.00878906 32.5042 5.03304 37.0195 11.2524 37.0195C15.3162 37.0195 18.8772 35.0917 20.8575 32.2016C20.7953 32.7759 20.701 33.3833 20.5579 33.8957C19.0878 38.2545 13.8189 44.6087 11.2529 46.5796C14.8051 43.8482 29.1781 43.8482 32.7302 46.5796C30.1643 44.6087 25.142 38.4753 23.4252 33.8957C23.2441 33.2508 23.1007 32.6271 22.9915 32.0019C24.9426 35.0026 28.5733 37.0195 32.73 37.0195C38.9494 37.0195 43.9912 32.5042 43.9912 26.9342C43.9912 21.3643 38.9494 16.849 32.73 16.849C31.8316 16.849 30.9578 16.9432 30.1202 17.1212ZM21.9229 30.1665H22.0596C22.0361 30.1044 22.0133 30.0421 21.9912 29.9795C21.9691 30.0421 21.9463 30.1044 21.9229 30.1665Z" fill="black"/>
</svg>
`;

const diamondsSvg = `<svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M44.3336 22.5796C40.3378 22.5796 22.3382 40.5738 22.3382 44.5796C22.3382 40.5829 4.34775 22.5796 0.342773 22.5796C4.34775 22.5796 22.3473 4.57627 22.3473 0.57959C22.3473 4.57627 40.3378 22.5796 44.3428 22.5796H44.3336Z" fill="#EB3000"/>
</svg>
`;

const heartsSvg = `<svg width="43" height="41" viewBox="0 0 43 41" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.292 7.22679C15.3723 -4.14959 0.291992 0.259625 0.291992 11.5365C0.291992 24.1769 15.9252 28.6458 21.2062 40.4104L21.292 40.5796L21.3778 40.4104C26.6588 28.6458 42.292 24.1769 42.292 11.5365C42.292 0.259625 27.2116 -4.14959 21.292 7.22679Z" fill="#EB3000"/>
</svg>
`;

const spadesSvg = `<svg width="43" height="51" viewBox="0 0 43 51" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M42.6338 27.664C42.6338 16.6329 26.9923 10.9974 21.7167 0.721812L21.6387 0.57959L21.5607 0.721812C16.2753 10.9974 0.643555 16.6329 0.643555 27.664C0.643555 36.8996 14.0325 40.464 20.566 32.7396C20.7025 32.3485 20.5563 35.1929 20.1174 36.7929C18.5474 41.5307 12.9208 48.4374 10.1806 50.5796C13.9739 47.6107 29.3229 47.6107 33.1163 50.5796C30.3761 48.4374 25.0127 41.7707 23.1794 36.7929C22.7991 35.4151 22.5748 34.0196 22.4773 32.6329C28.8548 41.0151 42.6436 37.0863 42.6436 27.6729L42.6338 27.664Z" fill="black"/>
</svg>
`;

const hash = {
  clubs: clubsSvg,
  diamonds: diamondsSvg,
  hearts: heartsSvg,
  spades: spadesSvg,
};

// could extract this from svg instead, not sure how though
const suitDims = {
  clubs: { width: 44, height: 47 },
  diamonds: { width: 45, height: 45 },
  hearts: { width: 43, height: 41 },
  spades: { width: 43, height: 51 },
};

export async function getSuitImage(suit: Suit): Promise<HTMLImageElement> {
  const svg = hash[suit];
  const { width, height } = suitDims[suit];
  const img = new Image();
  img.width = width;
  img.height = height;

  return new Promise((resolve, reject) => {
    // img.src = "data:image/svg+xml;base64," + Buffer.from(svg, 'base64');
    // "image/svg+xml;charset=utf-8"
    // const src = "data:image/svg+xml," + svg;

    // co-pilot ftw
    const src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);

    img.src = src;
    img.onload = () => {
      resolve(img);
    };

    img.onerror = () => reject(new Error("Failed to load image " + src));
  });
}
