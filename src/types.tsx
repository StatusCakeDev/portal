import { Props as Attributes } from '@site/src/components/Image';

declare type Hero = {
  image: Attributes;
}

export declare type Client = {
  title: string;
  prompt: string;
  href: string;
  image: Attributes;
}

export declare type CustomFields = {
  hero: Hero;
  clients: Array<Client>;
}
