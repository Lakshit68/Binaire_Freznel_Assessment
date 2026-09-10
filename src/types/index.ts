export interface IModelRaw {
  id: string;
  name: string;
  family: string;
  pipeline_tag: string;
  architecture_tag: string;
  weight_tag: string;
  safetensors_count: number;
}

export interface IFilterCriteria {
  pipeline: string;
  family: string;
  architecture: string;
  weight: string;
  minSafetensors: number;
  maxSafetensors: number;
}

export type SortField = 'nameAsc' | 'nameDesc' | 'safetensors';
export type QueryTarget = 'all' | 'name' | 'family';
