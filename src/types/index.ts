import type { ComponentType } from 'react';

/**
 * Export this function to define a custom visualization.
 */
export type CreateCustomVisualization = <CustomVisualizationSettings>(
  props: CreateCustomVisualizationProps<CustomVisualizationSettings>,
) => CustomVisualization<CustomVisualizationSettings>;

export type CreateCustomVisualizationProps<CustomVisualizationSettings> = {
  /**
   * Translates text using ttag function used in Metabase.
   */
  translate: (text: string) => string;

  /**
   * TODO: all the isa.js functions
   *
   */
  settings: CustomVisualizationSettings;
};

export type CustomVisualization<CustomVisualizationSettings> = {
  /**
   * A unique visualization identifier. It's not shown in the UI.
   */
  id: string;

  /**
   * Returns visualization name to be shown in the UI.
   */
  getName(): string;

  /**
   * Set to false to disable saving the question as PNG.
   */
  canSavePng?: boolean;

  /**
   * Set to true to disable the default visulization header.
   */
  noHeader?: boolean;

  disableSettingsConfig?: boolean;
  supportPreviewing?: boolean;
  supportsVisualizer?: boolean;
  disableVisualizer?: boolean;

  minSize: VisualizationGridSize;
  defaultSize: VisualizationGridSize;

  settings?: CustomVisualizationSettingsDefinitions;

  /**
   * This function should return true if the data shape makes sense for this visualization.
   */
  isSensible: (data: DatasetData) => boolean;

  /**
   * This function should throw if the visualization cannot be rendered with given data and settings.
   */
  checkRenderable: (series: Series, settings: CustomVisualizationSettings) => void | never;

  /**
   * Component that renders the visualization.
   */
  VisualizationComponent: ComponentType<CustomVisualizationProps>;

  /**
   * Component that renders the visualization's empty state (i.e. when checkRenderable throws).
   */
  VisualizationEmptyStateComponent?: ComponentType<CustomVisualizationProps>;

  /**
   * Component that renders the icon in visualization settings sidebar and in custom visualization manager.
   */
  VisualizationIconComponent: ComponentType<CustomVisualizationIconProps>;

  /**
   * Component that renders the visualization settings form in visualization settings sidebar.
   */
  VisualizationSettingsComponent?: ComponentType<CustomVisualizationSettingsProps>;
};

export type CustomVisualizationSettingsDefinitions = {
  // TODO
};

export type VisualizationGridSize = {
  // grid columns
  width: number;
  // grid rows
  height: number;
};

export type CustomVisualizationProps = {};

export type CustomVisualizationIconProps = {
  width: number;
  height: number;
};

export type CustomVisualizationSettingsProps = {};

// Data types //

export const dateTimeAbsoluteUnits = [
  'minute',
  'hour',
  'day',
  'week',
  'month',
  'quarter',
  'year',
] as const;

export const dateTimeRelativeUnits = [
  'minute-of-hour',
  'hour-of-day',
  'day-of-week',
  'day-of-month',
  'day-of-year',
  'week-of-year',
  'month-of-year',
  'quarter-of-year',
] as const;

export const dateTimeUnits = [...dateTimeAbsoluteUnits, ...dateTimeRelativeUnits] as const;

export type DateTimeAbsoluteUnit = (typeof dateTimeAbsoluteUnits)[number];

export type DateTimeRelativeUnit = (typeof dateTimeRelativeUnits)[number];

export type DatetimeUnit = 'default' | DateTimeAbsoluteUnit | DateTimeRelativeUnit;

export type BinningInfo = {
  binning_strategy?: 'default' | 'bin-width' | 'num-bins';
  bin_width?: number;
  num_bins?: number;
  max_value?: number;
  min_value?: number;
};

export type ColumnId = number;

export type Column = {
  /**
   * Metabase identifier.
   */
  id: ColumnId;

  /**
   * Name of the column in the database.
   */
  name: string;

  /**
   * Name of the column shown in the UI.
   */
  display_name: string;

  /**
   * Description of the column set in Metabase.
   */
  description: string | null;

  /**
   * Base type of the column in Metabase type system.
   */
  base_type?: string;

  /**
   * Semantic type of the column in Metabase type system.
   */
  semantic_type?: string | null;

  /**
   * Effective type of the column in Metabase type system.
   */
  effective_type?: string;

  /**
   * If the column value has been remapped, this is a name of the column it's been remapped from.
   */
  remapped_from?: string;

  /**
   * If the column value has been remapped, this is a name of the column it's been remapped to.
   */
  remapped_to?: string;

  /**
   * DatetimeUnit - present if column represents date and/or time.
   */
  unit?: DatetimeUnit;

  /**
   * DatetimeUnit - present if column represents date and/or time.
   */
  binning_info?: BinningInfo | null;

  /**
   * Column's visualization settings set in Metabase.
   */
  settings?: ColumnVisualizationSettings;
};

export type ColumnVisualizationSettings = Record<string, unknown>; // TODO

export type RowValue = string | number | null | boolean | object;

export type Row = RowValue[];

export type DatasetData = {
  rows: Row[];

  cols: Column[];

  /**
   * How many results have been truncated. Present only when truncation occurred.
   */
  rows_truncated?: number;
};

export type SingleSeries = {};

export type Series = SingleSeries[];
