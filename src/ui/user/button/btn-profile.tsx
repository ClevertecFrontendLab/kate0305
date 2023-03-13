import classes from './btn-profile.module.css';

export type ButtonProfileProps = {
  onClick?: () => void;
  text: string;
  dataTest?: string;
};

export const ButtonProfile = ({ onClick, text, dataTest }: ButtonProfileProps) => (
    <button className={classes.button} onClick={onClick} data-test-id={dataTest} type='button'>
      {text}
    </button>
  );
