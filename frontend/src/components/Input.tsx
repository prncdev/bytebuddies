import styled from '@emotion/styled';
import { FormHelperText, TextField } from '@mui/material';
import { ChangeEventHandler, FC, HTMLInputTypeAttribute } from 'react';

const CustomTextFied = styled(TextField)({
  margin: 0, // Overwrite the default margin
});

export type InputProps = {
  /**
   * Name for input field.
   */
  name?: string;
  /**
   * Value for input field.
   */
  value?: string;
  /**
   * Provide error message to be displayed.
   */
  error?: string;
  /**
   * Mark a field as required.
   */
  required?: true;

  /**
   * Label value that will show above in between border.
   */
  label?: string;

  /**
   * Will take up entire available space.
   */
  fullWidth?: boolean;

  /**
   * Placeholder text which will display a default value when absence actually value.
   */
  placeholder?: string;

  className?: string;

  InputProps?: {
    startAdornment?: any;
    endAdornment?: any;
  }

  type?: HTMLInputTypeAttribute;
  /**
   *
   * @param input event
   * @returns change event.
   */
  onChange?: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >;
};

const Input: FC<InputProps> = function (props) {
  const {type, name, value, error, label, placeholder, className, onChange } = props;
  
  return (
    <div
      className={`${
        props.fullWidth ? 'w-full flex' : 'inline-flex'
      } flex-col gap-1 !rounded-lg`}
    >
      <CustomTextFied
        {...props}
        className={className}
        name={name}
        value={value}
        onChange={onChange}
        label={label}
        error={!!error}
        required
        placeholder={placeholder}
        type={type}
      />
      {error && (
        <FormHelperText className='!text-red-600 !font-semibold !inline-block !px-1'>
          {error}
        </FormHelperText>
      )}
    </div>
  );
};

export default Input;