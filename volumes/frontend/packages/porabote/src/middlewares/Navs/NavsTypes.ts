export type NavsType = {
  data: any[];
  setNavs: Function;
}

export type NavBarLinkType = {
  id: number;
  parent_id: number;
  name: string;
  link: string;
};

export type NavbarProps = {
  data: NavBarLinkType[];
};