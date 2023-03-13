export type IconButtonProps = {
  testID: string;
  view: string;
  isActive: boolean;
  toggle: (view: string) => void;
};

export type ButtonDropdownProps = {
  isOpen: boolean;
  isColor: boolean;
  onClick?: () => void;
};

export type ButtonEyeProps = {
  isOpen: boolean;
  onClick?: () => void;
};
