export declare type Image = {
  src: string;
  srcDark?: string;
  alt: string;
}

export declare type Client = {
  title: string;
  prompt: string;
  href: string;
  image: Image;
}

export declare type CustomFields = {
  hero: {
    image: Image;
  };
  clients: Array<Client>;
}
