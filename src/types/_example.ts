import {
  CreateCustomVisualization,
  CustomVisualizationIconProps,
  CustomVisualizationProps,
} from './viz';

type MySettings = {
  apiKey?: string;
};

export const createMyViz: CreateCustomVisualization<MySettings> = () => {
  return {
    id: 'my-custom-viz',
    getName: () => 'My custom viz',
    minSize: { width: 2, height: 2 },
    defaultSize: { width: 4, height: 3 },
    isSensible({ cols }) {
      return cols.length > 1 && cols.length < 3;
    },
    checkRenderable(_series, settings) {
      return settings.apiKey && settings.apiKey.length > 0;
    },
    VisualizationComponent: MyVizComponent,
    VisualizationIconComponent: MyVizIconComponent,
  };
};

const MyVizComponent = (props: CustomVisualizationProps<MySettings>) => {
  return null;
};

const MyVizIconComponent = (props: CustomVisualizationIconProps) => {
  return null;
};
