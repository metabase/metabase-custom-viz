import type { ComponentType } from 'react';
import { Column, DatasetData, RowValue, Series } from './data';

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

  settings: CustomVisualizationSettings;

  /**
   * TODO: add all the isa.js functions, ideally in a single object.
   * https://linear.app/metabase/issue/GDGT-1923/convert-isajs-to-typescript
   */
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

  // TODO
  disableSettingsConfig?: boolean;
  supportPreviewing?: boolean;
  supportsVisualizer?: boolean;
  disableVisualizer?: boolean;

  minSize: VisualizationGridSize;
  defaultSize: VisualizationGridSize;

  settings?: CustomVisualizationSettingsDefinitions;

  /**
   * This function should return true if the data shape makes sense for this visualization.
   * TODO: should it get series: Series instead?
   */
  isSensible: (data: DatasetData) => boolean;

  /**
   * This function should throw if the visualization cannot be rendered with given data and settings.
   */
  checkRenderable: (series: Series, settings: CustomVisualizationSettings) => void | never;

  /**
   * Component that renders the visualization.
   */
  VisualizationComponent: ComponentType<CustomVisualizationProps<CustomVisualizationSettings>>;

  /**
   * Component that renders the visualization's empty state (i.e. when checkRenderable throws).
   */
  VisualizationEmptyStateComponent?: ComponentType<
    CustomVisualizationProps<CustomVisualizationSettings>
  >;

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
  /**
   * Number of grid columns in a Metabase dashboard.
   */
  width: number;

  /**
   * Number of grid rows in a Metabase dashboard.
   */
  height: number;
};

export type CustomVisualizationProps<CustomVisualizationSettings> = {
  width: number;

  height: number;

  series: Series;

  settings: CustomVisualizationSettings;

  onClick: (clickObject: ClickObject<CustomVisualizationSettings> | null) => void;
};

export type CustomVisualizationIconProps = {
  width: number;
  height: number;
};

export type CustomVisualizationSettingsProps = {};

export type ClickObject<CustomVisualizationSettings> = {
  value?: RowValue;
  column?: Column;
  dimensions?: ClickObjectDimension[];
  event?: MouseEvent;
  element?: Element;
  // seriesIndex?: number;
  // cardId?: CardId;
  settings?: CustomVisualizationSettings;
  // columnShortcuts?: boolean;
  origin?: {
    row: RowValue[];
    cols: Column[];
  };
  // extraData?: Record<string, unknown>;
  // data?: ClickObjectDataRow[];
};

export interface ClickObjectDimension {
  value: RowValue;
  column: Column;
}
