import type { ReactNode } from 'react';

import { Column } from './data';

export type WidgetName = keyof Widgets;

export type Widgets = {
  input: InputProps;
  number: NumberProps;
  radio: RadioProps;
  select: SelectProps;
  toggle: ToggleProps;
  segmentedControl: SegmentedControlProps;
  field: FieldProps;
  fields: FieldsProps;
  // fieldsPartition: FieldsPartitionProps;
  color: ColorProps;
  // colors: ColorsProps;
  multiselect: MultiselectProps;
};

export type InputProps = {
  placeholder?: string;
};

export type NumberProps = {
  options?: {
    isInteger?: boolean;
    isNonNegative?: boolean;
  };
  placeholder?: string;
};

export type RadioProps = {
  options: {
    name: string;
    value: boolean | string | null;
  }[];
};

export type SelectProps = {
  // defaultDropdownOpened?: boolean;
  // footer?: ReactNode;
  // leftSection?: ReactNode;
  options: {
    name: string;
    value: boolean | string | null;
  }[];
  placeholder?: string;
  placeholderNoOptions?: string;
  // rightSection?: ReactNode;
  // rightSectionWidth?: CSSProperties['width'];
  // w?: CSSProperties['width'];
};

export type ToggleProps = {};

export type SegmentedControlProps = {
  options: {
    name: string;
    value: string;
    // icon?: IconName;
  }[];
};

export type FieldProps = {
  /**
   * Defaults to true.
   */
  autoOpenWhenUnset?: boolean;
  columns: Column[];
  options: {
    name: string;
    value: string;
  }[];
  showColumnSetting?: boolean;
};

export type FieldsProps = {
  addAnother?: ReactNode;
  /**
   * Defaults to true.
   */
  autoOpenWhenUnset?: boolean;
  columns: Column[];
  options: {
    name: string;
    value: string;
  }[];
  showColumnSetting?: boolean;
  showColumnSettingForIndicies?: number[];
};

// export type FieldsPartitionProps = {};

export type ColorProps = {
  title?: string;
};

// export type ColorsProps = {};

export type MultiselectProps = {
  options: {
    label: string;
    value: string;
  }[];
  placeholder?: string;
  placeholderNoOptions?: string;
};
