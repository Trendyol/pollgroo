import React from 'react';
import { Metric } from '../../interfaces';
import { Button } from '../../atoms';

interface IProps {
  metrics: Metric[];
  onChange: (value: string) => void;
  selected: string;
}

export const MetricsFilter = ({ metrics, onChange, selected }: IProps) => {
  return (
    <div>
      {metrics.map((metric: Metric) => (
        <Button
          key={metric._id}
          variant={metric.name === selected ? 'selected' : 'secondary'}
          className="p-2 mr-2 mb-2"
          onClick={() => onChange(metric.name)}
        >
          {metric.title}
        </Button>
      ))}
    </div>
  );
};
